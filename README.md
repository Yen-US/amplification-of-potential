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

## Important backend boundary

The frontend calls these same-origin endpoints:

- `POST /api/aop-gather/prompt`
- `POST /api/aop-gather/feedback`
- `POST /api/aop-gather/optin`

Those API handlers are **not present in this repository**. The landing page can be deployed independently, but the complete AI prompt, feedback, and email opt-in behavior requires compatible backend endpoints to be supplied by the receiving environment.

The prompt screen has client-side failure handling, but it does not automatically replace a missing endpoint with a deterministic prompt. Verify the entire `/gather` journey before treating a deployment as production-ready.

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

No environment variables are referenced by the code currently in this repository.

The following values are hardcoded and should be reviewed before transferring domains or analytics ownership:

| Value | Location | Current setting |
| --- | --- | --- |
| Canonical site URL | `app/layout.tsx` | `https://amplificationofpotential.com` |
| Open Graph URL | `app/page.tsx` | `https://amplificationofpotential.com` |
| Beacon Open Graph URL | `app/gather/layout.tsx` | `https://amplificationofpotential.com/gather` |
| Follow-up URL | `lib/aop-gather/content.ts` | `https://amplificationofpotential.com` |
| Google Analytics property | `app/layout.tsx` | `G-P6MRLB7Q6Q` |

If the production hostname changes, update all canonical and follow-up URLs. If analytics ownership changes, replace or remove the Google Analytics ID.

Backend credentials, provider keys, mailing-list configuration, data stores, and telemetry for the three `/api/aop-gather/*` endpoints are intentionally not documented here because their implementation is absent. Do not commit credentials to this repository.

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
