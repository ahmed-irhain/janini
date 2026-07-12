# Janini

Arabic-first pregnancy tracking app for Saudi Arabia and the Gulf. See [docs/plan.md](docs/plan.md) for the full business and product plan.

## Stack

- **App** (`/app`): Expo (React Native + TypeScript), RTL-first, Arabic/Hijri-aware
- **Server** (`/server`): Node.js + Express + TypeScript + Drizzle ORM + PostgreSQL
- **Shared** (`/shared`): TypeScript types and date utilities (Hijri/Gregorian) shared by app and server

See [CLAUDE.md](CLAUDE.md) for conventions and dev workflow.

## Getting started

```bash
npm install
docker compose up -d          # local PostgreSQL
npm run db:migrate --workspace=server
npm run dev --workspace=server
npm run start --workspace=app
```
