# Repository Guidelines

## Project Structure & Module Organization
This repo is a Vite-based static site for `tomtapia.github.io`. Keep page entry files in `src/`:
- `src/index.html` and `src/privacy.html` define page markup.
- `src/main.js` and `src/privacy.js` bootstrap each page.
- `src/assets/javascripts/` holds shared browser logic such as `scripts.js` and `github-projects.js`.
- `src/assets/stylesheets/style.css` is the main stylesheet.
- `src/assets/images/` stores local image assets.
- `src/public/` contains static files copied as-is at build time, including `robots.txt` and `sitemap.xml`.
- `.github/workflows/` contains Pages deploy and repository automation workflows.

## Build, Test, and Development Commands
- `pnpm install`: install dependencies and honor the committed `pnpm` lockfile.
- `pnpm start`: run the local Vite dev server at `127.0.0.1:8080`.
- `pnpm build`: create the production bundle in `dist/`. This is the baseline validation command.
- `pnpm preview`: serve the built site locally at `127.0.0.1:4173`.
- `pnpm lint`: run Biome lint rules across the repository.
- `pnpm format`: apply Biome formatting in place.
- `pnpm check`: run Biome formatting, import organization, and lint checks together.

There is no real automated test suite yet. `pnpm test` intentionally exits with failure and must not be used as a completion signal.

## Coding Style & Naming Conventions
Use plain HTML, CSS, and modern JavaScript. Let Biome be the source of truth for formatting, import organization, and linting; do not introduce separate ESLint or Prettier config unless the repo explicitly re-scopes that decision. Keep page-specific setup in the page entrypoint and move reusable logic into `src/assets/javascripts/`. Prefer descriptive kebab-case filenames such as `github-projects.js`. Extend the existing visual language instead of introducing a new design system unless the task explicitly asks for one.

## Testing Guidelines
Minimum verification for changes is:
- `pnpm build`
- `pnpm check`
- manual browser validation with `pnpm start`

For layout, responsive, or modal changes, verify both desktop and mobile-width behavior. If tests are added later, place them near the related feature and use clear names such as `featured-projects.test.js`.

## Commit & Pull Request Guidelines
Follow Conventional Commits used in history, for example `feat(site): load featured projects from github` or `fix(seo): shorten privacy metadata`. PRs should include a concise summary, screenshots for visible UI changes, and the exact verification performed.

## Security & Agent Notes
Prefer `pnpm` over `npm`; this repo uses `pnpm-lock.yaml` and committed `pnpm.overrides` for security fixes. Check local files first, then use approved tools. Prefer `rg` for search, `pnpm build` and `pnpm check` for validation, `gh` for PR, review, and security-alert workflows when GitHub context is required, and Biome as the repository replacement for ESLint and Prettier. Use available skills only when they match the task, especially GitHub plugin skills for PR triage, review feedback, CI debugging, or publishing.
