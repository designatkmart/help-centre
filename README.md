# Customer Care — Help Centre Prototype

Interactive, no-backend prototype of the Kmart Help Centre redesign (Figma Design v3).

**Live demo:** https://designatkmart.github.io/help-centre/
**Repo:** https://github.com/designatkmart/help-centre

Deployed automatically to GitHub Pages via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) on every push to `main`.

## Run

```bash
export PATH="$HOME/.local/node/bin:$PATH"   # if using the local Node install
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## What it demos

- AI search bar (mocked Vertex / FAQ summary)
- Suggested question chips
- AI summary card with Joy escalate CTA + thumbs feedback
- Browse help topics
- Still need help cards (Joy, inquiry, Call us on desktop)
- Responsive mobile → desktop layout

Figma is the visual source of truth. Kosmos Storybook is a secondary reference only.

## Design system hookup

See [DS-HOOKUP.md](./DS-HOOKUP.md).