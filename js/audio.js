/*
 * Voice layer.
 *
 * 1. If a recorded/generated MP3 exists for a clip (listed in audio/manifest.js),
 *    play it. This is how a cloned human voice (e.g. ElevenLabs) is used.
 * 2. Otherwise fall back to the device's built-in speech, picking the most
 *    natural-sounding voice available (Apple "Enhanced/Premium", Google, MS Natural…).
 *
 * Clip keys look like  "words/the", "letters/t", "sentences/the-1", "phrases/great".
 */
(function () {
  const manifest = new Set(window.AUDIO_MANIFEST || []);
  const synth = window.speechSynthesis;
  let current = null;       // HTMLAudioElement currently playing
  let token = 0;            // increments to cancel in-flight sequences
  let voices = [];
  let pending = null;       // delayed speak() timer

  const prefs = (() => {
    try { return JSON.parse(localStorage.getItem("wp.voice") || "{}"); } catch { return {}; }
  })();
  const savePrefs = () => { try { localStorage.setItem("wp.voice", JSON.stringify(prefs)); } catch {} };

  function scoreVoice(v) {
    const n = v.name.toLowerCase();
    let s = 0;
    if (/^en[-_]us/i.test(v.lang)) s += 30; else if (/^en/i.test(v.lang)) s += 15; else return -1;
    if (/premium/.test(n)) s += 50;
    if (/enhanced/.test(n)) s += 40;
    if (/natural|neural|online/.test(n)) s += 40;
    if (/google us english/.test(n)) s += 30;
    if (/(ava|samantha|allison|susan|zoe|nicky|joelle|aria|jenny|michelle)/.test(n)) s += 20;
    if (/(albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|fred|grandpa|grandma|rocko|shelley|flo|eddy|reed|sandy)/.test(n)) s -= 100;
    if (v.localService) s += 3;
    return s;
  }

  function loadVoices() {
    if (!synth) return;
    voices = synth.getVoices().filter(v => scoreVoice(v) >= 0).sort((a, b) => scoreVoice(b) - scoreVoice(a));
  }
  if (synth) {
    loadVoices();
    synth.addEventListener?.("voiceschanged", loadVoices);
  }

  function pickVoice() {
    if (prefs.voiceName) {
      const v = voices.find(v => v.name === prefs.voiceName);
      if (v) return v;
    }
    return voices[0] || null;
  }

  let timers = [];          // word-highlight timers for echo reading
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

  function stop() {
    token++;
    clearTimers();
    if (current) { current.pause(); current.src = ""; current = null; }
    if (pending) { clearTimeout(pending); pending = null; }
    if (synth) synth.cancel();
  }

  /* Spread word highlights across a known duration, weighted by word length
     with a little extra time for punctuation pauses. */
  function schedule(words, fromIdx, ms, onWord) {
    const w = words.map(t => t.replace(/[^A-Za-z]/g, "").length + 2 + (/[,.!?\u201d]$/.test(t) ? 3 : 0));
    const sum = w.slice(fromIdx).reduce((a, b) => a + b, 0) || 1;
    let at = 0;
    for (let i = fromIdx; i < words.length; i++) {
      timers.push(setTimeout(() => onWord(i), at));
      at += (w[i] / sum) * ms;
    }
  }

  function playFile(key, words, onWord) {
    return new Promise(resolve => {
      const a = new Audio(`audio/${key}.mp3`);
      current = a;
      let started = false;
      a.onplaying = () => {
        if (started || !onWord) return;
        started = true;
        const ms = isFinite(a.duration) ? a.duration * 1000 - 250 : words.length * 450;
        timers.push(setTimeout(() => schedule(words, 0, ms, onWord), 120));
      };
      a.onended = a.onerror = () => { if (current === a) current = null; resolve(); };
      a.play().catch(() => resolve());
    });
  }

  function tts(text, { rate, words, onWord } = {}) {
    return new Promise(resolve => {
      if (!synth) return resolve();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice();
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en-US"; }
      u.rate = rate ?? prefs.rate ?? 0.85;
      u.pitch = 1.05;
      if (onWord) {
        // Prefer real word-boundary events; fall back to an estimate.
        const starts = [];
        let pos = 0;
        for (const wd of words) { const i = text.indexOf(wd, pos); starts.push(i); pos = i + wd.length; }
        let gotBoundary = false;
        u.onboundary = e => {
          if (e.name && e.name !== "word") return;
          if (!gotBoundary) { gotBoundary = true; clearTimers(); }
          let idx = 0;
          starts.forEach((st, i) => { if (st <= e.charIndex) idx = i; });
          onWord(idx);
        };
        u.onstart = () => {
          onWord(0);
          const est = words.reduce((a, wd) => a + 140 + wd.length * 70, 0) / u.rate;
          timers.push(setTimeout(() => { if (!gotBoundary) schedule(words, 1, est, onWord); }, 280));
        };
      }
      let done = false;
      const finish = () => { if (!done) { done = true; resolve(); } };
      u.onend = u.onerror = finish;
      // Safety net: some browsers never fire onend.
      setTimeout(finish, 1500 + text.length * 130);
      // iOS drops utterances spoken right after cancel(), so wait a beat.
      pending = setTimeout(() => { pending = null; synth.speak(u); }, 40);
    });
  }

  const useFile = key => manifest.has(key) && !prefs.forceDevice;

  /** Play one clip. Stops anything already playing. Resolves true if it finished uninterrupted. */
  function say(key, text, opts) {
    stop();
    return sayQueued(key, text, opts, token);
  }

  function sayQueued(key, text, opts = {}, t = token) {
    if (t !== token) return Promise.resolve(false);
    const p = useFile(key) ? playFile(key, opts.words, opts.onWord) : tts(text, opts);
    return p.then(() => { if (t === token) clearTimers(); return t === token; });
  }

  /** Play a list of [key, text] clips in order, calling onStep(i) before each. */
  async function sequence(items, onStep, gap = 250) {
    stop();
    const t = token;
    for (let i = 0; i < items.length; i++) {
      if (t !== token) return false;
      onStep && onStep(i);
      const [key, text, opts] = items[i];
      const ok = await sayQueued(key, text, opts, t);
      if (!ok) return false;
      await new Promise(r => setTimeout(r, gap));
    }
    onStep && onStep(-1);
    return t === token;
  }

  /** Wait, but report false if something else started talking meanwhile. */
  function pause(ms) {
    const t = token;
    return new Promise(r => setTimeout(() => r(t === token), ms));
  }

  const slug = w => w.toLowerCase().replace(/[^a-z0-9]+/g, "");

  window.Voice = {
    say, sequence, stop, slug, pause,
    then: (key, text, opts) => sayQueued(key, text, opts),
    hasRecordings: manifest.size > 0,
    voices: () => voices,
    prefs, savePrefs,
    word: w => say(`words/${slug(w)}`, w),
    letter: l => say(`letters/${l.toLowerCase()}`, window.LETTER_NAMES[l.toLowerCase()] || l),
    phrase: id => say(`phrases/${id}`, window.PHRASES[id]),
    /** Read a sentence; onWord(i) fires as each word is spoken (for echo reading). */
    sentence: (w, i, text, onWord, queued) => {
      const key = `sentences/${slug(w)}-${i + 1}`;
      const opts = { rate: (prefs.rate ?? 0.85) * 0.92, words: text.split(/\s+/).filter(Boolean), onWord };
      return queued ? sayQueued(key, text, opts) : say(key, text, opts);
    }
  };
})();
