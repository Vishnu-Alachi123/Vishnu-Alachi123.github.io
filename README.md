# Vishnu Alachi — Portfolio

A single-page developer portfolio built with **React + TypeScript + Vite**.
Deployed to GitHub Pages via GitHub Actions.

[Visit it here →](https://vishnu-alachi123.github.io)

## Stack

- **React 18 + TypeScript** — component-based, type-safe UI
- **Vite** — dev server and production build
- **CSS Modules** + a small global design system
- An ambient, cursor-reactive **canvas** backdrop (no heavy 3D dependency)
- Live project previews embedded from each product's real URL

## Develop

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # type-check + production build to dist/
npm run preview # preview the production build locally
npm run lint    # eslint
```

## Updating your résumé content (no code needed)

Experience, education, skills, coursework, certifications, and the
"currently learning" list are all driven by **`src/data/resume.json`**.

Edit that file on GitHub and the live site updates automatically — the site
fetches it from the `main` branch at runtime, and a redeploy refreshes the
bundled fallback too.

- **Add certifications:** append to the `certifications` array, e.g.
  ```json
  { "name": "AWS Certified Cloud Practitioner", "issuer": "Amazon Web Services", "year": "2026", "url": "https://..." }
  ```
  The Certifications panel appears automatically once the array is non-empty.
- The downloadable résumé PDF lives at `public/Vishnu_Alachi_resume.pdf`.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app
and publishes `dist/` to GitHub Pages (the workflow also sets the Pages source
to "GitHub Actions" automatically).

## Structure

```
src/
  components/   UI (Nav, Hero, Backdrop, Work, ProjectCard/Preview, About,
                Experience, Contact, Footer, …)
  data/         projects (typed) + resume.json (single source of truth)
  hooks/        useResume, useRepoCount, useScrollSpy
  index.css     design tokens + global base
public/         résumé PDF, favicon, 404 redirect
```
