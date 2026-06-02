# Security Review

Reviewed on 2026-05-03 for the live site at `https://tomtapia.github.io/` using OWASP ASVS L1 and OWASP WSTG-style checks adapted to a static GitHub Pages portfolio.

## Scope
- Public pages: `/` and `/privacy.html`
- Client-side JavaScript in `src/assets/javascripts/`
- Transport, headers, browser security controls, third-party dependencies, and obvious DOM injection risks

## Method
- Live response header inspection with `curl -I`
- Live HTML inspection of the deployed homepage
- Local source review of `src/index.html`, `src/privacy.html`, `src/assets/javascripts/scripts.js`, and `src/assets/javascripts/github-projects.js`
- Browser snapshot with Lighthouse best-practices checks

## Findings

### 1. Missing response-level security headers on all pages
Severity: Medium

Live responses from GitHub Pages do not include `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, or `frame-ancestors`. The homepage compensates with meta tags in [`src/index.html`](./src/index.html), but those are weaker than real HTTP headers and do not provide HSTS. The privacy page has no equivalent meta security controls.

Impact:
- The site remains frameable, which leaves it exposed to clickjacking.
- HSTS is absent, so browsers are not instructed to pin HTTPS for future visits.
- Security behavior is inconsistent across pages.

Recommendation:
- Put the site behind a layer that can set response headers, such as Cloudflare.
- Set at minimum: `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options` or CSP `frame-ancestors`, `Referrer-Policy`, and `X-Content-Type-Options`.

### 2. Privacy page lacks CSP and related browser hardening
Severity: Medium

The homepage declares CSP and related policies in [`src/index.html:6`](./src/index.html:6)-[`src/index.html:13`](./src/index.html:13). The privacy page does not define CSP, `Permissions-Policy`, `Referrer-Policy`, `X-Content-Type-Options`, or cross-origin policies at all in [`src/privacy.html:1`](./src/privacy.html:1)-[`src/privacy.html:30`](./src/privacy.html:30).

Impact:
- `/privacy.html` has materially weaker browser-side protection than `/`.
- Any future inline content or third-party additions on that page would land without the same guardrails.

Recommendation:
- At minimum, mirror the homepage policy set on the privacy page immediately.
- Prefer moving the policies to real HTTP headers so every page inherits the same baseline.

### 3. CSP on the homepage is permissive and still allows inline script execution
Severity: Low

The homepage CSP in [`src/index.html:6`](./src/index.html:7) includes `script-src ... 'unsafe-inline'` and broad `https:` allowances in several directives. This reduces the value of CSP as an XSS mitigation.

Impact:
- If a DOM or content injection bug is introduced later, inline execution remains available.
- Broad source allowances increase future drift risk as more third-party assets are added.

Recommendation:
- Remove `'unsafe-inline'` from `script-src`.
- Replace inline script blocks with external files or nonce/hash-based allowances.
- Tighten `connect-src`, `frame-src`, and any remaining wildcard-like allowances to the exact domains in use.

### 4. Third-party asset integrity is inconsistent
Severity: Low

The homepage protects Bootstrap CSS and JS with SRI in [`src/index.html:49`](./src/index.html:50) and [`src/index.html:562`](./src/index.html:563). The privacy page loads Bootstrap CSS from CDNJS without an `integrity` attribute in [`src/privacy.html:28`](./src/privacy.html:29). Other third-party assets such as Boxicons, Google Fonts, Google Tag Manager, and Ahrefs analytics are also trusted directly from external origins.

Impact:
- Supply-chain trust is inconsistent across pages.
- A compromised third-party asset could modify rendering or behavior.

Recommendation:
- Add SRI where the provider and asset format permit it.
- Prefer self-hosting static CSS/icon assets when feasible.
- Re-evaluate whether both Ahrefs analytics and Google Analytics are required.

## Positive Observations
- No obvious dangerous DOM sinks were found in the project code beyond a controlled `innerHTML = ''` reset in [`src/assets/javascripts/scripts.js:449`](./src/assets/javascripts/scripts.js:449).
- The GitHub project cards are built with `document.createElement` and `textContent`, which reduces DOM XSS exposure in [`src/assets/javascripts/github-projects.js:46`](./src/assets/javascripts/github-projects.js:57) and [`src/assets/javascripts/github-projects.js:73`](./src/assets/javascripts/github-projects.js:123).
- External links that open new tabs generally use `rel="noopener noreferrer"`.
- No login, payment, or custom form handling was found, which keeps the attack surface relatively small.

## Priority Remediation Order
1. Add response headers through an edge layer and enforce HSTS plus anti-framing controls.
2. Apply the same security baseline to `/privacy.html`.
3. Tighten the CSP and remove inline-script dependence.
4. Standardize SRI or self-host third-party assets where practical.
