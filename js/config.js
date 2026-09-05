/* ============================================================
   EDIT ME — this is the only file you should need to touch.
   Fill in your details, memories, and photos here.
   Everything on the site pulls from this one object.
   ============================================================ */

const CONFIG = {

  // ---------- Names ----------
  herName: "My Love",          // TODO: her name
  yourName: "Me",              // TODO: your name

  // ---------- The unlock puzzle ----------
  // She has to type the date of her birthday to unlock the site (DD and MM).
  // This is deliberate: it's you proving you'll never forget it again.
  unlockDay: "02",
  unlockMonth: "09",
  unlockHint: "Hint: it's the day when my love was born.",

  // ---------- Chapter 1: The Apology Letter ----------
  apologyLetter: [
    "My love,",
    "There isn't a version of September 2nd where you didn't deserve the world.",
    "And I missed it. I let the one day that was entirely, only yours, pass by without saying it out loud.",
    "Not because I forgot you — I could never — but because I failed you on the one day I was supposed to make you feel like the center of the universe.",
    "I've thought about it every day since. About how it felt from your side. About the message that never came.",
    "So today, on my birthday, the one day that's supposed to be about me, I want to spend it making things right — because you matter more to me than any date on a calendar ever could.",
    "This whole little world I built is my way of saying: I see you, I adore you, and I am so, so sorry.",
    "Keep going. There's more waiting for you.",
  ],

  // ---------- Chapter 2: Memory Lane ----------
  // Drop your photos into assets/photos/ using these exact filenames.
  // Until you do, pretty placeholder cards will show instead.
  memories: [
    { file: "photo1.jpg", caption: "Long before this website, before any of it — some part of me already knew." },
    { file: "photo2.jpg", caption: "Somewhere back when we were just kids who didn't know what was coming." },
    { file: "photo3.jpg", caption: "Quiet coffee dates, just talking for hours." },
    { file: "photo4.jpg", caption: "That afternoon on the old fort bench — just us, and nowhere else to be." },
    { file: "photo5.jpg", caption: "Dressed up for the festival, matching without even planning it." },
    { file: "photo6.jpg", caption: "Some evenings just felt sacred." },
    { file: "photo7.jpg", caption: "So close I could feel you smiling." },
    { file: "photo8.jpg", caption: "The whole city lit up around us, and I still only saw you." },
    { file: "photo9.jpg", caption: "You, looking at me like that. I never got over it." },
    { file: "photo10.jpg", caption: "Dancing badly, laughing loudly, loving every second." },
    { file: "photo11.jpg", caption: "The quiet, half-asleep moments where it's just us — my favorite kind." },
    { file: "photo12.jpg", caption: "Late night walks, still finding new streets to get lost in with you." },
  ],

  // ---------- Finale photo ----------
  // Shown near the very end, alongside the final letter.
  finaleImage: { file: "photo_finale.jpg", caption: "Every birthday, past and future, I want to spend celebrating you." },

  // ---------- Chapter 3: Reasons I Love You ----------
  reasons: [
    "The way you laugh at your own jokes before you even finish them.",
    "How you make every ordinary day feel like an occasion.",
    "Your heart — soft for everyone, even when the world isn't soft back.",
    "The way you say my name when you're annoyed at me (like right now).",
    "How safe I feel just knowing you're mine.",
    "The way you remember tiny details I mention once.",
    "Your patience with me, especially when I don't deserve it.",
    "Simply put — you. All of you.",
  ],

  // ---------- Chapter 5: Cipher message ----------
  // This gets encoded automatically — just write the plain message.
  cipherMessage: "YOU ARE THE BEST THING THAT HAS EVER HAPPENED TO ME",

  // ---------- Chapter 6: Make a Wish ----------
  wishMessage: "Whatever you just wished for — I'll spend this whole year trying to make it come true.",

  // ---------- Finale ----------
  finalLetter: [
    "I know a website doesn't undo a missed birthday.",
    "But I hope it shows you how much space you take up in my heart, and my head, every single day — not just on the days I remember to say it.",
    "Happy (belated, deeply and forever apologized-for) birthday, my love.",
    "Thank you for loving someone still learning how to love you the way you deserve.",
    "I promise — from here on — every single one of your days gets remembered, celebrated, and made a little brighter by me.",
    "Forgive me?",
  ],

  // ---------- Optional background music ----------
  // Drop an mp3 at assets/audio/song.mp3 and it will auto-appear as a toggle.
  songPath: "assets/audio/song.mp3",
};
