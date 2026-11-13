# Architecture Document

## 1. Project Identification

| Attribute | Value |
|-----------|-------|
| **Project Name** | tomtapia.github.io |
| **Repository URL** | https://github.com/tomtapia/tomtapia.github.io |
| **Primary Team** | Tomás Tapia (individual maintainer) |
| **Date of Last Update** | 2026-06-02 |
| **License** | GPL-2.0 |
| **Package Manager** | pnpm@10.31.0 |
| **Node Version** | 22 (CI) |

## 2. Project Structure

```text
tomtapia.github.io/
├── src/                                    # Source code (Vite root)
│   ├── index.html                          # Homepage markup
│   ├── privacy.html                        # Privacy policy page
│   ├── main.js                             # Homepage entry point
│   ├── privacy.js                          # Privacy page entry point
│   ├── assets/
│   │   ├── javascripts/
│   │   │   ├── scripts.js                  # Theme, UI interactions, analytics
│   │   │   └── github-projects.js          # GitHub API integration for projects
│   │   ├── stylesheets/
│   │   │   └── style.css                   # Main stylesheet with CSS custom properties
│   │   ├── images/                         # WebP image assets (certifications, profile)
│   │   └── favicon.ico
│   └── public/                             # Static files copied as-is
│       ├── robots.txt
│       └── sitemap.xml
├── .github/
│   ├── workflows/
│   │   └── pages.yml                       # GitHub Pages deploy pipeline
│   └── copilot-instructions.md             # AI assistant guidelines
├── vite.config.js                          # Vite build configuration
├── biome.json                              # Biome formatter/linter config
├── package.json                            # Dependencies and scripts
├── pnpm-lock.yaml                          # Lockfile for reproducible installs
├── AGENTS.md                               # Repository guidelines for agents
├── security-review.md                      # OWASP-style security audit
├── techstack.md / techstack.yml            # Tech stack documentation
└── README.md
```

## 3. High-Level System Diagram

```text
[Visitor Browser]
       |
       v
[GitHub Pages CDN]
       |
       +--> [index.html] --> [main.js] --> [scripts.js] + [github-projects.js]
       |                                      |
       |                                      +--> [GitHub API] (fetch repositories)
       |                                      +--> [Google Analytics]
       |                                      +--> [Ahrefs Analytics]
       |
       +--> [privacy.html] --> [privacy.js]
```

## 4. Architecture Overview

**Architecture Pattern:** Static Site Generator (SSG)

This is a client-side rendered static website built with Vite. It consists of two HTML pages (homepage and privacy policy) with no backend server, no database, and no server-side rendering. The site is compiled into static assets and served via GitHub Pages CDN.

**Key Characteristics:**
- Multi-page static site (not a SPA)
- No JavaScript frameworks (React, Vue, Angular)
- Vanilla JavaScript with DOM manipulation
- CSS custom properties with a fixed dark theme (Minimal Effort palette)
- External CDN dependencies for Bootstrap CSS, Boxicons, Google Fonts

## 5. Core Components

### 5.1 Homepage (`src/index.html` + `src/main.js`)
- **Description:** Primary landing page with hero section, certifications, about, videos, and projects
- **Technologies:** HTML5, Vanilla JavaScript, Bootstrap 5.3.8 (CDN), Boxicons (CDN)
- **Deployment:** Built by Vite, deployed to GitHub Pages

### 5.2 Privacy Page (`src/privacy.html` + `src/privacy.js`)
- **Description:** Privacy policy page with minimal styling
- **Technologies:** HTML5, CSS (shared stylesheet)
- **Deployment:** Built by Vite, deployed to GitHub Pages

### 5.3 Theme (`src/assets/stylesheets/style.css`)
- **Description:** Fixed dark theme using the Minimal Effort palette; no runtime theme switching
- **Technologies:** CSS Custom Properties
- **Key Features:**
  - Theme tokens (colors, surfaces, shadows) defined once in `:root`
  - `color-scheme: dark` for native controls
  - No runtime theme JavaScript or persisted preference

### 5.4 GitHub Projects Integration (`src/assets/javascripts/github-projects.js`)
- **Description:** Fetches and displays public GitHub repositories dynamically
- **Technologies:** Vanilla JavaScript, Fetch API, GitHub REST API
- **Key Features:**
  - Fetches up to 100 repositories sorted by update date
  - Filters out forks, archived repos, and excluded repositories
  - Displays top 6 repositories with language icons, stats, and links
  - DOM-based card generation (no template engine)

### 5.5 Stylesheet (`src/assets/stylesheets/style.css`)
- **Description:** Main stylesheet with CSS custom properties for theming
- **Technologies:** CSS3 with custom properties, Bootstrap utility classes
- **Key Features:**
  - Glass morphism effects
  - Responsive design
  - Custom animation keyframes
  - Gradient backgrounds

## 6. Data Stores

