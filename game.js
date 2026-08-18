// ============================================================================
//  GAME LIST  —  add as many games as you want, super easy.
//  Copy one object below, change the fields, save. That's it.
//
//  Three ways to point at a game:
//    file: "games/my-game/index.html"   -> a standalone HTML file in the games/ folder
//    url:  "https://example.com/game"   -> an external link to a game hosted elsewhere
//    html: "<canvas>...</canvas>"        -> raw HTML string, opened in a new tab / about:blank
//
//  Use ONLY ONE of file / url / html per game.
// ============================================================================

const GAMES = [
  {
    slug: "neon-drift",
    title: "Neon Drift",
    description: "Thread a glowing line through an endless field of shifting obstacles. Fast, precise, and built for chasing a new high score.",
    releaseDate: "2025-04-18",
    genre: "Arcade",
    cover: "https://media.base44.com/images/public/6a84e5df6ec1ca36427460df/8527f2ddc_generated_8e547a5a.png",
    file: "games/neon-drift/index.html",
  },
  {
    slug: "gridlock",
    title: "Gridlock",
    description: "Slide, rotate, and align a field of interlocking tiles. Every compact puzzle rewards a different way of seeing the board.",
    releaseDate: "2024-11-02",
    genre: "Puzzle",
    cover: "https://media.base44.com/images/public/6a84e5df6ec1ca36427460df/6f6f71018_generated_303a50b7.png",
    file: "games/gridlock/index.html",
  },
  {
    slug: "orbital",
    title: "Orbital",
    description: "Keep your craft in motion as gravity changes around you. Time each burn carefully and survive one orbit longer.",
    releaseDate: "2025-01-27",
    genre: "Strategy",
    cover: "https://media.base44.com/images/public/6a84e5df6ec1ca36427460df/ee3debce5_generated_93a7a061.png",
    file: "games/orbital/index.html",
  },
  {
    slug: "monochrome",
    title: "Monochrome",
    description: "A focused platformer where light reveals the path and shadow hides it. Reach the exit with as few steps as possible.",
    releaseDate: "2023-08-12",
    genre: "Platformer",
    cover: "https://media.base44.com/images/public/6a84e5df6ec1ca36427460df/4eaacbb4a_generated_432bd45f.png",
    file: "games/monochrome/index.html",
  },

  // ---- EXAMPLE: a game added from an external URL ---------------------------
  // {
  //   slug: "external-2048",
  //   title: "External 2048",
  //   description: "A demo showing how to embed a game hosted somewhere else.",
  //   releaseDate: "2024-06-10",
  //   genre: "Puzzle",
  //   cover: "https://images.unsplash.com/photo-...?w=800",
  //   url: "https://play2048.co/",
  // },

  // ---- EXAMPLE: a game added as raw inline HTML -----------------------------
  // {
  //   slug: "tiny-clicker",
  //   title: "Tiny Clicker",
  //   description: "A one-file game written straight into games.js.",
  //   releaseDate: "2025-09-01",
  //   genre: "Clicker",
  //   cover: "https://images.unsplash.com/photo-...?w=800",
  //   html: "<body style='margin:0;display:grid;place-items:center;height:100vh;font-family:sans-serif;background:#000;color:#fff'>Click me</body>",
  // },
];

// Resolve how to load a game inside an <iframe> and how to open it in a new tab.
function resolveGameSource(game) {
  if (game.url)  return { type: "url",  src: game.url,            newTab: game.url };
  if (game.html) return { type: "html", src: null,                newTab: "about:blank", html: game.html };
  if (game.file) return { type: "file", src: game.file,           newTab: game.file };
  return { type: "empty", src: null, newTab: "about:blank" };
}

// Expose globally (no build step needed for GitHub Pages).
window.GAMES = GAMES;
window.resolveGameSource = resolveGameSource;
