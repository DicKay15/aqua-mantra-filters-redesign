# Aqua Mantra Filters redesign

A complete multi-page redesign concept for [Aqua Mantra Filters](https://aquamantrafilters.com.au/), covering whole-house systems, professional installation, Perth/Sydney/Adelaide location content, authentic installation proof, customer reviews, videos, contact and four water guides.

## What is included

- All 11 supplied current-site routes, plus a Guides hub, four articles, Privacy, Terms and a custom 404.
- Original “engineered calm” visual system using the existing Aqua Mantra logo and blue recognition.
- Lazy-loaded Three.js caustic hero, a GSAP-driven SVG cross-section of the three-stage housing, and an accessible gallery lightbox.
- Four planned/generated editorial assets plus 24 metadata-stripped authentic installation photographs.
- Unique route metadata, canonical URLs, sitemap, review-site robots controls and supported structured data.
- Accessible navigation, responsive layouts, form validation/success/error states, loading skeletons and reduced-motion fallbacks.
- Full discovery, IA, PRD, SEO, media, checklist, feedback and launch-audit documentation in [`docs/`](docs/).

## Hosting

The current V3 build is deployed to Vercel. The root and `www` custom domains are assigned to the Vercel project and will activate after the DNS records are updated at the current provider.

| Version | URL | Git |
|---|---|---|
| **V3 production deployment** | https://aqua-mantra-filters.vercel.app | `redesign-v3-premium` |
| **Cloudflare Pages fallback** | https://aqua-mantra-redesign.pages.dev | `redesign-v3-premium` |
| **V1 archive** | https://aqua-mantra-v1.pages.dev | commit `1d27f6e` |

The `v1` deployment is that commit built as-is. The only differences from the commit are build plumbing needed to produce a static export (`output: "export"`, `generateStaticParams`, `force-static` on the two metadata routes, and its own `siteUrl`). No design, copy or markup was changed.

```bash
scripts/deploy-static.sh          # build and publish
SITE_LIVE=1 scripts/deploy-static.sh   # same build, indexable
```

The deployable artifact is a static export: `SITE_LIVE=1 STATIC_EXPORT=1 npx next build --webpack` writes `out/`. `vercel.json` contains the repeatable Vercel build and security-header configuration. `npm run dev` still uses the bundled vinext dev server.

The GitHub repository is public at https://github.com/DicKay15/aqua-mantra-filters-redesign.

## Review-build safeguards

- The consultation form demonstrates behaviour but sends no data until an approved destination and privacy process are connected.
- The Vercel production deployment is indexable and publishes canonical URLs for `https://aquamantrafilters.com.au`; the custom-domain DNS cutover is still pending.
- Certification, licence, product-performance, warranty, legal and city-coverage details remain clearly marked for client verification.
- Generated lifestyle images are illustrative; real Aqua Mantra installation photos are used as proof.

## Project documents

1. [`00-master-brief.md`](docs/00-master-brief.md)
2. [`01-discovery-audit.md`](docs/01-discovery-audit.md)
3. [`02-information-architecture.md`](docs/02-information-architecture.md)
4. [`03-prd.md`](docs/03-prd.md)
5. [`04-content-seo-plan.md`](docs/04-content-seo-plan.md)
6. [`05-visual-motion-media-plan.md`](docs/05-visual-motion-media-plan.md)
7. [`06-implementation-plan-checklist.md`](docs/06-implementation-plan-checklist.md)
8. [`07-feedback-log.md`](docs/07-feedback-log.md)
9. [`08-preflight-report.md`](docs/08-preflight-report.md)
10. [`09-review-findings-and-changes.md`](docs/09-review-findings-and-changes.md)

## Local review

```bash
npm install
npm run dev
npm run lint
npm run build
```

---

## Framework and hosting notes

This project began from the bundled Sites vinext starter. The original framework notes follow for maintainers.

# vinext-starter

A clean full-stack starter running on [vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`
- Windows, macOS, or Linux; Git is required only for publishing, and Bash is not required for initialization or the project commands

## Sites Lifecycle

The bundled Sites initializer copies this starter into the project and runs its locked dependency install before returning the checkout. Edit the source under `app/`, use `npm run dev` for the Codex local preview, and run the project validation before hosting. The remote Sites builder also runs `npm run build` against the pushed commit. Do not rerun the dependency install unless dependencies are absent or the lockfile changed.

This starter does not use `wrangler.jsonc`.

`install:ci` runs `npm ci` once against this checkout's bundled lockfile, explicitly targeting the project and disabling parent-workspace discovery. It includes dev and optional dependencies required for builds and previews even when production/omit settings would exclude them. It defaults Sharp to prebuilt binaries unless the caller explicitly configures Sharp or a source build. It uses `--prefer-offline --no-audit --no-fund`, reuses the configured npm cache, and leaves network concurrency, retries, timeouts, and lifecycle-script policy to npm's configuration. Retain the installer session until it finishes; do not overlap installers for the same checkout.

`scripts/sites-env.mjs` preserves the caller's HOME, npm cache, proxy, XDG, and temporary-directory configuration while defaulting Wrangler and Miniflare state to the checkout. If npm reports an unwritable cache, select a writable path with `npm_config_cache` for that install. The `dev` and `start` scripts also keep Wrangler logs inside the checkout. Generated `.sites-runtime/` and `.wrangler/` directories are disposable and ignored by Git.

`npm run dev` uses `vinext dev` for the live Vite preview with HMR, starting at port 5173. Vinext records the running server in ignored `.vinext/` state and rejects another start for the same checkout while that process is alive; reuse its printed URL. It recovers stale state after a stopped process. Pass `--port <port>` or `--hostname <host>` after `npm run dev --` when needed; keep Codex previews on loopback. Like the Sites package, this relies on Vinext's advisory lock; exactly simultaneous starts can race.

The bundled Sites Vite plugin simulates ChatGPT sign-in only for loopback development requests. Visit `/signin-with-chatgpt?return_to=/` to sign in as `local_seedy` (`seedy@sites.test`, display name `Seedy`) and `/signout-with-chatgpt?return_to=/` to sign out. The development cookie preserves that identity across server restarts. This does not exercise real ChatGPT OAuth and is not included in production builds; hosted authentication remains dispatch-owned.

The Worker uses `vinext/server/fetch-handler`, including Vinext's config-aware image handling. After building, `npm start` runs that Worker locally through Wrangler on `127.0.0.1`, sharing `.wrangler/state` with dev preview and local D1 migrations; it does not deploy the site or simulate sign-in. Use the URL printed by the server. Pass `npm start -- --port <port>` to select a different built-preview port.

Local previews use Miniflare's placeholder `Request.cf` metadata without a network lookup. Set `CLOUDFLARE_CF_FETCH_ENABLED=true` to opt into fetching preview metadata; this setting does not change hosted request metadata.

Local tool usage metrics are disabled by default. Set `WRANGLER_SEND_METRICS=true` to opt in.

## Included Shape

- edit site code under `app/`
- `app/chatgpt-auth.ts` provides optional dispatch-owned ChatGPT sign-in helpers
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/index.ts` reads the D1 binding from the Cloudflare Worker environment
- `db/schema.ts` starts intentionally empty
- `@cloudflare/workers-types` provides Worker types; `cloudflare-env.d.ts` declares optional `DB`/`BUCKET` bindings—update these declarations if binding names change
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

Signed-in visitors receive both `oai-authenticated-user-id` and `oai-authenticated-user-email`. Private Sites require every visitor to sign in; public Sites may also have anonymous visitors, for whom neither header is present.

The user ID is stable for the same user on the same Site and different across Sites. Use it as the durable user key; use email and name for display or contact purposes.

SIWC-authenticated workspace sites may also receive `oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty `name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by `oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const userId = requestHeaders.get("oai-authenticated-user-id");
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use the returned `userId` as the stable user key for user-owned records; do not use email as a durable identifier.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send anonymous visitors through Sign in with ChatGPT.
- In a Server Component, start sign-in with `<a href={chatGPTSignInPath(returnTo)} target="_top">`. The auth helper module is server-only; do not import it into a Client Component.
- Do not use `fetch`, XHR, a client-side router, or a framework link that can prefetch the sign-in route. SIWC must start as a top-level navigation.
- Never request the AuthAPI authorization endpoint directly. The dispatch-owned `/signin-with-chatgpt` route must start the SIWC flow.
- Use `chatGPTSignOutPath(returnTo)` for browser sign-out links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the OAuth cookies, and identity header injection. Do not implement app routes for those reserved paths. Routes that do not import and call the helper remain anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the Sites hosting platform's access policy controls for workspace-wide restrictions, or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write actions tied to the current ChatGPT user. Leave public content anonymous.

## Local D1 migrations

For a D1-backed local preview, generate SQL with `npm run db:generate`. Build once through the Sites skill's build entrypoint (or `npm run build` for standalone use) to generate `dist/server/wrangler.json`, rebuilding if bindings change. From the project root, apply each pending migration in order:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_example.sql
```

Replace the filename with the pending migration and `DB` with your D1 binding name if different. Use `.wrangler/state`, not `.wrangler/state/v3`; Wrangler adds the versioned directories. Do not replay migrations already applied locally. This updates only the preview database; publishing applies production migrations separately.

## Diagnostic Commands

- `npm run install:ci`: perform the one locked dependency install
- `npm run dev`: start the Vite/Vinext development server
- `npm run build`: build the deployable Sites artifact
- `npm run start`: preview the built Worker locally with D1/R2 support
- `npm run db:generate`: generate Drizzle migrations after schema changes

When using the Sites plugin, follow its skill instructions for installation, builds, and publishing. These npm commands remain available for standalone use.

Like the Sites package, `npm run build` runs `vinext build` directly; it does not require a host `timeout` command.

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
