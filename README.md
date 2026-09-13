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
- `components/HmiStudy.tsx` and `lib/hmi-code.ts`: the HMI case study and complete C++ excerpts from Aaron’s draft.
- `components/RlStudy.tsx`: the RL case study, grounded in the draft and LearnFlake’s experiment log.
- `components/RoverSupportingWork.tsx`: the controls, GNSS, driver, twin, and infrastructure supporting those two primary projects.
- `app/page.tsx`: the personal introduction and home-page selection.
- `public/images/`: project photographs, diagrams, and recordings.

Keep claims grounded in the resume, Aaron’s own writing, or project source. Preserve the distinction between measured results, estimates, prototypes, and future work. The RL results are sourced from LearnFlake’s recorded evaluations; training was not rerun for the portfolio. Other experience measurements remain sourced from the earlier portfolio.

The content structure takes inspiration from [Gabriel Yu’s project pages](https://gabrielyu.ca/projects/tool-changer): a concise overview followed by focused technical explanations and project media. Aaron’s HMI source is [the portfolio draft](https://docs.google.com/document/d/1jddbGmmrR2rWa4vrTPP1sdY4OOqWeMu6OHtbKRpGJEI/edit). The draft itself was not changed.

## HMI study

`lib/dwindle.ts` implements splitting, recursive geometry, and sibling promotion on removal. `components/HmiDemo.tsx` is an accessible browser demonstration with sample data, panel selection, a six-panel limit, and reset. It illustrates the Qt layout behavior; it does not run the real HMI or connect to hardware.

`hmi-debug.mp4` is a web-encoded, audio-free copy of the recording named in the draft. The original roadmap is preserved as historical context, with Aaron’s subsequent digital-twin and task-completion work marked as implemented. The architecture and split illustrations are reconstructed from source; a competition photograph has not been supplied.

## Rover content sources

The page gives HMI and RL primary-project ownership and places other contributions beneath them. Source material checked for the September 2026 revision:

- Aaron’s Google Doc and follow-up corrections in this conversation.
- RoverFlake2: `gui_module.h`, `hmi_host.cpp`, `layout_store.cpp`, `dwindle_tree.cpp`, the arm-driver headers, `arm_twin.cpp`, `rover_mapping/README.md`, and `morse_decoder_node.py`.
- Aaron’s `dwindle.tex` equation notes. The page qualifies the ideal aspect-ratio bound and rounding/minimum-size assumptions.
- LearnFlake: `TRACKER.md` §§35–40, `documentation/residual_rl.md`, and `results/m4_fullchain_v16b.md`. Approach-only results are separated from the 429/435 full-chain result; all are MuJoCo evaluations, not hardware validation.
- `rover4.mp4` is the RL typing recording specifically selected in the updated draft. Its poster is extracted from the recording.

## Design

`app/globals.css` owns the paper/green palette, typography, responsive layouts, and theme tokens. The home page leads with real rover photography and a selected-project grid. Case studies have section navigation, technical notes, and captioned images that open at full size. Reduced-motion preferences disable transitions and entrance animations.

## Deployment

The existing GitHub Actions workflow exports and deploys to GitHub Pages on pushes to `main`. Keep `public/.nojekyll` so Pages serves `_next/` assets. Pages should use **GitHub Actions** as its source. No deployment or domain changes are required for this redesign.
