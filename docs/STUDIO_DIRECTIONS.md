# Studio direction previews

The homepage keeps the original full-screen halo and replaces the colorful
statement placeholder beneath it with the Open studio introduction, projects,
and field notes. The four original design studies remain available separately.

| Direction | Route |
| --- | --- |
| Homepage — original halo + Open studio | `/` |
| A — Studio notebook | `/directions/notebook/` |
| B — Live workbench | `/directions/workbench/` |
| C — Research journal | `/directions/journal/` |
| D — Open studio (existing Neon Noir style) | `/directions/open-studio/` |

Run `npm run dev`. The comparison switcher appears only on the direction preview
pages; the homepage keeps the original navigation and opening composition.

The homepage and all alternatives extend `layouts/base.njk`. The navigation
block lets these pages supply their own masthead; other pages keep the existing
navigation. Footer content still comes from the shared footer and site data.

Directions A–C share `studio-directions.css`, `studio-directions.js`, and the
field-note component. Project links open brief field notes when JavaScript is
available and otherwise navigate to the existing full write-ups. Modified
clicks retain normal link behavior. The workbench halo is an illustrative CSS
interaction, not the original WebGL or AI-generated control system.

Content and reference imagery follow the design studies from this conversation,
including the earlier Holovibes material playground. Existing project articles
and collection pages retain their own content and styling.

Validation: production Eleventy build, existing draft-visibility tests, JavaScript
syntax, and desktop/mobile browser checks in both color schemes. Preview routes,
image loading, field-note open/close behavior, and halo controls were checked.

Direction D preserves the existing Neon Noir tokens, shared navigation and
footer, and original Nova Halo shaders. Its layout brings a personal
introduction, selected projects, and field notes onto one continuous page.
The halo pauses when offscreen, respects reduced motion, and has an explicit
pause control. It uses separate page styles rather than the A–C restyle.

The homepage and D preview share `open-studio-content.njk`; the homepage omits
the small second halo. Its original Nova Halo animation remains in the homepage
scripts block, including the palette change when returning from the content.
