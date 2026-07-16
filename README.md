# Achieva — Home Dashboard (React)

A working Grade-12 Maths home dashboard for the Achieva app, styled to the founder's
navy + gold design. Built with React + Vite.

## Run it locally (2 minutes)

You need Node.js 18+ installed (check with `node -v`).

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server
```

Open the URL it prints (usually http://localhost:5173).

## Push it to GitHub (5 minutes)

```bash
git init
git add .
git commit -m "Achieva home dashboard"
git branch -M main
git remote add origin https://github.com/<your-username>/achieva-dashboard.git
git push -u origin main
```

(Create the empty `achieva-dashboard` repo on GitHub first, then run the commands above
inside this folder.)

## Optional — put it live on GitHub Pages

```bash
npm run build            # outputs to /dist
```

Then either enable Pages on the `dist` output, or use the `gh-pages` package.
For a quick public demo, dropping the repo into Vercel or Netlify is faster than Pages.

## Where things are

- `src/App.jsx` — the whole dashboard (design tokens, cards, bottom nav)
- `src/main.jsx` — entry point
- `index.html` — HTML shell

## Notes

- This is a **React web** build — great for demos and the mentor deliverable.
- The real Achieva v1 app is **React Native** (offline-first, low-end Android).
  This dashboard is a faithful visual/UX reference, not the RN production screen.
