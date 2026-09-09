# Thirdplane Labs: services positioning and landing-page copy

> Current editorial reference: [consolidated live-page comparison and proposed copy](LABS_COPY_REVIEW_2026-09-09.md). The consolidated revision is now approved and implemented for branch preview. This document preserves earlier context; its public-copy/layout recommendations and verification statements describe their respective earlier iterations.

9 September 2026. Historical service catalogue and internal capability reference. Public copy is now governed by `LABS_CLIENT_POSITIONING_2026-09-09.md`, following the approved shorter direction. Earlier version: Supersedes the July landing-page copy and page-inventory recommendations for this route. Earlier research and strategy documents remain historical context.

## Positioning

Thirdplane Labs offers AI evaluation design, automated review implementation, and judge/verifier validation to teams building AI products and training systems.

The client benefit is a usable evaluation workflow and a clearer basis for interpreting its scores. The intellectual foundation is the connection between the intended outcome, its criteria, the evaluator, and the decision or optimization process using the result.

Offer scoped technical services now. Do not imply a staffed institution, a completed Harbor replication, a proprietary platform, a certification, or demonstrated client outcomes. A service offer describes work available for engagement; it is not a claim that every method has already been deployed.

## Audience and conversion

Readers may be product engineers, research leads, or teams working on training data, RL environments, and benchmarks. They need to design an evaluation, operationalize review, or investigate an existing score. External procurement is one possible context, not an eligibility requirement.

The primary action is to discuss a project by email. Keep the recognizable invitation about what the score is meant to measure. Ask for the system, outcome, and pending decision; do not make visitors complete a qualification form.

## Services and deliverables

| Service | Work offered | Deliverable |
|---|---|---|
| Evaluation design | Define outcomes, criteria, representative cases, and review procedures | Evaluation plan, test cases, scoring criteria |
| Automated review workflows | Implement output/trajectory review and integrate it with development or evaluation workflows | Review workflow, evidence-linked findings, handoff documentation |
| Judge and verifier validation | Test criteria application, shortcuts, missed failures, and behavior under selection pressure | Reproducible tests, findings, prioritized recommendations |

Exact deliverables, data access, effort, and acceptance criteria are agreed per engagement. No invented prices, timelines, or performance guarantees.

## Method categories

| Method | Role | Evidence boundary |
|---|---|---|
| Automated output and trajectory review | Detect and flag candidate failures at scale | Flags need calibration; unflagged samples matter for estimating misses |
| Direct verification | Check explicit requirements through tests, replay, and outcome inspection | Passing checks establishes the checked requirements, not automatically the broader claim |
| Controlled failure and confound tests | Probe known failure detection and responses to irrelevant variation | Constructed cases do not establish coverage of every real failure |
| Human and expert review | Supply relevant judgment and assess disagreements | Human judgments also require calibration; agreement is not accuracy |
| Optimization stress tests | Compare score movement with an independently assessed outcome during selection or training | A bounded selection test does not establish all behavior during RL |

Harbor's PR-bot trajectory review is an internal reference for an established pattern. The service is solving the client's review problem: detecting candidate failures, exposing supporting evidence, and integrating review into the team's workflow. Select and adapt techniques that fit that problem; do not sell a Harbor copy or imply a proprietary invention. Its public Terminal Bench PR #112 demonstrates useful review and score adjustment; it does not by itself estimate the judge's overall accuracy. Reference: https://github.com/harbor-framework/terminal-bench-2-1/pull/112.

The landing page names the general method. Vendor-specific examples and implementation details belong in project discussions and technical documentation.

## Style and page decisions

- Preserve the existing Labs cream/ink palette, serif headline, sans-serif body, fine rules, logo, and restrained layout.
- Lead with the service and its client purpose. Use direct verbs and concrete deliverables.
- Remove the biography, published-work promotion, unfinished-essay teaser, and proposed benchmark study from this landing page. Neither a CV nor an origin story is required to understand the offer.
- Remove the before/after independence argument, certification disclaimers, artificial scarcity, and sales-funnel reassurance.
- Use one concise limitations sentence in the engagement section. Keep scientific detail in the work itself.
- Retain the `#request-research` anchor for existing inbound links, although the visible invitation is now commercial.
- Update search and social descriptions alongside the visible copy.

