# Adeeb Shah · portfolio (v4)

Flat, animated, no 3D. Graphite grey design system with a light theme (toggle in the nav; follows the system preference until the visitor picks one, then remembered in localStorage). Next.js 16 + GSAP (ScrollTrigger, SplitText) + Lenis.

## Run

    npm run dev -- -p 3222      # http://localhost:3222
    npx next build              # production build

## The ideas

- **Compiled portrait** (`components/Portrait.tsx`): the photo is sampled into code glyphs on a canvas, compiles in on load, the real photo wipes over it, and the cursor opens an x-ray lens onto the code. Touch screens get an automatic scan.
- **Split-flap name** (`lib/flap.ts`, `components/Hero.tsx`): ADEEB / SHAH on giant departure-board tiles that flap into place and flip when hovered.
- Scroll-scrubbed statement with inline image pills, odometer counters, stacking product cards, client list with a cursor-following preview, and LET'S TALK on flap tiles in the footer.

## Sections (top to bottom)

No loading screen. Hero (black-and-white cutout of his seated suit photo with a colour spotlight that follows the cursor, silver gradient name with outlined surname, metrics strip) · statement · proof counters · nine-chapter horizontal story · the record (filterable achievement ledger) · range (engineer → founder: list on the left, active pillar panel on the right, auto-advancing) · AI (his take on the bubble, four principles, two live agents with typing prompt demos) · products · live shipping chart (real pushes, 30 days) · client work · client quotes · typeable terminal + stack field · off the clock · footer.

## Device frames

`components/Device.tsx` draws iPhone, iPad and MacBook frames in CSS around real screenshots (`<Device kind="iphone" src="..." />`). Frame sizes use container units, so keep the `.frame` wrapper inside `.dev`.

## Performance

Run the production server to judge speed (`npx next build && npx next start -p 3222`); the dev server ships unminified code and runs every effect twice. Rules the site follows: no `mix-blend-mode` or `backdrop-filter` on large or fixed layers, no animated `filter` on scroll, no layout reads inside pointer handlers (measure once, re-measure after scroll or resize), images as right-sized WebP, and never name custom keyframes `ping`/`pulse`/`spin`/`bounce` (Tailwind defines them and wins).

## Content

Every fact lives in `lib/content.ts`. Rules from Adeeb: no religious references, no education, no resume download.

## Swapping the photo

The hero uses `public/portrait/adeeb-cut.png`, a transparent cutout made from his mockup photo with macOS Vision (`assets/portrait-v2/`). To swap: drop in a new transparent PNG with the same name; the spotlight light sweep is masked by that file too. Everything re-derives from it. The brief with specs and references is in `../assets/photo-brief/index.html`.

## Share image and icons

`app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`, `app/opengraph-image.png`, `app/twitter-image.png` and `app/manifest.ts` are picked up by Next automatically. Set `NEXT_PUBLIC_SITE_URL` in production so share-image links are absolute.

## Live data

Set `GITHUB_TOKEN` (see `.env.example`) in production. Without it the public API allows 60 requests an hour; when that runs out the hero shows "Daily pushes to GitHub" instead of a number.

`/api/github` (public events, last 30 days) and `/api/discord` (Acronoid E-Sports invite counts).
