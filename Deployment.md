# Deployment Guide

This guide covers independent deployment of the **Amplification of Potential** landing page and AOP Beacon frontend.

## Transition deadline

The current deployment will remain operational through **September 30**. The receiving operator should complete and verify a replacement deployment before that date.

Repository access is part of the handoff. Deployment into another account, migration, configuration, maintenance, and support are separate services unless agreed in writing.

## 1. Architecture summary

This is a Next.js 16 application using server rendering, server actions, cookies, and client-side browser storage.

The repository contains the frontend, but it does **not** contain the server handlers for:

```text
POST /api/aop-gather/prompt
POST /api/aop-gather/feedback
POST /api/aop-gather/optin
```

Consequences:

- `/` can operate as a standalone landing page.
- `/gather` can render and navigate through its local stages.
- Prompt generation, feedback collection, and final opt-in submission require compatible same-origin endpoints.
- A frontend-only deployment is not a complete replacement for the currently integrated Beacon experience.

The static question library in `lib/aop-gather/examples.ts` can support a fallback response only when a compatible prompt API chooses and returns one. The current client does not select that fallback by itself when the endpoint is missing.

Before deployment, decide whether to:

1. implement the three API routes in this application;
2. place a reverse proxy in front of the application that serves those paths from an existing backend; or
3. deploy only the landing page and clearly disable or remove the Beacon entry point until the backend is available.

Do not silently deploy a broken Beacon flow.

## 2. Prerequisites

- Access to <https://github.com/Yen-US/amplification-of-potential>
- Node.js 20.9 or newer; current LTS recommended
- pnpm 10.30.1 through Corepack
- A Node.js-capable host such as Vercel, Coolify, Railway, Render, Fly.io, or a managed container platform
- Control of the intended domain and DNS records
- A production design for the missing Beacon API endpoints
- A Google Analytics property controlled by the receiving operator, or a decision to remove analytics

## 3. Prepare the repository

```bash
git clone https://github.com/Yen-US/amplification-of-potential.git
cd amplification-of-potential
corepack enable
corepack prepare pnpm@10.30.1 --activate
pnpm install --frozen-lockfile
```

If `corepack` is unavailable, install pnpm 10.30.1 using the official pnpm installation method for the host, or run the project commands through npm:

```bash
npm exec --yes --package=pnpm@10.30.1 -- pnpm install --frozen-lockfile
```

Run all checks:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Expected build commands:

| Setting | Value |
| --- | --- |
| Install | `pnpm install --frozen-lockfile` |
| Build | `pnpm build` |
| Start | `pnpm start` |
| Default port | `3000` |
| Build output | `.next` |

## 4. Review application-owned configuration

No environment variables are referenced by this repository. Configuration currently lives in source code.

Before production cutover, review:

1. `app/layout.tsx`
   - `metadataBase`
   - Google Analytics ID
2. `app/page.tsx`
   - public-site Open Graph URL
3. `app/gather/layout.tsx`
   - Beacon Open Graph URL
4. `lib/aop-gather/content.ts`
   - follow-up URL
5. `components/aop/sponsor-banner.tsx`
   - sponsor names, links, and logos
6. `public/amplificationofpotential/`
   - logos, profile image, sponsor assets, favicons, and social preview image

If the canonical domain remains `amplificationofpotential.com`, the existing URLs may remain. They still require DNS and hosting ownership to be transferred or independently configured.

## 5. Backend contract

The exact backend implementation is outside this repository. Preserve these frontend expectations when implementing or proxying it.

### `POST /api/aop-gather/prompt`

Frontend request shape:

```json
{
  "stage": "discover",
  "selections": [],
  "lang": "en"
}
```

Frontend expects a successful JSON response containing:

```json
{
  "prompt": "A conversation prompt",
  "source": "ai"
}
```

`source` may be `"ai"` or `"fallback"`. The client aborts after 12 seconds and treats non-2xx or empty-prompt responses as errors.

### `POST /api/aop-gather/feedback`

Frontend sends:

```json
{
  "stage": "discover",
  "lang": "en",
  "rating": "up",
  "prompt": "The displayed prompt",
  "source": "ai",
  "selections": [],
  "beacon": "optional-beacon-id"
}
```

This request is fire-and-forget. Return a prompt 2xx response and make the operation idempotent where practical.

### `POST /api/aop-gather/optin`

Frontend sends:

```json
{
  "email": "participant@example.com",
  "name": "Participant name",
  "lang": "en",
  "journey": {},
  "beacon": "optional-beacon-id"
}
```

The frontend expects any 2xx response. The receiving operator must define validation, storage, consent, retention, deletion, and access controls.

### Backend security requirements

- Validate payload types and length server-side.
- Rate-limit public endpoints.
- Keep AI/provider and database credentials server-side.
- Do not log sensitive participant data unnecessarily.
- Define retention and deletion procedures.
- Restrict operational data access.
- Monitor cost and abuse for prompt generation.
- Return generic errors; do not expose credentials or internal traces.

## 6. Deployment option A: Vercel

1. Import the GitHub repository into a Vercel account controlled by the receiving operator.
2. Select the Next.js framework preset.
3. Use:
   - Install command: `pnpm install --frozen-lockfile`
   - Build command: `pnpm build`
