/*
 * Sight word sets, in the order given on the school's
 * "Sight Word Identification" sheet (1st six weeks → 6th six weeks).
 *
 * Sentences are cumulative: each one uses only sight words from its own
 * set or an earlier set, plus simple decodable words (cat, sun, big, hop…)
 * that a kindergartner can sound out or that have a picture.
 * `pic` names the felt picture shown beside the sentence (see js/art.js).
 */
window.SIGHT_WORDS = [
  {
    id: 1,
    name: "1st Six Weeks",
    color: "sun",
    words: [
      { word: "I", sentences: [["I see a cat.", "cat"], ["I have a hat.", "hat"]] },
      { word: "am", sentences: [["I am a big dog.", "dog"], ["I am a red hen.", "hen"]] },
      { word: "the", sentences: [["I see the sun.", "sun"], ["The cat is big.", "cat"]] },
      { word: "see", sentences: [["I see a bug.", "bug"], ["I see a fish.", "fish"]] },
      { word: "to", sentences: [["I have to nap.", "bed"], ["The duck ran to the hen.", "duck"]] },
      { word: "a", sentences: [["I see a frog.", "frog"], ["I have a cup.", "cup"]] },
      { word: "have", sentences: [["I have a pet dog.", "dog"], ["I have a red box.", "box"]] },
      { word: "is", sentences: [["The sun is hot.", "sun"], ["The bug is red.", "bug"]] }
    ]
  },
  {
    id: 2,
    name: "2nd Six Weeks",
    color: "pink",
    words: [
      { word: "it", sentences: [["It is a big pig.", "pig"], ["It is in the box.", "box"]] },
      { word: "in", sentences: [["The cat is in the box.", "box"], ["The fish is in the tub.", "fish"]] },
      { word: "if", sentences: [["See if the cat is in the box.", "box"], ["Look to see if it is a frog.", "frog"]] },
      { word: "at", sentences: [["Look at the bird.", "bird"], ["We look at the duck.", "duck"]] },
      { word: "we", sentences: [["We like the sun.", "sun"], ["We have a pet pig.", "pig"]] },
      { word: "my", sentences: [["My cat is little.", "cat"], ["I like my hat.", "hat"]] },
      { word: "like", sentences: [["I like fish.", "fish"], ["We like to hop like a frog.", "frog"]] },
      { word: "he", sentences: [["He is a big dog.", "dog"], ["He has a red hat.", "hat"]] },
      { word: "for", sentences: [["It is for me!", "box"], ["I have a hat for my dad.", "hat"]] },
      { word: "me", sentences: [["Look at me hop!", "bunny"], ["The dog is for me.", "dog"]] },
      { word: "little", sentences: [["I see a little bug.", "bug"], ["I have a little fish.", "fish"]] },
      { word: "look", sentences: [["Look at the big tree.", "tree"], ["Look in the box.", "box"]] }
    ]
  },
  {
    id: 3,
    name: "3rd Six Weeks",
    color: "sky",
    words: [
      { word: "by", sentences: [["The cat sat by me.", "cat"], ["The duck is by the tree.", "duck"]] },
      { word: "can", sentences: [["I can hop.", "bunny"], ["You can see the sun.", "sun"]] },
      { word: "and", sentences: [["I see a cat and a dog.", "dog"], ["I have a hat and a cup.", "cup"]] },
      { word: "go", sentences: [["Go, dog, go!", "dog"], ["We can go on the bus.", "bus"]] },
      { word: "you", sentences: [["I like you!", "flower"], ["Can you see the bird?", "bird"]] },
      { word: "she", sentences: [["She has a pet fish.", "fish"], ["She can hop like a bunny.", "bunny"]] },
      { word: "but", sentences: [["The pig is big, but the bug is little.", "pig"], ["It is hot, but I have a hat.", "hat"]] },
      { word: "on", sentences: [["The cat is on the bed.", "bed"], ["A bug is on my hat.", "bug"]] },
      { word: "no", sentences: [["No, no, dog!", "dog"], ["No, the fish can not hop.", "fish"]] },
      { word: "or", sentences: [["Is it a cat or a dog?", "cat"], ["Is that a frog or a bug?", "frog"]] },
      { word: "this", sentences: [["This is my cat.", "cat"], ["I like this hat.", "hat"]] },
      { word: "that", sentences: [["Look at that bird!", "bird"], ["Is that a big pig?", "pig"]] }
    ]
  },
  {
    id: 4,
    name: "4th Six Weeks",
    color: "orange",
    words: [
      { word: "with", sentences: [["I sit with my dog.", "dog"], ["She can hop with the bunny.", "bunny"]] },
      { word: "will", sentences: [["I will go on the bus.", "bus"], ["We will see the sun.", "sun"]] },
      { word: "from", sentences: [["A bug ran from the hen.", "bug"], ["I got a hat from my dad.", "hat"]] },
      { word: "all", sentences: [["We all like the sun.", "sun"], ["All the fish are red.", "fish"]] },
      { word: "here", sentences: [["Here is my cat.", "cat"], ["The bus is here!", "bus"]] },
      { word: "are", sentences: [["The ducks are wet.", "duck"], ["We are on the bus.", "bus"]] },
      { word: "one", sentences: [["I have one hat.", "hat"], ["I see one big sun.", "sun"]] },
      { word: "two", sentences: [["I see two cats.", "cat"], ["I have two cups.", "cup"]] },
      { word: "three", sentences: [["I see three bugs.", "bug"], ["Three pigs are in the mud.", "pig"]] },
      { word: "four", sentences: [["The dog has four legs.", "dog"], ["I see four ducks.", "duck"]] },
      { word: "five", sentences: [["I have five fish.", "fish"], ["Look at the five hens.", "hen"]] },
      { word: "of", sentences: [["One of the cats is red.", "cat"], ["Look at all of the bugs!", "bug"]] },
      { word: "they", sentences: [["They are my pets.", "dog"], ["They can hop.", "frog"]] }
    ]
  },
  {
    id: 5,
    name: "5th Six Weeks",
    color: "grass",
    words: [
      { word: "her", sentences: [["I like her hat.", "hat"], ["She sat with her cat.", "cat"]] },
      { word: "his", sentences: [["He is with his dog.", "dog"], ["That is his red cup.", "cup"]] },
      { word: "who", sentences: [["Who is in the box?", "box"], ["Who can hop?", "bunny"]] },
      { word: "what", sentences: [["What is that?", "bug"], ["What is in the tree?", "bird"]] },
      { word: "when", sentences: [["When will the bus come?", "bus"], ["When can we play with the dog?", "dog"]] },
      { word: "where", sentences: [["Where is my hat?", "hat"], ["Where are the ducks?", "duck"]] },
      { word: "why", sentences: [["Why is the pig in the mud?", "pig"], ["Why is the dog wet?", "cloud"]] },
      { word: "were", sentences: [["We were on the bus.", "bus"], ["They were in the sun.", "sun"]] },
      { word: "said", sentences: [["The duck said, “Quack!”", "duck"], ["Mom said, “Go to bed.”", "bed"]] },
      { word: "come", sentences: [["Come here, little dog!", "dog"], ["Come and see the frog.", "frog"]] },
      { word: "play", sentences: [["We play in the sun.", "sun"], ["I like to play with my cat.", "cat"]] },
      { word: "there", sentences: [["There is a bug on my hat!", "bug"], ["There are two birds.", "bird"]] },
      { word: "their", sentences: [["They like their pets.", "dog"], ["The hens are in their nest.", "hen"]] }
    ]
  },
  {
    id: 6,
    name: "6th Six Weeks",
    color: "purple",
    words: [
      { word: "was", sentences: [["The cat was in the box.", "box"], ["It was hot in the sun.", "sun"]] },
      { word: "each", sentences: [["Each duck is wet.", "duck"], ["We each have a hat.", "hat"]] },
      { word: "use", sentences: [["I use a cup.", "cup"], ["I use my hat in the sun.", "hat"]] },
      { word: "your", sentences: [["Is this your dog?", "dog"], ["I like your hat!", "hat"]] },
      { word: "as", sentences: [["He is as big as a pig!", "pig"], ["She is as fast as a bunny.", "bunny"]] },
      { word: "an", sentences: [["The hen has an egg.", "hen"], ["An ant is on my hat.", "bug"]] },
      { word: "because", sentences: [["I have a hat because it is hot.", "hat"], ["I am wet because of the rain.", "cloud"]] },
      { word: "which", sentences: [["Which one is your cat?", "cat"], ["Which bug is red?", "bug"]] },
      { word: "how", sentences: [["How big is the pig?", "pig"], ["How will we go?", "bus"]] },
      { word: "words", sentences: [["Look at all the words!", "book"], ["I can see my words.", "book"]] }
    ]
  }
];

/* Short spoken prompts and praise (also generated by scripts/generate-audio.mjs). */
window.PHRASES = {
  hello: "Hi friend! Tap a patch to start.",
  look: "Look at the word. Say it with me!",
  spell: "Let's spell it!",
  read: "Now let's read!",
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
