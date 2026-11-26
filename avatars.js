/* Drawn avatars for the people in the case. Each is a small SVG built from a few traits. */
(function () {
  const A = {
    "Diane Okafor":   { bg: "#dfe8f1", skin: "#8d5524", hair: "#2b2b2b", style: "short", shirt: "#23395d", glasses: true, earrings: "#cfb87c", gray: true },
    "Priya Raman":    { bg: "#e5f1ec", skin: "#b9784a", hair: "#1e1a17", style: "long", shirt: "#2f7f78", smile: 2 },
    "You":            { bg: "#efe7d2", silhouette: true },
    "Luis Ortega":    { bg: "#e8eef6", skin: "#c48a5c", hair: "#1c1c1c", style: "short", shirt: "#7aa6c9", beard: "#1c1c1c" },
    "Bernard Walsh":  { bg: "#fbe8d6", skin: "#f1c9a0", hair: "#7a4a24", style: "messy", shirt: "#e07a2f", smile: 3 },
    "Abigail Reyes":  { bg: "#e6efe3", skin: "#d6a06f", hair: "#3b2416", style: "bun", shirt: "#3f6b4a", glasses: true },
    "Charlie Osei":   { bg: "#ecebe6", skin: "#5c3a21", hair: "#141414", style: "buzz", shirt: "#8a96a1" },
    "Dana Park":      { bg: "#efe6f3", skin: "#f0cfae", hair: "#161616", style: "bob", shirt: "#7b5aa6", smile: 2 },
    "Eli Brooks":     { bg: "#fbf2d2", skin: "#f6d2b5", hair: "#b5532a", style: "curly", shirt: "#e2b63c", smile: 3 },
    "Farah Gomez":    { bg: "#f7e2df", skin: "#c88a5a", hair: "#3a2316", style: "wavy", shirt: "#b23a3a" },
    "Hana Kim":       { bg: "#e7ebef", skin: "#f1d1b0", hair: "#111111", style: "side", shirt: "#4c5d6e", earrings: "#d9d9d9" },
    "Ruth Feldman":   { bg: "#efeaf6", skin: "#f3d6bf", hair: "#d9d6d0", style: "short", shirt: "#9d8ac2", glasses: true, smile: 2 },
    "Marcus Lee":     { bg: "#e9e9e9", skin: "#ebc49a", hair: "#121212", style: "slick", shirt: "#222222", smile: 3 },
    "Tom Brandt":     { bg: "#e4eef5", skin: "#f3d1b4", hair: "#c9a25a", style: "short", shirt: "#5b8bb0", beard: "#b48c4c" },
    "Lena Ortiz":     { bg: "#f3e3e7", skin: "#d39b74", hair: "#1d1410", style: "long", shirt: "#7c2c43" },
    "Graham Pierce": { bg: "#e6e6e6", skin: "#e3b48b", hair: "#8c8c8c", style: "receding", shirt: "#3a3f47", tie: "#8a2f2f" }
  };
  function hair(c, st, back) {
    const h = c.hair;
    const S = {
      short: back ? "" : `<path d="M30 46 Q30 22 50 21 Q70 22 70 46 Q66 32 50 31 Q34 32 30 46Z" fill="${h}"/>`,
      buzz: back ? "" : `<path d="M32 42 Q33 25 50 24 Q67 25 68 42 Q64 32 50 31 Q36 32 32 42Z" fill="${h}"/>`,
      messy: back ? "" : `<path d="M29 46 Q27 20 50 19 Q73 20 71 46 Q68 30 60 30 L58 25 L54 30 L48 24 L45 30 L38 26 L36 33 Q31 36 29 46Z" fill="${h}"/>`,
      slick: back ? "" : `<path d="M30 44 Q29 21 52 21 Q71 23 70 42 Q66 30 56 29 Q44 28 30 44Z" fill="${h}"/>`,
      receding: back ? "" : `<path d="M30 46 Q30 34 34 30 Q36 40 34 48Z M70 46 Q70 34 66 30 Q64 40 66 48Z" fill="${h}"/>`,
      curly: back ? `<circle cx="32" cy="40" r="9" fill="${h}"/><circle cx="68" cy="40" r="9" fill="${h}"/>` : `<g fill="${h}"><circle cx="36" cy="30" r="8"/><circle cx="46" cy="25" r="8"/><circle cx="56" cy="25" r="8"/><circle cx="65" cy="31" r="8"/><circle cx="31" cy="39" r="6"/><circle cx="69" cy="39" r="6"/></g>`,
      long: back ? `<path d="M28 44 Q26 20 50 19 Q74 20 72 44 L74 78 L26 78Z" fill="${h}"/>` : `<path d="M30 48 Q30 22 50 21 Q70 22 70 48 Q66 30 50 30 Q38 31 30 48Z" fill="${h}"/>`,
      wavy: back ? `<path d="M27 44 Q25 20 50 19 Q75 20 73 44 Q77 56 72 64 Q76 72 70 78 L30 78 Q24 72 28 64 Q23 56 27 44Z" fill="${h}"/>` : `<path d="M30 48 Q29 22 50 21 Q71 22 70 48 Q67 31 52 30 Q37 30 30 48Z" fill="${h}"/>`,
      bob: back ? `<path d="M28 44 Q26 20 50 19 Q74 20 72 44 L72 60 L28 60Z" fill="${h}"/>` : `<path d="M30 46 Q30 22 50 21 Q70 22 70 46 L70 36 Q60 32 50 33 Q38 32 30 40Z" fill="${h}"/>`,
      bun: back ? `<circle cx="50" cy="16" r="9" fill="${h}"/>` : `<path d="M31 44 Q31 22 50 22 Q69 22 69 44 Q66 30 50 30 Q34 30 31 44Z" fill="${h}"/>`,
      side: back ? `<path d="M28 44 Q26 20 50 19 Q74 20 72 44 L73 74 L27 74Z" fill="${h}"/>` : `<path d="M30 50 Q29 22 50 21 Q71 22 70 44 Q60 28 42 34 Q34 38 30 50Z" fill="${h}"/>`
    };
    return S[st] || "";
  }
  let N = 0;
  window.avatarSvg = function (name, size) {
    const id = "avc" + (++N);
    const c = A[name] || { bg: "#eee", silhouette: true };
    const sz = size || 48;
    if (c.silhouette) return `<svg class="av" width="${sz}" height="${sz}" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="50" fill="${c.bg}"/><circle cx="50" cy="42" r="16" fill="#8f8473"/><path d="M20 96 Q22 66 50 64 Q78 66 80 96Z" fill="#8f8473"/></svg>`;
    const smile = c.smile === 3 ? `<path d="M42 56 Q50 64 58 56" stroke="#5a2e1a" stroke-width="2.4" fill="#fff" stroke-linecap="round"/>` : c.smile === 2 ? `<path d="M43 57 Q50 62 57 57" stroke="#5a2e1a" stroke-width="2.4" fill="none" stroke-linecap="round"/>` : `<path d="M44 58 Q50 60 56 58" stroke="#5a2e1a" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    const glasses = c.glasses ? `<g fill="none" stroke="#2a2a2a" stroke-width="1.8"><circle cx="42" cy="46" r="6"/><circle cx="58" cy="46" r="6"/><path d="M48 46 H52"/></g>` : "";
    const beard = c.beard ? `<path d="M34 50 Q35 70 50 72 Q65 70 66 50 Q62 62 50 62 Q38 62 34 50Z" fill="${c.beard}"/>` : "";
    const ear = c.earrings ? `<circle cx="31.5" cy="55" r="1.8" fill="${c.earrings}"/><circle cx="68.5" cy="55" r="1.8" fill="${c.earrings}"/>` : "";
    const tie = c.tie ? `<path d="M50 78 L46 84 L50 98 L54 84Z" fill="${c.tie}"/><path d="M42 76 L50 84 L58 76" fill="#f4f4f4"/>` : "";
    const grayStreak = c.gray ? `<path d="M40 25 Q46 23 50 23" stroke="#bdbdbd" stroke-width="2" fill="none"/>` : "";
    return `<svg class="av" width="${sz}" height="${sz}" viewBox="0 0 100 100" aria-hidden="true"><defs><clipPath id="${id}"><circle cx="50" cy="50" r="50"/></clipPath></defs><g clip-path="url(#${id})">
      <rect width="100" height="100" fill="${c.bg}"/>${hair(c, c.style, true)}
      <path d="M16 104 Q18 76 50 74 Q82 76 84 104Z" fill="${c.shirt}"/>${tie}
      <rect x="44" y="62" width="12" height="14" rx="5" fill="${c.skin}"/>
      <ellipse cx="31" cy="48" rx="3.5" ry="5" fill="${c.skin}"/><ellipse cx="69" cy="48" rx="3.5" ry="5" fill="${c.skin}"/>
      <ellipse cx="50" cy="46" rx="19" ry="22" fill="${c.skin}"/>${beard}${ear}
      ${hair(c, c.style, false)}${grayStreak}
      <circle cx="42" cy="46" r="2.2" fill="#2a1a12"/><circle cx="58" cy="46" r="2.2" fill="#2a1a12"/>
      <path d="M38 40 Q42 38 46 40 M54 40 Q58 38 62 40" stroke="${c.style === "receding" || c.hair === "#d9d6d0" ? "#777" : c.hair}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      ${smile}${glasses}</g></svg>`;
  };
})();
