# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vite-based static site for `tomtapia.github.io`.

- `src/index.html` and `src/privacy.html`: page entry files
- `src/main.js` and `src/privacy.js`: Vite entrypoints per page
- `src/assets/javascripts/`: shared browser logic such as `scripts.js` and `github-projects.js`
- `src/assets/stylesheets/style.css`: primary site styling
- `src/assets/images/`: local images and certificate assets
- `src/public/`: static files copied as-is at build time, such as `robots.txt` and `sitemap.xml`
- `.github/workflows/`: GitHub Actions for Pages deploy and repository automation

## Build, Test, and Development Commands
- `pnpm install`: install dependencies
- `pnpm start`: run the local dev server on `127.0.0.1:8080`
- `pnpm build`: produce the production build in `dist/`
- `pnpm preview`: serve the built output locally on `127.0.0.1:4173`

There is no real automated test suite yet. The current `pnpm test` script intentionally fails and should not be used as validation.

## Coding Style & Naming Conventions
Use plain HTML, CSS, and modern JavaScript with 2-space indentation. Keep page-specific bootstrap logic in the page entrypoint and reusable code in `src/assets/javascripts/`. Prefer descriptive kebab-case filenames like `github-projects.js`. Keep CSS additions in the existing visual language; avoid introducing a separate design system unless requested.

## Testing Guidelines
Minimum verification for any change is:
- `pnpm build`
- manual browser check with `pnpm start`

When changing layout, responsive behavior, or modals, verify both desktop and mobile-width behavior. If adding tests later, place them near the related feature and use clear names such as `featured-projects.test.js`.

## Commit & Pull Request Guidelines
Follow the existing Conventional Commit pattern from git history:
- `feat(site): load featured projects from github`
- `fix(seo): shorten privacy metadata`
- `refactor(site): polish projects and certification modal`

PRs should include a concise summary, screenshots for visible UI changes, and the exact verification performed.

## Agent-Specific Instructions
Agents should prefer local repo inspection first, then approved tools. Use available skills when they clearly match the task, especially `using-superpowers`, `brainstorming` for UI/feature work, `systematic-debugging` for defects, and `verification-before-completion` before claiming success. Prefer `rg` for search, `gh` for PR/review workflows, and `pnpm build` as the baseline validation step.
