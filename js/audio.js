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

  function stop() {
    token++;
    if (current) { current.pause(); current.src = ""; current = null; }
    if (pending) { clearTimeout(pending); pending = null; }
    if (synth) synth.cancel();
  }

  function playFile(key) {
    return new Promise(resolve => {
      const a = new Audio(`audio/${key}.mp3`);
      current = a;
      a.onended = a.onerror = () => { if (current === a) current = null; resolve(); };
      a.play().catch(() => resolve());
    });
  }

  function tts(text, { rate } = {}) {
    return new Promise(resolve => {
      if (!synth) return resolve();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice();
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en-US"; }
      u.rate = rate ?? prefs.rate ?? 0.85;
      u.pitch = 1.05;
      let done = false;
      const finish = () => { if (!done) { done = true; resolve(); } };
      u.onend = u.onerror = finish;
      // Safety net: some browsers never fire onend.
      setTimeout(finish, 1200 + text.length * 120);
      // iOS drops utterances spoken right after cancel(), so wait a beat.
      pending = setTimeout(() => { pending = null; synth.speak(u); }, 40);
    });
  }

  /** Play one clip. Stops anything already playing. */
  function say(key, text, opts) {
    stop();
    return sayQueued(key, text, opts, token);
  }

  function sayQueued(key, text, opts, t) {
    if (t !== token) return Promise.resolve(false);
    const p = manifest.has(key) && !prefs.forceDevice ? playFile(key) : tts(text, opts);
    return p.then(() => t === token);
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

  const slug = w => w.toLowerCase().replace(/[^a-z0-9]+/g, "");

  window.Voice = {
    say, sequence, stop, slug,
    hasRecordings: manifest.size > 0,
    voices: () => voices,
    prefs, savePrefs,
    word: w => say(`words/${slug(w)}`, w),
    letter: l => say(`letters/${l.toLowerCase()}`, window.LETTER_NAMES[l.toLowerCase()] || l),
    phrase: id => say(`phrases/${id}`, window.PHRASES[id]),
    sentence: (w, i, text) => say(`sentences/${slug(w)}-${i + 1}`, text, { rate: (prefs.rate ?? 0.85) * 0.95 })
  };
})();
