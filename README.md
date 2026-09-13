# Aaron Rhim — portfolio

A static Next.js portfolio with project build notes, an interactive rover HMI layout study, and light/dark themes.

## Development

```sh
npm install
npm run dev
```

`npm run build` exports the site to `out/`. `npm run start` serves that export.
Run `npm run check` for formatting, lint, TypeScript, and a production build.
Run `node --test tests/dwindle.test.mjs` for the panel-layout invariants.

## Editing content

- `lib/content.ts`: profile, links, project overviews, experience, education, awards, and skills.
- `lib/project-notes.ts`: longer project descriptions, organised around what was built and how it works.
- `components/HmiStudy.tsx`: the Rover HMI case study, adapted from Aaron’s September 2026 draft.
- `app/page.tsx`: the personal introduction and home-page selection.
- `public/images/`: project photographs, diagrams, and recordings.

Keep claims grounded in the resume, Aaron’s own writing, or project source. Preserve the distinction between measured results, estimates, prototypes, and future work. The existing experience measurements were retained; this redesign does not independently revalidate them.

The content structure takes inspiration from [Gabriel Yu’s project pages](https://gabrielyu.ca/projects/tool-changer): a concise overview followed by focused technical explanations and project media. Aaron’s HMI source is [the portfolio draft](https://docs.google.com/document/d/1jddbGmmrR2rWa4vrTPP1sdY4OOqWeMu6OHtbKRpGJEI/edit). The draft itself was not changed.

## HMI study

`lib/dwindle.ts` implements splitting, recursive geometry, and sibling promotion on removal. `components/HmiDemo.tsx` is an accessible browser demonstration with sample data, panel selection, a six-panel limit, and reset. It illustrates the Qt layout behavior; it does not run the real HMI or connect to hardware.

`hmi-debug.mp4` is a web-encoded, audio-free copy of the recording named in the draft. The HMI roadmap remains explicitly future work. The draft’s missing competition photograph and full architecture diagram were not fabricated.

## Design

`app/globals.css` owns the paper/green palette, typography, responsive layouts, and theme tokens. The home page leads with real rover photography and a selected-project grid. Case studies have section navigation, technical notes, and captioned images that open at full size. Reduced-motion preferences disable transitions and entrance animations.

## Deployment

The existing GitHub Actions workflow exports and deploys to GitHub Pages on pushes to `main`. Keep `public/.nojekyll` so Pages serves `_next/` assets. Pages should use **GitHub Actions** as its source. No deployment or domain changes are required for this redesign.
