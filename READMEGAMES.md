# games/

Put each standalone HTML game in its own folder here:

```
games/
  my-game/
    index.html
    style.css
    script.js
    assets/
```

Then in `games.js` point at it with `file: "games/my-game/index.html"`.

Each folder is self-contained and works on its own when opened directly — the archive just embeds it in an iframe.
