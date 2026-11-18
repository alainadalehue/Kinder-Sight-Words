# Word Patch: Kindergarten Sight Words

A small web app where kindergartners practice the 68 sight words from the school's
**Sight Word Identification** sheet, set by set, starting with the 1st six weeks.
It works on phones, tablets and laptops, and you can add it to an iPad home screen.

## How a child uses it

1. **Home**: six felt "patches", one for each six-week set, shown in order. The next set to work on has an **Up next!** ribbon. Stars show progress.
2. **A set**: **Let's learn!** starts at the first word that has no star yet. **Flash cards** is quick review. Tapping any word tile jumps straight to that word.
3. **Each word has 3 steps**, shown as icons at the top:
   - 👁 **Look & say**: a big flash card with no picture, so the child's eyes stay on the letters. The app says the word, then the child says it.
   - 🔤 **Spell**: letters are grouped by sound, and a felt ♥ marks the *heart part*, the bit that doesn't sound out the expected way (th + ♥e in "the"). The letters light up as they're spoken, and tapping a tile repeats it. This "heart word" approach helps children store sight words by linking sounds to letters instead of memorizing shapes.
   - 📖 **Read**: two short sentences with a felt picture that shows the whole sentence (a big pig *and* a little bug).
   - **I did it!** awards a star and moves on to the next word.

### Reading help (grown-up setting)

- **Beginner** (default): the picture shows right away. The app reads the sentence while each word lights up (**echo reading**), says "Now you read it!", and moves a highlight word by word at a child's pace. Then it asks the child to **find the sight word** and tap it. Tapping a wrong word says that word and "Try again!"
- **Ready to read**: the child reads first. The picture stays under a felt flap until they tap "Show me!" or the speaker. This way the picture confirms the meaning instead of being used to guess. Any word can be tapped for help.

Navigation: the big pink speaker button means "hear it", the arrows go back and forward, and swiping the card also works.
On a laptop you can use the ← → keys and the space bar.

### How the sentences are written

Each word has two sentences (in `js/words.js`). A check run on every sentence confirms that it uses:

- only sight words from its own set or an earlier set, so earlier words keep coming back;
- otherwise only short words a kindergartner can sound out (cat, pig, hen, sun, big, hot, hop, ran, sat…) and Mom / Dad;
- 3–8 words, with repeated patterns early on ("I see a ___.", "I have a ___.").

No sight words outside the sheet are introduced, and no names are used.

**Grown-up settings** are behind the gear icon on the home screen: voice, talking speed, Reading help,
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

   This creates about 280 short MP3s (sight words, every word used in a sentence, letters,
   sentences, and spoken prompts such as "Now you read it!") and updates `audio/manifest.js`. Commit the `audio/` folder.
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
| `js/words.js` | The word sets, heart parts, sentences + picture layouts, phrases and letter names |
| `js/art.js` | Felt-style SVG illustrations, people, and the sentence picture builder |
| `js/audio.js` | Voice: recorded clips first, then the device voice |
| `js/app.js` | Screens and navigation |
| `css/styles.css` | Look and feel |
| `scripts/generate-audio.mjs` | ElevenLabs clip generator |
