# Vishnu Alachi — Portfolio

A single-page developer portfolio built with **React + TypeScript + Vite**, with
an interactive **three.js** (react-three-fiber) hero. Deployed to GitHub Pages
via GitHub Actions.

[Visit it here →](https://vishnu-alachi123.github.io)

## Stack

- **React 18 + TypeScript** — component-based, type-safe UI
- **Vite** — dev server and production build
- **react-three-fiber / three.js** — the WebGL hero scene (lazily code-split)
- **CSS Modules** + a small global design system (blueprint aesthetic)

## Develop

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # type-check + production build to dist/
npm run preview # preview the production build locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app
and publishes `dist/` to GitHub Pages.

> **One-time setup:** in the repository's **Settings → Pages**, set
> **Source** to **GitHub Actions**.

## Structure

```
src/
  components/   UI components (Nav, Hero, Work, About, Experience, Contact, …)
  data/         project + experience content (typed)
  hooks/        useRepoCount, useScrollSpy
  index.css     design tokens + global base
public/         static assets (résumé PDF, favicon, 404 redirect)
```
