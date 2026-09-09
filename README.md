# aaronrhim.com — portfolio

A static Next.js site. Every fact lives in [`lib/content.ts`](lib/content.ts); the
page files are layout only.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script              | What it does                                               |
| ------------------- | ---------------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                                 |
| `npm run build`     | Static export into `out/`                                  |
| `npm run start`     | Serve the built `out/` to check the real production output |
| `npm run typecheck` | `tsc --noEmit`                                             |
| `npm run format`    | Prettier                                                   |
| `npm run check`     | format check + lint + typecheck + build, in one go         |

---

## Editing content

**Everything is in `lib/content.ts`.** Profile, links, the masthead figures, the
three roles, every project, education, awards and skills. Change that file and
every page follows — you should not need to open a `page.tsx` to update a fact.

The file header states the two rules that keep the copy from drifting, and they
are worth re-reading before adding anything:

**Fact discipline.** Anything presented as a statement about you comes from the
resume, from prose you wrote, or from a repository someone can open. Where a
number is claimed it is a number you measured. Do not replace a value with a
plausible-sounding invention — an unverifiable claim on a portfolio is a claim
someone will ask about in an interview.

**Voice**, three subtractive rules:

1. Numbers instead of adjectives. "9.8 cm mean joint error" does the work that
   "highly accurate" only gestures at, and it survives scrutiny.
2. A spaced hyphen in rendered copy, never an em dash. Em dashes are fine in
   source comments. This is the cheapest single edit that removes the machine
   cadence from a paragraph.
3. No "passionate", "innovative", "cutting-edge", "seamless", "leveraging",
   "journey", and no "Whether you are X or Y".

Two length limits are written into the TypeScript types rather than left to
memory, because constraints in a type survive and constraints in your head do
not:

- `Project.blurb` — five or six words. A label, not a summary.
- `Role.blurb` — six or seven words.

### Deliberately not on the site

The phone number and street address that appear on the resume. A resume is
handed to a named recipient; a portfolio is indexed by search engines.

---

## Where each source shows up

The design is assembled from three places, split by layer rather than blended.

**al-folio** supplies the primitives. The token structure is its `--global-*`
model: a small set of slots that every component reads, redefined wholesale
under `[data-theme="dark"]`, so re-skinning the site is an edit to one block in
`app/globals.css`. From it directly:

- **Headings are large, never loud.** al-folio's whole character rests on one
  declaration — its bundled MDB sets `h1..h6 { font-weight: 300 }` on top of
  `body { 300 }`, so headings and body share a weight and a big heading reads as
  a change of scale rather than a change of volume. Here everything is 400 and
  bold appears in exactly three places: the first name in the wordmark, the
  current nav item, and `<Em>`.
- **No letter-spacing.** Grepping al-folio's fifteen SCSS partials for
  `letter-spacing` returns zero hits. The airiness is a property of the weight.
  The masthead is the one exception, because at that size default tracking opens
  visible gaps.
- **The link rule.** Accent-coloured, no underline at rest, and on hover the
  colour does not change — only the underline arrives.
- **A flat 930px container** at every width, with no responsive ladder behind
  it. That fixed measure is most of why it reads like a printed page.
- **The whisper label** (`.whisper`, al-folio's `.projects h2.category`): a
  section name set in the divider colour, right-aligned on its own hairline.
- **The card**: flat at rest, lifting into a shadow over 0.55s without moving.
- **`.btn-ghost`**, its `a.btncv` — a tiny uppercase outline button, and the
  only button idiom on the site. There is no filled button anywhere.
- **The three-state theme toggle**: system → light → dark, with two attributes
  on `<html>` (`data-theme-setting` for the raw choice, `data-theme` for the
  computed one), so "system" is a real persistable choice rather than the
  absence of one.

**UBC Rover** supplies the restraint about headings — the thing that makes the
site quiet:

- `.raised`, the background step that separates two sections without a rule and
  a caption. Every band owns its own vertical padding so the colour change lands
  in empty space; a boundary cutting across a card reads as a rendering fault.
- No eyebrow above any `<h1>`. `PageHeader` has no eyebrow slot at all, which is
  what stops the tic coming back later.
- One-word headings, and no title + kicker + standfirst stacks.
- Numbers instead of claims.

**Eithelmir** supplies the content about Eithelmir, plus three mechanics: the
hairline grid (`gap-px` over a rule-coloured background) used for the masthead
figures, the big-mono-numeral stat block, and `<Em>` as the entire emphasis
system — at most one emphasised phrase per heading, which is why there is no
fourth type style to invent later.

### Two deliberate departures

**Not the parchment skin.** Eithelmir is `#f7eedd` cream with EB Garamond and
`#bb731b` burnt amber, and the previous version of this site wore it. Warm cream
plus a serif display plus a terracotta accent is currently the single most
recognisable "generated page" signature there is. The ground here is al-folio's
white with an oxide amber accent (`#b4530a`, 5.02:1 on white) that still carries
the gold running through both UBC Rover's `#DA9C3E` stripe and Eithelmir's
`#bb731b`.

**Lowercase mono labels, not tracked-out ALL-CAPS.** Eithelmir's own stylesheet
records abandoning uppercase: _"the lowercase chrome experiment is over — no
transform, proper nouns keep their capitals."_ Sentence case also lets a label
carry a real proper noun (ROS 2, CAN-FD, MuJoCo) without shouting it. Uppercase
survives in exactly one place, `.btn-ghost`, where at 0.7rem it is a control
rather than a label.

---

## Motion

**There is deliberately no scroll-reveal system.** Both reference sites have
one, and a staggered fade-and-slide on every section as it enters the viewport
is the most recognisable tell of a generated page — it also means nothing can be
read until it has finished arriving.

The only non-interactive motion is one load sequence on the home masthead
(`.rise`, staggered with a `--rise-delay` custom property). Everything else
moves because someone pointed at it. `prefers-reduced-motion: reduce` stops all
of it while leaving every element visible.

---

## Deploying

`npm run build` writes a complete static site to `out/`. The GitHub Actions
workflow in `.github/workflows/` deploys it to Pages on every push to `main`.

`public/.nojekyll` stops GitHub Pages from stripping the `_next/` directory. Do
not delete it — without it the site deploys with no CSS or JS.

**Pages must be set to "GitHub Actions"** under Settings → Pages → Source. On
the default "Deploy from a branch" setting, Pages runs Jekyll over the
repository source, finds no `index.html` at the root, and renders `README.md`
instead of the site.

There is no `public/CNAME`. Add one only when you know which domain this
deployment should own — a Pages site claims a domain exclusively, so committing
the wrong one takes the domain away from whichever repo currently serves it.

---

## Images

`public/images/` carries the photos and screenshots from the previous site. Two
things to know before adding more:

- **Ship artifacts, not mockups.** One image was removed during the rebuild:
  `thumbnails/connectionsthumbnail.png` was an AI-generated stock photograph of
  a laptop on a desk displaying a fictional product called "Connections",
  sparkle watermark and all. It has been replaced by `connectionsworkflow.png`,
  which is the actual n8n graph. A picture of something that does not exist,
  standing in for something that does, is worse than no picture.
- **Covers are cropped to 16/10 and galleries to 4/3**, both with
  `object-cover`. al-folio itself sets no aspect ratio on card images, which
  leaves a grid ragged; that is fixed here rather than reproduced.

The directory is roughly 120 MB of uncompressed source images. If that starts to
hurt, compress in place with ImageMagick and keep the originals somewhere else
before you do.
