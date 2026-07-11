# 🔥 Fire — Daily Sports Betting Tips Website

A complete, static website for **Fire**, a daily sports-tips service. Built with plain HTML, CSS and JavaScript — no build tools, no framework, no backend required. Ready to push straight to GitHub and host for free on GitHub Pages.

## What's included

- **Hero section** with your win-rate stats and a live results ticker
- **Bet Tip of the Day** — featured single pick
- **Banker of the Week** — with a countdown timer and W/L form strip
- **Basketball Tips** — grid of picks
- **Overs Market** — grid with a confidence meter per pick
- **Live Tips** — in-play picks with a pulsing "LIVE" badge
- Why Choose Fire, VIP membership pricing, testimonials, and FAQ sections
- A floating **WhatsApp button** wired to **+256 783 348 481**, plus WhatsApp buttons throughout the page — every button opens WhatsApp with a pre-filled message
- A responsible-gambling notice in the footer (recommended for any tips/betting site)
- Fully responsive (desktop, tablet, mobile) with a mobile nav menu

## File structure

```
fire-tips/
├── index.html          ← the whole page (structure + content)
├── css/
│   └── style.css        ← all styling/design
├── js/
│   ├── data.js           ← ★ YOUR DAILY TIPS LIVE HERE ★
│   └── script.js         ← site logic (renders cards, countdown, menu, FAQ)
├── assets/
│   └── favicon.svg       ← flame icon used as the browser tab icon
└── README.md
```

## The most important file: `js/data.js`

You do **not** need to touch the HTML or CSS to publish new tips. Every pick on the site is generated from `js/data.js`. Open that file and edit the plain-English fields — team names, pick, odds, confidence ("flames" from 1–5), and status (`pending`, `won`, `lost`, `live`). Save, and refresh the page.

Example of one entry:
```js
const tipOfTheDay = {
  league: "⚽ English Premier League",
  kickoff: "Today · 17:00 EAT",
  home: "Manchester City",
  away: "Everton",
  pick: "Manchester City -1.5 (Asian Handicap)",
  odds: "1.85",
  flames: 5,
  status: "pending"
};
```

All the sample teams, odds and testimonials in this repo are **placeholders** — replace them with your real picks before publishing.

## Step-by-step: get this on GitHub

1. **Create a new repository**
   - Go to [github.com/new](https://github.com/new), name it (e.g. `fire-tips`), leave it empty (no README/license), and click **Create repository**.

2. **Download these files**
   - Save all the files above into a folder on your computer called `fire-tips`, keeping the same folder structure (`css/`, `js/`, `assets/` inside it).

3. **Push the folder to GitHub**
   Open a terminal in that folder and run:
   ```bash
   cd fire-tips
   git init
   git add .
   git commit -m "Initial commit: Fire tips website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/fire-tips.git
   git push -u origin main
   ```
   (No terminal experience? GitHub also lets you drag-and-drop the folder contents directly into the repo via the **"Add file → Upload files"** button in the browser — just make sure `css`, `js`, and `assets` stay as sub-folders.)

4. **Turn on GitHub Pages (free hosting)**
   - In your repo, go to **Settings → Pages**.
   - Under **Source**, choose the `main` branch and `/ (root)` folder, then **Save**.
   - After a minute, GitHub will give you a live link like:
     `https://YOUR-USERNAME.github.io/fire-tips/`

5. **Update your tips daily**
   - Edit `js/data.js` (either locally and `git push`, or directly on GitHub.com by opening the file and clicking the pencil/edit icon), commit the change, and the live site updates automatically within a minute or two.

6. **Optional: use your own domain**
   - Buy a domain (e.g. from Namecheap or a local Ugandan registrar), then in **Settings → Pages → Custom domain**, add it and follow GitHub's DNS instructions.

## Changing the WhatsApp number

The number is set in **one place** — the top of `js/script.js`:
```js
const WHATSAPP_NUMBER = "256783348481"; // international format, no + or spaces
```
Every WhatsApp button on the site reads from this single value, so you only ever need to update it here.

## Swapping images

The hero, basketball and VIP-banner background photos are linked directly from Unsplash (free-to-use, no attribution required) inside `css/style.css`. To use your own photos instead:
1. Add your image files into the `assets/` folder.
2. In `css/style.css`, find the `background-image: ... url('https://images.unsplash.com/...')` lines and replace the URL with `url('../assets/your-photo.jpg')`.

## Notes on the design

- **Colors & fonts:** all defined as CSS variables at the top of `css/style.css` (`:root { ... }`) — change `--ember`, `--gold`, etc. to re-theme the whole site in one place.
- **The ticket-stub cards** (the perforated "betting slip" look) are the signature design element, used consistently across all five tip sections so the site feels like one cohesive product rather than five different layouts.
- **Responsible gambling notice:** kept in the footer intentionally — most reputable tipster/betting sites include one, and it builds trust with users.

## Browser support

Works in all modern browsers (Chrome, Safari, Firefox, Edge). No dependencies beyond Google Fonts (loaded via CDN in `style.css`).
