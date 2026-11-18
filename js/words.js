/*
 * Sight word sets, in the order given on the school's
 * "Sight Word Identification" sheet (1st six weeks → 6th six weeks).
 *
 * parts  — the word split into sound chunks; a trailing * marks the
 *          "heart part" (the tricky bit that doesn't sound out the
 *          way a kindergartner expects yet). "th|e*" → th + ♥e.
 *
 * sentences — [text, scene]. Written for a beginning reader:
 *   • 3–7 words, repeated patterns early on ("I see a ___.")
 *   • only sight words from this set or earlier sets, plus short
 *     sound-it-out words (cat, pig, big, hop, sun…) and Mom / Dad
 *   • the picture shows the WHOLE sentence (who + what + where)
 *
 * scene — felt pieces placed on a 160×100 stage: "name:x,y,size[,f]"
 *   (x,y = centre, f = mirror). Pieces live in js/art.js.
 */
window.SIGHT_WORDS = [
  {
    id: 1,
    name: "1st Six Weeks",
    color: "sun",
    words: [
      { word: "I", parts: "I*", sentences: [
        ["I see a cat.", "kid:52,54,78 cat:116,68,46"],
        ["I have a hat.", "kid+hat:80,56,76"]] },
      { word: "am", parts: "a|m", sentences: [
        ["I am a kid.", "kid:80,54,80"],
        ["I am hot.", "sun:120,26,44 kid:62,56,76"]] },
      { word: "the", parts: "th|e*", sentences: [
        ["I see the sun.", "sun:118,26,44 kid:56,56,76"],
        ["The pig is big.", "pig:80,52,84"]] },
      { word: "see", parts: "s|ee*", sentences: [
        ["I see a dog.", "kid:52,54,78 dog:116,66,50"],
        ["I see a bug.", "kid:56,54,78 bug:118,74,30"]] },
      { word: "to", parts: "t|o*", sentences: [
        ["I have to nap.", "nap:80,58,96"],
        ["I ran to Mom.", "run:18,58,26 kid:48,58,70 mom:114,52,84"]] },
      { word: "a", parts: "a*", sentences: [
        ["I see a pig.", "kid:52,54,78 pig:116,66,50"],
        ["I have a cup.", "kid:56,54,78 cup:114,70,38"]] },
      { word: "have", parts: "h|a*|ve*", sentences: [
        ["I have a dog.", "kid:52,54,78 dog:116,66,50"],
        ["I have a big box.", "kid:46,54,78 box:116,62,62"]] },
      { word: "is", parts: "i|s*", sentences: [
        ["The sun is hot.", "sun:80,48,76"],
        ["The bug is red.", "bug:80,52,70"]] }
    ]
  },
  {
    id: 2,
    name: "2nd Six Weeks",
    color: "pink",
    words: [
      { word: "it", parts: "i|t", sentences: [
        ["It is a pig.", "pig:80,54,76"],
        ["It is in the box.", "catBox:80,54,80"]] },
      { word: "in", parts: "i|n", sentences: [
        ["The cat is in the box.", "catBox:80,54,80"],
        ["The pig is in the mud.", "pigMud:80,56,84"]] },
      { word: "if", parts: "i|f", sentences: [
        ["See if the cat is in the box.", "kid:44,54,78 catBox:114,60,62"],
        ["See if it is hot.", "sun:120,26,44 kid:62,56,76"]] },
      { word: "at", parts: "a|t", sentences: [
        ["Look at the cat.", "kid:52,54,78 cat:116,68,46"],
        ["Look at the pup.", "kid:56,54,78 dog:116,74,32"]] },
      { word: "we", parts: "w|e*", sentences: [
        ["We see the sun.", "sun:132,24,38 kid:44,56,72 boy:94,56,72"],
        ["We have a pig.", "kid:30,56,70 girl:72,56,70 pig:128,68,46"]] },
      { word: "my", parts: "m|y*", sentences: [
        ["My cat is little.", "kid:60,54,78 cat:116,78,26"],
        ["I like my hat.", "kid+hat:80,56,76"]] },
      { word: "like", parts: "l|i*|ke*", sentences: [
        ["I like the dog.", "kid:52,54,78 dog:116,66,50"],
        ["We like to hop.", "kid:54,50,74 girl:108,50,74 hop:80,88,90"]] },
      { word: "he", parts: "h|e*", sentences: [
        ["He is my dad.", "dad:58,52,86 kid:116,62,60"],
        ["He has a hat.", "boy+hat:80,56,76"]] },
      { word: "for", parts: "f|or*", sentences: [
        ["It is for me!", "kid:54,54,78 box:118,66,46"],
        ["The cup is for Mom.", "mom:62,52,86 cup:120,70,36"]] },
      { word: "me", parts: "m|e*", sentences: [
        ["Look at me!", "kid:80,54,80 hop:80,90,60"],
        ["Mom hugs me.", "hug:80,54,86"]] },
      { word: "little", parts: "l|i|tt|le*", sentences: [
        ["I see a little bug.", "kid:56,54,78 bug:118,80,18"],
        ["The pup is little.", "kid:56,54,78 dog:116,77,28"]] },
      { word: "look", parts: "l|oo*|k", sentences: [
        ["Look at the bug!", "bug:80,52,66"],
        ["Look in the box.", "kid:46,54,78 box:116,62,58"]] }
    ]
  },
  {
    id: 3,
    name: "3rd Six Weeks",
    color: "sky",
    words: [
      { word: "by", parts: "b|y*", sentences: [
        ["The cat sat by me.", "kid:58,54,78 cat:110,70,40"],
        ["The pig is by the tub.", "tub:58,64,62 pig:122,68,42"]] },
      { word: "can", parts: "c|a|n", sentences: [
        ["I can hop.", "kid:80,48,76 hop:80,88,60"],
        ["She can run.", "girl:80,54,78 run:40,60,40"]] },
      { word: "and", parts: "a|n|d", sentences: [
        ["I see a cat and a dog.", "cat:50,64,46 dog:112,64,50"],
        ["Mom and Dad hug.", "heart:80,14,16 mom:62,52,84 dad:100,52,86"]] },
      { word: "go", parts: "g|o*", sentences: [
        ["Go, dog, go!", "dog:86,62,56 run:40,64,38"],
        ["We go on the bus.", "bus:80,52,92"]] },
      { word: "you", parts: "y|ou*", sentences: [
        ["I like you!", "hug:80,54,86"],
        ["Can you see the fox?", "kid:48,54,78 fox:116,68,46"]] },
      { word: "she", parts: "sh|e*", sentences: [
        ["She is my mom.", "mom:58,52,86 kid:116,62,60"],
        ["She can hop.", "girl:80,48,76 hop:80,88,60"]] },
      { word: "but", parts: "b|u|t", sentences: [
        ["The pig is big, but the bug is little.", "pig:58,54,86 bug:130,82,18"],
        ["It is hot, but I have a hat.", "sun:124,24,40 kid+hat:62,56,76"]] },
      { word: "on", parts: "o|n", sentences: [
        ["The cat is on the bed.", "bed:80,62,88 cat:72,46,34"],
        ["A bug is on my hat.", "hat:80,54,70 bug:92,30,22"]] },
      { word: "no", parts: "n|o*", sentences: [
        ["No, no, dog!", "dog:80,58,64"],
        ["No, the pig is not little.", "pig:80,52,84"]] },
      { word: "or", parts: "or*", sentences: [
        ["Is it a cat or a dog?", "cat:50,64,46 dog:112,64,50"],
        ["Is that a fox or a dog?", "fox:50,64,48 dog:112,64,50"]] },
      { word: "this", parts: "th|i|s", sentences: [
        ["This is my cat.", "kid:54,54,78 cat:116,68,46"],
        ["I like this hat.", "kid+hat:80,56,76"]] },
      { word: "that", parts: "th|a|t", sentences: [
        ["Look at that pig!", "pigMud:80,56,84"],
        ["That is my bus.", "bus:80,52,92"]] }
    ]
  },
  {
    id: 4,
    name: "4th Six Weeks",
    color: "orange",
    words: [
      { word: "with", parts: "w|i|th", sentences: [
        ["I sit with my dog.", "kid:54,54,78 dog:114,66,48"],
        ["She is with Mom.", "mom:60,52,86 girl:112,60,62"]] },
      { word: "will", parts: "w|i|ll", sentences: [
        ["I will go on the bus.", "bus:96,50,80 kid:30,58,64"],
        ["We will see the fox.", "kid:36,56,70 boy:78,56,70 fox:132,70,38"]] },
      { word: "from", parts: "f|r|o*|m", sentences: [
        ["I got a hat from Dad.", "dad:56,52,86 kid+hat:114,60,64"],
        ["The bug ran from the hen.", "hen:56,60,58 bug:130,78,22 run:108,76,26,f"]] },
      { word: "all", parts: "a*|ll", sentences: [
        ["We all like the sun.", "sun:136,22,34 kid:30,58,64 girl:72,58,64 boy:112,58,64"],
        ["All the pigs are in the mud.", "mud:80,84,150 pig:36,70,38 pig:80,70,38 pig:124,70,38"]] },
      { word: "here", parts: "h|ere*", sentences: [
        ["Here is my cat.", "kid:54,54,78 cat:116,68,46"],
        ["The bus is here!", "bus:80,52,92"]] },
      { word: "are", parts: "are*", sentences: [
        ["We are on the bus.", "bus:80,52,92"],
        ["The bugs are red.", "bug:40,66,34 bug:80,62,40 bug:120,66,34"]] },
      { word: "one", parts: "one*", sentences: [
        ["I see one sun.", "sun:118,26,44 kid:56,56,76"],
        ["I have one cup.", "kid:56,54,78 cup:114,70,38"]] },
      { word: "two", parts: "t|wo*", sentences: [
        ["I see two cats.", "cat:54,64,48 cat:108,64,48,f"],
        ["I have two cups.", "cup:56,64,46 cup:106,64,46"]] },
      { word: "three", parts: "th|r|ee*", sentences: [
        ["I see three bugs.", "bug:40,64,34 bug:80,64,34 bug:120,64,34"],
        ["Three pigs are in the mud.", "mud:80,84,150 pig:36,70,38 pig:80,70,38 pig:124,70,38"]] },
      { word: "four", parts: "f|our*", sentences: [
        ["I see four hens.", "hen:28,66,34 hen:62,66,34 hen:96,66,34 hen:130,66,34"],
        ["I have four hats.", "hat:30,64,32 hat:63,64,32 hat:97,64,32 hat:130,64,32"]] },
      { word: "five", parts: "f|i*|ve*", sentences: [
        ["Look at the five hens.", "hen:22,68,30 hen:51,68,30 hen:80,68,30 hen:109,68,30 hen:138,68,30"],
        ["I see five pigs.", "pig:22,68,30 pig:51,68,30 pig:80,68,30 pig:109,68,30 pig:138,68,30"]] },
      { word: "of", parts: "o*|f*", sentences: [
        ["One of the cats is big.", "cat:40,72,28 cat:80,58,62 cat:122,72,28,f"],
        ["Look at all of the bugs!", "bug:26,60,24 bug:56,74,24 bug:84,56,24 bug:110,74,24 bug:136,60,24"]] },
      { word: "they", parts: "th|ey*", sentences: [
        ["They are my pets.", "cat:50,66,44 dog:110,64,50"],
        ["They can hop.", "girl:52,48,72 boy:108,48,72 hop:80,88,90"]] }
    ]
  },
  {
    id: 5,
    name: "5th Six Weeks",
    color: "grass",
    words: [
      { word: "her", parts: "h|er*", sentences: [
        ["I like her hat.", "girl+hat:80,56,76"],
        ["She sat with her cat.", "girl:58,54,78 cat:114,70,40"]] },
      { word: "his", parts: "h|i|s*", sentences: [
        ["He is with his dog.", "boy:56,54,78 dog:114,66,48"],
        ["That is his hat.", "boy+hat:80,56,76"]] },
      { word: "who", parts: "wh*|o*", sentences: [
        ["Who is in the box?", "catBox:80,54,80"],
        ["Who can hop?", "girl:80,48,76 hop:80,88,60"]] },
      { word: "what", parts: "wh|a*|t", sentences: [
        ["What is that?", "kid:50,54,78 fox:116,68,46"],
        ["What is in the mud?", "pigMud:80,56,84"]] },
      { word: "when", parts: "wh|e|n", sentences: [
        ["When will the bus come?", "kid:34,58,64 bus:108,54,74"],
        ["When can we play?", "kid:56,54,76 girl:106,54,76"]] },
      { word: "where", parts: "wh|ere*", sentences: [
        ["Where is my hat?", "kid:60,54,78 hat:124,80,26"],
        ["Where is the cat?", "catBox:80,54,80"]] },
      { word: "why", parts: "wh|y*", sentences: [
        ["Why is the pig in the mud?", "pigMud:80,56,84"],
        ["Why is the dog wet?", "dog:80,34,42 tub:80,66,78"]] },
      { word: "were", parts: "w|ere*", sentences: [
        ["We were on the bus.", "bus:80,52,92"],
        ["They were in the sun.", "sun:128,24,38 cat:50,68,44 dog:100,66,48"]] },
      { word: "said", parts: "s|ai*|d", sentences: [
        ["Mom said, “Go to bed.”", "mom:46,52,84 bed:116,64,64"],
        ["Dad said, “Yes!”", "dad:80,52,86"]] },
      { word: "come", parts: "c|o*|me*", sentences: [
        ["Come here, pup!", "kid:56,54,78 dog:118,74,32"],
        ["Come and see the fox.", "kid:50,54,78 fox:116,68,46"]] },
      { word: "play", parts: "p|l|ay*", sentences: [
        ["We play in the sun.", "sun:132,24,38 kid:50,54,74 girl:100,54,74"],
        ["I like to play with my dog.", "kid:54,54,78 dog:114,66,48"]] },
      { word: "there", parts: "th|ere*", sentences: [
        ["There is a bug on my hat!", "hat:80,54,70 bug:92,30,22"],
        ["There are two cats.", "cat:54,64,48 cat:108,64,48,f"]] },
      { word: "their", parts: "th|eir*", sentences: [
        ["They like their pets.", "girl:34,54,66 cat:68,72,30 boy:104,54,66 dog:138,72,32"],
        ["The hens are in their pen.", "pen:80,64,140 hen:48,62,36 hen:80,62,36 hen:112,62,36"]] }
    ]
  },
  {
    id: 6,
    name: "6th Six Weeks",
    color: "purple",
    words: [
      { word: "was", parts: "w|a*|s*", sentences: [
        ["The cat was in the box.", "catBox:80,54,80"],
        ["It was hot in the sun.", "sun:120,26,44 kid:62,56,76"]] },
      { word: "each", parts: "ea*|ch", sentences: [
        ["We each have a hat.", "kid+hat:52,56,74 girl+hat:108,56,74"],
        ["Each pig is in the mud.", "mud:80,84,150 pig:36,70,38 pig:80,70,38 pig:124,70,38"]] },
      { word: "use", parts: "u*|se*", sentences: [
        ["I use a cup.", "kid:56,54,78 cup:114,70,38"],
        ["I use my hat in the sun.", "sun:124,24,40 kid+hat:62,56,76"]] },
      { word: "your", parts: "y|our*", sentences: [
        ["Is this your dog?", "dog:80,60,62"],
        ["I like your hat!", "girl+hat:80,56,76"]] },
      { word: "as", parts: "a|s*", sentences: [
        ["He is as big as Dad!", "boy:58,52,86 dad:108,52,86"],
        ["The cat is as big as the dog.", "cat:52,64,50 dog:110,64,50"]] },
      { word: "an", parts: "a|n", sentences: [
        ["The hen has an egg.", "hen:62,58,62 egg:120,78,24"],
        ["I have an egg.", "kid:56,54,78 egg:112,74,26"]] },
      { word: "because", parts: "b|e*|c|au*|se*", sentences: [
        ["I have a hat because it is hot.", "sun:124,24,40 kid+hat:62,56,76"],
        ["I am wet because I sat in the tub.", "kidTub:80,58,90"]] },
      { word: "which", parts: "wh|i|ch", sentences: [
        ["Which cat is big?", "cat:50,68,30 cat:104,58,60,f"],
        ["Which cup is big?", "cup:50,72,28 cup:106,60,56"]] },
      { word: "how", parts: "h|ow*", sentences: [
        ["How big is the pig?", "pig:80,52,84"],
        ["How will we go?", "kid:34,58,64 bus:108,54,74"]] },
      { word: "words", parts: "w|or*|d|s", sentences: [
        ["Look at all the words!", "book:80,52,76"],
        ["I can see my words.", "kid:52,54,78 book:118,66,44"]] }
    ]
  }
];

/* Short spoken prompts and praise (also generated by scripts/generate-audio.mjs). */
window.PHRASES = {
  hello: "Hi friend! Tap a patch to start.",
  look: "Look at the word. Say it with me!",
  spell: "Let's spell it!",
  heart: "The heart part is tricky. We learn it by heart!",
  listen: "Listen and follow along.",
  yourTurn: "Now you read it!",
  find: "Can you find this word?",
  found: "You found it!",
  tryAgain: "Try again!",
  readyRead: "You read it! Tap a word if you need help.",
  great: "Great job!",
  yay: "You did it!",
  setDone: "Hooray! You finished all the words!"
};

/* How each letter is spoken for the "Spell it" step. */
window.LETTER_NAMES = {
  a: "ay", b: "bee", c: "see", d: "dee", e: "ee", f: "eff", g: "jee", h: "aitch",
  i: "eye", j: "jay", k: "kay", l: "ell", m: "em", n: "en", o: "oh", p: "pee",
  q: "cue", r: "ar", s: "ess", t: "tee", u: "you", v: "vee", w: "double you",
  x: "ex", y: "why", z: "zee"
};
