/* Word Patch — screens & navigation (hash routes, no build step). */
(function () {
  const SETS = window.SIGHT_WORDS;
  const $app = document.getElementById("app");
  const SET_ART = { 1: "sun", 2: "bird", 3: "bunny", 4: "turtle", 5: "tree", 6: "flower" };
  const LETTER_COLORS = ["#ffd94a", "#ffb3cf", "#7fd6f2", "#ffad4d", "#96cc54", "#d4b6ff"];
  const PRAISE = ["great", "yay"];

  /* ---------- tiny icon set for buttons ---------- */
  const I = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="2.5"/><rect x="13" y="3" width="8" height="8" rx="2.5"/><rect x="3" y="13" width="8" height="8" rx="2.5"/><rect x="13" y="13" width="8" height="8" rx="2.5"/></svg>',
    speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>',
    abc: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="6" width="6" height="12" rx="1.8"/><rect x="9" y="4" width="6" height="12" rx="1.8"/><rect x="16" y="7" width="6" height="12" rx="1.8"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M12 6c-2-1.5-5-2-9-1.5V19c4-.5 7 0 9 1.5 2-1.5 5-2 9-1.5V4.5C17 4 14 4.5 12 6z"/><path d="M12 6v14.5"/></svg>',
    mouth: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 10c3 0 5-2 9-2s6 2 9 2c-1 5-5 8-9 8s-8-3-9-8z"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="6" y="3" width="14" height="17" rx="3" transform="rotate(8 13 11)"/><rect x="3" y="4" width="14" height="17" rx="3" fill="currentColor" fill-opacity=".25"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h4l10 12h4M3 18h4l3-3.6M14 9.6L17 6h4M18 3l3 3-3 3M18 15l3 3-3 3"/></svg>'
  };

  /* ---------- storage ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("wp." + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("wp." + k, JSON.stringify(v)); } catch {} }
  };
  let learned = store.get("learned", {});
  const settings = Object.assign({ autoplay: true }, store.get("settings", {}));
  const isLearned = w => !!learned[w];
  const markLearned = w => { learned[w] = true; store.set("learned", learned); };
  const setProgress = s => s.words.filter(w => isLearned(w.word)).length;

  /* ---------- helpers ---------- */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const go = h => { location.hash = h; };
  const getSet = id => SETS.find(s => s.id === +id);
  const nextUpSet = () => SETS.find(s => setProgress(s) < s.words.length) || null;

  function bar({ left = "", title = "", sub = "", right = "" }) {
    return `<header class="bar">${left || '<span class="spacer"></span>'}
      <div class="bar-title">${title}${sub ? `<p>${sub}</p>` : ""}</div>
      ${right || '<span class="spacer"></span>'}</header>`;
  }
  const btnRound = (id, icon, label, cls = "") => `<button class="round ${cls}" id="${id}" aria-label="${label}">${I[icon]}</button>`;

  function onSwipe(el, left, right) {
    let x0 = null, y0 = null;
    el.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener("touchend", e => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? left : right)();
    });
  }

  function talking(btn, promise) {
    btn && btn.classList.add("talking");
    Promise.resolve(promise).finally(() => btn && btn.classList.remove("talking"));
  }

  /* ---------- Home ---------- */
  function home() {
    const next = nextUpSet();
    $app.innerHTML = `<section class="screen">
      ${bar({ title: "<h1>Word Patch</h1>", sub: "My sight words", right: btnRound("gear", "gear", "Grown-up settings", "quiet") })}
      <div class="hello">
        <button class="mascot" id="mascot" aria-label="Hear hello">${art("turtle")}</button>
        <div class="bubble">Tap a patch to start!</div>
      </div>
      <ol class="path">
        ${SETS.map(s => {
          const done = setProgress(s), total = s.words.length;
          return `<li><button class="patch c-${s.color}" data-set="${s.id}">
            <span class="num">${s.id}</span>
            ${next && next.id === s.id ? `<span class="ribbon">${done ? "Keep going!" : "Up next!"}</span>` : ""}
            ${art(SET_ART[s.id])}
            <span>
              <h3>${esc(s.name)}</h3>
              <div class="peek">${s.words.slice(0, 3).map(w => esc(w.word)).join(" · ")}…</div>
              <div class="meter">${art("star")}<span class="track"><span class="fill" style="width:${(done / total) * 100}%"></span></span><span>${done}/${total}</span></div>
            </span>
          </button></li>`;
        }).join("")}
      </ol>
    </section>`;
    $app.querySelectorAll(".patch").forEach(b => b.onclick = () => go(`#/set/${b.dataset.set}`));
    $app.querySelector("#mascot").onclick = () => Voice.phrase("hello");
    $app.querySelector("#gear").onclick = openGrownups;
  }

  /* ---------- Set ---------- */
  function setScreen(id) {
    const s = getSet(id); if (!s) return go("#/");
    const firstNew = Math.max(0, s.words.findIndex(w => !isLearned(w.word)));
    $app.innerHTML = `<section class="screen">
      ${bar({ left: btnRound("home", "home", "Home"), title: `<h2>${esc(s.name)}</h2>`, sub: `${s.words.length} words` })}
      <div class="set-hero c-${s.color}">
        ${art(SET_ART[s.id])}
        <div>
          <div class="actions">
            <button class="btn go" id="learn">${I.next} Let's learn!</button>
            <button class="btn ghost" id="cards">${I.cards} Flash cards</button>
          </div>
        </div>
      </div>
      <div class="tiles">
        ${s.words.map((w, i) => `<button class="tile ${isLearned(w.word) ? "learned" : ""}" data-i="${i}" aria-label="${esc(w.word)}">
          ${esc(w.word)}${isLearned(w.word) ? art("star", "badge") : ""}</button>`).join("")}
      </div>
    </section>`;
    $app.querySelector("#home").onclick = () => go("#/");
    $app.querySelector("#learn").onclick = () => go(`#/learn/${s.id}/${firstNew}`);
    $app.querySelector("#cards").onclick = () => go(`#/cards/${s.id}/0`);
    $app.querySelectorAll(".tile").forEach(t => t.onclick = () => go(`#/learn/${s.id}/${t.dataset.i}`));
  }

  /* ---------- Learn: Look → Spell → Read ---------- */
  function learn(id, idx) {
    const s = getSet(id); if (!s) return go("#/");
    idx = Math.min(Math.max(0, +idx || 0), s.words.length - 1);
    const item = s.words[idx];
    const w = item.word;
    let step = 0, sent = 0;

    $app.innerHTML = `<section class="screen">
      ${bar({ left: btnRound("home", "home", "Home"), title: `<h2>${esc(s.name)}</h2>`, right: btnRound("list", "grid", "All words in this set") })}
      <div class="count">Word ${idx + 1} of ${s.words.length}<span class="pips">${s.words.map((x, i) =>
        `<i class="${i === idx ? "here" : isLearned(x.word) ? "done" : ""}"></i>`).join("")}</span></div>
      <nav class="steps" aria-label="Steps">
        ${[["eye", "Look & say"], ["abc", "Spell"], ["book", "Read"]].map(([ic, lb], i) =>
          `<button class="step" data-step="${i}"><span class="dot">${I[ic]}</span><span class="label">${lb}</span></button>`).join("")}
      </nav>
      <div class="stage"><div class="card" id="card"></div></div>
      <div class="controls">
        <button class="round" id="prev" aria-label="Back">${I.back}</button>
        <button class="hear" id="hear" aria-label="Hear it">${I.speaker}</button>
        <button class="round" id="nextBtn" aria-label="Next">${I.next}</button>
      </div>
    </section>`;

    const card = $app.querySelector("#card");
    const hear = $app.querySelector("#hear");
    const nextBtn = $app.querySelector("#nextBtn");
    $app.querySelector("#home").onclick = () => go("#/");
    $app.querySelector("#list").onclick = () => go(`#/set/${s.id}`);
    $app.querySelectorAll(".step").forEach(b => b.onclick = () => show(+b.dataset.step));
    $app.querySelector("#prev").onclick = () => step > 0 ? show(step - 1) : idx > 0 ? go(`#/learn/${s.id}/${idx - 1}`) : go(`#/set/${s.id}`);
    nextBtn.onclick = () => step < 2 ? show(step + 1) : finish();
    hear.onclick = () => talking(hear, action());
    onSwipe(card, () => nextBtn.click(), () => $app.querySelector("#prev").click());

    let action = () => {};

    function spellRun() {
      const tiles = [...card.querySelectorAll(".letter")];
      const wordEl = card.querySelector(".spell-word");
      const items = [...w].map(l => [`letters/${l.toLowerCase()}`, LETTER_NAMES[l.toLowerCase()]]);
      items.push([`words/${Voice.slug(w)}`, w]);
      return Voice.sequence(items, i => {
        tiles.forEach((t, j) => t.classList.toggle("lit", j === i));
        wordEl.classList.toggle("lit", i === items.length - 1);
      }, 320);
    }

    function readRun() {
      const [text] = item.sentences[sent];
      return Voice.sentence(w, sent, text);
    }

    function renderSentence() {
      const [text, pic] = item.sentences[sent];
      const tokens = text.split(/(\s+)/);
      const html = tokens.map(t => {
        if (/^\s+$/.test(t)) return " ";
        const bare = t.replace(/[^A-Za-z'-]/g, "");
        const isTarget = bare.toLowerCase() === w.toLowerCase();
        return `<span class="w ${isTarget ? "target" : ""}" data-w="${esc(bare)}">${esc(t)}</span>`;
      }).join("");
      card.innerHTML = `
        <div class="read">
          ${art(pic, "pic")}
          <p class="sentence">${html}</p>
        </div>
        <div class="pager" role="tablist">${item.sentences.map((_, i) =>
          `<button role="tab" data-s="${i}" aria-current="${i === sent}" aria-label="Sentence ${i + 1}">${i + 1}</button>`).join("")}</div>`;
      card.querySelectorAll(".w").forEach(el => el.onclick = () => {
        card.querySelectorAll(".w.lit").forEach(x => x.classList.remove("lit"));
        el.classList.add("lit");
        Voice.word(el.dataset.w).then(() => el.classList.remove("lit"));
      });
      card.querySelectorAll(".pager button").forEach(b => b.onclick = () => { sent = +b.dataset.s; renderSentence(); });
    }

    function show(n) {
      step = n;
      Voice.stop();
      $app.querySelectorAll(".step").forEach((b, i) => {
        b.classList.toggle("on", i === step);
        b.classList.toggle("done", i < step);
        b.setAttribute("aria-current", i === step ? "step" : "false");
      });
      card.classList.remove("pop"); void card.offsetWidth; card.classList.add("pop");
      if (step === 2) {
        nextBtn.className = "btn go";
        nextBtn.innerHTML = `${art("star")} I did it!`;
        nextBtn.setAttribute("aria-label", "I did it");
      } else {
        nextBtn.className = "round";
        nextBtn.innerHTML = I.next;
        nextBtn.setAttribute("aria-label", "Next");
      }

      if (step === 0) {
        card.innerHTML = `
          ${art(SET_ART[s.id], "corner tl")}
          <div class="big-word ${w.length > 5 ? "long" : ""}">${esc(w)}</div>
          <div class="say-hint">${I.mouth} Say it out loud!</div>`;
        action = () => Voice.word(w);
        card.querySelector(".big-word").onclick = () => talking(hear, action());
        if (settings.autoplay) talking(hear, Voice.say(`phrases/look`, PHRASES.look).then(ok => ok && Voice.word(w)));
      } else if (step === 1) {
        card.innerHTML = `
          <div class="letters">${[...w].map((l, i) =>
            `<button class="letter" style="--c:${LETTER_COLORS[i % LETTER_COLORS.length]}" data-l="${l}" aria-label="${l}">${esc(l)}</button>`).join("")}</div>
          <div class="spell-word">${esc(w)}</div>`;
        card.querySelectorAll(".letter").forEach(b => b.onclick = () => {
          card.querySelectorAll(".letter").forEach(x => x.classList.remove("lit"));
          b.classList.add("lit");
          Voice.letter(b.dataset.l).then(() => b.classList.remove("lit"));
        });
        card.querySelector(".spell-word").onclick = () => Voice.word(w);
        action = spellRun;
        talking(hear, Voice.say("phrases/spell", PHRASES.spell).then(ok => ok && spellRun()));
      } else {
        sent = 0;
        renderSentence();
        action = readRun;
        Voice.phrase("read");
      }
    }

    let finishing = false;
    function finish() {
      if (finishing) return;
      finishing = true;
      markLearned(w);
      const last = idx === s.words.length - 1;
      celebrate(last ? null : PRAISE[idx % PRAISE.length]);
      setTimeout(() => go(last ? `#/done/${s.id}` : `#/learn/${s.id}/${idx + 1}`), 1700);
    }

    show(0);
  }

  /* ---------- Flash cards (quick review: read it, then tap to check) ---------- */
  function cards(id, idx) {
    const s = getSet(id); if (!s) return go("#/");
    let order = store.get("shuffle", false) ? shuffled(s.words.map((_, i) => i)) : s.words.map((_, i) => i);
    let pos = Math.min(Math.max(0, +idx || 0), order.length - 1);

    $app.innerHTML = `<section class="screen">
      ${bar({ left: btnRound("home", "home", "Home"), title: `<h2>Flash cards</h2>`, sub: esc(s.name), right: btnRound("list", "grid", "All words in this set") })}
      <div class="count" id="count"></div>
      <div class="stage"><div class="card flash" id="card"></div></div>
      <div class="controls">
        <button class="round" id="prev" aria-label="Previous card">${I.back}</button>
        <button class="hear" id="hear" aria-label="Hear it">${I.speaker}</button>
        <button class="round" id="next" aria-label="Next card">${I.next}</button>
      </div>
      <div class="controls" style="padding-top:0">
        <button class="btn small ghost" id="shuffle" aria-pressed="${store.get("shuffle", false)}">${I.shuffle} ${store.get("shuffle", false) ? "Mixed up" : "In order"}</button>
      </div>
    </section>`;
    const card = $app.querySelector("#card"), hear = $app.querySelector("#hear");
    const render = () => {
      const w = s.words[order[pos]].word;
      $app.querySelector("#count").textContent = `Card ${pos + 1} of ${order.length}`;
      card.innerHTML = `${art(SET_ART[s.id], "corner br")}<div class="big-word ${w.length > 5 ? "long" : ""}">${esc(w)}</div><div class="flash-tip">Read it! Then tap to check.</div>`;
      card.classList.remove("pop"); void card.offsetWidth; card.classList.add("pop");
      Voice.stop();
    };
    const step = d => { pos = (pos + d + order.length) % order.length; render(); };
    const sayIt = () => talking(hear, Voice.word(s.words[order[pos]].word));
    card.onclick = sayIt; hear.onclick = sayIt;
    $app.querySelector("#prev").onclick = () => step(-1);
    $app.querySelector("#next").onclick = () => step(1);
    $app.querySelector("#home").onclick = () => go("#/");
    $app.querySelector("#list").onclick = () => go(`#/set/${s.id}`);
    $app.querySelector("#shuffle").onclick = () => { store.set("shuffle", !store.get("shuffle", false)); cards(id, 0); };
    onSwipe(card, () => step(1), () => step(-1));
    render();
  }
  function shuffled(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* ---------- Set complete ---------- */
  function done(id) {
    const s = getSet(id); if (!s) return go("#/");
    const nxt = getSet(s.id + 1);
    $app.innerHTML = `<section class="screen done-screen">
      ${art("star")}
      <h2>Hooray!</h2>
      <p>You learned all ${s.words.length} words in the ${esc(s.name)}!</p>
      <div class="actions">
        ${nxt ? `<button class="btn go" id="nextSet">${I.next} ${esc(nxt.name)}</button>` : ""}
        <button class="btn ghost" id="cards">${I.cards} Flash cards</button>
        <button class="btn ghost" id="home">${I.home} Home</button>
      </div>
    </section>`;
    celebrate("setDone", true);
    nxt && ($app.querySelector("#nextSet").onclick = () => go(`#/set/${nxt.id}`));
    $app.querySelector("#cards").onclick = () => go(`#/cards/${s.id}/0`);
    $app.querySelector("#home").onclick = () => go("#/");
  }

  /* ---------- Confetti of felt blossoms & stars ---------- */
  function celebrate(phrase, quietStar) {
    const p = document.createElement("div");
    p.className = quietStar ? "party light" : "party";
    const colors = ["#ffb3cf", "#5ec8ec", "#ffd94a", "#ff9f2e", "#96cc54", "#f0509a", "#fff"];
    let bits = "";
    for (let i = 0; i < 26; i++) {
      const left = Math.random() * 100, dur = 1.6 + Math.random() * 1.6, delay = Math.random() * .5, size = 26 + Math.random() * 26;
      bits += `<span class="confetti" style="left:${left}%;width:${size}px;height:${size}px;color:${colors[i % colors.length]};animation-duration:${dur}s;animation-delay:${delay}s">${art(i % 4 ? "blossom" : "star")}</span>`;
    }
    p.innerHTML = bits + (quietStar ? "" : `${art("star", "big-star")}<div class="msg">${phrase === "yay" ? "You did it!" : "Great job!"}</div>`);
    document.body.appendChild(p);
    if (phrase) Voice.phrase(phrase);
    setTimeout(() => p.remove(), 3600);
  }

  /* ---------- Grown-ups settings ---------- */
  const dlg = document.getElementById("grownups");
  function openGrownups() {
    const sel = dlg.querySelector("#voiceSelect");
    const hint = dlg.querySelector("#voiceHint");
    const vs = Voice.voices();
    const opts = [];
    if (Voice.hasRecordings) opts.push(`<option value="__rec">Recorded voice (best)</option>`);
    opts.push(...vs.map(v => `<option value="${esc(v.name)}">${esc(v.name)}</option>`));
    if (!opts.length) opts.push(`<option value="">Device default</option>`);
    sel.innerHTML = opts.join("");
    sel.value = Voice.hasRecordings && !Voice.prefs.forceDevice ? "__rec" : (Voice.prefs.voiceName || (vs[0] && vs[0].name) || "");
    hint.textContent = Voice.hasRecordings
      ? "Using the recorded voice files. Pick a device voice to compare."
      : "Tip: on iPhone/iPad, download a nicer voice in Settings → Accessibility → Spoken Content → Voices → English (look for “Enhanced” or “Premium”), then pick it here.";
    sel.onchange = () => {
      Voice.prefs.forceDevice = sel.value !== "__rec" && Voice.hasRecordings;
      if (sel.value !== "__rec") Voice.prefs.voiceName = sel.value;
      Voice.savePrefs();
    };
    const rate = dlg.querySelector("#rate");
    rate.value = Voice.prefs.rate ?? 0.85;
    rate.oninput = () => { Voice.prefs.rate = +rate.value; Voice.savePrefs(); };
    const auto = dlg.querySelector("#autoplay");
    auto.checked = settings.autoplay;
    auto.onchange = () => { settings.autoplay = auto.checked; store.set("settings", settings); };
    dlg.querySelector("#testVoice").onclick = () => Voice.say("sentences/i-1", "I see a cat.");
    dlg.querySelector("#resetStars").onclick = () => {
      if (confirm("Clear all stars and start over?")) { learned = {}; store.set("learned", learned); dlg.close(); route(); }
    };
    dlg.showModal();
  }

  /* ---------- Router ---------- */
  function route() {
    Voice.stop();
    const [, view, a, b] = (location.hash || "#/").split("/");
    window.scrollTo(0, 0);
    if (view === "set") setScreen(a);
    else if (view === "learn") learn(a, b);
    else if (view === "cards") cards(a, b);
    else if (view === "done") done(a);
    else home();
  }
  window.addEventListener("hashchange", route);
  document.addEventListener("keydown", e => {
    if (dlg.open) return;
    if (e.key === "ArrowRight") document.querySelector("#nextBtn, #next")?.click();
    if (e.key === "ArrowLeft") document.querySelector("#prev")?.click();
    if (e.key === " " && document.activeElement === document.body) { e.preventDefault(); document.querySelector("#hear")?.click(); }
  });
  route();
})();
