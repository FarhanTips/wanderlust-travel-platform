<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust-client

Single-package Next.js 16.4.3 + React 19.3 app (App Router, TypeScript strict). npm only — `package-lock.json` is the lockfile; don't use yarn/pnpm/bun.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run lint` — ESLint flat config over the whole repo (bare `eslint`, no path arg)
- `npm run build` — production build; includes the built-in TypeScript type check (repo keeps `typescript.ignoreBuildErrors` at its `false` default)
- `npx tsc --noEmit` — fast standalone typecheck (no `typecheck` script exists)
- No test runner, tests, or CI exist in this repo — don't guess at a test command.

Verify changes with: `npm run lint && npm run build` (add `npx tsc --noEmit` for a quick check without a full build).

## Toolchain quirks (from `next.config.ts` / `components.json`)

- **Cache Components mode is OFF** (`cacheComponents: false` in `next.config.ts`). No Suspense/data-caching directives needed; data fetching is uncached by default.
- **React Compiler is enabled** (`reactCompiler: true` + `babel-plugin-react-compiler`): follow the Rules of React — no mutating props/state during render, no reading refs during render.
- **Tailwind CSS v4, CSS-first**: there is no `tailwind.config.*` or PostCSS config. Theme tokens live in `src/app/globals.css` (`@theme inline` block); Tailwind is loaded via the `@tailwindcss/turbopack` loader in `next.config.ts`. Don't add a config file.
- **shadcn UI, style `base-nova`** (`components.json`): primitives come from `@base-ui/react` (Base UI), **not Radix**. Add components with `npx shadcn add <component>` — it resolves the `@/*` → `./src/*` aliases from `tsconfig.json`.
- **`cn` helper**: generated components import `{ cn } from "cn"` (the `cn` npm package); `src/lib/utils.ts` re-exports it. Use one of these; don't write a new one.

## Repo facts

- Source root is `src/`: `src/app` is the App Router entry (`layout.tsx`, `page.tsx`, `globals.css`); `src/components/ui` holds shadcn-generated components; `src/lib` holds helpers.
- The `nextjs-agent-rules` block at the top of this file is marker-delimited and rewritten by `next dev`; only content outside the markers is yours to edit. Commit `AGENTS.md` to keep the tree clean.
- `.env*` files are gitignored and none are checked in. Auth needs `MONGODB_URL` in `.env.local` (`src/lib/auth.ts`); `BETTER_AUTH_URL` is optional (`src/lib/auth-client.ts`).
- Auth is better-auth: handler at `src/app/api/auth/[...all]/route.ts`; read sessions server-side with `auth.api.getSession(...)` (`@/lib/auth`), client-side with `authClient.useSession()` (`@/lib/auth-client`).
- Most data pages/components fetch the companion Express server at hardcoded `http://localhost:5000` — start `../wanderlust-server` (`node index.js`) or those pages fail. No API base-URL constant exists; keep new fetches consistent.
- `src/lib/auth.ts` imports `@better-auth/mongo-adapter`, which is not in `package.json` — it resolves only as a transitive dep of `better-auth`. If auth breaks after a dependency change, add it explicitly.
