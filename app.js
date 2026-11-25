{
const C = window.COURSE, WEEKS = window.WEEKS, R = window.READINGS, CASE = window.CASE, TS = window.TERM_SHEETS, EX = window.EXERCISES, SIM = window.SIM;
const main = document.getElementById("main");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = (v) => { const a = Math.abs(v), s = v < 0 ? "−" : ""; if (a >= 1e9) return s + "$" + (a / 1e9).toFixed(2) + "B"; if (a >= 1e6) return s + "$" + (a / 1e6).toFixed(a < 1e7 ? 2 : 1) + "M"; if (a >= 1e3) return s + "$" + Math.round(a / 1e3) + "K"; return s + "$" + a.toFixed(a < 10 ? 2 : 0); };
const num = (v) => Math.round(v).toLocaleString("en-US");
const pct = (v, d = 1) => (v * 100).toFixed(d) + "%";
const PAL = ["#cfb87c", "#86692a", "#e8dbb4", "#3f6e8c", "#a6432b", "#6b7a45", "#6c3f6e", "#8a96a1", "#c97b5a", "#2f5d5d", "#b3a37a", "#94526b"];
const store = { get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };

/* Shared scenario links: ?s=<encoded numbers>#tool loads someone else's numbers into the tools. */
const SHARE_KEYS = { c: "vcl-cap-v2", t: "vcl-tax-v1", f: "vcl-fund-v1", d: "vcl-dstage", x: "vcl-txtab", s: "vcl-tsel" };
const b64e = (o) => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const b64d = (t) => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))));
let SHARED = false;
try {
  const q = new URLSearchParams(location.search).get("s");
  if (q) {
    const o = b64d(q);
    if (o && typeof o === "object") Object.keys(SHARE_KEYS).forEach((k) => { if (o[k] !== undefined && o[k] !== null) store.set(SHARE_KEYS[k], o[k]); });
    SHARED = true;
    try { history.replaceState(null, "", location.pathname + location.hash); } catch (e) {}
  }
} catch (e) {}
const ck = (c) => Object.keys(CASE).find((k) => CASE[k] === c);
const caseFor = (n) => Object.values(CASE).find((c) => c.week === n);

/* ---------- Owner edit mode: text wrapped in ed() can be changed on the page ---------- */
const ROOTS = { C: () => window.COURSE, W: () => window.WEEKS, G: () => window.GUESTS, K: () => window.CASE, R: () => window.READINGS, X: () => window.EXERCISES };
const walk = (p) => { const a = p.split("."); let o = ROOTS[a[0]] && ROOTS[a[0]](); for (const k of a.slice(1, -1)) { if (o == null) return [null]; o = o[k]; } return [o, a[a.length - 1]]; };
const getPath = (p) => { const [o, k] = walk(p); return o == null ? undefined : o[k]; };
const setPath = (p, v) => { const [o, k] = walk(p); if (o != null && typeof o[k] !== "object") o[k] = v; };
const ed = (p, v) => `<span data-ed="${esc(p)}">${esc(v)}</span>`;
const EDIT = { on: false, db: null, owner: false, data: {} };

/* ---------- Readings ---------- */
function item(id, withClass) {
  const r = R[id]; if (!r) return "";
  const cls = withClass ? WEEKS.filter((w) => w.readings.includes(id)).map((w) => w.n) : [];
  const meta = [r.kind, r.status === "2023" ? "Assigned in the 2023 course" : "", r.note || "", cls.length ? "Class " + cls.join(", ") : ""].filter(Boolean).join(" · ");
  const title = ed("R." + id + ".t", r.t);
  return `<li>${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">${title}</a>` : `<b>${title}</b>`}${r.status === "suggested" ? '<span class="sugg">suggested</span>' : ""}<span class="meta">${esc(meta)}</span></li>`;
}

/* ---------- Course ---------- */
function schedRow(w, glance) {
  const i = WEEKS.indexOf(w);
  return `<li><div class="dt">${esc(w.date)}<small>Class ${w.n}</small></div><div><a class="tt" href="#week-${w.n}">${ed("W." + i + ".title", w.title)}</a>${w.dateNote ? `<p class="flag">${ed("W." + WEEKS.indexOf(w) + ".dateNote", w.dateNote)}</p>` : ""}${glance ? `<p class="quiet">Guest: ${esc(w.guest)}</p>` : `
    <p><span class="k">Practice.</span> ${ed("W." + i + ".focus", w.focus)}</p>
    <p><span class="k">Lived Experience.</span> ${ed("W." + i + ".guest", w.guest)}${w.proposedGuests ? ` <span class="quiet">(proposed: ${esc(w.proposedGuests)})</span>` : ""}</p>`}</div></li>`;
}
const TOOLNAME = { captable: "Cap table", dilution: "Dilution", waterfall: "Exit waterfall", termsheets: "Term sheets", tax: "Tax", fund: "Fund economics" };
const classDate = (w) => new Date(w.date + ", 2027 23:59");
function currentWeek() { const now = new Date(); return WEEKS.find((w) => classDate(w) >= now); }
function scenButtons(w) {
  return (w.scenarios || []).length ? `<div class="scen">${w.scenarios.map((sc, i) => `<button type="button" class="ghost" data-sc="${w.n}:${i}">${esc(sc.label)} <span class="quiet">· ${TOOLNAME[sc.tool]}</span></button>`).join("")}</div>` : "";
}
function thisWeekBox() {
  const w = currentWeek(); if (!w) return "";
  const first = WEEKS.indexOf(w) === 0 && new Date() < new Date("Jan 7, 2027");
  return `<a class="tw" href="#week-${w.n}"><span class="quiet">${first ? "First class" : "This week"} · Thursday, ${esc(w.date)}</span><b>${esc(w.title)}</b>${w.dateNote ? `<span class="flag">${esc(w.dateNote)}</span>` : ""}<span class="go">What to read and do →</span></a>${C.thisWeekNote ? `<p class="ask">${ed("C.thisWeekNote", C.thisWeekNote)}</p>` : ""}`;
}
const pdfLink = (cls) => `<a class="${cls || "btn"}" href="${esc(C.publicUrl + "syllabus.pdf")}" target="_blank" rel="noopener">Download the syllabus (PDF)</a>`;
function home() {
  return `<section class="hero"><div class="hin"><h1>Venture Capital Law</h1>
