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

- **Cache Components mode**: `cacheComponents: true` is on. Uncached/dynamic data must be wrapped in Suspense; caching is opt-in via `use cache` directives. See `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md` before writing data fetching.
- **React Compiler is enabled** (`reactCompiler: true` + `babel-plugin-react-compiler`): follow the Rules of React — no mutating props/state during render, no reading refs during render.
- **Tailwind CSS v4, CSS-first**: there is no `tailwind.config.*` or PostCSS config. Theme tokens live in `src/app/globals.css` (`@theme inline` block); Tailwind is loaded via the `@tailwindcss/turbopack` loader in `next.config.ts`. Don't add a config file.
- **shadcn UI, style `base-nova`** (`components.json`): primitives come from `@base-ui/react` (Base UI), **not Radix**. Add components with `npx shadcn add <component>` — it resolves the `@/*` → `./src/*` aliases from `tsconfig.json`.
- **`cn` helper**: generated components import `{ cn } from "cn"` (the `cn` npm package); `src/lib/utils.ts` re-exports it. Use one of these; don't write a new one.

## Repo facts

- Source root is `src/`: `src/app` is the App Router entry (`layout.tsx`, `page.tsx`, `globals.css`); `src/components/ui` holds shadcn-generated components; `src/lib` holds helpers.
- The `nextjs-agent-rules` block at the top of this file is marker-delimited and rewritten by `next dev`; only content outside the markers is yours to edit. Commit `AGENTS.md` to keep the tree clean.
- `.env*` files are gitignored and none are checked in — no env vars are required yet.
