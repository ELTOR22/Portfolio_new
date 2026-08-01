# Louie Torreña — Portfolio

A single-page, dark "HUD/terminal" style developer portfolio. Plain HTML/CSS/JS —
no build step, no dependencies to install. Edit the files directly and push.

## Files

```
index.html    → all content (structure + copy)
style.css     → all styling and color tokens
script.js     → terminal typing effect, background animation, counters, scroll reveals
Louie_Torrena_Resume.pdf → the file the "Download Résumé" buttons link to
```

## Quick customize checklist

1. **Projects** — `index.html`, section `id="projects"`. Replace the three placeholder
   `<article class="project-card">` blocks with your real projects: title, description,
   tech tags, and links (`Live demo`, `Source`). Copy/paste the block to add more.
2. **Resume file** — replace `Louie_Torrena_Resume.pdf` with an updated export, keeping
   the same filename (or update the `href` in the two `download` buttons in `index.html`).
3. **Contact info** — email, phone, and LinkedIn appear in the `about` and `contact`
   sections in `index.html`. Update both spots.
4. **Colors** — open `style.css`, edit the `:root { --cyan / --violet / --bg ... }`
   block at the top. Every color on the page is derived from those variables.
5. **Terminal intro lines** — `script.js`, the `lines` array near the top, controls
   the typing animation text in the hero terminal window.
6. **Experience / Education / Skills** — plain HTML blocks in `index.html`, edit the
   text directly (no data files or templating involved).

## Run locally

No build tools needed — just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy for free with GitHub Pages

1. Create a new GitHub repo (e.g. `louie-portfolio`) and push these files to the
   `main` branch (they can sit at the repo root).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`, then **Save**.
4. Wait a minute, then your site is live at:
   `https://<your-github-username>.github.io/<repo-name>/`
5. Optional: add a custom domain in the same Pages settings screen.

Any time you push a change to `main`, GitHub Pages redeploys automatically.
"# Portfolio_new" 