</div>
  <svg class="hills" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 100 L0 62 Q160 30 330 52 Q480 20 640 44 Q820 18 1000 40 L1000 100Z" fill="var(--pine)" opacity=".5"/></svg>
  <svg class="irons" viewBox="280 20 340 200" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
    <path d="M300 220 L395 52 L430 60 L410 220Z" fill="var(--rock)"/><path d="M395 52 L430 60 L425 80 Z" fill="#c9684c"/>
    <path d="M390 220 L478 34 L520 44 L500 220Z" fill="var(--rock)" opacity=".92"/><path d="M478 34 L520 44 L514 66 Z" fill="#c9684c"/>
    <path d="M480 220 L560 70 L600 80 L590 220Z" fill="var(--rock)" opacity=".85"/></svg>
  <svg class="ground" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 L0 20 Q250 4 500 16 Q750 4 1000 14 L1000 40Z" fill="var(--pine)"/></svg></section>
  <div class="narrow intro"><p class="htag">${ed("C.tagline", C.tagline)}</p>
  <ul class="facts"><li><b>Spring 2027</b></li><li>Thursdays, ${esc(C.classTime)}</li><li>January 14 to April 22</li></ul>
  ${thisWeekBox()}
  <p class="quiet" style="margin-top:22px"><a href="#syllabus">Syllabus, grading and policies</a> · <a href="${esc(C.bookingUrl)}" target="_blank" rel="noopener">Book office hours</a></p></div>`;
}
function schedule() {
  const rows = WEEKS.map((w) => schedRow(w, false));
  rows.splice(WEEKS.findIndex((w) => w.n === 10), 0, `<li class="brk"><div class="dt">Mar 18</div><div>Spring break, no class</div></li>`);
  return `<div class="narrow"><h1>Schedule</h1>
  <p class="sub">Every class is split in half, with a 10-minute break: <i>The Practice of Venture Capital Law</i>, then <i>The Lived Experience of Venture Capital</i> with a guest.</p>
  <ul class="sched">${rows.join("")}</ul>
  <p class="quiet" style="margin-top:18px">Dates follow the CU Law 2026–27 calendar. Final exams run April 26 to May 6.</p>
  <p class="noprint">${pdfLink()}</p></div>`;
}
function syllabusView() {
  const rows = WEEKS.map((w) => {
    const rd = w.readings.filter((id) => R[id] && R[id].status !== "suggested").map((id) => esc(R[id].t));
    return `<tr><td>${w.n}</td><td style="white-space:nowrap">${esc(w.date)}</td><td><b>${esc(w.title)}</b><br>${w.dateNote ? `<i>${esc(w.dateNote)}</i><br>` : ""}${esc(w.focus)}<br><span class="quiet">Guest: ${esc(w.guest)}</span><br>Before class: ${esc(w.prep)}${rd.length ? `<br>Readings: ${rd.join("; ")}` : ""}</td></tr>`;
  });
  rows.splice(WEEKS.findIndex((w) => w.n === 10), 0, `<tr><td></td><td>Mar 18</td><td>Spring break, no class</td></tr>`);
  return `<div class="narrow syl"><p class="noprint">${pdfLink()}</p><h1>Venture Capital Law</h1>
  <p><b>Colorado Law · Spring 2027</b> · Thursdays, ${esc(C.classTime)}, January 14 to April 22 · Dinners with guests at ${esc(C.dinnerTime)} · Instructor: ${esc(C.instructor.name)}</p>
  <p class="noprint quiet">The live version is at <a href="${esc(C.publicUrl)}">${esc(C.publicUrl)}</a>.</p>
  <h2>Course description</h2><p>${ed("C.description", C.description)}</p>
  <h2>Learning objectives</h2><ul>${C.objectives.map((o, i) => `<li>${ed("C.objectives." + i, o)}</li>`).join("")}</ul>
  <h2>Format</h2><p>${ed("C.format", C.format)}</p>
  <h2>Grading</h2><ul>${C.grading.map((g) => `<li>${esc(g[0])}: ${g[1]}%</li>`).join("")}</ul>
  <h2>Instructor and office hours</h2><p>${ed("C.instructor.bio", C.instructor.bio)}</p><p>${ed("C.officeHours", C.officeHours)} <a class="noprint" href="${esc(C.bookingUrl)}" target="_blank" rel="noopener">Book a time</a></p><p class="noprint">Email: ${ed("C.email", C.email)}</p>
  <h2>Schedule</h2><p class="noprint">The class-by-class schedule, with readings and guests, is on the <a href="#schedule">Schedule page</a>. The PDF includes it.</p><table class="syltab printonly"><thead><tr><th>#</th><th>Date</th><th>Topic, guest and preparation</th></tr></thead><tbody>${rows.join("")}</tbody></table>
  <p class="quiet printonly">Dates follow the CU Law 2026–27 calendar. Final exams run April 26 to May 6. Readings, guests and dates may change; the course site at ${esc(C.publicUrl)} is the current version.</p>
  <h2>Course policies</h2><p>${ed("C.policiesIntro", C.policiesIntro)}</p><dl>${C.policies.map((p, i) => `<dt>${esc(p[0])}</dt><dd>${ed("C.policies." + i + ".1", p[1])}${p[2] ? ` (${esc(p[2])})` : ""}</dd>`).join("")}</dl>
  <p>Other university policies: CU Boulder required syllabus statements, ${esc(C.policiesLink)}.</p></div>`;
}
function weekView(n) {
  const w = WEEKS.find((x) => x.n === n); if (!w) return schedule();
  const prev = WEEKS.find((x) => x.n === n - 1), next = WEEKS.find((x) => x.n === n + 1);
  const core = w.readings.filter((id) => R[id] && R[id].status !== "suggested"), more = w.readings.filter((id) => R[id] && R[id].status === "suggested");
  const cs = caseFor(n) || (w.caseCh && CASE[w.caseCh]);
  const ex = EX.filter((e) => e.week === n);
  const TOOL = { captable: "Cap table", dilution: "Dilution", waterfall: "Exit waterfall", termsheets: "Term sheets", tax: "Tax", fund: "Fund economics" };
  return `<div class="narrow"><p class="quiet"><a href="#schedule">Schedule</a> · Class ${w.n} · Thursday, ${esc(w.date)}, ${esc(C.classTime)}</p>
  <h1>${ed("W." + WEEKS.indexOf(w) + ".title", w.title)}</h1>${w.dateNote ? `<p class="flag">${ed("W." + WEEKS.indexOf(w) + ".dateNote", w.dateNote)}</p>` : ""}
  <div class="halves"><div class="half"><h3>The Practice of Venture Capital Law</h3><p>${ed("W." + WEEKS.indexOf(w) + ".focus", w.focus)}</p></div>
  <div class="half"><h3>The Lived Experience of Venture Capital</h3><p>${ed("W." + WEEKS.indexOf(w) + ".guest", w.guest)}.${w.proposedGuests ? ` Proposed: ${esc(w.proposedGuests)}.` : " Guest to be announced."}</p></div></div>
  <h2>Before class</h2><p>${ed("W." + WEEKS.indexOf(w) + ".prep", w.prep)}</p>
  ${core.length ? `<ul class="list">${core.map((id) => item(id)).join("")}</ul>` : ""}
  ${more.length ? `<details><summary>Other sources for this class (${more.length})</summary><ul class="list">${more.map((id) => item(id)).join("")}</ul></details>` : ""}
  ${cs ? `<h2>The case</h2><h3 style="margin-top:0">${ed("K." + ck(cs) + ".title", cs.title)}</h3><p>${ed("K." + ck(cs) + ".body", cs.body)}</p>` : ""}
  ${ex.map((e) => `<div class="ask"><p><b>${esc(e.title)}</b> · ${esc(e.role)}</p><p>${esc(e.prompt)}</p></div>`).join("")}
  ${w.scenarios && w.scenarios.length ? `<h2>Try it in the tools</h2><p class="quiet" style="margin-top:0">Each button opens a tool set up for this class. It replaces the numbers you had in that tool.</p>${scenButtons(w)}` : w.tools.length ? `<p class="quiet">Tools: ${w.tools.map((t) => `<a href="#${t}">${TOOL[t]}</a>`).join(", ")}</p>` : ""}
  <p style="margin-top:36px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap">${prev ? `<a href="#week-${prev.n}">← ${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a href="#week-${next.n}">${esc(next.title)} →</a>` : ""}</p></div>`;
}

/* ---------- Library ---------- */
const GROUPS = [["Resource", "Resources"], ["Form", "Forms"], ["Book", "Books"], ["Essay", "Essays"], ["Tax authority", "Tax"], ["Securities rule", "Securities and funds"], ["Ethics", "Professional responsibility"], ["Market data", "Market research"]];
let LIB = { g: "", q: "" };
function library() {
  setTimeout(() => {
    document.getElementById("chips").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; LIB.g = b.dataset.g; drawLib(); });
    document.getElementById("lq").addEventListener("input", (e) => { LIB.q = e.target.value.toLowerCase(); drawLib(); });
    drawLib();
  });
  return `<div class="narrow"><h1>Library</h1>
  <p class="sub">Books, model documents and sources for the course.</p>
  <label class="f" style="margin-bottom:14px">Search<input type="search" id="lq" placeholder="QSBS, NVCA, tender offer"></label>
  <div class="chips" id="chips"></div><div id="lib"></div></div>`;
}
function drawLib() {
  document.getElementById("chips").innerHTML = [["", "All"]].concat(GROUPS).map(([g, l]) => `<button type="button" data-g="${esc(g)}" class="${LIB.g === g ? "on" : ""}">${esc(l)}</button>`).join("");
  const match = (id) => { const r = R[id]; return (!LIB.g || r.kind === LIB.g) && (!LIB.q || (r.t + " " + r.topic + " " + r.kind).toLowerCase().includes(LIB.q)); };
  const html = GROUPS.map(([g, l]) => { const ids = Object.keys(R).filter((id) => R[id].kind === g && match(id)); return ids.length ? `<h2>${esc(l)}</h2><ul class="list">${ids.map((id) => item(id, true)).join("")}</ul>` : ""; }).join("");
  document.getElementById("lib").innerHTML = html || '<p class="quiet">Nothing matches that search.</p>';
}

/* ---------- Case ---------- */
function caseView() {
  const show = store.get("vcl-instr", false);
  setTimeout(() => { document.getElementById("instr").addEventListener("click", () => { store.set("vcl-instr", !show); route(); }); });
  const chapters = Object.values(CASE).sort((a, b) => a.week - b.week);
  return `<div class="narrow"><h1>Mostly Human AI</h1>
  <p class="sub">${ed("K.intro.body", CASE.intro.body)}</p>
  <ul>${CASE.intro.people.map((p, i) => `<li>${ed("K.intro.people." + i, p)}</li>`).join("")}</ul>
  ${chapters.map((c) => {
    const ex = EX.filter((e) => e.week === c.week && c !== CASE.intro);
    return `<div class="chapter"><div class="dt"><a href="#week-${c.week}" style="text-decoration:none">Class ${c.week}</a></div><div><h3>${ed("K." + ck(c) + ".title", c.title)}</h3><p>${ed("K." + ck(c) + ".body", c.body)}</p>${c.open ? `<p class="open">Still open: ${esc(c.open)}</p>` : ""}
    ${ex.map((e) => `<div class="ask"><p><b>${ed("X." + EX.indexOf(e) + ".title", e.title)}</b> · ${esc(e.role)}</p><p>${ed("X." + EX.indexOf(e) + ".prompt", e.prompt)}</p>${show ? `<ul>${e.issues.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : ""}</div>`).join("")}</div></div>`;
  }).join("")}
  <p style="margin-top:28px"><button class="ghost" id="instr" type="button">${show ? "Hide" : "Show"} teaching notes</button></p></div>`;
}

/* ---------- Tools: shared rounds model ---------- */
const DEFAULT = {
  founders: [{ name: "Abigail", shares: 4e6 }, { name: "Bernard", shares: 4e6 }, { name: "Charlie", shares: 1.5e6 }],
  pool: 1e6,
  safes: [{ name: "Angel 1", inv: 3e5, cap: 8e6, disc: 0 }, { name: "Angel 2", inv: 2e5, cap: 10e6, disc: 0.2 }],
  Seed: { investor: "Seed lead", pre: 14e6, inv: 3e6, poolPost: 0.10 },
  A: { investor: "Series A lead", pre: 48e6, inv: 12e6, poolPost: 0.12 },
  B: { investor: "Series B lead", pre: 160e6, inv: 40e6, poolPost: 0.10, seller: "Charlie", sec: 5e5 },
  terms: { Seed: { mult: 1, part: false, capMult: 0 }, A: { mult: 1, part: false, capMult: 0 }, B: { mult: 1, part: false, capMult: 0 } },
  wf: { exit: 120e6, debt: 0, fees: 0.02, seniority: "pari", poolGranted: 0.7, who: "Abigail" }
};
let ST = (() => { const d = JSON.parse(JSON.stringify(DEFAULT)), s = store.get("vcl-cap-v2", {}); Object.keys(d).forEach((k) => { if (s[k] !== undefined) d[k] = (typeof d[k] === "object" && !Array.isArray(d[k])) ? Object.assign(d[k], s[k]) : s[k]; }); return d; })();
const save = () => store.set("vcl-cap-v2", ST);
const TOOLS = [["captable", "Cap table"], ["dilution", "Dilution"], ["waterfall", "Exit waterfall"], ["termsheets", "Term sheets"], ["tax", "Tax"], ["fund", "Fund economics"]];
const tabs = (on) => `<div class="tabs">${TOOLS.map(([k, l]) => `<a href="#${k}" class="${k === on ? "on" : ""}">${l}</a>`).join("")}</div>${SHARED ? `<p class="ask" style="margin-top:-12px">You opened a shared link, so these are the sender’s numbers. Press Start over to go back to the class defaults.</p>` : ""}<p class="sharerow"><button type="button" class="ghost" id="share">Copy link to these numbers</button><span class="quiet" id="sharemsg" aria-live="polite"></span></p><p class="quiet" id="sharebox" hidden></p>`;

function computeCap(st) {
  const s0 = { holders: st.founders.map((f) => ({ name: f.name, cls: "Common", shares: +f.shares || 0 })), pool: +st.pool || 0 };
  const safes = st.safes.filter((s) => s.inv > 0);
  // Angel stage: what the capped SAFEs would own if they converted at their caps (an estimate; they hold no shares yet).
  const capped = safes.filter((s) => s.cap > 0);
  const frac = SIM.sum(capped.map((s) => s.inv / s.cap));
  const S0 = SIM.sum(s0.holders.map((h) => h.shares)) + s0.pool;
  const Ccap = frac < 1 ? S0 / (1 - frac) : S0;
  const angelEst = { holders: s0.holders.concat(capped.map((s) => ({ name: s.name, cls: "Seed", shares: s.inv / s.cap * Ccap }))), pool: s0.pool };
  const seed = SIM.pricedRound(s0, safes, { ...st.Seed, cls: "Seed" });
  const a = SIM.pricedRound({ holders: seed.holders, pool: seed.pool }, [], { ...st.A, cls: "A" });
  const b = SIM.pricedRound({ holders: a.holders, pool: a.pool }, [], { ...st.B, cls: "B" });
  const last = SIM.secondary(b, st.B.seller, st.B.investor, +st.B.sec || 0, "Common");
  last.post = b.post;
  const stages = [
    { name: "Incorporation", s: s0 },
    { name: "Pre-seed", s: angelEst, est: true, safes },
    { name: "Seed", s: seed, r: seed, round: st.Seed },
    { name: "Series A", s: a, r: a, round: st.A },
    { name: "Series B", s: last, r: b, round: st.B }
  ];
  return { stages, last, seed, a, b };
}
const colorMap = (names) => { const m = {}; names.forEach((n, i) => (m[n] = PAL[i % PAL.length])); return m; };
function bind(root, obj, after) {
  root.addEventListener("input", (e) => {
    const el = e.target, k = el.dataset.k; if (!k) return;
    let v = el.type === "checkbox" ? el.checked : el.value;
    if (el.dataset.u) { v = parseFloat(v); if (isNaN(v)) return; v = el.dataset.u === "M" ? v * 1e6 : el.dataset.u === "%" ? v / 100 : v; }
    const p = k.split("."); let o = obj; p.slice(0, -1).forEach((x) => (o = o[x])); o[p[p.length - 1]] = v;
    after();
  });
}
const inp = (k, val, u, label, cls = "") => {
  const shown = u === "M" ? +(val / 1e6).toFixed(4) : u === "%" ? +(val * 100).toFixed(3) : val;
  const unit = u === "M" ? " ($M)" : u === "%" ? " (%)" : "";
  return `<label class="f ${cls}">${esc(label)}${unit}<input id="i-${k.replace(/\./g, "-")}" ${u ? 'type="number" step="any" inputmode="decimal"' : 'type="text"'} data-k="${k}" ${u ? `data-u="${u}"` : ""} value="${esc(shown)}"></label>`;
};
const BAD = '<p class="quiet">These numbers don’t make a valid round. Check that each pre-money and raise is above zero.</p>';

/* ---------- Cap table (Carta-style) ---------- */
let ASOF = "Series B";
const CLS = [["Common", "Common"], ["Seed", "Seed Pref."], ["A", "Series A Pref."], ["B", "Series B Pref."]];
function capRows(stage) {
  const s = stage.s, total = SIM.sum(s.holders.map((h) => h.shares)) + s.pool, rows = {}, order = [];
  s.holders.forEach((h) => {
    const key = h.name.replace(/ \(secondary\)$/, "");
    if (!rows[key]) { rows[key] = { name: key, by: {}, inv: 0, founder: ST.founders.some((f) => f.name === key) }; order.push(key); }
    rows[key].by[h.cls] = (rows[key].by[h.cls] || 0) + h.shares;
    rows[key].inv += h.secondary ? 0 : h.invested || 0;
  });
  const list = order.map((k) => rows[k]);
  list.forEach((r) => { r.fd = SIM.sum(Object.values(r.by)); r.pct = r.fd / total; });
  const used = CLS.filter(([c]) => s.holders.some((h) => h.cls === c && h.shares > 0));
  return { list, total, used, pool: s.pool };
}
function captable() {
  setTimeout(drawCarta);
  return `<h1>Tools</h1>${tabs("captable")}
  <p class="sub">Mostly Human AI’s cap table, holder by holder. The rounds come from the <a href="#dilution">Dilution</a> tab: change a number there and this updates.</p>
  <div id="carta"></div>`;
}
function drawCarta() {
  const el = document.getElementById("carta"); if (!el) return;
  let out; try { out = computeCap(ST); } catch (e) { el.innerHTML = BAD; return; }
  const stage = out.stages.find((s) => s.name === ASOF) || out.stages[out.stages.length - 1];
  const { list, total, used, pool } = capRows(stage);
  const latestR = [...out.stages].slice(0, out.stages.indexOf(stage) + 1).reverse().find((s) => s.r);
  const raised = SIM.sum(list.map((r) => r.inv));
  const cell = (v) => (v ? num(v) : "");
  const tot = (c) => SIM.sum(list.map((r) => r.by[c] || 0));
  let h = `<div class="seg" role="group" aria-label="Show the cap table as of">${out.stages.map((s) => `<button type="button" class="${s === stage ? "on" : ""}" data-asof="${esc(s.name)}">${esc(s.name)}</button>`).join("")}</div>
  <div class="kpis"><div><b>${num(total)}</b><span>Fully diluted shares</span></div><div><b>${latestR ? money(latestR.r.price) : "—"}</b><span>${latestR ? esc(latestR.name) + " price per share" : "No priced round yet"}</span></div><div><b>${latestR ? money(latestR.r.post) : "—"}</b><span>Post-money valuation</span></div><div><b>${money(raised + (stage.est ? SIM.sum(stage.safes.map((s) => s.inv)) : 0))}</b><span>Total raised</span></div></div>`;
  h += `<div class="scroll"><table class="carta"><thead><tr><th>Stakeholder</th>${used.map(([, l]) => `<th class="n">${l}</th>`).join("")}<th class="n">Options</th><th class="n">Fully diluted</th><th class="n">FD %</th><th class="n">Invested</th></tr></thead><tbody>`;
  const row = (r) => `<tr><td>${esc(r.name)}${stage.est && !r.founder ? ' <span class="tag">as converted</span>' : ""}</td>${used.map(([c]) => `<td class="n">${cell(r.by[c])}</td>`).join("")}<td class="n"></td><td class="n">${num(r.fd)}</td><td class="n">${pct(r.pct)}</td><td class="n">${r.inv ? money(r.inv) : ""}</td></tr>`;
  const f = list.filter((r) => r.founder), inv = list.filter((r) => !r.founder);
  h += `<tr class="grp"><td colspan="${used.length + 5}">Founders</td></tr>` + f.map(row).join("");
  if (inv.length) h += `<tr class="grp"><td colspan="${used.length + 5}">Investors</td></tr>` + inv.map(row).join("");
  h += `<tr class="grp"><td colspan="${used.length + 5}">Equity plan</td></tr><tr><td>Option pool (granted and available)</td>${used.map(() => `<td class="n"></td>`).join("")}<td class="n">${num(pool)}</td><td class="n">${num(pool)}</td><td class="n">${pct(pool / total)}</td><td class="n"></td></tr>`;
  h += `<tr class="tot"><td>Total</td>${used.map(([c]) => `<td class="n">${num(tot(c))}</td>`).join("")}<td class="n">${num(pool)}</td><td class="n">${num(total)}</td><td class="n">100%</td><td class="n">${money(raised)}</td></tr></tbody></table></div>`;
  if (stage.est && stage.safes.length) {
    h += `<h3>SAFEs outstanding</h3><p class="quiet">SAFEs aren’t shares yet. They convert into Seed Preferred at the Seed round. The table above shows what the capped SAFEs would own if they converted at their caps today.</p>
    <div class="scroll"><table class="carta"><thead><tr><th>Holder</th><th class="n">Amount</th><th class="n">Valuation cap</th><th class="n">Discount</th><th>Type</th></tr></thead><tbody>${stage.safes.map((s) => `<tr><td>${esc(s.name)}</td><td class="n">${money(s.inv)}</td><td class="n">${s.cap ? money(s.cap) : "None"}</td><td class="n">${s.disc ? pct(s.disc, 0) : "None"}</td><td>Post-money SAFE</td></tr>`).join("")}</tbody></table></div>`;
  }
  h += `<p style="margin-top:18px"><button type="button" class="ghost" id="csv">Download as a spreadsheet</button></p>`;
  el.innerHTML = h;
  el.onclick = (e) => {
    const a = e.target.dataset && e.target.dataset.asof; if (a) { ASOF = a; drawCarta(); }
    if (e.target.id === "csv") {
      const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
      const lines = [["Stakeholder", ...used.map(([, l]) => l), "Options and pool", "Fully diluted", "Ownership", "Invested"]]
        .concat(list.map((r) => [r.name, ...used.map(([c]) => Math.round(r.by[c] || 0)), "", Math.round(r.fd), (r.pct * 100).toFixed(2) + "%", Math.round(r.inv)]))
        .concat([["Option pool", ...used.map(() => ""), Math.round(pool), Math.round(pool), (pool / total * 100).toFixed(2) + "%", ""]]);
      const url = URL.createObjectURL(new Blob([lines.map((l) => l.map(q).join(",")).join("\n")], { type: "text/csv" }));
      const link = document.createElement("a"); link.href = url; link.download = `Mostly Human AI cap table - ${stage.name}.csv`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };
}

/* ---------- Dilution ---------- */
let DSTAGE = store.get("vcl-dstage", "Incorporation");
const STAGE_NOTE = {
  "Incorporation": "Three founders split the common stock and set aside an option pool for future hires.",
  "Pre-seed": "Angels invest on post-money SAFEs. They hold no shares yet: the chart shows what they would own if the SAFEs converted at their caps.",
  "Seed": "A lead investor prices the company. The angels’ SAFEs convert into Seed Preferred, and the option pool is topped up before the new money comes in.",
  "Series A": "A new lead buys Series A Preferred. The pool is topped up again, so everyone already on the cap table is diluted.",
  "Series B": "A growth investor buys Series B Preferred, and one founder sells some common stock to that investor in a secondary."
};
function pieSvg(rows, col, label) {
  const tot = SIM.sum(rows.map((r) => r.shares)) || 1; let a = -Math.PI / 2, p = "";
  rows.filter((r) => r.shares > 0).forEach((r) => {
    const f = r.shares / tot, b = a + f * 2 * Math.PI, big = f > 0.5 ? 1 : 0;
    const x1 = 50 + 48 * Math.cos(a), y1 = 50 + 48 * Math.sin(a), x2 = 50 + 48 * Math.cos(b), y2 = 50 + 48 * Math.sin(b);
    p += f > 0.9999 ? `<circle cx="50" cy="50" r="48" fill="${col[r.name]}"><title>${esc(r.name)} ${pct(f)}</title></circle>` : `<path d="M50,50 L${x1.toFixed(3)},${y1.toFixed(3)} A48,48 0 ${big} 1 ${x2.toFixed(3)},${y2.toFixed(3)} Z" fill="${col[r.name]}" stroke="var(--bg)" stroke-width="0.6"><title>${esc(r.name)} ${pct(f)}</title></path>`;
    a = b;
  });
  return `<svg viewBox="0 0 100 100" role="img" aria-label="${esc(label)}">${p}</svg>`;
}
function dilution() {
  setTimeout(() => {
    const c = document.getElementById("dil");
    c.addEventListener("click", (e) => {
      const s = e.target.dataset.stage; if (s) { DSTAGE = s; store.set("vcl-dstage", s); paintDil(); return; }
      const d = e.target.dataset.del;
      if (d !== undefined) { ST.safes.splice(+d, 1); save(); paintDil(); }
      if (e.target.id === "addsafe") { ST.safes.push({ name: "Angel " + (ST.safes.length + 1), inv: 1e5, cap: 10e6, disc: 0 }); save(); paintDil(); }
      if (e.target.id === "reset") { ST = JSON.parse(JSON.stringify(DEFAULT)); SHARED = false; save(); route(); }
    });
    bind(c, ST, () => { save(); drawDil(); });
    c.addEventListener("change", (e) => { if (e.target.tagName === "SELECT") { save(); drawDil(); } });
    paintDil();
  });
  return `<h1>Tools</h1>${tabs("dilution")}
  <p class="sub">Walk Mostly Human AI through each stage, from incorporation to a Series B. Change any number and every later stage updates.</p>
  <div id="dil"></div>
  <details><summary>How the numbers are calculated</summary><p>The pre-seed SAFEs follow the YC post-money form and convert at the Seed round into Seed Preferred. Each SAFE owns its amount divided by its cap, measured against every share, option and converting SAFE, but not the new pool added in the round. A SAFE with a discount converts at the cap price or the discounted Seed price, whichever is lower.</p><p>In each priced round, the new option pool is counted in the pre-money, so it dilutes the existing holders, not the new investor. That is why the effective pre-money is lower than the headline number. The Series B secondary moves existing shares to the buyer and does not change the share count.</p></details>`;
}
function dilInputs(stage) {
  const round = (k) => inp(`${k}.pre`, ST[k].pre, "M", "Pre-money") + inp(`${k}.inv`, ST[k].inv, "M", "Raise") + inp(`${k}.poolPost`, ST[k].poolPost, "%", "Option pool after the round", "w");
  if (stage === "Incorporation") return `<fieldset><legend>Founders</legend>${ST.founders.map((f, i) => inp(`founders.${i}.name`, f.name, "", "Name") + inp(`founders.${i}.shares`, f.shares, "n", "Shares")).join("")}${inp("pool", ST.pool, "n", "Option pool shares", "w")}</fieldset>`;
  if (stage === "Pre-seed") return `<fieldset><legend>Angels on post-money SAFEs</legend>${ST.safes.map((s, i) => `<div class="safe-row">${inp(`safes.${i}.name`, s.name, "", "Angel", "nm")}${inp(`safes.${i}.inv`, s.inv, "M", "Amount")}${inp(`safes.${i}.cap`, s.cap, "M", "Cap")}${inp(`safes.${i}.disc`, s.disc, "%", "Disc.")}<button class="ghost" data-del="${i}" type="button" aria-label="Remove ${esc(s.name)}">×</button></div>`).join("")}<button class="ghost w" id="addsafe" type="button">Add an angel</button></fieldset>`;
  if (stage === "Seed") return `<fieldset><legend>Seed round</legend>${round("Seed")}</fieldset>`;
  if (stage === "Series A") return `<fieldset><legend>Series A</legend>${round("A")}</fieldset>`;
  return `<fieldset><legend>Series B</legend>${round("B")}<label class="f">Founder selling<select id="i-B-seller" data-k="B.seller">${ST.founders.map((f) => `<option ${f.name === ST.B.seller ? "selected" : ""}>${esc(f.name)}</option>`).join("")}</select></label>${inp("B.sec", ST.B.sec, "n", "Shares sold")}</fieldset>`;
}
function paintDil() {
  const el = document.getElementById("dil"); if (!el) return;
  const names = ["Incorporation", "Pre-seed", "Seed", "Series A", "Series B"];
  if (!names.includes(DSTAGE)) DSTAGE = names[0];
  const i = names.indexOf(DSTAGE);
  el.innerHTML = `<div class="seg" role="tablist" aria-label="Stage">${names.map((n) => `<button type="button" role="tab" aria-selected="${n === DSTAGE}" class="${n === DSTAGE ? "on" : ""}" data-stage="${esc(n)}">${esc(n)}</button>`).join("")}</div>
  <div class="tool"><form class="ctl" onsubmit="return false"><p class="quiet" style="margin:0 0 8px">${esc(STAGE_NOTE[DSTAGE])}</p>${dilInputs(DSTAGE)}
    <p style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">${i > 0 ? `<button type="button" class="ghost" data-stage="${esc(names[i - 1])}">Back to ${esc(names[i - 1])}</button>` : ""}${i < names.length - 1 ? `<button type="button" data-stage="${esc(names[i + 1])}">Next: ${esc(names[i + 1])}</button>` : ""}</p>
    <button class="ghost" id="reset" type="button">Start over</button></form>
  <div class="res" id="res"></div></div>
  <h2 style="margin-top:40px">Dilution by round</h2><div id="byround"></div>`;
  drawDil();
}
function drawDil() {
  const res = document.getElementById("res"), br = document.getElementById("byround"); if (!res) return;
  let out; try { out = computeCap(ST); } catch (e) { res.innerHTML = BAD; br.innerHTML = ""; return; }
  const all = [...new Set(out.stages.flatMap((s) => s.s.holders.map((h) => h.name)))].concat("Option pool");
  const col = colorMap(all);
  const isF = (n) => ST.founders.some((f) => f.name === n);
  const fo = (s) => SIM.sum(SIM.ownership(s).rows.filter((r) => isF(r.name)).map((r) => r.pct));
  const k = out.stages.findIndex((s) => s.name === DSTAGE), st = out.stages[k], prev = out.stages[k - 1];
  const rows = SIM.ownership(st.s).rows.filter((r) => r.shares > 0);
  let h = `<p class="quiet" style="margin:0">After ${esc(st.name === "Incorporation" ? "incorporation" : "the " + st.name)}, the founders own</p><div class="big">${pct(fo(st.s))}</div>
  <p class="quiet">${prev ? `down from ${pct(fo(prev.s))} before this stage` : "of the fully diluted company"}</p>
  ${st.r ? `<div class="kpis"><div><b>${money(st.r.price)}</b><span>Price per share</span></div><div><b>${money(st.r.post)}</b><span>Post-money</span></div><div><b>${money(st.r.effectivePre)}</b><span>Effective pre-money</span></div></div>` : ""}
  <div class="piewrap"><div class="pie">${pieSvg(rows, col, "Ownership after " + st.name)}</div>
  <ul class="plegend">${rows.map((r) => `<li><i style="background:${col[r.name]}"></i><span>${esc(r.name)}</span><b>${pct(r.pct)}</b></li>`).join("")}</ul></div>`;
  if (st.name === "Seed") h += `<p class="quiet">SAFE conversion prices: ${out.seed.safePrices.map((p, i) => esc(ST.safes.filter((s) => s.inv > 0)[i].name) + " " + money(p)).join(", ") || "no SAFEs"}.</p>`;
  res.innerHTML = h;
  br.innerHTML = `<div class="pies">${out.stages.map((s) => `<button type="button" class="minipie ${s.name === DSTAGE ? "on" : ""}" data-stage="${esc(s.name)}"><span class="pie">${pieSvg(SIM.ownership(s.s).rows, col, "Ownership after " + s.name)}</span><b>${esc(s.name)}</b><span class="quiet">Founders ${pct(fo(s.s))}</span></button>`).join("")}</div>
  <div class="legend">${all.map((n) => `<span><i style="background:${col[n]}"></i>${esc(n)}</span>`).join("")}</div>
  <div class="scroll"><table><thead><tr><th>Holder</th>${out.stages.map((s) => `<th class="n">${esc(s.name)}</th>`).join("")}</tr></thead><tbody>${all.map((n) => `<tr><td>${esc(n)}</td>${out.stages.map((s) => { const r = SIM.ownership(s.s).rows.find((x) => x.name === n); return `<td class="n">${r && r.shares ? pct(r.pct) : "—"}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>
  <p class="quiet">Pre-seed shows the SAFEs as if converted at their caps. See every holder’s shares on the <a href="#captable">Cap table</a> tab.</p>`;
}

/* ---------- Exit waterfall ---------- */
const MAXEX = 1e9;
const sliderToExit = (v) => Math.round((v / 1000) ** 2 * MAXEX / 1e5) * 1e5;
const exitToSlider = (e) => Math.round(Math.sqrt(Math.min(e, MAXEX) / MAXEX) * 1000);
function waterfallView() {
  const t = ST.terms, cls = ["Seed", "A", "B"];
  const termF = (c) => `<fieldset><legend>${c === "Seed" ? "Seed preferred" : "Series " + c}</legend>${inp(`terms.${c}.mult`, t[c].mult, "n", "Preference ×")}<label class="f">Participates<select id="i-terms-${c}-part" data-k="terms.${c}.part"><option value="">No</option><option value="1" ${t[c].part ? "selected" : ""}>Yes</option></select></label>${inp(`terms.${c}.capMult`, t[c].capMult, "n", "Participation cap × (0 for none)", "w")}</fieldset>`;
  setTimeout(() => {
    const c = document.getElementById("ctl");
    bind(c, ST, () => { save(); drawWF(); });
    c.addEventListener("change", (e) => { if (e.target.tagName === "SELECT") { const k = e.target.dataset.k; if (k && k.endsWith(".part")) ST.terms[k.split(".")[1]].part = !!e.target.value; save(); drawWF(); } });
    const sl = document.getElementById("exs");
    sl.addEventListener("input", () => { ST.wf.exit = sliderToExit(+sl.value); document.getElementById("i-wf-exit").value = +(ST.wf.exit / 1e6).toFixed(1); save(); drawWF(); });
    drawWF();
  });
  const holders = computeCap(ST).last.holders.map((h) => h.name).concat("Employees (granted options)");
  return `<h1>Tools</h1>${tabs("waterfall")}
  <p class="sub">Pick a sale price and see who gets paid. This uses the rounds from the Dilution tab.</p>
  <div class="tool"><form class="ctl" id="ctl" onsubmit="return false">
    <fieldset><legend>The sale</legend><label class="f w">Sale price<input type="range" id="exs" min="0" max="1000" step="1" value="${exitToSlider(ST.wf.exit)}" aria-label="Sale price"></label>${inp("wf.exit", ST.wf.exit, "M", "Sale price")}${inp("wf.debt", ST.wf.debt, "M", "Debt repaid")}${inp("wf.fees", ST.wf.fees, "%", "Deal fees")}${inp("wf.poolGranted", ST.wf.poolGranted, "%", "Options granted")}
    <label class="f w">Whose payout<select id="i-wf-who" data-k="wf.who">${holders.map((n) => `<option ${n === ST.wf.who ? "selected" : ""}>${esc(n)}</option>`).join("")}</select></label>
    <label class="f w">Preferred ranking<select id="i-wf-sen" data-k="wf.seniority"><option value="pari" ${ST.wf.seniority === "pari" ? "selected" : ""}>Equal (pari passu)</option><option value="stacked" ${ST.wf.seniority === "stacked" ? "selected" : ""}>Latest round paid first</option></select></label></fieldset>
    <details><summary>Preferred stock terms</summary><div class="ctl">${cls.map(termF).join("")}</div></details></form>
  <div class="res" id="res"></div></div>
  <p class="quiet">Granted options are treated as exercised, ignoring the strike price. Unallocated options get nothing. Preferred stock converts to common whenever that pays more.</p>`;
}
function wfRun(state, exit) {
  const terms = {}; Object.keys(ST.terms).forEach((k) => (terms[k] = { mult: +ST.terms[k].mult || 0, part: !!ST.terms[k].part, capMult: +ST.terms[k].capMult || 0 }));
  return SIM.waterfall(state, terms, { exit, debt: +ST.wf.debt || 0, fees: +ST.wf.fees || 0, seniority: ST.wf.seniority, order: ["B", "A", "Seed"], poolGranted: +ST.wf.poolGranted });
}
function drawWF() {
  const res = document.getElementById("res"); if (!res) return;
  let cap; try { cap = computeCap(ST); } catch (e) { res.innerHTML = '<p class="quiet">Fix the cap table first.</p>'; return; }
  const state = cap.last, ex = ST.wf.exit, w = wfRun(state, ex);
  const sl = document.getElementById("exs"); if (sl && document.activeElement !== sl) sl.value = exitToSlider(ex);
  const rows = w.byHolder.filter((r) => r.value > 0.5 || state.holders.some((h) => h.name === r.name));
  const col = colorMap(rows.map((r) => r.name)), maxV = Math.max(1, ...rows.map((r) => r.value));
  const me = w.byHolder.find((r) => r.name === ST.wf.who), mine = me ? me.value : 0;
  const own = SIM.ownership(state);
  const myPct = ST.wf.who.startsWith("Employees") ? own.rows.find((r) => r.name === "Option pool").pct * ST.wf.poolGranted : (own.rows.find((r) => r.name === ST.wf.who) || {}).pct || 0;
  const conv = Object.keys(w.conv).filter((k) => w.conv[k]).map((c) => (c === "Seed" ? "Seed" : "Series " + c));
  let h = `<p class="quiet" style="margin:0">${esc(ST.wf.who)} gets</p><div class="big">${money(mine)}</div>
  <p>That is ${pct(ex ? mine / ex : 0)} of a ${money(ex)} sale, for someone who owns ${pct(myPct)} of the company. ${conv.length ? conv.join(" and ") + (conv.length > 1 ? " convert" : " converts") + " to common at this price." : "No preferred stock converts at this price."}</p>`;
  h += rows.map((r) => `<div class="hrow"><span>${esc(r.name)}</span><div class="track"><div style="width:${(r.value / maxV) * 100}%;background:${col[r.name]}"></div></div><span class="v">${money(r.value)}</span></div>`).join("");
  h += `<h3>Each holder’s share as the price rises</h3><div class="fig"><svg id="wsvg" role="img" aria-label="Share of sale proceeds by holder at different sale prices"></svg></div><div class="legend">${rows.map((r) => `<span><i style="background:${col[r.name]}"></i>${esc(r.name)}</span>`).join("")}</div>`;
  res.innerHTML = h;
  const svg = document.getElementById("wsvg");
  const draw = () => {
    const W = svg.clientWidth, H = svg.clientHeight; if (!W) return;
    const m = { l: 44, r: 10, t: 10, b: 28 }, iw = W - m.l - m.r, ih = H - m.t - m.b, N = 80, top = Math.max(ex * 2, cap.last.post || 1e8);
    const xs = Array.from({ length: N }, (_, i) => top * (i + 1) / N);
    const shares = xs.map((x) => { const r = wfRun(state, x); return rows.map((row) => { const f = r.byHolder.find((b) => b.name === row.name); return f ? f.value / x : 0; }); });
    const X = (i) => m.l + (i / (N - 1)) * iw, Y = (v) => m.t + ih * (1 - v);
    let acc = xs.map(() => 0), paths = "";
    rows.forEach((row, j) => {
      const lo = acc.slice(); acc = acc.map((a, i) => a + shares[i][j]);
      const up = acc.map((v, i) => `${X(i)},${Y(Math.min(1, v))}`).join(" "), dn = lo.map((v, i) => `${X(i)},${Y(Math.min(1, v))}`).reverse().join(" ");
      paths += `<polygon points="${up} ${dn}" fill="${col[row.name]}"><title>${esc(row.name)}</title></polygon>`;
    });
    const ticks = [0, 0.5, 1].map((v) => `<text x="${m.l - 6}" y="${Y(v) + 4}" text-anchor="end">${v * 100}%</text>`).join("");
    const xt = [0.25, 0.5, 0.75, 1].filter((v, i) => W > 520 || i % 2).map((v) => `<text x="${m.l + v * iw}" y="${H - 8}" text-anchor="${v === 1 ? "end" : "middle"}">${money(top * v)}</text>`).join("");
    const cx = m.l + Math.min(1, ex / top) * iw;
    svg.innerHTML = paths + ticks + xt + `<line x1="${cx}" x2="${cx}" y1="${m.t}" y2="${m.t + ih}" stroke="var(--ink)" stroke-width="2"/><text x="${Math.min(cx + 6, W - 70)}" y="${m.t + 14}">This sale</text>`;
  };
  if (window._wro) window._wro.disconnect();
  window._wro = new ResizeObserver(draw); window._wro.observe(svg);
}

/* ---------- Term sheets ---------- */
let TSEL = store.get("vcl-tsel", "a");
function termsheets() {
  let seed; try { seed = computeCap(ST).seed; } catch (e) { return `<h1>Tools</h1>${tabs("termsheets")}${BAD}`; }
  const base = { holders: seed.holders, pool: seed.pool };
  const exits = [40e6, 120e6, 400e6];
  const isF = (n) => ST.founders.some((f) => f.name === n);
  const calc = TS.map((t) => {
    const r = SIM.pricedRound(base, [], { pre: t.pre, inv: t.inv, poolPost: t.pool, investor: "Series A lead", cls: "A" });
    const terms = { Seed: { mult: 1, part: false, capMult: 0 }, A: { mult: t.pref, part: t.participating, capMult: t.cap } };
    const fo = SIM.sum(SIM.ownership(r).rows.filter((x) => isF(x.name)).map((x) => x.pct));
    const pays = exits.map((e) => SIM.sum(SIM.waterfall(r, terms, { exit: e, debt: 0, fees: 0, seniority: "pari", order: ["A", "Seed"], poolGranted: 1 }).byHolder.filter((b) => isF(b.name)).map((b) => b.value)));
    return { t, r, fo, pays };
  });
  const k = Math.max(0, TS.findIndex((t) => t.id === TSEL)), c = calc[k];
  const names = [...new Set(calc.flatMap((x) => x.r.holders.map((h) => h.name)))].concat("Option pool");
  const col = colorMap(names);
  const best = (vals, i) => vals[i] === Math.max(...vals);
  const short = (t) => t.name.replace(/:.*$/, "");
  const pref = (t) => t.pref + "×" + (t.participating ? `, participating${t.cap ? ` to ${t.cap}×` : ""}` : ", non-participating");
  const rows = SIM.ownership(c.r).rows.filter((r) => r.shares > 0);
  const terms = [["Pre-money", money(c.t.pre)], ["Raise", money(c.t.inv)], ["Option pool after", pct(c.t.pool, 0)], ["Preference", pref(c.t)], ["Anti-dilution", c.t.antidilution], ["Board", c.t.board], ["Protective provisions", c.t.protective], ["Other", c.t.other]];
  setTimeout(() => {
    document.getElementById("tsw").addEventListener("click", (e) => { const b = e.target.closest("[data-ts]"); if (b) { TSEL = b.dataset.ts; store.set("vcl-tsel", TSEL); route(); } });
  });
  const row = (label, f, vals) => `<tr><th scope="row">${label}</th>${calc.map((x, i) => `<td class="n"${vals && best(vals, i) ? ' style="font-weight:700"' : ""}>${f(x)}</td>`).join("")}</tr>`;
  return `<h1>Tools</h1>${tabs("termsheets")}
  <p class="sub">Three Series A offers for Mostly Human AI. The highest price isn’t always the best deal once you count the option pool and the preference.</p>
  <div id="tsw"><div class="seg" role="tablist" aria-label="Offer">${TS.map((t) => `<button type="button" role="tab" aria-selected="${t === c.t}" class="${t === c.t ? "on" : ""}" data-ts="${esc(t.id)}">${esc(short(t))}</button>`).join("")}</div>
  <div class="tool"><div><h2 style="margin-top:0">${esc(c.t.name.replace(/^[^:]*:\s*/, "").replace(/^./, (m) => m.toUpperCase()))}</h2>
    <table class="ts"><tbody>${terms.map(([l, v]) => `<tr><th scope="row">${esc(l)}</th><td>${esc(v)}</td></tr>`).join("")}</tbody></table>
    <p style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">${k > 0 ? `<button type="button" class="ghost" data-ts="${esc(TS[k - 1].id)}">Back to ${esc(short(TS[k - 1]))}</button>` : ""}${k < TS.length - 1 ? `<button type="button" data-ts="${esc(TS[k + 1].id)}">Next: ${esc(short(TS[k + 1]))}</button>` : ""}</p></div>
  <div class="res"><p class="quiet" style="margin:0">With this offer, the founders own</p><div class="big">${pct(c.fo)}</div>
    <div class="kpis"><div><b>${money(c.r.price)}</b><span>Price per share</span></div><div><b>${money(c.r.effectivePre)}</b><span>Effective pre-money</span></div></div>
    <div class="piewrap"><div class="pie">${pieSvg(rows, col, "Ownership after " + c.t.name)}</div><ul class="plegend">${rows.map((r) => `<li><i style="background:${col[r.name]}"></i><span>${esc(r.name)}</span><b>${pct(r.pct)}</b></li>`).join("")}</ul></div>
    <h3>What the founders get in a sale</h3>${exits.map((e, i) => `<div class="hrow"><span>${money(e)} sale</span><div class="track"><div style="width:${(c.pays[i] / e) * 100}%;background:var(--pine)"></div></div><span class="v">${money(c.pays[i])}</span></div>`).join("")}</div></div>
  <h2 style="margin-top:40px">Side by side</h2>
  <div class="pies" style="grid-template-columns:repeat(3,minmax(0,1fr))">${calc.map((x) => `<button type="button" class="minipie ${x === c ? "on" : ""}" data-ts="${esc(x.t.id)}"><span class="pie">${pieSvg(SIM.ownership(x.r).rows, col, "Ownership after " + x.t.name)}</span><b>${esc(short(x.t))}</b><span class="quiet">Founders ${pct(x.fo)}</span></button>`).join("")}</div>
  <div class="legend">${names.map((n) => `<span><i style="background:${col[n]}"></i>${esc(n)}</span>`).join("")}</div>
  <div class="scroll"><table><thead><tr><th></th>${calc.map((x) => `<th class="n">${esc(short(x.t))}</th>`).join("")}</tr></thead><tbody>
  ${row("Pre-money", (x) => money(x.t.pre))}
  ${row("Effective pre-money", (x) => money(x.r.effectivePre), calc.map((x) => x.r.effectivePre))}
  ${row("Founders own after", (x) => pct(x.fo), calc.map((x) => x.fo))}
  ${exits.map((e, i) => row(`Founders get in a ${money(e)} sale`, (x) => money(x.pays[i]), calc.map((x) => x.pays[i]))).join("")}
  </tbody></table></div>
  <p class="quiet">Bold marks the best number for the founders. Each offer starts from the cap table after the Seed round on the Dilution tab. Compare with the <a href="https://nvca.org/model-legal-documents/" target="_blank" rel="noopener">NVCA model term sheet</a>.</p></div>`;
}

/* ---------- Tax ---------- */
const TX_DEFAULT = { issuedAfterJuly2025: true, years: 5, gain: 25e6, basis: 0.1e6, ltcg: 0.2, niit: 0.038, shares: 1e6, paid: 0.0001, fmvGrant: 0.0001, fmvVest: 2, vy: 4, exitPrice: 10, ordRate: 0.37, capRate: 0.238,
  oN: 50000, oFmvGrant: 1, oStrike: 1, oFmvEx: 5, oSale: 20, oHeld: true, oOrd: 0.37, oCap: 0.238, oAmt: 0.28, oVest: 4, xIso: true };
let TX = Object.assign({}, TX_DEFAULT, store.get("vcl-tax-v1", {}));
let TXTAB = store.get("vcl-txtab", "qsbs");
const TXTABS = [["qsbs", "QSBS"], ["83b", "83(b) election"], ["options", "Stock options and 409A"], ["exercise", "Exercise cost and tax"]];
const AMT_HELP = `<details class="amt"><summary>What is the AMT?</summary>
  <p>The alternative minimum tax is a second way of computing federal income tax. You work out your tax the regular way, then again under the AMT rules, which add back some breaks and tax the result at 26% or 28% above an exemption. You pay whichever is higher.</p>
  <p>For startup employees the break that matters is the ISO. When you exercise an ISO and keep the shares past December 31, the spread (the value at exercise minus the strike price) is not income for regular tax, but it is income for the AMT. A large exercise can produce a real tax bill on a gain that exists only on paper, with no shares sold to pay it. NSOs never trigger the AMT, because their spread is already taxed as ordinary income at exercise.</p>
  <p>Three things soften it. The exemption (about $90,000 for a single filer and $140,000 for a married couple in 2026, phased out at higher incomes) shelters smaller exercises. AMT paid because of ISOs becomes a credit against regular tax in later years. And selling the shares in the same calendar year as the exercise removes the AMT adjustment, though the sale is then disqualifying and the spread is taxed as ordinary income.</p>
  <p>The usual planning: exercise early, when the spread is small; exercise in slices each year to stay under the AMT line; or exercise in January, to have the most time to see where the stock goes before the tax is due. The tool above treats the AMT as a flat rate on the whole spread, so it overstates the bill for small exercises.</p></details>`;
function tax() {
  if (!TXTABS.some(([k]) => k === TXTAB)) TXTAB = "qsbs";
  setTimeout(() => {
    const c = document.getElementById("txc");
    bind(c, TX, () => { store.set("vcl-tax-v1", TX); drawTax(); });
    c.addEventListener("change", (e) => {
      if (e.target.id === "i-qsbs-date") TX.issuedAfterJuly2025 = e.target.value === "1";
      if (e.target.id === "i-oHeld") TX.oHeld = e.target.value === "1";
      if (e.target.id === "i-xIso") TX.xIso = e.target.value === "1";
      store.set("vcl-tax-v1", TX); drawTax();
    });
    document.getElementById("txw").addEventListener("click", (e) => { const b = e.target.closest("[data-tx]"); if (b) { TXTAB = b.dataset.tx; store.set("vcl-txtab", TXTAB); route(); } });
    drawTax();
  });
  const i = TXTABS.findIndex(([k]) => k === TXTAB);
  const nav = `<p style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">${i > 0 ? `<button type="button" class="ghost" data-tx="${TXTABS[i - 1][0]}">Back to ${TXTABS[i - 1][1]}</button>` : ""}${i < TXTABS.length - 1 ? `<button type="button" data-tx="${TXTABS[i + 1][0]}">Next: ${TXTABS[i + 1][1]}</button>` : ""}</p>`;
  let body = "";
  if (TXTAB === "qsbs") body = `<div class="tool"><div class="ctl"><p class="quiet" style="margin:0 0 8px">Section 1202 lets a holder of qualified small business stock exclude some or all of the gain on a sale.</p><fieldset><legend>The stock</legend>
    <label class="f w">Issued<select id="i-qsbs-date"><option value="1" ${TX.issuedAfterJuly2025 ? "selected" : ""}>After July 4, 2025</option><option value="0" ${TX.issuedAfterJuly2025 ? "" : "selected"}>On or before July 4, 2025</option></select></label>
    ${inp("years", TX.years, "n", "Years held")}${inp("basis", TX.basis, "M", "Basis")}${inp("gain", TX.gain, "M", "Gain on sale", "w")}${inp("ltcg", TX.ltcg, "%", "Capital gains rate")}${inp("niit", TX.niit, "%", "NIIT")}</fieldset>${nav}</div><div class="res" id="qres"></div></div>`;
  if (TXTAB === "83b") body = `<div class="tool"><div class="ctl"><p class="quiet" style="margin:0 0 8px">Founder stock that vests over time is taxed as it vests, unless the founder files an 83(b) election within 30 days of the grant.</p><fieldset><legend>Founder stock</legend>
    ${inp("shares", TX.shares, "n", "Shares")}${inp("vy", TX.vy, "n", "Years to vest")}${inp("paid", TX.paid, "n", "Paid per share ($)")}${inp("fmvGrant", TX.fmvGrant, "n", "Worth at grant ($)")}${inp("fmvVest", TX.fmvVest, "n", "Worth when fully vested ($)")}${inp("exitPrice", TX.exitPrice, "n", "Sale price ($)")}${inp("ordRate", TX.ordRate, "%", "Income tax rate")}${inp("capRate", TX.capRate, "%", "Capital gains rate")}</fieldset>${nav}</div><div class="res" id="bres"></div></div>`;
  if (TXTAB === "options") body = `<div class="tool"><div class="ctl"><p class="quiet" style="margin:0 0 8px">An employee’s options can be incentive stock options (ISOs, the “qualified” kind) or non-qualified options (NSOs). The strike price must be at least the stock’s 409A value on the grant date.</p>
    <fieldset><legend>The grant</legend>${inp("oN", TX.oN, "n", "Options")}${inp("oVest", TX.oVest, "n", "Years to vest")}${inp("oFmvGrant", TX.oFmvGrant, "n", "409A value at grant ($)")}${inp("oStrike", TX.oStrike, "n", "Strike price ($)")}</fieldset>
    <fieldset><legend>Exercise and sale</legend>${inp("oFmvEx", TX.oFmvEx, "n", "Value at exercise ($)")}${inp("oSale", TX.oSale, "n", "Sale price ($)")}
    <label class="f w">Sold more than a year after exercise and two years after grant?<select id="i-oHeld"><option value="1" ${TX.oHeld ? "selected" : ""}>Yes</option><option value="0" ${TX.oHeld ? "" : "selected"}>No, sold sooner</option></select></label></fieldset>
    <fieldset><legend>Rates</legend>${inp("oOrd", TX.oOrd, "%", "Income tax rate")}${inp("oCap", TX.oCap, "%", "Capital gains rate")}${inp("oAmt", TX.oAmt, "%", "AMT rate", "w")}</fieldset>${nav}</div><div class="res" id="ores"></div></div>`;
  if (TXTAB === "exercise") body = `<div class="tool"><div class="ctl"><p class="quiet" style="margin:0 0 8px">Exercising takes cash twice: the strike price, and any tax due when you exercise. When you exercise changes both, and the tax on the sale.</p>
    <fieldset><legend>The options</legend><label class="f w">Type<select id="i-xIso"><option value="1" ${TX.xIso ? "selected" : ""}>ISO</option><option value="0" ${TX.xIso ? "" : "selected"}>NSO</option></select></label>${inp("oN", TX.oN, "n", "Options")}${inp("oStrike", TX.oStrike, "n", "Strike price ($)")}${inp("oFmvGrant", TX.oFmvGrant, "n", "409A value at grant ($)")}${inp("oFmvEx", TX.oFmvEx, "n", "409A value today ($)")}${inp("oSale", TX.oSale, "n", "Price in a sale ($)", "w")}</fieldset>
    <fieldset><legend>Rates</legend>${inp("oOrd", TX.oOrd, "%", "Income tax rate")}${inp("oCap", TX.oCap, "%", "Capital gains rate")}${inp("oAmt", TX.oAmt, "%", "AMT rate", "w")}</fieldset>${nav}</div><div class="res" id="xres"></div></div>`;
  return `<h1>Tools</h1>${tabs("tax")}
  <p class="sub">The federal tax questions founders and employees ask most: QSBS on a sale, the 83(b) election, and how stock options are taxed.</p>
  <div id="txw"><div class="seg" role="tablist" aria-label="Tax topic">${TXTABS.map(([k, l]) => `<button type="button" role="tab" aria-selected="${k === TXTAB}" class="${k === TXTAB ? "on" : ""}" data-tx="${k}">${l}</button>`).join("")}</div>
  <form id="txc" onsubmit="return false">${body}</form>${TXTAB === "options" || TXTAB === "exercise" ? AMT_HELP : ""}</div>
  <details><summary>What these leave out</summary><p>Federal tax only, and simplified. QSBS follows the 2025 amendments to § 1202: for stock issued after July 4, 2025, 50%, 75% or 100% of the gain is excluded after three, four or five years, up to the greater of $15 million (indexed after 2026) or ten times basis, and the company’s gross assets can be up to $75 million. Older stock keeps the five-year, $10 million rule. Gain that qualifies but isn’t excluded is taxed at up to 28%.</p><p>The 83(b) model assumes equal yearly vesting and a value that rises evenly to the fully vested figure. It ignores AMT and state tax.</p><p>The options model treats the AMT as a flat rate on the ISO spread, with no exemption and no later credit, and ignores payroll taxes on NSO income. A disqualifying ISO sale is taxed at the income rate. The 409A figure shows only the extra 20% tax on a discounted option’s spread, before interest and before the earlier timing of the income. Check the Code and regulations before relying on any of this.</p></details>`;
}
function drawTax() {
  const qr = document.getElementById("qres");
  if (qr) { const q = SIM.qsbs({ issuedAfterJuly2025: TX.issuedAfterJuly2025, years: +TX.years, gain: +TX.gain, basis: +TX.basis, ltcg: +TX.ltcg, niit: +TX.niit });
    qr.innerHTML = `<p class="quiet" style="margin:0">QSBS saves</p><div class="big">${money(q.saved)}</div><div class="kpis"><div><b>${pct(q.pct, 0)}</b><span>of the gain excluded</span></div><div><b>${money(q.excluded)}</b><span>tax-free gain</span></div><div><b>${money(q.limit)}</b><span>cap for this holder</span></div><div><b>${money(q.tax)}</b><span>tax owed, instead of ${money(q.noQsbsTax)}</span></div></div>`; }
  const br = document.getElementById("bres");
  if (br) { const b = SIM.eightyThreeB({ shares: +TX.shares, paid: +TX.paid, fmvGrant: +TX.fmvGrant, fmvVest: +TX.fmvVest, years: Math.max(1, +TX.vy), exitPrice: +TX.exitPrice, ordRate: +TX.ordRate, capRate: +TX.capRate });
    const t = (o) => `<td class="n">${money(o.ordinary)}</td><td class="n">${money(o.ordTax + o.capTax)}</td>`;
    br.innerHTML = `<p class="quiet" style="margin:0">Filing the 83(b) saves</p><div class="big">${money(b.noB.total - b.withB.total)}</div><div class="scroll"><table><thead><tr><th></th><th class="n">Taxed as income</th><th class="n">Total tax</th></tr></thead><tbody><tr><th scope="row">With 83(b)</th>${t(b.withB)}</tr><tr><th scope="row">Without</th>${t(b.noB)}</tr></tbody></table></div><p class="quiet">Without the election, each slice of stock is taxed as income when it vests, usually before there is any cash to pay the bill.</p>`; }
  const xr = document.getElementById("xres");
  if (xr) {
    const x = SIM.exercise({ n: +TX.oN, strike: +TX.oStrike, fmvGrant: +TX.oFmvGrant, fmvNow: +TX.oFmvEx, sale: +TX.oSale, iso: !!TX.xIso, ord: +TX.oOrd, cap: +TX.oCap, amt: +TX.oAmt });
    const rs = [x.early, x.now, x.atSale], z = (v) => (v ? money(v) : "$0");
    xr.innerHTML = `<p class="quiet" style="margin:0">To exercise today you need</p><div class="big">${money(x.now.outOfPocket)}</div>
    <p class="quiet">${money(x.now.cost)} to pay the strike price, plus ${z(x.now.taxNow)} ${TX.xIso ? "in possible AMT" : "in income tax"} on the ${money(Math.max(0, +TX.oFmvEx - +TX.oStrike) * +TX.oN)} spread.</p>
    <div class="scroll"><table><thead><tr><th>When you exercise</th><th class="n">Cash now</th><th class="n">Tax now</th><th class="n">Total tax by the sale</th><th class="n">Kept after tax</th></tr></thead><tbody>
    ${rs.map((r) => `<tr><th scope="row">${esc(r.label)}</th><td class="n">${z(r.outOfPocket)}</td><td class="n">${z(r.taxNow)}${r.amtOnly ? '<br><span class="quiet">AMT</span>' : ""}</td><td class="n">${money(r.totalTax)}</td><td class="n">${money(r.kept)}</td></tr>`).join("")}</tbody></table></div>
    <p class="quiet">Exercising early costs the least in tax but puts cash at risk if the company fails. Waiting for a sale costs nothing up front, but the whole gain is taxed as income. Exercising also starts the clock for long-term capital gains and QSBS.${TX.xIso ? " AMT is counted here as a cost, though much of it can come back later as a credit." : ""}</p>`;
  }
  const or = document.getElementById("ores");
  if (or) {
    const o = SIM.options({ n: +TX.oN, strike: +TX.oStrike, fmvGrant: +TX.oFmvGrant, fmvEx: +TX.oFmvEx, sale: +TX.oSale, held: !!TX.oHeld, ord: +TX.oOrd, cap: +TX.oCap, amt: +TX.oAmt, vestYears: +TX.oVest });
    const diff = o.nso.total - o.iso.total;
    const row = (l, a, b) => `<tr><th scope="row">${l}</th><td class="n">${a}</td><td class="n">${b}</td></tr>`;
    const z = (v) => (v ? money(v) : "$0");
    let h = `<p class="quiet" style="margin:0">${diff >= 0 ? "An ISO saves" : "An NSO saves"}</p><div class="big">${money(Math.abs(diff))}</div>
    <p class="quiet">${TX.oHeld ? "Held long enough, all of the ISO’s gain is capital gain." : "Selling within a year is a disqualifying disposition: the ISO is taxed much like an NSO."}</p>
    <div class="scroll"><table><thead><tr><th></th><th class="n">NSO</th><th class="n">ISO</th></tr></thead><tbody>
    ${row("Cash to exercise", money(o.cashToExercise), money(o.cashToExercise))}
    ${row("Taxed as income", z(o.nso.ordinary), z(o.iso.ordinary))}
    ${row("Tax when exercised", z(o.nso.exTax), z(o.iso.exTax))}
    ${row("Tax when sold", money(o.nso.saleTax), money(o.iso.saleTax))}
    ${row("<b>Total tax</b>", `<b>${money(o.nso.total)}</b>`, `<b>${money(o.iso.total)}</b>`)}
    ${row("Kept after tax", money(o.net.nso), money(o.net.iso))}</tbody></table></div>`;
    if (o.iso.amt > 0) h += `<div class="ask"><p><b>AMT risk on the ISO: about ${money(o.iso.amt)}</b> in the year of exercise. The ${money(o.iso.amtPref)} spread counts for the alternative minimum tax even though nothing was sold. Much of it can come back later as a credit.</p></div>`;
    if (o.discount > 0) h += `<div class="ask" style="border-left-color:var(--rock)"><p><b>Strike below the 409A value.</b> This option is discounted by ${money(o.discount)} a share, so it can’t be an ISO and fails § 409A: the spread is taxed as it vests, plus an extra 20% tax (about ${money(o.penalty)} here) and interest. This is why companies get a 409A valuation before granting options.</p></div>`;
    if (o.isoCapShares > 0) h += `<div class="ask"><p><b>The $100,000 ISO limit.</b> Only $100,000 of grant-date value can first become exercisable in any year. About ${num(o.isoCapShares)} of these options would be treated as NSOs.</p></div>`;
    or.innerHTML = h;
  }
}

/* ---------- Fund economics ---------- */
const FD_DEFAULT = { size: 100e6, feeRate: 0.02, feeYears: 10, carry: 0.2, grossMoic: 3 };
let FD = store.get("vcl-fund-v1", Object.assign({}, FD_DEFAULT));
function fundView() {
  setTimeout(() => { const c = document.getElementById("ctl"); bind(c, FD, () => { store.set("vcl-fund-v1", FD); drawFund(); }); drawFund(); });
  return `<h1>Tools</h1>${tabs("fund")}
  <p class="sub">How fees and carry turn a fund’s gross returns into what its investors actually get back.</p>
  <div class="tool"><form class="ctl" id="ctl" onsubmit="return false"><fieldset><legend>The fund</legend>${inp("size", FD.size, "M", "Fund size", "w")}${inp("feeRate", FD.feeRate, "%", "Yearly fee")}${inp("feeYears", FD.feeYears, "n", "Years of fees")}${inp("carry", FD.carry, "%", "Carry")}${inp("grossMoic", FD.grossMoic, "n", "Gross multiple")}</fieldset></form><div class="res" id="res"></div></div>
  <p class="quiet">Kept simple: flat fees on commitments, no recycling, no hurdle, and carry only after investors get all their money back.</p>`;
}
function drawFund() {
  const f = SIM.fund({ size: +FD.size, feeRate: +FD.feeRate, feeYears: +FD.feeYears, carry: +FD.carry, grossMoic: +FD.grossMoic });
  const mx = Math.max(f.gross, +FD.size);
  const bar = (l, v, c) => `<div class="hrow"><span>${l}</span><div class="track"><div style="width:${(v / mx) * 100}%;background:${c}"></div></div><span class="v">${money(v)}</span></div>`;
  document.getElementById("res").innerHTML = `<p class="quiet" style="margin:0">Investors get back</p><div class="big">${f.tvpi.toFixed(2)}×</div><p class="quiet">their money, after fees and carry</p>
  <div style="margin:18px 0">${bar("Committed", +FD.size, "#cfb87c")}${bar("Paid in fees", f.fees, "#8a96a1")}${bar("Returned to investors", f.net, "#3f6e8c")}${bar("Carry to the GP", f.carry, "#a6432b")}</div>
  <p>Only ${money(f.investable)} of the ${money(+FD.size)} goes into companies. To give investors their money back, those companies have to return ${(FD.size / f.investable).toFixed(2)}× what was put in.</p>`;
}


/* ---------- Guests ---------- */
function guestsView() {
  return `<div class="narrow"><h1>Guests</h1>
  <p class="sub">The people joining us for The Lived Experience of Venture Capital.</p>
  <p class="quiet">Nobody is confirmed yet. Dates will be posted once they are.</p>
  <ul class="list guests">${window.GUESTS.map((g, gi) => `<li><div class="gname">${ed("G." + gi + ".name", g.name)}${g.maybe ? ` <span class="sugg">maybe</span>` : ""}${g.org ? `<span class="gorg">${ed("G." + gi + ".org", g.org)}</span>` : ""}</div>
    <p>${ed("G." + gi + ".bio", g.bio)}</p>${g.with ? `<p class="quiet">Same session as ${esc(g.with)}.</p>` : ""}${g.li ? `<a class="li" href="${esc(g.li)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}</li>`).join("")}</ul></div>`;
}

/* ---------- Dinners ----------
   Sign-ups come from a Google Form. Its answers live in the "VC Law Dinners"
   Google Sheet, which the owner's view reads through the Google Drive
   connector. Everyone else sees the dinners, the form link and, once posted,
   the schedule, all from the shared store. */
const SHEET_ID = window.COURSE.dinnerSheetId;
const SHEET_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/edit";
const DN = { db: null, owner: false, dinners: [], form: null, assign: null, subs: [], signups: [], bad: [], result: null, sync: "idle", syncMsg: "", syncedAt: 0, msg: "", loading: true };
function stopDinners() { DN.subs.forEach((u) => u()); DN.subs = []; }
function dinnersView() {
  setTimeout(startDinners);
  return `<div class="narrow"><h1>Dinners</h1>
  <p class="sub">Small dinners of about six students, each with one of our guests, at ${esc(C.dinnerTime)} after class. Put in your name, rank your top five, and seats are assigned so that as many people as possible get one of their top choices.</p>
  <div id="dn"><p class="quiet">Loading…</p></div></div>`;
}
async function startDinners() {
  stopDinners();
  DN.loading = true;
  const timer = setTimeout(() => { if (DN.loading) { DN.loading = false; DN.msg = "The dinner list can’t be reached right now. Try again in a little while."; drawDn(); } }, 10000);
  DN.db = (await window.claude?.use?.("db")) || null;
  const user = (await window.claude?.use?.("user")) || null;
  if (!DN.db) { clearTimeout(timer); DN.loading = false; DN.msg = ""; drawDn(); return; }
  DN.owner = (await user?.isOwner?.()) ?? false;
  const done = () => { if (DN.loading) { DN.loading = false; clearTimeout(timer); } drawDn(); };
  const err = () => { DN.loading = false; clearTimeout(timer); drawDn(); };
  DN.subs.push(DN.db.collection("dinners").onSnapshot((q) => { DN.dinners = q.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || String(a.title).localeCompare(String(b.title))); done(); }, err));
  DN.subs.push(DN.db.doc("assign/current").onSnapshot((d) => { DN.assign = d.exists ? d.data() : null; done(); }, err));
  DN.subs.push(DN.db.doc("assign/form").onSnapshot((d) => { DN.form = d.exists ? d.data() : null; done(); }, err));
  if (DN.owner && DN.sync === "idle") syncSheet();
}

/* Read the sheet's text (markdown tables, one per tab) into rows. */
function parseSheetText(text) {
  const tabs = []; let cur = null;
  String(text || "").split("\n").forEach((line) => {
    const m = /^### Sheet Name:\s*(.*)$/.exec(line);
    if (m) { cur = { name: m[1].trim(), rows: [] }; tabs.push(cur); return; }
    if (/^### /.test(line) && !/^### Table (Range|Sample Data)/.test(line)) { cur = null; return; }
    if (!cur || !/^\s*\|/.test(line)) return;
    const cells = line.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\(.)/g, "$1"));
    if (cells.every((c) => /^:?-*:?$/.test(c))) return;
    cur.rows.push(cells);
  });
  tabs.forEach((t) => { t.rows = t.rows.filter((r) => r.some((c) => c)); t.head = (t.rows.shift() || []).map((h) => h.toLowerCase()); });
  return tabs;
}
const slug = (s) => String(s).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "dinner";
function readSheet(text) {
  const tabs = parseSheetText(text);
  const dt = tabs.find((t) => t.head.includes("guest")) || tabs[0];
  if (!dt) throw new Error("no_tabs");
  const gi = dt.head.indexOf("guest"), si = dt.head.indexOf("seats"), fi = dt.head.indexOf("form link");
  const dinners = [], seen = {};
  dt.rows.forEach((r) => {
    const name = (r[gi < 0 ? 0 : gi] || "").trim(); if (!name || seen[name.toLowerCase()]) return; seen[name.toLowerCase()] = 1;
    dinners.push({ id: slug(name), host: name, title: "Dinner with " + name, cap: Math.max(1, parseInt(r[si], 10) || 6), order: dinners.length });
  });
  const formUrl = fi < 0 ? "" : (dt.rows.map((r) => r[fi] || "").find((v) => /^https:\/\//.test(v)) || "");
  const rt = tabs.find((t) => t.head.includes("your name"));
  const latest = {}, bad = [];
  if (rt) {
    const ni = rt.head.indexOf("your name"), ci = rt.head.map((h, i) => (/choice/.test(h) ? i : -1)).filter((i) => i >= 0);
    const byName = (v) => { const q = v.trim().toLowerCase(); return q ? (dinners.find((d) => d.host.toLowerCase() === q) || {}).id || null : null; };
    rt.rows.forEach((r) => {
      const name = (r[ni] || "").trim().slice(0, 80); if (!name) return;
      const picks = ci.map((i) => r[i] || "").filter((v) => v.trim());
      const ranks = [...new Set(picks.map(byName).filter(Boolean))];
      picks.filter((v) => !byName(v)).forEach((v) => bad.push(`${name}: ${v}`));
      latest[name.toLowerCase()] = { id: "s-" + slug(name) + "-" + Object.keys(latest).length, name, ranks };
    });
  }
  return { dinners, formUrl, signups: Object.values(latest), bad, hasResponses: !!rt };
}
async function syncSheet() {
  DN.sync = "busy"; DN.syncMsg = ""; drawDn();
  const mcp = await window.claude?.use?.("mcp");
  if (!mcp) { DN.sync = "off"; DN.syncMsg = "This view can’t reach your Google Drive. Open the site on claude.ai while signed in."; drawDn(); return; }
  try {
    const res = await mcp.callTool("Google Drive", "read_file_content", { fileId: SHEET_ID });
    const p = res && res.payload;
    const text = typeof p === "string" ? p : (p && (p.fileContent || p.content)) || (res.content || []).map((c) => c.text || "").join("\n");
    const s = readSheet(text);
    DN.signups = s.signups; DN.bad = s.bad; DN.hasResponses = s.hasResponses; DN.result = null;
    // Publish the dinners and the form link for everyone.
    const keep = new Set(s.dinners.map((d) => d.id));
    for (const d of s.dinners) {
      const old = DN.dinners.find((x) => x.id === d.id);
      if (!old || old.title !== d.title || +old.cap !== d.cap || old.order !== d.order) await DN.db.doc("dinners/" + d.id).set(d);
    }
    for (const d of DN.dinners) if (!keep.has(d.id)) await DN.db.doc("dinners/" + d.id).delete();
    if (s.formUrl && (!DN.form || DN.form.url !== s.formUrl)) await DN.db.doc("assign/form").set({ url: s.formUrl });
    DN.sync = "ok"; DN.syncedAt = Date.now();
  } catch (e) {
    DN.sync = "err";
    const c = e && e.code;
    DN.syncMsg = c === "server_not_connected" ? "Add Google Drive in claude.ai Settings, Connectors, then refresh."
      : c === "needs_reauth" ? "Reconnect Google Drive in claude.ai Settings, Connectors, then refresh."
      : c === "not_in_manifest" || c === "approval_required" || c === "consent_required" ? "The site needs your OK to read the sign-up sheet. Press Refresh and allow Google Drive."
      : c === "tool_error" ? "Google Drive couldn’t open the sign-up sheet. Check that it still exists."
      : "Couldn’t reach Google Drive just now. Press Refresh to try again.";
  }
  drawDn();
}
const dName = (id) => { const d = DN.dinners.find((x) => x.id === id); return d ? d.title : "A dinner that was removed"; };
const formLink = () => { const u = (DN.form && DN.form.url) || window.COURSE.dinnerForm || ""; return /^https:\/\//.test(u) ? u : ""; };
function drawDn() {
  const el = document.getElementById("dn"); if (!el) return;
  if (DN.loading) return;
  const link = formLink(), closed = DN.assign && DN.assign.closed, posted = DN.assign && Array.isArray(DN.assign.schedule);
  let h = DN.msg ? `<p class="quiet">${esc(DN.msg)}</p>` : "";
  const signBtn = link ? `<a class="btn" href="${esc(link)}" target="_blank" rel="noopener">Sign up for a dinner</a>` : "";
  if (!DN.db) { el.innerHTML = h + (signBtn ? `<p>${signBtn}</p>` : `<p class="quiet">Sign-ups open soon.</p>`); return; }
  const ds = DN.dinners;
  // Students
  if (posted) {
    h += `<h2>The dinner schedule</h2>${DN.assign.schedule.map((d) => `<h3>${esc(d.title)}</h3><p>${(d.names || []).map(esc).join(", ") || '<span class="quiet">Nobody yet</span>'}</p>`).join("")}`;
  } else if (!closed) {
    h += `<ol class="steps"><li>Click <b>Sign up for a dinner</b>.</li><li>Type your name and rank your top five dinners.</li><li>Come back here to see which dinner you got.</li></ol>
    <p>${signBtn || '<span class="quiet">Sign-ups open soon.</span>'}</p>`;
    h += ds.length ? `<h2>The dinners</h2><ul class="list">${ds.map((d) => `<li><b>${esc(d.title)}</b><span class="meta">${esc((d.cap || 6) + " seats")}</span></li>`).join("")}</ul>` : "";
  } else if (!DN.owner) h += `<p class="quiet">Sign-ups are closed. The schedule will be posted here soon.</p>`;

  // Instructor
  if (DN.owner) {
    h += `<div class="inst"><h2>Instructor</h2><p class="quiet">Only you see this.</p>`;
    if (DN.sync === "busy" && !DN.syncedAt) h += `<p class="quiet">Checking your sign-up sheet…</p>`;
    else if (DN.sync === "err" || DN.sync === "off") h += `<p>${esc(DN.syncMsg)}</p><p><button type="button" id="dn-sync">Try again</button></p>`;
    else if (!link) {
      h += `<h3>Turn on sign-ups (once, about two minutes)</h3><ol class="steps">
      <li><a class="btn" href="${SHEET_URL}" target="_blank" rel="noopener">Open the sign-up sheet</a></li>
      <li>In the sheet, open <b>Extensions</b>, then <b>Apps Script</b>.</li>
      <li>Delete what’s there, then paste the script: <button type="button" class="ghost" id="dn-copy">Copy the script</button></li>
      <li>Press <b>Run</b> and allow access when Google asks.</li>
      <li>Come back here and press <button type="button" class="ghost" id="dn-sync">I’ve done it</button></li></ol>
      <p class="quiet" id="dn-copied"></p>`;
    } else {
      h += `<p><b>${DN.signups.length}</b> ${DN.signups.length === 1 ? "student has" : "students have"} signed up. <button type="button" class="ghost" id="dn-sync" ${DN.sync === "busy" ? "disabled" : ""}>${DN.sync === "busy" ? "Checking…" : "Check again"}</button></p>
      ${DN.bad.length ? `<p class="quiet">Some choices don’t match a dinner in the sheet: ${DN.bad.map(esc).join("; ")}.</p>` : ""}
      <p><button type="button" id="dn-run" ${DN.signups.length && ds.length ? "" : "disabled"}>Make the schedule</button></p>
      <div id="dn-res"></div>
      ${DN.signups.length ? `<details><summary>See everyone’s choices</summary><ul class="list">${DN.signups.map((p) => `<li>${esc(p.name)}<span class="meta">${p.ranks.map((r, i) => i + 1 + ". " + esc(dName(r).replace(/^Dinner with /, ""))).join(" · ") || "No valid choices"}</span></li>`).join("")}</ul></details>` : ""}
      <p class="quiet">To add, remove or change a dinner, edit the <a href="${SHEET_URL}" target="_blank" rel="noopener">sign-up sheet</a>. The form updates by itself.${posted ? ` <button type="button" class="ghost" id="dn-reopen">${closed ? "Reopen sign-ups" : "Close sign-ups"}</button>` : ""}</p>`;
    }
    h += `</div>`;
  }
  el.innerHTML = h;
  drawResult();
}
function drawResult() {
  const el = document.getElementById("dn-res"); if (!el || !DN.result) return;
  const r = DN.result, nm = (id) => (DN.signups.find((p) => p.id === id) || {}).name || "No name given";
  el.innerHTML = `<p>${r.stats.first} got their first choice, ${r.stats.second} their second, ${r.stats.third} their third${r.stats.lower ? `, ${r.stats.lower} their fourth or fifth` : ""}${r.stats.other ? `, ${r.stats.other} a dinner they didn’t rank` : ""}.${r.waitlist.length ? ` ${r.waitlist.length} could not be seated: add a dinner or seats in the sheet and run it again.` : ""}</p>
  ${DN.dinners.map((d) => `<h3>${esc(d.title)} <span class="quiet">(${(r.byDinner[d.id] || []).length})</span></h3><p>${(r.byDinner[d.id] || []).map((id) => esc(nm(id))).join(", ") || '<span class="quiet">Nobody</span>'}</p>`).join("")}
  ${r.waitlist.length ? `<h3>Not seated</h3><p>${r.waitlist.map((id) => esc(nm(id))).join(", ")}</p>` : ""}
  <p style="display:flex;gap:10px;flex-wrap:wrap"><button type="button" id="dn-pub">Post it for everyone</button><button type="button" class="ghost" id="dn-rerun">Try another arrangement</button></p>`;
}
document.addEventListener("click", async (e) => {
  const t = e.target; if (!DN.db || !t.closest || !t.closest("#dn") || !DN.owner) return;
  try {
    if (t.id === "dn-sync") await syncSheet();
    if (t.id === "dn-copy") { try { await navigator.clipboard.writeText(window.DINNER_SCRIPT); document.getElementById("dn-copied").textContent = "Copied. Paste it into Apps Script."; } catch (err) { document.getElementById("dn-copied").textContent = "Your browser blocked copying. The script is also in the thread as setup-form.gs."; } }
    if (t.id === "dn-run" || t.id === "dn-rerun") {
      DN.seed = t.id === "dn-rerun" ? (DN.seed || 7) + 1 : DN.seed || 7;
      DN.result = window.ASSIGN.assignDinners(DN.signups.map((p) => ({ id: p.id, ranks: p.ranks })), DN.dinners.map((d) => ({ id: d.id, cap: +d.cap || 6 })), DN.seed);
      drawResult();
    }
    if (t.id === "dn-pub" && DN.result) {
      t.disabled = true;
      const nm = (id) => (DN.signups.find((p) => p.id === id) || {}).name || "No name given";
      const schedule = DN.dinners.map((d) => ({ title: d.title, names: (DN.result.byDinner[d.id] || []).map(nm) }));
      await DN.db.doc("assign/current").set({ schedule, closed: true, at: new Date().toISOString() });
      t.textContent = "Posted. Everyone can see the schedule now.";
    }
    if (t.id === "dn-reopen" && DN.assign) { t.disabled = true; await DN.db.doc("assign/current").set({ ...DN.assign, closed: !DN.assign.closed }); }
  } catch (err) {
    t.disabled = false; DN.msg = "That didn’t save. Try again."; drawDn();
  }
});



/* ---------- Share these numbers ---------- */
function shareUrl() {
  const o = { c: ST, t: TX, f: FD, d: DSTAGE, x: TXTAB, s: TSEL };
  const base = (C.publicUrl || (location.origin + location.pathname)).replace(/[?#].*$/, "");
  const h = (location.hash || "#captable").slice(1);
  return base + "?s=" + b64e(o) + "#" + (/^[a-z-]+$/.test(h) ? h : "captable");
}
document.addEventListener("click", async (e) => {
  if (!e.target || e.target.id !== "share") return;
  const url = shareUrl(), msg = document.getElementById("sharemsg"), box = document.getElementById("sharebox");
  box.hidden = false; box.textContent = url; msg.textContent = "Anyone who opens this link sees these numbers.";
  try { await Promise.race([navigator.clipboard.writeText(url), new Promise((_, no) => setTimeout(no, 1500))]); msg.textContent = "Copied. Anyone who opens this link sees these numbers."; } catch (err) {}
});

/* ---------- Owner edit mode ---------- */
const encKey = (k) => k.replace(/\./g, "~"), decKey = (k) => k.replace(/~/g, ".");
function applyEditMode() {
  document.querySelectorAll("[data-ed]").forEach((el) => { if (EDIT.on) { el.setAttribute("contenteditable", "true"); el.setAttribute("spellcheck", "true"); } else el.removeAttribute("contenteditable"); });
  document.body.classList.toggle("editing", EDIT.on);
  const b = document.getElementById("edbtn"); if (b) b.textContent = EDIT.on ? "Done editing" : "Edit the site";
  const bar = document.getElementById("edbar"); if (bar) bar.hidden = !EDIT.on;
}
function edToast(t) { const el = document.getElementById("edmsg"); if (el) el.textContent = t; }
(async () => {
  const db = (await window.claude?.use?.("db")) || null; if (!db) return;
  EDIT.db = db;
  db.doc("site/edits").onSnapshot((d) => {
    const v = (d.exists && d.data().v) || {};
    EDIT.data = {}; Object.keys(v).forEach((k) => { EDIT.data[decKey(k)] = String(v[k]); setPath(decKey(k), String(v[k])); });
    if (!document.activeElement || !document.activeElement.closest || !document.activeElement.closest("[data-ed]")) { const y = window.scrollY; route(); window.scrollTo(0, y); }
  }, () => {});
  const user = (await window.claude?.use?.("user")) || null;
  EDIT.owner = (await user?.isOwner?.()) ?? false;
  if (!EDIT.owner) return;
  const wrap = document.createElement("div"); wrap.className = "edwrap";
  wrap.innerHTML = `<div id="edbar" hidden><b>Editing.</b> Click any outlined text and type. It saves when you click away, and everyone sees it. <span id="edmsg" aria-live="polite"></span></div><button type="button" id="edbtn">Edit the site</button>`;
  document.body.appendChild(wrap);
  document.getElementById("edbtn").addEventListener("click", () => { EDIT.on = !EDIT.on; applyEditMode(); });
})();
document.addEventListener("click", (e) => { if (EDIT.on && e.target.closest && e.target.closest("[data-ed]") && e.target.closest("a")) e.preventDefault(); }, true);
document.addEventListener("keydown", (e) => { const el = e.target.closest && e.target.closest("[data-ed]"); if (EDIT.on && el && e.key === "Enter") { e.preventDefault(); el.blur(); } if (EDIT.on && el && e.key === "Escape") { el.textContent = getPath(el.dataset.ed) ?? ""; el.blur(); } });
document.addEventListener("focusout", async (e) => {
  const el = e.target.closest && e.target.closest("[data-ed]"); if (!EDIT.on || !el || !EDIT.db) return;
  const p = el.dataset.ed, v = el.innerText.replace(/\s+/g, " ").trim();
  if (!v) { el.textContent = getPath(p) ?? ""; edToast("Text can’t be empty, so it was put back."); return; }
  if (v === getPath(p)) return;
  setPath(p, v); EDIT.data[p] = v;
  const out = {}; Object.keys(EDIT.data).forEach((k) => (out[encKey(k)] = EDIT.data[k]));
  edToast("Saving…");
  try { await EDIT.db.doc("site/edits").set({ v: out, at: new Date().toISOString() }); edToast("Saved."); }
  catch (err) { edToast("That didn’t save. Try again."); }
});

/* ---------- Class scenarios: one click sets up a tool for that class ---------- */
function runScenario(sc) {
  const d = JSON.parse(JSON.stringify(DEFAULT));
  if (sc.c) Object.keys(sc.c).forEach((k) => { d[k] = (d[k] && typeof d[k] === "object" && !Array.isArray(d[k])) ? Object.assign(d[k], sc.c[k]) : sc.c[k]; });
  ST = d; save();
  if (sc.tool === "fund") { FD = Object.assign({}, FD_DEFAULT, sc.f || {}); store.set("vcl-fund-v1", FD); }
  if (sc.tool === "tax") { TX = Object.assign({}, TX_DEFAULT, sc.t || {}); store.set("vcl-tax-v1", TX); }
  if (sc.d) { DSTAGE = sc.d; store.set("vcl-dstage", sc.d); }
  if (sc.x) { TXTAB = sc.x; store.set("vcl-txtab", sc.x); }
  if (sc.s) { TSEL = sc.s; store.set("vcl-tsel", sc.s); }
  if (sc.asof) ASOF = sc.asof;
  SHARED = false;
  if (location.hash === "#" + sc.tool) route(); else location.hash = sc.tool;
  window.scrollTo(0, 0);
}
main.addEventListener("click", (e) => {
  const b = e.target.closest && e.target.closest("[data-sc]"); if (!b || EDIT.on) return;
  const [n, i] = b.dataset.sc.split(":").map(Number), w = WEEKS.find((x) => x.n === n);
  if (w && w.scenarios && w.scenarios[i]) runScenario(w.scenarios[i]);
});

/* ---------- Router ---------- */
const VIEWS = { home, schedule, syllabus: syllabusView, guests: guestsView, dinners: dinnersView, library, case: caseView, captable, dilution, waterfall: waterfallView, termsheets, tax, fund: fundView };
const ALIAS = { readings: "library", documents: "library", exercises: "case" };
const SECTION = { syllabus: "home", captable: "tools", dilution: "tools", waterfall: "tools", termsheets: "tools", tax: "tools", fund: "tools" };
function route() {
  let h = (location.hash || "#home").slice(1); h = ALIAS[h] || h;
  const wk = /^week-(\d+)$/.exec(h);
  const key = wk ? "schedule" : VIEWS[h] ? h : "home";
  if (key !== "dinners") stopDinners();
  main.innerHTML = wk ? weekView(+wk[1]) : VIEWS[key]();
  const sec = SECTION[key] || key;
  document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("on", a.dataset.s === sec));
  if (EDIT.on) applyEditMode();
}
window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });
route();
}
