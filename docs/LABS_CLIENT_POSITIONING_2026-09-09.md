# Labs: client positioning and public copy

> Current editorial reference: [consolidated live-page comparison and proposed copy](LABS_COPY_REVIEW_2026-09-09.md). The consolidated revision is now approved and implemented for branch preview. This document preserves earlier context; its public-copy/layout recommendations and verification statements describe their respective earlier iterations.

9 September 2026. Current copy reference for `labs/index.html`. Supersedes the public landing-page recommendations in `LABS_SERVICES_POSITIONING_2026-09-09.md`; that document retains the internal capability catalogue.

**Editorial status:** This records the implemented short iteration. The user subsequently questioned its brevity. See [strategy context](LABS_STRATEGY_CONTEXT_2026-09-09.md) for the preserved research, rationale, tradeoffs, and unresolved questions; shortness is not a permanent requirement.

The page also now includes the separately requested [disagreement comparison](LABS_DISAGREEMENT_FRAMEWORK_2026-09-09.md), between the problem list and engagement section. Its copy is maintained in that document.

## Audience and offer

Primary audience hypothesis: technical founders, CTOs, and AI product leads at small teams with a working product but no dependable way to judge quality or compare changes. This is a positioning choice, not validated purchasing demand. Training and verifier teams remain a specialist outreach audience.

Lead with recognizable problems and the result of an engagement. Keep evaluation protocols, prompts, failure taxonomies, implementation recipes, and unpublished research out of the public landing page. No invented proof, client outcomes, timelines, or guarantees. A future proof example must be verifiable and accurately labeled.

## References

- [Parlance Labs](https://parlance-labs.com/): foregrounds identifying failures, deciding what to fix, and repeatable improvement.
- [Latacora](https://www.latacora.com/): states the capability built for clients and explains the relationship, with detailed services elsewhere.
- [thoughtbot AI services](https://thoughtbot.com/services/machine-learning-artificial-intelligence-ai): connects a scoped engagement to client decisions and tangible outputs.

Reviewed September 9, 2026. These inform communication structure; their websites do not establish conversion effectiveness. Copy below is original.

## Public copy

Masthead: AI evaluation services · Discuss a project

### Know what to improve in your AI product.

Thirdplane Labs helps AI teams find quality gaps, evaluate changes, and build more reliable review workflows.

Discuss a project →

### When to bring me in

- Your scores look good, but important failures still get through.
- Your team can’t reliably tell whether a change is better.
- Manual review is slowing development.

### A focused engagement

Start with one product question. Get an assessment, a working evaluation or review workflow, and clear next steps—depending on what the problem needs.

### What are you trying to improve?

Tell me what you’re building and where judging quality gets difficult.

Discuss a project →

## Implementation

Preserve the cream/ink visual identity and shared 960px frame. Two editorial rows share a label/body grid, stacking at 720px. Remove the public methods catalogue, repetitive deliverables, and their unused styles. Keep the existing contact anchor for inbound links and email destination. Update title and search/social descriptions. Changes remain local until published.

## Verification

Production Eleventy build and whitespace checks passed. Desktop and 390px phone layouts were visually inspected; geometry checks at 390, 768, and 1280px found no horizontal overflow. Desktop/tablet body columns align, and frame edges match. Mobile contact navigation and the email destination were checked without sending email. Built Labs HTML matches its source. Browser viewport restored after testing.
