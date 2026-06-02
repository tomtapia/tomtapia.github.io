# Repository Guidelines

## Project Structure & Module Organization

Vite-based static site for GitHub Pages. Multi-page setup with entry points in `src/`:

- `src/index.html`, `src/privacy.html` — page markup
- `src/main.js`, `src/privacy.js` — per-page entry points
- `src/assets/javascripts/` — shared logic (e.g., `scripts.js`, `github-projects.js`)
- `src/assets/stylesheets/style.css` — main stylesheet
- `src/assets/images/` — local image assets
- `src/public/` — static files copied as-is (`robots.txt`, `sitemap.xml`)
- `.github/workflows/pages.yml` — GitHub Pages deploy pipeline

## Build, Test, and Development Commands

- `pnpm install` — install dependencies (uses frozen lockfile in CI)
- `pnpm start` — dev server at `127.0.0.1:8080` with auto-open browser
- `pnpm build` — production bundle to `dist/` (baseline validation)
- `pnpm preview` — serve built site at `127.0.0.1:4173`
- `pnpm check` — Biome lint, format, and import checks
- `pnpm format` — apply Biome formatting in place
- `pnpm lint` — Biome lint only

**Note:** `pnpm test` intentionally fails. There is no automated test suite yet.

**Validation order:** `pnpm build` → `pnpm check` → manual browser check with `pnpm start`

## Coding Style & Naming Conventions

- Plain HTML, CSS, and modern JavaScript (no frameworks)
- **Biome is the source of truth** for formatting, imports, and linting (config: `biome.json`)
- **Tab indentation**, **double quotes** for JavaScript
- Do not introduce ESLint or Prettier configs
- Use kebab-case for filenames (e.g., `github-projects.js`)
- Keep page-specific logic in entry points; reusable code goes in `src/assets/javascripts/`
- Extend existing visual language; do not introduce new design systems unless requested

## Testing Guidelines

No automated tests. Minimum verification:

1. `pnpm build`
2. `pnpm check`
3. Manual browser validation with `pnpm start`

For layout/responsive changes, verify both desktop and mobile widths.

## Commit & Pull Request Guidelines

- **Conventional Commits:** `feat(site): ...`, `fix(seo): ...`, `chore(config): ...`
- PRs should include a concise summary, screenshots for visible UI changes, and exact verification steps
- Deploys automatically on merge to `main` via GitHub Pages workflow

## Agent-Specific Instructions

- **Package manager:** Use `pnpm` only. Never use `npm` or `npx`.
- **Lockfile:** `pnpm-lock.yaml` is committed; security overrides are in `package.json`
- **Search:** Prefer `rg` for code search
- **Validation:** Always run `pnpm build` and `pnpm check` before finishing
- **Vite config quirks:**
  - Root is `src/`, build output is `../dist`
  - `server.open: true` auto-opens browser
  - `esbuild.drop: ['console', 'debugger']` strips debug code in production
  - `build.sourcemap: 'hidden'` generates maps without exposing references
- **GitHub workflows:** Use `gh` CLI for PR/review/security-alert tasks when needed
- **Skills:** Use available OpenCode skills only when they match the task (e.g., GitHub plugin skills for PR triage)