## Final landing-page copy

### Metadata

Title: Thirdplane Labs — AI evaluation design and validation

Description: AI evaluation design, automated review workflows, and judge and verifier validation for teams building AI products and training systems.

### Masthead

thirdplane labs

AI evaluation services

Discuss a project

### Hero

# Know what your AI scores mean.

Evaluation design, automated review, and validation for teams building AI products and training systems.

Work with Thirdplane Labs to turn intended outcomes into useful tests, build review workflows, and investigate whether your scores support the decisions you make.

Discuss a project

### Services

#### Evaluation design

Define what success means for your system and how to test it. Develop criteria, representative cases, and review procedures for product quality, agent behavior, or training signals.

Deliverables: Evaluation plan, test cases, and scoring criteria.

#### Automated review workflows

Build workflows that inspect AI outputs and agent trajectories, flag potential failures, and surface evidence for review. Integrate judges and direct checks into your evaluation pipeline or GitHub workflow.

Deliverables: Working review workflow, evidence-linked findings, and handoff documentation.

#### Judge and verifier validation

Assess whether an evaluator applies its criteria reliably and whether those criteria capture the intended outcome. Test for missed failures, misleading shortcuts, and divergence between scores and outcomes under selection pressure.

Deliverables: Reproducible tests, findings, and prioritized recommendations.

### Methods matched to the question

Combine automated review with evidence that tests its conclusions.

- Automated review: Inspect outputs and trajectories for errors, reward hacking, and violations of task requirements.
- Direct checks: Use tests, replay, and outcome inspection to verify explicit requirements.
- Controlled tests: Introduce known failures and vary irrelevant details to probe what the evaluator responds to.
- Human review: Use blinded assessment where human or expert judgment is relevant, with disagreement recorded.
- Optimization tests: Compare score improvements with independently assessed outcomes as candidates are selected or systems are trained.

### A focused engagement

Start with the system, the outcome you care about, and the decision ahead. Agree on scope, evidence access, and deliverables before the work begins.

Each engagement includes a documented handoff: the implementation or analysis, supporting evidence, and recommended next steps. Findings state the versions and cases tested, along with the limits of the conclusion.

### Tell me what the score is meant to measure.

Need to build an evaluation, automate review, or assess an existing judge? Send a brief description of your system, what success should mean, and the decision or timeline you are working toward.

Discuss a project: j@thirdplane.io

### Footer

© 2026 thirdplane labs · studio work →

## Implementation and verification

Implemented in `labs/index.html` on `codex/labs-services-copy`, based on the latest fetched `origin/main`. The existing Labs asset paths, standalone page architecture, canonical URL, studio footer link, and inbound contact anchor are preserved. Search and Open Graph titles/descriptions now match the service offer.

Validation: production build passed; desktop and 390px mobile layouts inspected in the in-app browser; mobile content width equals viewport width; contact navigation reaches the correct section; email target and subject checked without sending email; internal links and unique section IDs checked; built Labs HTML matches the source. The standalone Playwright CLI was unavailable because Chrome was not installed, so browser verification used the in-app browser instead.

Changes are local and have not been published to thirdplane.io.

### Alignment follow-up

Unified the masthead, section rules, contact section, and footer within a centered 960px frame. Services and Methods now share column proportions and a 32px gutter; row labels and descriptions align on their first text baseline. Both grids stack at 720px, with explicit vertical gaps. Added contact anchor scroll spacing.

Checked rendered desktop and phone layouts, the mobile contact link, and DOM geometry at 390, 720, 768, 1082, and 1440px. No horizontal overflow; section edges match, and both description columns have the same starting position. The Eleventy build and `git diff --check` passed. Restored the browser's normal viewport after testing.
