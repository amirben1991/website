Project-specific Copilot instructions

Overview
- This repo is an Angular 19 single-page application using standalone components (no NgModule bootstrap). Key entry points:
  - src/main.ts — bootstraps with `bootstrapApplication()` and provides router/providers.
  - src/app/app.config.ts — app-level providers (e.g. `provideZoneChangeDetection`, `provideRouter`).
  - src/app/app-routing.module.ts — canonical route definitions used by `provideRouter(routes)`.

Build / test / dev workflow
- Start dev server: `npm start` (runs `ng serve`).
- Build production: `npm run build` (runs `ng build`).
- Run tests: `npm test` (Karma + Jasmine via Angular CLI).
- Styles use Tailwind via SCSS: `src/styles.scss` contains `@tailwind` directives; Tailwind config in `tailwind.config.js` and PostCSS in `src/postcss.config.js`.

Project conventions & patterns
- Standalone components: components declare `standalone: true` and list imports in the component decorator `imports: [...]`. When adding components follow existing pattern found in `src/app/*`.
- Style files: SCSS is the project-wide style language (see angular.json and component files). Keep component styles in the sibling `.component.scss` file.
- Routing: All routes are defined in `src/app/app-routing.module.ts`. The `LayoutComponent` acts as a route shell with child routes (see children array with `accueil`, `education`, `experience`, `projects`). Update that file to add pages or nested routes.
- App-level providers: `app.config.ts` is used to centralize providers (zone change detection strategy, router). When adding global providers prefer `app.config.ts` or `main.ts` to ensure they are available during bootstrap.
- Assets & public files: static files served from the `public/` folder and configured in `angular.json` (check the `assets` entry).
- Component structure: follow the pattern `component-name.component.ts`, `.html`, `.scss`, `.spec.ts` under logical folders (e.g., `principal-content/education-content`).

Integration points and external deps
- Angular CLI builds and serves the app (`@angular/cli`, `@angular-devkit/build-angular`).
- Tailwind + PostCSS: `tailwindcss` and `autoprefixer` are configured via `tailwind.config.js` and `src/postcss.config.js`. Keep the Tailwind `content` globs to `./src/**/*.{html,ts}`.
- Third-party libs: `ngx-image-cropper` present in `package.json` — note runtime usage locations before modifying.

Where to look when changing behavior
- Routing / pages: `src/app/app-routing.module.ts` and `src/app/layout/layout.component.*`.
- App bootstrap / providers: `src/main.ts` and `src/app/app.config.ts`.
- Global styles / Tailwind: `src/styles.scss`, `tailwind.config.js`, `src/postcss.config.js`.
- Build/test config: `package.json` scripts and `angular.json` targets.

Practical examples (copyable)
- Add a new standalone component and route:

  1. Create component files following naming convention: `my-page.component.ts/html/scss` with `standalone: true`.
  2. Add route in `src/app/app-routing.module.ts` under the `children` of LayoutComponent:

     { path: 'my-page', component: MyPageComponent }

  3. Import or reference the new component from places that need to render it (or lazy-load it if appropriate).

Notes & missing items
- No existing AI agent or instruction files were found (AGENT.md, copilot-instructions.md, etc.).
- Tests exist (Karma/Jasmine) but there are no project-specific test helpers; look at the pattern under `src/app/**/*.spec.ts` when adding tests.

If anything in these notes is unclear or you want additional examples (e.g., how to add a lazy route, or how to wire a global provider for state management), tell me which area to expand.
