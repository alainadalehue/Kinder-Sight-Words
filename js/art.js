/*
 * Felt-appliqué style illustrations, inspired by an embroidered kids' sweater:
 * flat shapes, dashed "stitch" edges, French-knot dots, sleepy smiling faces.
 * Every picture is a 100×100 SVG so it scales crisply on any screen.
 */
(function () {
  const INK = "#3a2350";
  const stitch = (c, w = 1.8) =>
    `fill="none" stroke="${c}" stroke-width="${w}" stroke-dasharray="3.2 2.6" stroke-linecap="round"`;
  const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${INK}"/><circle cx="${x + 0.9}" cy="${y - 0.9}" r="0.8" fill="#fff"/>`;
  const sleepy = (x, y) => `<path d="M${x - 3.5} ${y} q3.5 3 7 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`;
  const cheek = (x, y) => `<circle cx="${x}" cy="${y}" r="3" fill="#ff8fb3" opacity=".75"/>`;
  const smile = (x, y, w = 5) => `<path d="M${x - w} ${y} q${w} ${w * 0.9} ${w * 2} 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`;
  const knot = (x, y, c, r = 2.6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x - 0.7}" cy="${y - 0.7}" r="${r * 0.35}" fill="#fff" opacity=".35"/>`;

  const ART = {
    sun: `
      <g stroke="#f7a21b" stroke-width="3.4" stroke-linecap="round" fill="none">
        ${[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
          const r = (a * Math.PI) / 180;
          const x1 = 50 + Math.cos(r) * 31, y1 = 50 + Math.sin(r) * 31;
          const x2 = 50 + Math.cos(r) * 45, y2 = 50 + Math.sin(r) * 45;
          return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
        }).join("")}
      </g>
      <circle cx="50" cy="50" r="25" fill="#ffcc2f"/>
      <circle cx="50" cy="50" r="21.5" ${stitch("#e89a10")}/>
      ${sleepy(42, 47)}${sleepy(58, 47)}${cheek(38, 56)}${cheek(62, 56)}${smile(50, 57, 5)}`,

    cloud: `
      <path d="M24 60c-9 0-14-7-12-14 2-6 8-9 14-7 1-10 10-16 20-13 5-7 17-8 23 0 9-2 17 5 16 14 7 1 10 7 9 12-1 5-6 8-11 8z" fill="#fff"/>
      <path d="M24 56c-6 0-10-5-8-10 2-4 6-6 11-4 1-8 8-12 16-10 4-6 14-6 18 0 8-2 14 4 13 11 5 1 8 5 7 9-1 3-4 5-8 5z" ${stitch("#b9c3e6")}/>
      ${[[30, 72], [46, 80], [62, 72], [76, 82], [38, 90]].map(([x, y]) =>
        `<path d="M${x} ${y - 6} q4 6 0 8 q-4 -2 0 -8z" fill="#5ec8ec"/>`).join("")}`,

    flower: `
      <path d="M52 62 q-2 18 -6 30" fill="none" stroke="#3f8f3a" stroke-width="3" stroke-linecap="round"/>
      <path d="M50 82 q-14 -4 -16 -14 q12 0 16 14z" fill="#6fb53a"/>
      ${[0, 72, 144, 216, 288].map(a => `
        <g transform="rotate(${a} 50 42)">
          <ellipse cx="50" cy="22" rx="12" ry="15" fill="#5aaeea"/>
          <ellipse cx="50" cy="23" rx="9" ry="12" ${stitch("#2a5e9c", 1.5)}/>
          <path d="M50 16v8" stroke="#2a5e9c" stroke-width="1.6" stroke-linecap="round"/>
        </g>`).join("")}
      <circle cx="50" cy="42" r="11" fill="#ffc72c"/>
      ${knot(46, 39, "#8a3b1e", 1.6)}${knot(53, 38, "#8a3b1e", 1.6)}${knot(50, 44, "#8a3b1e", 1.6)}${knot(55, 45, "#8a3b1e", 1.6)}${knot(45, 46, "#8a3b1e", 1.6)}`,

    tree: `
      <path d="M44 92 L46 60 L40 50 L47 54 L50 44 L53 54 L60 50 L54 60 L56 92z" fill="#f6d98a"/>
      <path d="M46.5 89 L48 61 M53.5 89 L52 61" ${stitch("#c9a24e", 1.4)}/>
      <path d="M50 8c10 0 16 6 17 12 9 0 15 8 13 16 6 4 6 14-1 18-2 8-11 11-18 8-4 5-17 5-22 0-8 3-16-1-18-8-7-4-7-14-1-18-2-8 4-16 13-16 1-6 7-12 17-12z" fill="#69c23d"/>
      <path d="M50 13c8 0 12 5 13 10 8 0 12 6 11 12 5 3 5 10-1 13-2 6-8 8-14 6-4 4-13 4-17 0-6 2-12-1-14-6-5-3-5-10 0-13-1-6 3-12 11-12 1-5 5-10 11-10z" ${stitch("#2f7a2a")}/>
      ${[[38, 26], [56, 22], [66, 38], [30, 42], [48, 40], [60, 54], [40, 56], [72, 50]].map(([x, y]) => knot(x, y, "#a3262a", 3)).join("")}`,

    cat: `
      <path d="M24 42 L28 14 L44 30z M76 42 L72 14 L56 30z" fill="#ff9f2e"/>
      <path d="M30 33 L31 22 L38 30z M70 33 L69 22 L62 30z" fill="#ffb7cf"/>
      <ellipse cx="50" cy="56" rx="32" ry="28" fill="#ff9f2e"/>
      <ellipse cx="50" cy="56" rx="28" ry="24" ${stitch("#c96a0f")}/>
      <path d="M38 40 q2 5 0 9 M50 36 v8 M62 40 q-2 5 0 9" stroke="#e07d12" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      ${eye(39, 56)}${eye(61, 56)}${cheek(32, 66)}${cheek(68, 66)}
      <path d="M47 63 h6 l-3 3z" fill="#ff6b9a"/>
      <path d="M50 66 q-3 4 -7 3 M50 66 q3 4 7 3" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M22 62 h-12 M22 67 l-11 3 M78 62 h12 M78 67 l11 3" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>`,

    dog: `
      <path d="M22 30 q-12 4 -12 26 q0 12 8 12 q8 0 10 -14z M78 30 q12 4 12 26 q0 12 -8 12 q-8 0 -10 -14z" fill="#8b5a3c"/>
      <ellipse cx="50" cy="52" rx="29" ry="30" fill="#f2d3a2"/>
      <ellipse cx="50" cy="52" rx="25" ry="26" ${stitch("#b98a55")}/>
      <ellipse cx="62" cy="44" rx="9" ry="8" fill="#8b5a3c" opacity=".9"/>
      ${eye(40, 48)}${eye(60, 46)}${cheek(33, 62)}${cheek(67, 62)}
      <ellipse cx="50" cy="61" rx="6" ry="4.5" fill="${INK}"/>
      <path d="M50 65 v4 M50 69 q-5 4 -9 1 M50 69 q5 4 9 1" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M50 72 q0 9 5 9 q5 0 4 -9z" fill="#ff7aa2"/>`,

    pig: `
      <path d="M24 36 L22 16 L40 26z M76 36 L78 16 L60 26z" fill="#f77fae"/>
      <circle cx="50" cy="54" r="31" fill="#ffa8c8"/>
      <circle cx="50" cy="54" r="27" ${stitch("#e5608f")}/>
      ${sleepy(38, 46)}${sleepy(62, 46)}
      <ellipse cx="50" cy="62" rx="12" ry="9" fill="#f77fae"/>
      <ellipse cx="45.5" cy="62" rx="2.4" ry="3.2" fill="#b33a6b"/><ellipse cx="54.5" cy="62" rx="2.4" ry="3.2" fill="#b33a6b"/>
      ${cheek(30, 60)}${cheek(70, 60)}${smile(50, 74, 4)}`,

    hen: `
      <path d="M40 18 q2 -10 8 -4 q4 -8 8 0 q6 -4 5 6z" fill="#e5394b"/>
      <path d="M26 58 q-4 -26 16 -36 q20 -6 26 14 q4 14 -2 22 q22 -10 26 -26 q8 22 -6 40 q-14 18 -38 14 q-22 -4 -22 -28z" fill="#fff8ec"/>
      <path d="M30 58 q-3 -22 13 -31 q17 -5 22 12 q3 12 -2 20 M70 62 q14 -6 19 -16 q4 16 -7 30 q-12 14 -32 11 q-18 -3 -18 -24" ${stitch("#d6c3a2")}/>
      <path d="M20 40 l-12 4 l12 5z" fill="#ffb22e"/>
      ${eye(32, 38)}${cheek(36, 46)}
      <path d="M22 48 q0 10 6 8 q2 -6 -6 -8z" fill="#e5394b"/>
      <path d="M50 66 q12 -10 24 -2" fill="none" stroke="#d6c3a2" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M44 84 v10 M56 84 v10 M40 94 h8 M52 94 h8" stroke="#f29a1a" stroke-width="2.6" stroke-linecap="round"/>`,

    duck: `
      <path d="M22 62 q0 -12 14 -14 h30 q14 0 20 -12 q8 14 2 28 q-6 16 -32 18 q-30 2 -34 -20z" fill="#ffd93b"/>
      <path d="M27 63 q1 -9 11 -10 h28 q12 0 17 -8 q4 9 0 18 q-5 12 -28 14 q-25 2 -28 -14z" ${stitch("#d9a90f")}/>
      <circle cx="32" cy="36" r="17" fill="#ffd93b"/>
      <circle cx="32" cy="36" r="13.5" ${stitch("#d9a90f", 1.5)}/>
      <path d="M48 60 q14 -12 28 -2 q-6 14 -28 2z" fill="#f5bd12"/>
      <path d="M16 38 q-12 -2 -14 4 q6 6 16 2z" fill="#ff8a1f"/>
      ${eye(30, 32)}${cheek(37, 42)}
      <path d="M10 88 q40 -6 80 0" fill="none" stroke="#5ec8ec" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 5"/>`,

    bug: `
      <path d="M34 20 q-6 -12 -14 -12 M66 20 q6 -12 14 -12" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="20" cy="8" r="3.2" fill="${INK}"/><circle cx="80" cy="8" r="3.2" fill="${INK}"/>
      <path d="M20 50 h-10 M22 64 l-10 6 M80 50 h10 M78 64 l10 6 M26 36 l-10 -5 M74 36 l10 -5" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
      <ellipse cx="50" cy="58" rx="30" ry="32" fill="#e5394b"/>
      <ellipse cx="50" cy="58" rx="26" ry="28" ${stitch("#9e1d2c")}/>
      <path d="M50 30 v58" stroke="${INK}" stroke-width="2.4"/>
      ${[[38, 50], [62, 50], [36, 70], [64, 70], [44, 84], [56, 84]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${INK}"/>`).join("")}
      <path d="M30 32 q20 -24 40 0 q-20 8 -40 0z" fill="${INK}"/>
      <circle cx="42" cy="27" r="3" fill="#fff"/><circle cx="58" cy="27" r="3" fill="#fff"/>
      <circle cx="42.6" cy="27.4" r="1.5" fill="${INK}"/><circle cx="58.6" cy="27.4" r="1.5" fill="${INK}"/>`,

    fish: `
      <path d="M70 50 L94 30 Q88 50 94 70z" fill="#ff9f2e"/>
      <path d="M8 50 Q26 18 56 22 Q76 26 76 50 Q76 74 56 78 Q26 82 8 50z" fill="#5ec8ec"/>
      <path d="M14 50 Q30 25 55 27 Q71 30 71 50 Q71 70 55 73 Q30 75 14 50z" ${stitch("#2a7fae")}/>
      <path d="M44 32 q-6 18 0 36 M56 30 q-6 20 0 40" fill="none" stroke="#2a9fd0" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M42 22 q8 -14 22 -6 q-10 2 -14 8z" fill="#ff9f2e"/>
      ${eye(28, 44)}${cheek(30, 56)}${smile(17, 54, 3)}`,

    frog: `
      <circle cx="30" cy="30" r="14" fill="#69c23d"/><circle cx="70" cy="30" r="14" fill="#69c23d"/>
      <circle cx="30" cy="30" r="8" fill="#fff"/><circle cx="70" cy="30" r="8" fill="#fff"/>
      ${eye(31, 31)}${eye(71, 31)}
      <ellipse cx="50" cy="60" rx="40" ry="28" fill="#69c23d"/>
      <ellipse cx="50" cy="60" rx="36" ry="24" ${stitch("#2f7a2a")}/>
      ${cheek(26, 62)}${cheek(74, 62)}
      <path d="M30 62 q20 18 40 0" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
      ${knot(40, 48, "#3f9a2c", 2.2)}${knot(60, 46, "#3f9a2c", 2.2)}${knot(52, 76, "#3f9a2c", 2)}`,

    bird: `
      <path d="M68 50 q20 -12 26 -4 q-6 10 -26 12z" fill="#e0447d"/>
      <path d="M20 46 q0 -26 26 -24 q16 2 18 18 q4 30 -22 36 q-22 4 -22 -30z" fill="#ff6fa7"/>
      <path d="M24 46 q0 -21 22 -20 q13 2 15 15 q3 25 -19 31 q-18 3 -18 -26z" ${stitch("#c02e68")}/>
      <path d="M36 52 q14 -2 26 8 q-8 14 -22 6z" fill="#e0447d"/>
      <path d="M40 58 q8 0 14 6 M42 63 q6 0 10 4" fill="none" stroke="#a5205a" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M20 36 l-12 4 l12 4z" fill="#ffb22e"/>
      ${eye(32, 34)}${cheek(34, 44)}
      <path d="M40 80 v10 M48 80 v10" stroke="#9aa6c8" stroke-width="2.4" stroke-linecap="round"/>`,

    bunny: `
      <path d="M34 42 q-10 -30 0 -38 q10 4 8 38z M66 42 q10 -30 0 -38 q-10 4 -8 38z" fill="#f6dfa4"/>
      <path d="M35 36 q-5 -20 0 -26 q5 4 4 26z M65 36 q5 -20 0 -26 q-5 4 -4 26z" fill="#ffb7cf"/>
      <ellipse cx="50" cy="62" rx="30" ry="27" fill="#f6dfa4"/>
      <ellipse cx="50" cy="62" rx="26" ry="23" ${stitch("#c7a75c")}/>
      ${sleepy(40, 58)}${sleepy(60, 58)}${cheek(33, 68)}${cheek(67, 68)}
      <path d="M47 66 h6 l-3 3z" fill="#ff6b9a"/>${smile(50, 71, 3)}
      <path d="M42 86 q8 -6 16 0 l-8 6z" fill="#e5394b"/>`,

    turtle: `
      <ellipse cx="86" cy="62" rx="12" ry="11" fill="#5ec8ec"/>
      ${eye(88, 59)}${cheek(91, 67)}
      <path d="M80 70 q4 3 8 1" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
      <ellipse cx="24" cy="80" rx="8" ry="6" fill="#5ec8ec"/><ellipse cx="66" cy="80" rx="8" ry="6" fill="#5ec8ec"/>
      <path d="M6 68 l-4 4 l6 1z" fill="#5ec8ec"/>
      <path d="M8 72 Q8 34 44 32 Q78 32 80 72z" fill="#4aa9e0"/>
      <path d="M13 69 Q14 38 44 37 Q74 38 75 69z" ${stitch("#1f5d96")}/>
      <path d="M30 70 L34 50 L54 46 L60 70 M34 50 L22 46 M54 46 L64 40 M44 36 L44 48" fill="none" stroke="#1f5d96" stroke-width="1.8" stroke-linecap="round"/>
      ${knot(26, 58, "#1f5d96", 2.2)}${knot(46, 60, "#1f5d96", 2.2)}${knot(66, 58, "#1f5d96", 2.2)}
      <path d="M52 32 q8 -2 10 6" fill="none" stroke="#a066d8" stroke-width="2.2" stroke-linecap="round"/>`,

    hat: `
      <ellipse cx="50" cy="72" rx="42" ry="12" fill="#a24ad6"/>
      <path d="M24 72 Q24 26 50 26 Q76 26 76 72z" fill="#a24ad6"/>
      <path d="M29 70 Q30 31 50 31 Q70 31 71 70" ${stitch("#5d1f96")}/>
      <path d="M25 60 Q50 68 75 60 L76 68 Q50 76 24 68z" fill="#ff6fa7"/>
      <circle cx="50" cy="22" r="7" fill="#ffd93b"/>
      ${knot(40, 44, "#ffd93b", 2.4)}${knot(58, 40, "#5ec8ec", 2.4)}${knot(50, 52, "#ff9f2e", 2.4)}`,

    bed: `
      <rect x="10" y="30" width="12" height="60" rx="5" fill="#8b5a3c"/>
      <rect x="78" y="48" width="12" height="42" rx="5" fill="#8b5a3c"/>
      <rect x="14" y="56" width="74" height="20" rx="6" fill="#5ec8ec"/>
      <path d="M20 58 Q40 50 86 58 L86 72 L20 72z" fill="#ff8fb8"/>
      <path d="M24 61 Q42 55 82 61" ${stitch("#c02e68")}/>
      <ellipse cx="32" cy="52" rx="12" ry="7" fill="#fff"/>
      ${knot(50, 66, "#ffd93b", 2.4)}${knot(64, 64, "#fff", 2.4)}${knot(76, 66, "#ffd93b", 2.4)}
      <text x="60" y="34" font-family="Fredoka, sans-serif" font-size="14" font-weight="600" fill="#7b4fd0">z</text>
      <text x="70" y="22" font-family="Fredoka, sans-serif" font-size="18" font-weight="600" fill="#7b4fd0">z</text>`,

    cup: `
      <path d="M70 40 q18 0 18 16 q0 16 -18 16" fill="none" stroke="#ff9f2e" stroke-width="7" stroke-linecap="round"/>
      <path d="M18 30 h56 l-6 54 q-1 6 -8 6 h-28 q-7 0 -8 -6z" fill="#ff9f2e"/>
      <path d="M24 35 h44 l-5 46 q-1 4 -5 4 h-24 q-4 0 -5 -4z" ${stitch("#c4650a")}/>
      <ellipse cx="46" cy="30" rx="28" ry="5" fill="#ffd6a3"/>
      ${sleepy(38, 54)}${sleepy(54, 54)}${cheek(34, 62)}${cheek(58, 62)}${smile(46, 64, 4)}
      <path d="M36 20 q-4 -6 0 -12 M48 20 q-4 -6 0 -12" fill="none" stroke="#c8b4ee" stroke-width="2.4" stroke-linecap="round"/>`,

    bus: `
      <rect x="6" y="24" width="88" height="54" rx="10" fill="#ffcc2f"/>
      <rect x="10" y="28" width="80" height="46" rx="8" ${stitch("#d29a0a")}/>
      ${[16, 36, 56].map(x => `<rect x="${x}" y="34" width="15" height="16" rx="3" fill="#bfe9fa"/>`).join("")}
      <rect x="76" y="34" width="12" height="28" rx="3" fill="#bfe9fa"/>
      <rect x="6" y="56" width="70" height="5" fill="#3a2350" opacity=".85"/>
      <circle cx="26" cy="80" r="9" fill="${INK}"/><circle cx="26" cy="80" r="3.5" fill="#c8b4ee"/>
      <circle cx="74" cy="80" r="9" fill="${INK}"/><circle cx="74" cy="80" r="3.5" fill="#c8b4ee"/>
      <circle cx="90" cy="66" r="3" fill="#ff8a1f"/>`,

    box: `
      <rect x="14" y="40" width="72" height="50" rx="5" fill="#a24ad6"/>
      <rect x="19" y="45" width="62" height="40" rx="3" ${stitch("#5d1f96")}/>
      <rect x="10" y="30" width="80" height="16" rx="5" fill="#b866e6"/>
      <rect x="44" y="30" width="12" height="60" fill="#ff6fa7"/>
      <path d="M50 30 q-22 -20 -24 -6 q2 8 24 6z M50 30 q22 -20 24 -6 q-2 8 -24 6z" fill="#ff6fa7"/>
      <circle cx="50" cy="30" r="5" fill="#e0447d"/>
      ${knot(28, 62, "#ffd93b")}${knot(72, 70, "#5ec8ec")}${knot(30, 80, "#ff9f2e")}${knot(70, 54, "#fff")}`,

    book: `
      <path d="M50 26 Q30 14 8 20 V82 Q30 76 50 86z" fill="#5ec8ec"/>
      <path d="M50 26 Q70 14 92 20 V82 Q70 76 50 86z" fill="#ff6fa7"/>
      <path d="M50 30 Q32 20 13 24 V78 Q32 73 50 81 Q68 73 87 78 V24 Q68 20 50 30z" fill="#fffaf0"/>
      <path d="M50 30 V81" stroke="#d6c3a2" stroke-width="2"/>
      <path d="M20 36 h22 M20 46 h18 M20 56 h22 M58 36 h22 M58 46 h16 M58 56 h22" stroke="#a24ad6" stroke-width="3" stroke-linecap="round"/>
      <path d="M13 24 V78 M87 24 V78" ${stitch("#c4a874", 1.4)}/>
      ${knot(66, 68, "#ffd93b", 3.5)}`,

    star: `
      <path d="M50 6 L62 36 L94 38 L69 58 L78 90 L50 72 L22 90 L31 58 L6 38 L38 36z" fill="#ffcc2f" stroke="#f7a21b" stroke-width="3" stroke-linejoin="round"/>
      <path d="M50 18 L59 40 L82 41 L64 55 L71 78 L50 65 L29 78 L36 55 L18 41 L41 40z" ${stitch("#e08b0a", 1.6)}/>`,

    blossom: `
      ${[0, 72, 144, 216, 288].map(a => `<ellipse transform="rotate(${a} 50 50)" cx="50" cy="26" rx="15" ry="20" fill="currentColor"/>`).join("")}
      <circle cx="50" cy="50" r="13" fill="#ffd93b"/>
      <circle cx="50" cy="50" r="9" ${stitch("#e08b0a", 1.5)}/>`
  };

  window.art = function (name, cls = "") {
    const body = ART[name] || ART.star;
    return `<svg class="art ${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${body}</svg>`;
  };
  window.ART_NAMES = Object.keys(ART);
})();
