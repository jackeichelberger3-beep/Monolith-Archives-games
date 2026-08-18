// ============================================================================
//  HTML ARCHIVE — single-file app (no build step, GitHub Pages friendly)
//  Routes (hash-based):  #/            home + search
//                        #/favorites   saved games
//                        #/games/:slug detail view
//                        #/play/:slug  full-screen player
// ============================================================================

const FAV_KEY = "game-archive-favorites";
const $ = (sel) => document.querySelector(sel);
const app = document.getElementById("app");

const getFavorites = () => { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch { return []; } };
const setFavorites = (list) => localStorage.setItem(FAV_KEY, JSON.stringify(list));
const toggleFavorite = (slug) => {
  const list = getFavorites();
  const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
  setFavorites(next);
  return next;
};
const findGame = (slug) => GAMES.find((g) => g.slug === slug);

const fmtDate = (iso) => new Date(iso + "T00:00:00").toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

// ---------- Icons (inline SVG so no external deps) ----------
const ico = {
  gamepad: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.05-.01.1-.015.152L2 12c-.012.095-.018.19-.018.285A4 4 0 0 0 6 16.32a4 4 0 0 0 3.13-1.5l.37-.45h3l.37.45a4 4 0 0 0 3.13 1.5 4 4 0 0 0 4-3.715c0-.095-.006-.19-.018-.285l-.687-3.258A4 4 0 0 0 17.32 5z"/></svg>',
  heart: (filled) => `<svg width="17" height="17" viewBox="0 0 24 24" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>`,
  arrowUpRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>',
  search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  arrowLeft: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  play: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
  x: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  external: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
};

// ---------- Header ----------
function renderHeader(active) {
  return `
    <header class="header">
      <div class="header-inner">
        <a href="#/" class="brand">
          <span class="brand-mark">${ico.gamepad}</span>
          <span>HTML Archive</span>
        </a>
        <a href="#/favorites" class="nav-link ${active === "favorites" ? "active" : ""}">${ico.heart(false)} Favorites</a>
      </div>
    </header>`;
}

// ---------- Card ----------
function cardHTML(game, favorites) {
  const fav = favorites.includes(game.slug);
  return `
    <article class="card">
      <a href="#/games/${game.slug}" class="card-cover"><img src="${game.cover}" alt="${game.title} cover artwork" loading="lazy" /></a>
      <div class="card-body">
        <div class="card-top">
          <div>
            <p class="card-genre">${game.genre}</p>
            <h2 class="card-title">${game.title}</h2>
          </div>
          <button class="fav-btn ${fav ? "active" : ""}" data-fav="${game.slug}" aria-label="${fav ? "Remove from" : "Add to"} favorites">${ico.heart(fav)}</button>
        </div>
        <a href="#/games/${game.slug}" class="card-link">View details ${ico.arrowUpRight}</a>
      </div>
    </article>`;
}

function gridHTML(list, favorites, emptyText) {
  if (!list.length) return `<div class="empty">${emptyText}</div>`;
  return `<div class="grid">${list.map((g) => cardHTML(g, favorites)).join("")}</div>`;
}

// ---------- Pages ----------
function pageHome() {
  const favorites = getFavorites();
  const render = (query) => {
    const q = query.trim().toLowerCase();
    const list = q ? GAMES.filter((g) => g.title.toLowerCase().includes(q)) : GAMES;
    app.innerHTML = `
      ${renderHeader()}
      <main class="main">
        <section>
          <p class="eyebrow">Independent browser games, preserved.</p>
          <h1 class="hero-title">Play the archive.</h1>
          <p class="hero-sub">A quiet home for standalone HTML games. Search the collection, save your favorites, and play without leaving the archive.</p>
        </section>
        <div class="search-wrap">
          <span class="search-icon">${ico.search}</span>
          <input id="search" class="search-input" placeholder="Search games by name" value="${query.replace(/"/g, "&quot;")}" aria-label="Search games" />
        </div>
        <div class="section-head">
          <h2 class="section-title">All games</h2>
          <span class="section-count">${list.length} ${list.length === 1 ? "game" : "games"}</span>
        </div>
        ${gridHTML(list, favorites, q ? `No games match “${query}”.` : "No games yet. Add one in games.js.")}
      </main>`;
    const input = $("#search");
    input.addEventListener("input", (e) => render(e.target.value));
    input.focus();
    bindFavorites();
  };
  render("");
}

