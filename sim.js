/* Pure calculation functions for the course simulators.
   No DOM access here, so the math can be tested on its own (see test.js). */
(function (root) {
  const sum = (a) => a.reduce((s, x) => s + x, 0);

  /* Post-money SAFE conversion plus a priced round with a pool top-up.
     base: { holders:[{name,cls,shares}], pool }  (pool = unissued + granted option pool shares)
     safes: [{name, inv, cap, disc}]  cap 0 = uncapped, disc as fraction
     round: { pre, inv, poolPost, investor, cls }
     YC post-money SAFE: Company Capitalization counts all shares, options and the
     existing pool plus all converting SAFEs, but not the pool increase made in
     connection with the round. */
  function pricedRound(base, safes, round) {
    const s0 = sum(base.holders.map((h) => h.shares)) + base.pool;
    let x = 0, P = round.pre / s0, ss = safes.map(() => 0);
    for (let it = 0; it < 500; it++) {
      const C = s0 + sum(ss);
      ss = safes.map((sf) => {
        const prices = [];
        if (sf.cap > 0) prices.push(sf.cap / C);
        if (sf.disc > 0) prices.push(P * (1 - sf.disc));
        if (!prices.length) prices.push(P);
        return sf.inv / Math.min(...prices);
      });
      const k = (round.pre + round.inv) / round.pre;
      const pk = round.poolPost * k;
      const preNoX = s0 + sum(ss);
      x = Math.max(0, (pk * preNoX - base.pool) / (1 - pk));
      const nextP = round.pre / (preNoX + x);
      if (Math.abs(nextP - P) < 1e-12) { P = nextP; break; }
      P = nextP;
    }
    const newShares = round.inv / P;
    const holders = base.holders.map((h) => ({ ...h }));
    safes.forEach((sf, i) => holders.push({ name: sf.name, cls: "Seed", shares: ss[i], invested: sf.inv, price: sf.inv / ss[i] }));
    holders.push({ name: round.investor, cls: round.cls, shares: newShares, invested: round.inv, price: P });
    return {
      holders, pool: base.pool + x, price: P, poolIncrease: x, newShares,
      post: P * (sum(holders.map((h) => h.shares)) + base.pool + x),
      effectivePre: round.pre - x * P,
      safePrices: ss.map((s, i) => safes[i].inv / s)
    };
  }

  /* A secondary: seller transfers shares to buyer; totals do not change. */
  function secondary(state, seller, buyer, shares, cls) {
    const holders = state.holders.map((h) => ({ ...h }));
    const s = holders.find((h) => h.name === seller);
    if (!s || shares <= 0) return { ...state, holders };
    const n = Math.min(shares, s.shares);
    s.shares -= n;
    holders.push({ name: buyer + " (secondary)", cls: cls || s.cls, shares: n, secondary: true });
    return { ...state, holders };
  }

  function ownership(state) {
    const total = sum(state.holders.map((h) => h.shares)) + state.pool;
    const rows = state.holders.map((h) => ({ name: h.name, cls: h.cls, shares: h.shares, pct: h.shares / total }));
    rows.push({ name: "Option pool", cls: "Options", shares: state.pool, pct: state.pool / total });
    return { rows, total };
  }

  /* Exit waterfall.
     classes: { Seed:{mult,part,capMult}, A:{...}, B:{...} }  keyed by holder cls
     opts: { exit, debt, fees, seniority:"pari"|"stacked", order:[cls senior first], poolGranted }
     Common includes founders and the granted part of the pool (strike ignored).
     Non-participating and capped-participating classes convert when converting pays more. */
  function waterfall(state, classes, opts) {
    const prefCls = Object.keys(classes).filter((c) => state.holders.some((h) => h.cls === c && h.shares > 0));
    const clsShares = {}, clsInv = {};
    prefCls.forEach((c) => {
      const hs = state.holders.filter((h) => h.cls === c && !h.secondary);
      const all = state.holders.filter((h) => h.cls === c);
      clsShares[c] = sum(all.map((h) => h.shares));
      clsInv[c] = sum(hs.map((h) => h.invested || 0));
    });
    const commonShares = sum(state.holders.filter((h) => !classes[h.cls]).map((h) => h.shares)) + state.pool * opts.poolGranted;
    const lender = Math.min(opts.exit, opts.debt || 0);
    const fees = Math.min(opts.exit - lender, (opts.fees || 0) * opts.exit);
    const avail = Math.max(0, opts.exit - lender - fees);

    function run(conv) {
      let rem = avail;
      const pay = {};
      prefCls.forEach((c) => (pay[c] = 0));
      const tiers = opts.seniority === "stacked"
        ? opts.order.filter((c) => prefCls.includes(c)).map((c) => [c])
        : [prefCls];
      for (const tier of tiers) {
        const t = tier.filter((c) => !conv[c]);
        const need = sum(t.map((c) => clsInv[c] * classes[c].mult));
        const paid = Math.min(rem, need);
        t.forEach((c) => (pay[c] += need ? paid * (clsInv[c] * classes[c].mult) / need : 0));
        rem -= paid;
      }
      // participation: common + converted + participating preferred share pro rata, with caps
      let part = { common: commonShares };
      prefCls.forEach((c) => { if (conv[c] || classes[c].part) part[c] = clsShares[c]; });
      let capped = {};
      for (let it = 0; it < 10 && rem > 1e-9; it++) {
        const live = Object.keys(part).filter((k) => !capped[k]);
        const sh = sum(live.map((k) => part[k]));
        if (!sh) break;
        let over = 0, give = {};
        live.forEach((k) => {
          let g = rem * part[k] / sh;
          if (k !== "common" && !conv[k] && classes[k].part && classes[k].capMult > 0) {
            const room = classes[k].capMult * clsInv[k] - pay[k];
            if (g > room) { over += g - Math.max(0, room); g = Math.max(0, room); capped[k] = true; }
          }
          give[k] = g;
        });
        live.forEach((k) => { if (k === "common") pay.common = (pay.common || 0) + give[k]; else pay[k] += give[k]; });
        rem = over;
      }
      pay.common = pay.common || 0;
      return pay;
    }

    const conv = {};
    for (let it = 0; it < 12; it++) {
      let changed = false;
      for (const c of prefCls) {
        const canConvert = !classes[c].part || classes[c].capMult > 0;
        if (!canConvert) continue;
        const a = run(conv)[c];
        const b = run({ ...conv, [c]: !conv[c] })[c];
        if (b > a + 1e-6) { conv[c] = !conv[c]; changed = true; }
      }
      if (!changed) break;
    }
    const pay = run(conv);
    const perCommon = commonShares ? pay.common / commonShares : 0;
    const byHolder = state.holders.map((h) => {
      let v;
      if (classes[h.cls]) v = clsShares[h.cls] ? pay[h.cls] * h.shares / clsShares[h.cls] : 0;
      else v = h.shares * perCommon;
      return { name: h.name, cls: h.cls, value: v };
    });
    byHolder.push({ name: "Employees (granted options)", cls: "Options", value: state.pool * opts.poolGranted * perCommon });
    if (lender) byHolder.push({ name: "Venture lender", cls: "Debt", value: lender });
    if (fees) byHolder.push({ name: "Deal fees", cls: "Fees", value: fees });
    return { byHolder, conv, perCommon, classPay: pay };
  }

  /* Fund economics: fees for feeYears at feeRate, then carry over return of capital. */
  function fund(o) {
    const fees = o.size * o.feeRate * o.feeYears;
    const investable = o.size - fees;
    const gross = investable * o.grossMoic;
    const profit = Math.max(0, gross - o.size);
    const carry = profit * o.carry;
    const net = gross - carry;
    return { fees, investable, gross, carry, net, tvpi: net / o.size, grossMoicOnFund: gross / o.size };
  }

  /* QSBS under § 1202. Stock issued after July 4, 2025: 50/75/100% at 3/4/5 years,
     $15M per-issuer cap (indexed after 2026). Earlier stock: 100% at 5 years, $10M cap. */
  function qsbs(o) {
    const post = o.issuedAfterJuly2025;
    let pct = 0;
    if (post) pct = o.years >= 5 ? 1 : o.years >= 4 ? 0.75 : o.years >= 3 ? 0.5 : 0;
    else pct = o.years >= 5 ? 1 : 0;
    const issuerCap = post ? 15e6 : 10e6;
    const limit = Math.max(issuerCap, 10 * o.basis);
    const eligibleGain = pct > 0 ? Math.min(o.gain, limit) : 0;
    const excluded = eligibleGain * pct;
    const sec1202Taxable = eligibleGain - excluded; // taxed at up to 28%
    const ordinaryLtcg = o.gain - eligibleGain;
    const tax = sec1202Taxable * (0.28 + o.niit) + ordinaryLtcg * (o.ltcg + o.niit);
    const noQsbsTax = o.gain * (o.ltcg + o.niit);
    return { pct, limit, excluded, sec1202Taxable, ordinaryLtcg, tax, saved: noQsbsTax - tax, noQsbsTax };
  }

  /* 83(b) comparison: annual vesting tranches, FMV grows linearly to fmvVest at final vest. */
  function eightyThreeB(o) {
    const per = o.shares / o.years;
    const fmvAt = (t) => o.fmvGrant + (o.fmvVest - o.fmvGrant) * t / o.years;
    const withB = { ordinary: Math.max(0, o.fmvGrant - o.paid) * o.shares };
    withB.ordTax = withB.ordinary * o.ordRate;
    withB.gain = (o.exitPrice - Math.max(o.fmvGrant, o.paid)) * o.shares;
    withB.capTax = Math.max(0, withB.gain) * o.capRate;
    withB.total = withB.ordTax + withB.capTax;
    let ordinary = 0, basis = 0;
    for (let t = 1; t <= o.years; t++) { const f = fmvAt(t); ordinary += Math.max(0, f - o.paid) * per; basis += Math.max(f, o.paid) * per; }
    const noB = { ordinary, ordTax: ordinary * o.ordRate, gain: o.exitPrice * o.shares - basis };
    noB.capTax = Math.max(0, noB.gain) * o.capRate;
    noB.total = noB.ordTax + noB.capTax;
    return { withB, noB };
  }

  /* Stock options: NSO versus ISO, federal only, simplified.
     o: { n, strike, fmvGrant, fmvEx, sale, held (1 yr after exercise and 2 after grant), ord, cap, amt, vestYears } */
  function options(o) {
    const n = o.n, spreadPS = Math.max(0, o.fmvEx - o.strike), spread = spreadPS * n;
    const proceeds = o.sale * n, cost = o.strike * n;
    const gainRate = o.held ? o.cap : o.ord;
    const nso = { ordinary: spread, exTax: spread * o.ord, saleTax: Math.max(0, (o.sale - o.fmvEx) * n) * gainRate };
    nso.total = nso.exTax + nso.saleTax;
    let iso;
    if (o.held) {
      iso = { ordinary: 0, exTax: 0, saleTax: Math.max(0, proceeds - cost) * o.cap, amtPref: spread, amt: spread * o.amt };
    } else {
      const ordPS = Math.max(0, Math.min(o.fmvEx, o.sale) - o.strike);
      iso = { ordinary: ordPS * n, exTax: 0, saleTax: ordPS * n * o.ord + Math.max(0, (o.sale - o.strike - ordPS) * n) * o.ord, amtPref: 0, amt: 0 };
    }
    iso.total = iso.exTax + iso.saleTax;
    const discount = Math.max(0, o.fmvGrant - o.strike);
    const penalty = discount > 0 ? spread * 0.2 : 0;   // § 409A: extra 20% on the deferred amount, before interest
    const yearly = (o.fmvGrant * n) / Math.max(1, o.vestYears);
    const isoCapShares = yearly > 100000 ? Math.max(0, n - (100000 * Math.max(1, o.vestYears)) / o.fmvGrant) : 0;
    return { nso, iso, cashToExercise: cost, discount, penalty, isoCapShares, net: { nso: proceeds - cost - nso.total, iso: proceeds - cost - iso.total } };
  }

  /* When to exercise: cash out of pocket and total tax for three timings.
     o: { n, strike, fmvGrant, fmvNow, sale, iso, ord, cap, amt } */
  function exercise(o) {
    const n = o.n, cost = o.strike * n;
    const early = { label: "At grant (early exercise, 83(b) filed)", cost, taxNow: Math.max(0, o.fmvGrant - o.strike) * n * o.ord };
    early.taxLater = Math.max(0, (o.sale - Math.max(o.strike, o.fmvGrant)) * n) * o.cap;
    const spreadNow = Math.max(0, o.fmvNow - o.strike) * n;
    const now = { label: "Today", cost };
    if (o.iso) { now.taxNow = spreadNow * o.amt; now.amtOnly = true; now.taxLater = Math.max(0, (o.sale - o.strike) * n) * o.cap; }
    else { now.taxNow = spreadNow * o.ord; now.taxLater = Math.max(0, (o.sale - o.fmvNow) * n) * o.cap; }
    const atSale = { label: "When the company is sold (cashless)", cost: 0, taxNow: 0, taxLater: Math.max(0, (o.sale - o.strike) * n) * o.ord };
    [early, now, atSale].forEach((r) => { r.outOfPocket = r.cost + r.taxNow; r.totalTax = r.taxNow + r.taxLater; r.kept = o.sale * n - cost - r.totalTax; });
    return { early, now, atSale };
  }

  const api = { pricedRound, secondary, ownership, waterfall, fund, qsbs, eightyThreeB, options, exercise, sum };
  if (typeof module !== "undefined") module.exports = api; else root.SIM = api;
})(typeof window !== "undefined" ? window : globalThis);