No persistent data stores are used in this application. All data is either:
- Static content embedded in HTML
- Fetched at runtime from external APIs (GitHub API)

| Store | Type | Purpose |
|-------|------|---------|
| GitHub API | External REST API | Public repository data for projects section |

## 7. External Integrations

| Service Name | Purpose | Integration Method |
|--------------|---------|-------------------|
| **GitHub API** | Fetch public repositories for projects section | REST API via `fetch()` in `github-projects.js` |
| **Google Analytics** | Traffic analytics and user behavior tracking | Script tag (`gtag.js`) in `index.html` |
| **Ahrefs Analytics** | SEO and site analytics | Script tag in `index.html` |
| **Bootstrap CDN** | CSS framework for grid and components | CDN link with SRI in HTML |
| **Boxicons CDN** | Icon font for UI elements | CDN link in HTML |
| **Google Fonts CDN** | Web fonts (Instrument Sans, IBM Plex Mono) | CDN link in HTML |
| **jsDelivr CDN** | Potential asset delivery (CSP allowlisted) | Referenced in CSP |
| **YouTube/Vimeo** | Embedded video content | iframe embeds (CSP allowlisted) |

## 8. Security

### 8.1 Authentication & Authorization
- No authentication or authorization mechanisms are implemented
- No user accounts, login flows, or protected resources

### 8.2 Security Controls
- **Content Security Policy (CSP):** Meta tag CSP in `index.html` restricting script/style sources
- **SRI (Subresource Integrity):** Bootstrap CSS protected with integrity hash on homepage
- **Security Headers:** Meta tags for X-Content-Type-Options, Referrer-Policy, Cross-Origin policies
- **noopener noreferrer:** Applied to external links to prevent tabnabbing

### 8.3 Known Security Gaps (Documented in `security-review.md`)
- No HTTP-level security headers (GitHub Pages limitation)
- Privacy page lacks CSP and security meta tags
- CSP allows `unsafe-inline` for scripts
- Inconsistent SRI coverage across third-party assets
- No HSTS (HTTP Strict Transport Security)

### 8.4 Secrets Management
- No secrets or API keys stored in repository
- Google Analytics tracking ID is public (G-J6YT5K3JHY)
- GitHub API calls are unauthenticated (public data only)

## 9. Deployment

### 9.1 Deployment Pipeline

**Platform:** GitHub Pages

**CI/CD Workflow:** `.github/workflows/pages.yml`

```text
[Push to main]
       |
       v
[GitHub Actions]
       |
       +--> Checkout code
       +--> Setup pnpm 10.31.0
       +--> Setup Node.js 22
       +--> Install dependencies (frozen lockfile)
       +--> Build site (pnpm build)
       +--> Upload artifact
       |
       v
[GitHub Pages Deploy]
```

### 9.2 Build Process
1. Vite processes source files from `src/`
2. HTML minification via `vite-plugin-html`
3. JavaScript bundling with esbuild (console/debugger stripped)
4. CSS processing and bundling
5. Asset optimization and hashing
6. Output written to `dist/` directory
7. Static files from `src/public/` copied to `dist/`

### 9.3 Development Environment
- **Dev Server:** `pnpm start` (Vite dev server at 127.0.0.1:8080)
- **Preview:** `pnpm preview` (production preview at 127.0.0.1:4173)
- **Auto-open:** Browser opens automatically on dev start

## 10. Future Considerations

### 10.1 Technical Debt
- No automated test suite (`pnpm test` intentionally fails)
- Biome lint errors exist in source files (unused variables, formatting)
- Security review identifies 4 priority items for remediation
- Legacy `http-server` dependency in devDependencies (unused in current setup)

### 10.2 Identified Risks
- GitHub API rate limiting for unauthenticated requests (60 req/hour)
- Third-party CDN dependencies create supply chain risk
- No response-level security headers on GitHub Pages
- Inconsistent security posture between homepage and privacy page

### 10.3 Potential Improvements
- Add HTTP security headers via Cloudflare or similar edge layer
- Standardize SRI for all third-party assets
- Remove `unsafe-inline` from CSP
- Add unit tests for JavaScript modules
- Self-host critical third-party assets (Bootstrap, Boxicons)

## 11. Glossary

| Term | Definition |
|------|------------|
| **Biome** | Fast formatter and linter for JavaScript/TypeScript/CSS |
| **CSP** | Content Security Policy - browser security mechanism to prevent XSS |
| **esbuild** | Fast JavaScript bundler used by Vite |
| **GitHub Pages** | Free static site hosting service from GitHub |
| **pnpm** | Fast, disk-space efficient package manager |
| **SRI** | Subresource Integrity - hash verification for CDN assets |
| **Vite** | Next-generation frontend build tool |
| **WebP** | Modern image format providing superior compression |
| **CSS Custom Properties** | CSS variables for theme tokens (`--property-name`) |
| **Boxicons** | Open-source icon font library |
| **Bootstrap** | Popular CSS framework for responsive design |