function pageFavorites() {
  const favorites = getFavorites();
  const saved = GAMES.filter((g) => favorites.includes(g.slug));
  app.innerHTML = `
    ${renderHeader("favorites")}
    <main class="main">
      <p class="eyebrow">Your collection</p>
      <h1 class="hero-title" style="font-size:3.5rem">Favorites</h1>
      ${gridHTML(saved, favorites, "No favorites yet. Save a game from the archive to find it here.")}
    </main>`;
  bindFavorites();
}

function pageDetail(slug) {
  const game = findGame(slug);
  if (!game) return pageNotFound();
  const favorites = getFavorites();
  const fav = favorites.includes(game.slug);
  app.innerHTML = `
    <main class="main" style="padding-top:2rem">
      <a href="#/" class="back-link">${ico.arrowLeft} Back to archive</a>
      <div class="detail-grid">
        <img src="${game.cover}" alt="${game.title} cover artwork" class="detail-cover" />
        <section>
          <p class="detail-genre">${game.genre}</p>
          <h1 class="detail-title">${game.title}</h1>
          <p class="detail-desc">${game.description}</p>
          <dl class="detail-meta"><div><dt>Released</dt></div><div><dd>${fmtDate(game.releaseDate)}</dd></div></dl>
          <div class="detail-actions">
            <a href="#/play/${game.slug}" class="btn-primary">${ico.play} Launch game</a>
            <button class="btn-ghost" data-fav="${game.slug}">${ico.heart(fav)} ${fav ? "Saved" : "Save favorite"}</button>
          </div>
        </section>
      </div>
    </main>`;
  bindFavorites();
}

function openGameInNewTab(game) {
  const src = resolveGameSource(game);
  if (src.type === "html") {
    // Open a clean about:blank tab and write the game HTML into it.
    const w = window.open("about:blank", "_blank");
    if (w) { w.document.open(); w.document.write(src.html); w.document.close(); }
  } else {
    window.open(src.newTab, "_blank");
  }
}

function pagePlayer(slug) {
  const game = findGame(slug);
  if (!game) return pageNotFound();
  const src = resolveGameSource(game);
  const iframeAttrs = src.type === "html"
    ? `srcdoc="${src.html.replace(/"/g, "&quot;")}"`
    : `src="${src.src || ""}"`;
  app.innerHTML = `
    <main class="player">
      <div class="player-controls">
        <button class="pctrl" id="ctrl-close" title="Close game" aria-label="Close game">${ico.x}</button>
        <button class="pctrl" id="ctrl-newtab" title="Open game in new tab" aria-label="Open game in new tab">${ico.external}</button>
        <a href="#/" class="pctrl" title="Go back home" aria-label="Go back home">${ico.arrowLeft}</a>
      </div>
      <iframe title="${game.title} game" ${iframeAttrs} allow="autoplay; fullscreen; gamepad"></iframe>
    </main>`;
  $("#ctrl-close").addEventListener("click", () => history.back());
  $("#ctrl-newtab").addEventListener("click", () => openGameInNewTab(game));
}

function pageNotFound() {
  app.innerHTML = `
    <main class="notfound">
      <div>
        <h1>404</h1>
        <p>This page wandered out of the archive.</p>
        <a href="#/" class="btn-primary">Back home</a>
      </div>
    </main>`;
}

// ---------- Favorite button wiring (delegated) ----------
function bindFavorites() {
  document.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slug = btn.getAttribute("data-fav");
      const next = toggleFavorite(slug);
      // Re-render current view to reflect the change.
      route();
      // Preserve search input focus/text on home by restoring from state.
      if (location.hash === "#/" && lastQuery) { const i = $("#search"); if (i) { i.value = lastQuery; i.focus(); } }
      void next;
    });
  });
}

let lastQuery = "";

// ---------- Router ----------
function route() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const [path, param] = hash.split("/").filter(Boolean); // e.g. ["games","neon-drift"]
  const top = "/" + (path || "");

  if (hash === "/" || hash === "") { pageHome(); }
  else if (top === "/favorites") { pageFavorites(); }
  else if (top === "/games" && param) { pageDetail(param); }
  else if (top === "/play" && param) { pagePlayer(param); }
  else { pageNotFound(); }
}

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", route);
