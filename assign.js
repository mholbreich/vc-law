/* Dinner assignment from ranked choices.
   students: [{id, name, ranks:[dinnerId, ...]}]   (first = top choice)
   dinners:  [{id, cap}]
   Finds the assignment with the lowest total cost, where a 1st choice costs 0,
   2nd costs 1, 3rd costs 4 (rank squared, so the class as a whole avoids anyone
   getting a bad pick), and an unranked dinner costs 100. Ties are broken by a
   seeded shuffle so nobody wins just by submitting first. */
(function (root) {
  function hungarian(cost) { // rows <= cols; returns col index for each row
    const n = cost.length, m = cost[0].length, INF = 1e18;
    const u = new Array(n + 1).fill(0), v = new Array(m + 1).fill(0), p = new Array(m + 1).fill(0), way = new Array(m + 1).fill(0);
    for (let i = 1; i <= n; i++) {
      p[0] = i; let j0 = 0;
      const minv = new Array(m + 1).fill(INF), used = new Array(m + 1).fill(false);
      do {
        used[j0] = true; const i0 = p[j0]; let delta = INF, j1 = 0;
        for (let j = 1; j <= m; j++) if (!used[j]) {
          const cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
          if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
          if (minv[j] < delta) { delta = minv[j]; j1 = j; }
        }
        for (let j = 0; j <= m; j++) { if (used[j]) { u[p[j]] += delta; v[j] -= delta; } else minv[j] -= delta; }
        j0 = j1;
      } while (p[j0] !== 0);
      do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0);
    }
    const res = new Array(n).fill(-1);
    for (let j = 1; j <= m; j++) if (p[j]) res[p[j] - 1] = j - 1;
    return res;
  }
  function rng(seed) { let s = seed % 2147483647 || 1; return () => (s = s * 16807 % 2147483647) / 2147483647; }

  function assignDinners(students, dinners, seed = 7) {
    const r = rng(seed);
    const order = students.map((s, i) => [r(), i]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
    const slots = [];
    dinners.forEach((d) => { for (let k = 0; k < (d.cap || 6); k++) slots.push(d.id); });
    const WAIT = 10000;
    const n = students.length;
    while (slots.length < n) slots.push(null); // waitlist when seats run out
    const cost = order.map((si, idx) => slots.map((dId) => {
      if (dId === null) return WAIT;
      const k = students[si].ranks.indexOf(dId);
      return (k < 0 ? 100 : k * k) + idx * 1e-6; // tiny tie-break from the shuffle
    }));
    if (!n) return { byDinner: {}, byStudent: {}, waitlist: [], stats: {} };
    const pick = hungarian(cost);
    const byDinner = {}, byStudent = {}, waitlist = [], stats = { first: 0, second: 0, third: 0, lower: 0, other: 0 };
    dinners.forEach((d) => (byDinner[d.id] = []));
    order.forEach((si, idx) => {
      const s = students[si], dId = slots[pick[idx]];
      if (dId === null) { waitlist.push(s.id); return; }
      byDinner[dId].push(s.id); byStudent[s.id] = dId;
      const k = s.ranks.indexOf(dId);
      if (k === 0) stats.first++; else if (k === 1) stats.second++; else if (k === 2) stats.third++; else if (k > 2) stats.lower++; else stats.other++;
    });
    return { byDinner, byStudent, waitlist, stats };
  }
  const api = { assignDinners, hungarian };
  if (typeof module !== "undefined") module.exports = api; else root.ASSIGN = api;
})(typeof window !== "undefined" ? window : globalThis);
