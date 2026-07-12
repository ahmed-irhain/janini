# Janini

Arabic-first pregnancy tracking app for Saudi Arabia and the Gulf. Full business/product plan
is in `docs/plan.md` — read it before making product or scope decisions.

## Stack and why

- **App** (`/app`): Expo (managed workflow), React Native, TypeScript. Chosen over bare React
  Native because dev happens on Windows with no Xcode — iOS builds are only possible via EAS
  Build (cloud) or a Mac, and Expo's managed workflow avoids needing local Android
  Studio/Xcode for day-to-day iteration.
- **Server** (`/server`): Node.js + Express + TypeScript.
- **Data layer**: PostgreSQL via Drizzle ORM (`server/src/db/schema.ts`). Chosen over Prisma for
  a lighter runtime and SQL-transparent queries; migrations are generated with `drizzle-kit`.
- **Shared** (`/shared`): types and Hijri/Gregorian date utilities used by both `app` and
  `server`, published as the internal workspace package `@janini/shared`.
- Monorepo via **npm workspaces** (root `package.json`). `.npmrc` sets
  `legacy-peer-deps=true` — Expo's pinned TypeScript version routinely runs ahead of some
  packages' peer-dependency ranges (e.g. `react-i18next`); this is expected ecosystem lag, not
  a real incompatibility.

## Platform priority: iOS only

This app targets **iOS exclusively right now.** Don't spend effort on Android or web unless the
user explicitly asks for it by name.

- Don't fix Android- or web-specific bugs you happen to notice (e.g. `AppTabs.web.tsx` currently
  crashes `expo-router/ui`'s `<Tabs>` on web with "Couldn't find any screens for the navigator" —
  known, intentionally left alone). Mention it briefly if relevant, then move on.
- Don't add Android-specific config, icons, or platform branches "for completeness." The
  `android`/`web` blocks in `app.json` exist only because Expo's config schema requires them —
  don't invest in them.
- When verifying changes, prefer `npx expo-doctor` and `npx tsc --noEmit` inside `/app`. Don't
  use `npx expo export --platform web` or the web dev server as a proxy for "does this work" —
  web isn't a target and has known unfixed issues, so it's not a reliable signal either way.
- Real iOS verification needs Expo Go on a physical iPhone or an EAS Build — this machine
  (Windows, no Xcode) has no iOS simulator, so treat anything beyond bundler/typecheck sanity
  checks as unverified until confirmed on-device.

## Non-negotiable rules

- **No week-by-week content reaches a user unless `weekly_content.reviewedByObGyn = true`.**
  See `docs/plan.md` Section 6.2 — this is both an ethical requirement (health guidance to
  pregnant women) and a regulatory one (Apple / SFDA scrutinize accuracy claims in this
  category). `server/src/routes/weeklyContent.ts` enforces this at the API layer; don't add a
  code path that bypasses it, including for admin/preview tooling — gate previews separately.
- **Arabic (MSA) is the default, not a translation layer.** The app defaults to Arabic and RTL
  layout (`app/src/i18n/index.ts` forces `I18nManager` RTL when locale is `ar`) regardless of
  device locale detection failing. Medical/weekly content is MSA; push notifications,
  onboarding, and community copy can use a lighter Gulf-conversational register (plan.md
  Section 4). Don't commit to a single country's dialect.
- **Hijri dates use the `hijri-converter` library** (`shared/src/dates.ts`), which is
  Umm al-Qura-based. Don't hand-roll Hijri math — plan.md Section 4 flags this as a fast way to
  lose trust with a religiously observant audience if subtly wrong.
- **No diagnostic or treatment language anywhere in copy or features** — tracking and
  information only, with "consult your doctor" framing on relevant screens. This keeps the app
  on the "wellness" side of Apple's Guideline 1.4.1 and the SFDA's MDS-G27 line (plan.md
  Section 5.3). This applies most acutely to the future AI chat feature (Phase 3).
- **Offline-first for symptom/appointment logging** (plan.md Section 5.2, not yet implemented):
  local-first writes, opportunistic sync, last-write-wins conflict resolution is sufficient at
  MVP scale. Don't over-engineer sync before there's a reason to.

## Repo layout

```
app/       Expo app. src/i18n (i18next + RTL setup), src/screens
server/    Express API. src/db (Drizzle schema/client/migrations), src/routes
shared/    @janini/shared — types.ts, dates.ts (Hijri/Gregorian + gestational age)
docs/      Business/product plan
```

## Dev workflow

```bash
npm install
docker compose up -d                        # local PostgreSQL
npm run db:generate --workspace=server       # generate SQL migration from schema.ts
npm run db:migrate --workspace=server        # apply migrations
npm run dev --workspace=server               # API on :3000
npm run start --workspace=app                # Expo dev server
```

No iOS simulator is available on this machine (Windows, no Xcode). Use `npx expo-doctor` and
`npx tsc --noEmit` inside `/app` as basic sanity checks; real verification needs Expo Go on a
physical iPhone or an EAS Build. See "Platform priority: iOS only" above — don't reach for
`npx expo export --platform web` or the web dev server as a substitute.
