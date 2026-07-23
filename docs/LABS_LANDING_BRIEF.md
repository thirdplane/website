# Brief: thirdplane labs landing page — `thirdplane.io/labs` v0

2026-07-10, rev 2. Simplified per PI: no subdomain, no second Vercel project.
One static page inside the existing site, live on the next deploy. This
document is the contract; §6 is the definition of done.

## 1. What this is

The public front door for **Thirdplane Labs — an independent audit firm for
the judgment AI is trained on.** One page. When the founder emails a lab's
eval/post-training person, or a warm contact forwards the name, the recipient
lands on something that reads *exam board, not startup* and finds one door.

It is NOT the publication site. The blind test, the "Grading the Graders"
article, the divergence table, and receipts are **blocked on research
completion** — out of scope. No placeholders, no "coming soon": a public audit
site showing fabricated sample numbers refutes its own thesis on contact.

**The medium is the message:** spare, typographic, lab-notebook austere. No
stock imagery, no gradients, no illustration, no decoration. Functional
transitions only, guarded by `prefers-reduced-motion`.

## 2. Deliverable

1. `labs/index.html` — single self-contained file, inline CSS, no JS.
2. One line in `.eleventy.js`: `eleventyConfig.addPassthroughCopy("labs");`
   (serves at `/labs/` via the existing build + `cleanUrls`).

Nothing else changes. Do not touch templates, `_data/`, `_includes/`, or
`vercel.json`. The existing site must build exactly as before.

## 3. Design system — canonical source

**`mockups/light-cool-mono-specimen.html` (round 4) is the single source of
truth.** Copy its `:root` verbatim: paper scale, ink scale, hairlines, spacing
tokens (`--sp-1`…`--sp-7`), type steps (`--step-0`…`--step-5`), font stacks
(Source Serif 4 / Inter / IBM Plex Mono), and its Google Fonts link (fine for
v0; self-hosting is deferred).

Binding rules:

- **Strict monochrome.** The data accents exist for data components; v0 has
  none, so **zero hue renders anywhere.** Keep the accent tokens in `:root`
  commented as reserved.
- Hierarchy by weight, size, hairlines — never color or decoration.
- Serif: display headline (weight 340, `font-optical-sizing: auto`) and at
  most one pull-quote. Inter: everything readable, sub-heads at 600. Mono:
  metadata only, floor 0.75rem.
- Radii ≤ 8px (6px buttons). Spacing on the token grid. Measure ≤ 68ch.
  `text-wrap: balance` on headings. No `-webkit-font-smoothing: antialiased`.

## 4. Page structure & copy

Copy blocks below are extracted and pre-cleared from the PI's positioning doc
— use as the base, tighten freely, **add nothing new**. Wordmark lowercase:
**thirdplane labs**.

1. **Wordmark + eyebrow.** `thirdplane labs` (serif, modest) with mono
   eyebrow: `independent audits of AI training judgment`.

2. **Thesis (the hero, the page's only display-size text):**
   > The AI industry buys tens of millions of hours of human judgment a year
   > and spends billions training against automated judges — with no
   > independent inspection of either. Thirdplane Labs is the inspection.

   Suggested cut: first two sentences as serif display, last as an Inter
   standfirst. Your call.

3. **What we audit.** Three short blocks, hairline-separated, no cards/icons:
   - **Judge audits** — before a lab trains against an automated judge or
     reward model, we measure where it diverges from real human judgment on
     the customer's own distribution.
   - **Ground-truth audits** — the reliability of the customer's own labels
     and experts: do they agree with themselves, and with each other? No
     model can exceed its labels' consistency.
   - **Vendor certification** — an independent pass/fail a data vendor can
     show its lab customers.

   **No prices, no tiers, no "book a demo."**

4. **Why independence.** One paragraph: nobody who sells data or trains models
   can grade either; vendors can't audit themselves, and internal QA can't
   certify to a counterparty. One permitted flourish, one sentence: the
   *third plane* as the vantage above the two parties — the referee's position.

5. **Who.** One paragraph: founder's seats in the judgment supply chain —
   supply side (led an expert legal-annotation team in the BERT era), demand
   side (AI engineer accountable for precision/recall of applied AI in
   legaltech), now the referee's seat. No headshot, no résumé-speak.

6. **The door.** One paragraph, one `mailto:j@thirdplane.io`. Optionally one
   line: a first report is in preparation. No forms, no embeds.

7. **Footer.** Mono meta: `© 2026 thirdplane labs` + one quiet link to
   `thirdplane.io` labeled `studio work →`, unexplained.

Copy anti-scope: no competitor/customer names, no market numbers, no roadmap.
Every sentence must survive a procurement meeting.

## 5. Technical requirements

- Semantic landmarks, one `h1`, no skipped heading levels.
- **No JavaScript.** Meta: title `thirdplane labs — independent audits of AI
  training judgment`; description ≈ the one-liner; canonical
  `https://thirdplane.io/labs/`; `theme-color` #EDEFF2; basic OG tags (image
  optional in v0).
- Only external request: the specimen's Google Fonts. HTML ≤ 30 KB.

## 6. Acceptance criteria

- [ ] Every claim traces to §4; zero invented facts, numbers, or prices; no
      placeholder text; no dead links; no superlatives.
- [ ] `:root` tokens match the round-4 specimen; zero hue rendered.
- [ ] All text AA (≥ 4.5:1, or ≥ 3:1 only above 24px/19px-bold) against its
      actual surface.
- [ ] No horizontal scroll at 360 / 768 / 1080 / 1440; measure holds.
- [ ] Keyboard: visible 2px ink focus ring on the two links; transitions off
      under `prefers-reduced-motion`.
- [ ] Valid HTML; `npm run build:prod` passes; `/labs/` serves from `_site`;
      the rest of the site byte-identical.

## 7. Deferred to publication launch (do not build now)

Subdomain (if ever wanted: add `labs.thirdplane.io` to the existing Vercel
project + one host-conditioned rewrite to `/labs/` — no second project),
self-hosted subset fonts, OG image pipeline, print stylesheet, CSP headers,
email capture, and the data components (blind test, divergence table, article,
receipts) — where the reserved accents activate. When research clears, this
page's sections reorder below the blind test; don't couple the hero's markup
to being first.
