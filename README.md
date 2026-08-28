# Amplification of Potential

Standalone Next.js site, split out of the `presenciastudio` monorepo
(`app/(profiles)/p/amplificationofpotential`).

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript (strict)
- Tailwind CSS v4
- lucide-react icons
- `@next/third-parties` (Google Analytics)
- Fontsource: Cormorant Garamond (serif), Inter (sans)

No Supabase, shadcn/ui, or other presenciastudio-only dependencies are used —
this route tree was self-contained.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck
pnpm lint
```

## Routes

- `/` — Amplification of Potential landing page
- `/gather` — AOP Beacon conversation flow (`/gather/name`, `/gather/[stage]`,
  `/gather/[stage]/cards`, `/gather/[stage]/prompt`)

## Notes

- `metadataBase` is hardcoded to `https://amplificationofpotential.com`.
- GA id `G-P6MRLB7Q6Q` is hardcoded in `app/layout.tsx`.
- No environment variables required.
