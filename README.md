# FIFA WC 26 Predictive Engine

An interactive FIFA World Cup 2026 prediction bracket — set group standings, run the
knockouts, save multiple variations, and share. A product by **Vaibhav Dashora**.

The whole app is a single self-contained file: **`index.html`**. No backend, no build step.

---

## Host it for free (GitHub Pages)

You only need a free GitHub account. ~5 minutes.

### 1. Create a repository
- Go to https://github.com/new
- Name it e.g. `wc26-engine`, set it **Public**, click **Create repository**.

### 2. Upload these files
Either drag-and-drop in the GitHub web UI (Add file → Upload files) or use git:

```bash
git init
git add .
git commit -m "WC26 Predictive Engine"
git branch -M main
git remote add origin https://github.com/<your-username>/wc26-engine.git
git push -u origin main
```

Upload **everything in this folder**: `index.html`, `package.json`,
`playwright.config.js`, the `tests/` folder, and the `.github/` folder.

### 3. Turn on GitHub Pages
- In your repo: **Settings → Pages**
- Under **Build and deployment → Source**, choose **GitHub Actions**.

That's it. On every push to `main`, the included workflow will:
1. Run the Playwright tests, and
2. Deploy automatically **only if the tests pass**.

Your site goes live at:
```
https://<your-username>.github.io/wc26-engine/
```
Share that link with anyone — it works on phones and desktops, no install needed.

> Tip: each visitor's saved scenarios live in **their own browser** (localStorage),
> so people's predictions stay private to them. The Share / Download button still lets
> them hand a fully-filled bracket to someone else as a file.

---

## Other one-click hosts (no git needed)
- **Netlify Drop** — https://app.netlify.com/drop — drag this folder in, done.
- **Cloudflare Pages** — connect the repo or upload directly; very fast globally.
- **Vercel** — import the repo and deploy.

For all of these, `index.html` at the root is served automatically.

---

## Run the UI tests locally

```bash
npm install
npx playwright install --with-deps chromium
npm test            # headless
npm run test:headed # watch it run in a browser
```

Tests cover: group rendering and standings, the 3rd-place qualifier panel, all 31
knockout ties, full (non-truncated) team names, the SVG connectors, pick interactions,
Reset to Baseline, and Random Run. See `tests/bracket.spec.js`.

---

## Project structure
```
index.html                     the entire app
package.json                   test scripts + Playwright dep
playwright.config.js           desktop + mobile test profiles, local server
tests/bracket.spec.js          UI test suite
.github/workflows/deploy.yml   CI: test, then deploy to Pages on success
```
