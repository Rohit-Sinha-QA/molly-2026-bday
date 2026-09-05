# For You 💗

A mysterious, romantic, interactive website — an apology and a love letter, built as a little journey with games and surprises.

## 1. Personalize it (do this first)

Open **`js/config.js`** — that's the only file you need to edit. Fill in:

- `herName` / `yourName`
- `apologyLetter` — your own words (already has a draft you can keep, tweak, or replace)
- `memories` — captions for your photos
- `reasons` — your own "reasons I love you" list
- `cipherMessage` — a secret message that gets encoded and she decodes with a slider
- `finalLetter` — your closing words

## 2. Add photos (optional but recommended)

Drop images into `assets/photos/` named `photo1.jpg` through `photo6.jpg` (see the README in that folder). If you skip this, tasteful placeholder cards show instead — nothing breaks.

## 3. Add music (optional)

Drop an mp3 named `song.mp3` into `assets/audio/`. A music toggle button appears automatically if the file exists.

## 4. Preview it locally

Just double-click `index.html` to open it in a browser, or for the full experience (some browsers restrict local file access for audio), run a quick local server from this folder:

```
npx serve .
```

then open the printed localhost link.

## 5. Deploy to Netlify

- Go to [app.netlify.com](https://app.netlify.com), log in.
- Drag and drop this entire folder onto the Netlify dashboard ("Deploys" → drag & drop), **or** connect it as a Git repo and deploy from there.
- Netlify will give you a live URL (like `yourname-loves-you.netlify.app`) — you can rename the site in Site settings → change site name.
- Send her the link.

## How the site works

- **Lock screen**: she has to type the date of her birthday (`unlockDay`/`unlockMonth` in config) to get in.
- **Chapters**: apology letter → photo memory lane → memory-match game → cipher decoder → reasons I love you flip cards → make-a-wish candle → final letter + "I forgive you" button with confetti.
- **Hidden hearts**: 5 tiny hearts are scattered across the chapters for her to click and find, tracked top-right.
- Everything is plain HTML/CSS/JS — no build step, so it deploys to Netlify as-is.
"# molly-2026-bday" 
