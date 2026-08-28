# Amplification of Potential

Official website and AOP Beacon conversation experience for **Amplification of Potential**.

This repository is the source-code handoff for the existing application. It contains:

- the public Amplification of Potential landing page;
- the bilingual AOP Beacon experience used to guide intentional conversations at events;
- static brand and sponsor assets;
- a curated fallback-question library and browser-side journey state.

Repository: <https://github.com/Yen-US/amplification-of-potential>

## Transition notice

The current deployment will remain operational through **September 30** to provide time for an independent redeployment.

Repository access and documentation are included in this handoff. Hosting after that date, deployment into another account, migration, configuration, maintenance, and support are not included unless separately agreed.

See [Deployment.md](./Deployment.md) for the complete deployment and validation procedure.

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Amplification of Potential public landing page |
| `/gather` | AOP Beacon welcome and conversation journey |
| `/gather/name` | Participant name entry |
| `/gather/[stage]` | Stage introduction and progression |
| `/gather/[stage]/cards` | Card selection for a stage |
| `/gather/[stage]/prompt` | Generated or fallback conversation prompt |

The Beacon stages are implemented in the application content under `lib/aop-gather/`.

## Backend API routes

The frontend calls these same-origin endpoints, implemented in `app/api/aop-gather/`:

- `POST /api/aop-gather/prompt` — generates a conversation prompt via OpenAI (`OPENAI_API_KEY`). Falls back to a curated example from `lib/aop-gather/examples.ts` if the key is missing, the call times out (4s), or the response is empty.
- `POST /api/aop-gather/feedback` — stores a thumbs up/down rating for a generated prompt in Supabase (`aop_beacon_feedback` table).
- `POST /api/aop-gather/optin` — stores an email opt-in with journey data in Supabase (`aop_beacon_email_optins` table).

All three validate their payload with `zod`, rate-limit by IP (in-memory, per-instance), and degrade gracefully: if `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` aren't set, feedback/optin accept the request but report `stored: false` instead of failing the user flow. Table schemas are in `supabase/migrations/`.

Set the required env vars (see `.env.example`) before deploying if you want AI-generated prompts and persisted feedback/opt-ins; without them the Beacon flow still works end-to-end using fallback prompts.

## Technology

- Next.js 16 using the App Router and Turbopack
- React 19
- TypeScript with strict checking
- Tailwind CSS 4
- pnpm 10.30.1
- `@next/third-parties` for Google Analytics
- Fontsource variable fonts

## Requirements

- Node.js 20.9 or newer; an active Node.js LTS release is recommended
- Corepack or pnpm 10.30.1

## Local development

```bash
git clone https://github.com/Yen-US/amplification-of-potential.git
cd amplification-of-potential
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000>.

## Quality checks

```bash
pnpm typecheck
pnpm lint
pnpm build
```

A successful production build can be started locally with:

```bash
pnpm start
```

## Configuration

Three optional environment variables enable AI-generated prompts and Supabase persistence for feedback/opt-ins (see `.env.example`); the app runs without them using fallback prompts and no-op storage.

The following values are hardcoded and should be reviewed before transferring domains or analytics ownership:

| Value | Location | Current setting |
| --- | --- | --- |
| Canonical site URL | `app/layout.tsx` | `https://amplificationofpotential.com` |
| Open Graph URL | `app/page.tsx` | `https://amplificationofpotential.com` |
| Beacon Open Graph URL | `app/gather/layout.tsx` | `https://amplificationofpotential.com/gather` |
| Follow-up URL | `lib/aop-gather/content.ts` | `https://amplificationofpotential.com` |
| Google Analytics property | `app/layout.tsx` | `G-P6MRLB7Q6Q` |

If the production hostname changes, update all canonical and follow-up URLs. If analytics ownership changes, replace or remove the Google Analytics ID.

Required env vars: `OPENAI_API_KEY` (AI prompt generation), `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (feedback/opt-in storage — table schemas in `supabase/migrations/`). Do not commit credentials to this repository.

## Project structure

```text
app/                    Next.js pages, layouts, and client components
app/gather/             AOP Beacon experience
components/aop/         Beacon-specific shared UI
lib/aop-gather/         Content, types, card selection, prompts, and local storage
public/amplificationofpotential/
                        Brand, profile, social, and sponsor assets
```

## Data and privacy notes

- The participant name, selections, generated prompts, and Beacon identifier are stored in browser `localStorage`.
- Language preference is stored in a cookie.
- Opt-in data is submitted to `/api/aop-gather/optin`.
- Prompt feedback is submitted to `/api/aop-gather/feedback`.
- Google Analytics is enabled in the root layout.

The receiving operator is responsible for reviewing consent text, privacy disclosures, retention, access controls, analytics ownership, and the behavior of any replacement backend before production use.

## Ownership and operational responsibility

This handoff provides the repository in its current state. The receiving operator is responsible for:

- maintaining its own hosting account and billing;
- configuring the production domain and DNS;
- supplying and securing any required backend services;
- validating the application after deployment;
- maintaining dependencies, security updates, analytics, privacy compliance, backups, and ongoing operations.

Any deployment, migration, customization, new development, maintenance, or support by Presencia Studio is separate work and requires its own written scope and fee.

## License

No open-source license is included. Repository access does not grant the public a general open-source license. Confirm ownership and permitted use with the repository owner before redistributing the code or assets.

## Handoff checklist

- [ ] Receiving owner has repository access.
- [ ] Receiving owner has selected and controls a hosting account.
- [ ] Production build succeeds.
- [ ] Landing page is verified on desktop and mobile.
- [ ] Compatible Beacon API endpoints are configured and tested.
- [ ] Analytics ownership is reviewed.
- [ ] Domain and DNS ownership are confirmed.
- [ ] Privacy and consent behavior is reviewed.
- [ ] New deployment is verified before DNS cutover.
- [ ] Cutover is completed before September 30.
- [ ] Rollback procedure has been tested.

For detailed instructions, see [Deployment.md](./Deployment.md).
