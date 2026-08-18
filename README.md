# HTML Game Archive

A minimal, GitHub Pages–ready archive for standalone HTML games. Black + white, Google-clean UI. No build step — just static files.

## Features
- Home page with instant name search
- Favorites that persist in the browser (localStorage)
- Detail view: cover, description, release date
- Full-screen player with three circular controls (top-left):
  - **Close game** — go back
  - **Open game in new tab** — opens the game in a new tab (inline-HTML games open in a clean `about:blank` tab)
  - **Go back home**
- Add games from a **file**, a **URL**, or **inline HTML**

## Run it
1. Put these files at the root of a GitHub repo (or in a `docs/` folder).
2. Settings → Pages → source: your branch (`/root` or `/docs`).
3. Done. Your archive is live.

To run locally, just open `index.html` in a browser (or use any static server).

## Add a game (super easy)
Open `games.js` and copy one object into the `GAMES` array. Pick **one** of these ways to point at the game:

```js
// 1) A standalone HTML file inside the games/ folder
{
  slug: "my-game",
  title: "My Game",
  description: "One sentence about it.",
  releaseDate: "2025-01-01",
  genre: "Arcade",
  cover: "https://example.com/cover.png",
  file: "games/my-game/index.html",
},

// 2) An external URL
{
  slug: "external-game",
  title: "External Game",
  description: "Hosted somewhere else.",
  releaseDate: "2025-01-01",
  genre: "Puzzle",
  cover: "https://example.com/cover.png",
  url: "https://example.com/game",
},

// 3) Raw inline HTML (opened in a new about:blank tab)
{
  slug: "tiny-game",
  title: "Tiny Game",
  description: "Written right here.",
  releaseDate: "2025-01-01",
  genre: "Clicker",
  cover: "https://example.com/cover.png",
  html: "<body style='margin:0;display:grid;place-items:center;height:100vh;background:#000;color:#fff;font-family:sans-serif'>Click me</body>",
},
```

That's it — save and refresh. The game shows up in the archive.

## Where the games live
Standalone HTML games go in the `games/` folder, one folder per game:
```
games/
  neon-drift/index.html
  gridlock/index.html
  ...
```

Each game folder is fully self-contained (its own HTML/CSS/JS/assets), so it also works on its own when opened directly.
