# Copilot Instructions for tomtapia.github.io

- Project: single-page resume site served statically via GitHub Pages; all markup in [index.html](../index.html) (hero, certifications, about, videos, projects, footer).
- Dev server: run `npm install` then `npm run start` (http-server on port 8080, no bundler). Nothing builds or transpiles; edit HTML/CSS/JS directly.
- Layout patterns: sections use `.page-section` / `.page-section-alt` wrappers with divider elements; keep new sections consistent with the existing structure in [index.html](../index.html).
- Styling: global theme and glassy UI live in [assets/stylesheets/style.css](../assets/stylesheets/style.css) using CSS custom properties for the indigo palette; prefer updating tokens and shared classes there instead of inline styles.
- Typography/icons: uses Google Fonts (Inter, Montserrat) and Boxicons loaded from CDNs; match existing font stacks and icon set when adding UI.
- JavaScript: minimal behavior in [assets/javascripts/scripts.js](../assets/javascripts/scripts.js); includes GA `gtag` init and client-side contact form validation/sanitization with Bootstrap feedback. No backend submit (currently logs to console), so keep any new form logic purely client-side unless adding an endpoint.
- CSP: strict policy declared in the `<head>` of [index.html](../index.html); only allowlisted CDNs (Google Fonts, Boxicons, jsDelivr, GTM, Ahrefs). If adding third-party assets, update the CSP meta accordingly.
- Analytics: Ahrefs analytics and Google Analytics (G-J6YT5K3JHY) are loaded; preserve script order/defer attributes near the end of [index.html](../index.html) to avoid blocking rendering.
- Structured data/SEO: meta tags for OG/Twitter plus JSON-LD Person block live at the bottom of [index.html](../index.html); update these when changing name/roles/social links. Hero and social cards rely on WebP assets under [assets/images](../assets/images).
- Assets: images are WebP; keep alt text and `loading` hints consistent. Buttons/links expect Boxicon classes and Bootstrap utility spacing.
- Asset conversions: prefer WebP. For PNG batch conversions run `for f in assets/images/*.png; do base=${f%.png}; cwebp -quiet "$f" -o "${base}.webp"; done`. For PDFs, use `pdftoppm -png -singlefile "path/to/file.pdf" path/to/output_basename` then `cwebp -quiet "output_basename.png" -o "output_basename.webp"` (ImageMagick `convert` needs Ghostscript, not available by default).
- CSS conventions: prefers gradient/blur backgrounds, animated accents, and consistent spacing; reuse existing helper classes (e.g., `.btn-primary-custom`, `.project-card`, `.video-card`).
- Accessibility/performance: navigation uses smooth scroll and glass backdrop; continue providing descriptive `alt`, avoid inline event handlers, and respect lazy loading where present.
- Tests/CI: no automated tests; GitHub Actions run CodeQL and Pages deploy only. Validate changes locally in the browser.
- Tech stack summary and badges are documented in [techstack.md](../techstack.md) and [README.md](../README.md); keep these files aligned if the stack changes.
