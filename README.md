# Word Patch: Kindergarten Sight Words

A small web app where kindergartners practice the 68 sight words from the school's
**Sight Word Identification** sheet, set by set, starting with the 1st six weeks.
It works on phones, tablets and laptops, and you can add it to an iPad home screen.

## How a child uses it

1. **Home**: six felt "patches", one for each six-week set, shown in order. The next set to work on has an **Up next!** ribbon. Stars show progress.
2. **A set**: **Let's learn!** starts at the first word that has no star yet. **Flash cards** is quick review. Tapping any word tile jumps straight to that word.
3. **Each word has 3 steps**, shown as icons at the top:
   - 👁 **Look & say**: a big flash card. The app says the word, then the child says it.
   - 🔤 **Spell**: letter tiles light up one at a time while each letter is spoken, then the whole word. The child can tap any letter to hear it.
   - 📖 **Read**: two short sentences with a picture. The sight word is highlighted, and the child can tap any word to hear it. The pink button reads the whole sentence.
   - **I did it!** awards a star and moves on to the next word.

Navigation: the big pink speaker button means "hear it", the arrows go back and forward, and swiping the card also works.
On a laptop you can use the ← → keys and the space bar.

The sentences build on each other: each one uses only sight words from its own set or an
earlier set, plus easy decodable words with a picture (cat, sun, big, hop…).
No sight words outside the sheet are introduced.

**Grown-up settings** are behind the gear icon on the home screen: voice, talking speed,
whether new words are spoken automatically, and a button to reset stars.

## Running it

It's a plain static site with no build step. Any of these works:

- **GitHub Pages** (recommended): repo Settings → Pages → deploy from this branch, root folder.
- Locally: `python3 -m http.server` in this folder, then open http://localhost:8000.

## The voice

The app picks its voice in this order:

1. **Recorded clips** in `audio/` (listed in `audio/manifest.js`). These sound the most human.
2. Otherwise, **the device's best built-in voice**. On iPhone/iPad you can make this much better for free:
   Settings → Accessibility → Spoken Content → Voices → English, download an **Enhanced** or
   **Premium** voice (for example Ava or Zoe), then choose it in the app's grown-up settings.

### Can my iPhone "Personal Voice" be used?

Not in a web app. Apple only lets Personal Voice be used on that same device, by
native apps that ask for permission. Websites (Safari's speech API) can't reach it,
and the voice can't be exported.

### Best option: ElevenLabs voice clone, generated once

1. Make an ElevenLabs account. Voice cloning needs a paid plan; the Starter plan is enough.
2. **Voices → Add voice → Instant Voice Clone**. Upload 1–3 minutes of clean audio of yourself
   reading in a warm, "teacher" tone. Copy the **Voice ID**.
3. Create an API key (Profile → API Keys).
4. Run (needs Node 18+):

   ```sh
   ELEVENLABS_API_KEY=your_key ELEVENLABS_VOICE_ID=your_voice_id node scripts/generate-audio.mjs
   ```

   This creates about 290 short MP3s (sight words, every word used in a sentence, letters,
   sentences and praise phrases) and updates `audio/manifest.js`. Commit the `audio/` folder.
   The app then uses your voice everywhere, with no API key in the app and no per-use cost.

Useful flags: `--list` (show every clip and its text), `--only=letters`, `--force` (re-make clips).

### Or record it yourself

Run `node scripts/generate-audio.mjs --list` to see each file name and its text. Record those
clips as MP3s, put them in `audio/<group>/<name>.mp3`, then run
`node scripts/generate-audio.mjs --manifest`. You can mix approaches, for example
recording the letters yourself and generating everything else.

## Files

| Path | What it is |
| --- | --- |
| `js/words.js` | The word sets, sentences, phrases and letter names (edit sentences here) |
| `js/art.js` | Felt-style SVG illustrations |
| `js/audio.js` | Voice: recorded clips first, then the device voice |
| `js/app.js` | Screens and navigation |
| `css/styles.css` | Look and feel |
| `scripts/generate-audio.mjs` | ElevenLabs clip generator |