4. Do not add environment variables unless required by the separately implemented backend.
5. Deploy first to the generated preview URL.
6. Complete the validation checklist below.
7. Add the production domain only after preview validation.

If the Beacon backend remains on another service, configure a Vercel rewrite or reverse proxy for `/api/aop-gather/:path*`, or implement the routes in this repository. Keep credentials out of `next.config.mjs` and source control.

## 7. Deployment option B: Coolify / Docker-compatible Node host

The repository does not currently include a Dockerfile. Coolify can deploy it with Nixpacks or a Node build pack.

Recommended Coolify settings:

| Setting | Value |
| --- | --- |
| Source | GitHub repository |
| Branch | `main` |
| Build pack | Nixpacks |
| Install command | `corepack enable && pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Start command | `pnpm start` |
| Port | `3000` |
| Health path | `/` |

Procedure:

1. Create a new Coolify application from the repository.
2. Select a Node/Nixpacks deployment.
3. Configure the commands and port above.
4. Add backend secrets only if compatible API handlers or proxies are added.
5. Deploy to a temporary hostname.
6. Validate the complete application.
7. Attach the production domain and enable TLS.

For another Node host, use the same install, build, start, and port values.

## 8. Domain and DNS cutover

1. Obtain the exact DNS target from the new hosting provider.
2. Reduce DNS TTL in advance if the provider permits it.
3. Add and validate the domain in the new hosting account.
4. Verify TLS certificate issuance.
5. Test the deployment using its preview/temporary hostname first.
6. Change DNS only after validation passes.
7. Verify both the apex domain and `www` behavior.
8. Recheck canonical metadata and social previews after cutover.

Do not remove the old deployment before the replacement has been tested from an external network.

## 9. Validation checklist

### Build and startup

- [ ] `pnpm install --frozen-lockfile` succeeds.
- [ ] `pnpm typecheck` succeeds.
- [ ] `pnpm lint` succeeds.
- [ ] `pnpm build` succeeds.
- [ ] `pnpm start` serves the application on port 3000.

### Landing page

- [ ] `/` returns HTTP 200.
- [ ] Navigation links and calls to action work.
- [ ] Images, fonts, favicons, and sponsor assets load.
- [ ] Layout is checked on desktop and mobile.
- [ ] Metadata and social preview use the intended domain.
- [ ] Analytics reports to the receiving operator's property or has been removed.

### AOP Beacon

- [ ] `/gather` loads in English and Spanish.
- [ ] Name entry works.
- [ ] All four stages can be completed.
- [ ] Card selections persist as expected.
- [ ] `/api/aop-gather/prompt` returns a prompt inside the client timeout.
- [ ] AI failure behavior is acceptable and tested.
- [ ] Feedback reaches the intended store.
- [ ] Opt-in submission reaches the intended store.
- [ ] Consent and privacy language match actual data handling.
- [ ] Browser storage can be cleared and a fresh journey started.

### Operations

- [ ] Hosting owner and billing are documented.
- [ ] Domain/DNS owner is documented.
- [ ] Backend owner is documented.
- [ ] Secrets exist only in the hosting secret manager.
- [ ] Rate limits and cost alerts are configured.
- [ ] Logs do not expose participant data or secrets.
- [ ] Rollback has been rehearsed.

## 10. Rollback

Before DNS cutover:

1. Record the previous DNS values.
2. Retain the previous deployment until the new one is stable.
3. Record the last known-good commit.

If the replacement fails:

1. Revert DNS to the previous target while the transition window remains available.
2. Roll back the hosting deployment to the last known-good commit.
3. Verify `/`, `/gather`, and all three API operations.
4. Investigate using host logs without exposing credentials or participant data.

After September 30, the old deployment should not be assumed available as a rollback target.

## 11. Troubleshooting

### Landing page works, but Beacon prompt generation fails

The three `/api/aop-gather/*` routes are missing or not proxied. Implement or connect the backend and confirm same-origin routing.

### Beacon returns an error after approximately 12 seconds

The prompt request exceeded the client's abort timeout. Check backend latency, provider response time, cold starts, and network/proxy behavior.

### Images or icons return 404

Static assets are under `/public/amplificationofpotential/`. Preserve this directory and its filenames; some include spaces and case-sensitive names.

### Social previews point to the old host

Update `metadataBase`, Open Graph URLs, and the follow-up URL listed in the README configuration table, then redeploy.

### Analytics appears in the wrong account

Replace or remove the hardcoded Google Analytics ID in `app/layout.tsx`.

### Build uses the wrong package manager

Enable Corepack and use the pinned pnpm version:

```bash
corepack enable
corepack prepare pnpm@10.30.1 --activate
pnpm install --frozen-lockfile
```

### Cookies or language preference behave unexpectedly

The application sets a `lang` cookie through a server action. Confirm the host supports standard Next.js server execution and is not configured as a static-only export.

## 12. Handoff boundary

Included:

- source repository access;
- README and deployment documentation;
- reasonable information needed to understand and independently redeploy the repository.

Not included unless separately agreed:

- deployment into the receiving party's account;
- DNS or domain migration execution;
- backend recreation or data migration;
- credentials transfer through insecure channels;
- custom development or configuration;
- monitoring, maintenance, operational support, or uptime commitments.

If assistance is requested, define the deliverables, access method, security responsibilities, timeline, acceptance criteria, and fixed fee before work begins.
