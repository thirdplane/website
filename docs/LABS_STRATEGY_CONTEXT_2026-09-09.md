# Thirdplane Labs: research, positioning, and editorial context

9 September 2026. Internal context for the Labs website and future service conversations. This document preserves the reasoning behind the copy, including useful material removed from the landing page. It is not public marketing copy or evidence of completed client engagements.

## Current status and the length correction

The current local page is a deliberately short version: a product benefit, three recognizable problems, one engagement paragraph, and a contact invitation. The user approved proceeding with that proposed direction, then questioned why the implementation was so short and asked to preserve the valuable context.

Parallel-task integration: a separate user-requested disagreement comparison has since been added between the problem list and engagement section. Its research and design rationale are preserved in [the disagreement framework](LABS_DISAGREEMENT_FRAMEWORK_2026-09-09.md). It compares agent–agent, agent–human, and human–human judgments, with a fourth panel for the shared requirement of outcome evidence. This is a conceptual synthesis, not a fourth pairing or evidence of measured client results. Agreement alone does not establish correctness.

The earlier version over-explained methods and deliverables. The shortened version risks the opposite: it does not adequately explain what working with Labs entails or why a buyer should choose it. Neither version has been validated with prospective paying clients. The lesson is to reduce repetition and premature technical detail while retaining useful buying information. Brevity itself is not the objective.

This context capture does not authorize a new page rewrite. The next revision should use the material below to find an appropriate middle ground, informed by the user's latest feedback.

## Document map

- `LABS_CLIENT_POSITIONING_2026-09-09.md`: current implemented public copy, references, layout, and verification. Treat the copy as the current iteration, not settled strategy.
- `LABS_SERVICES_POSITIONING_2026-09-09.md`: earlier detailed copy and the internal service/method catalogue. Its public-copy recommendation is superseded, but the capabilities and evidence boundaries remain useful.
- `LABS_DISAGREEMENT_FRAMEWORK_2026-09-09.md`: research citations, scientific caveats, service mapping, and the rationale for the user-requested comparison added in a parallel task.
- `labs/index.html`: current implementation, including page-local CSS and metadata. Local changes have not been published during this work.
- `/Users/jasminepoon/src/operator-research/current-synthesis.md`: broader research framing, read during the positioning discussion.
- [Model internals research](https://www.thirdplane.io/works/model-internals-research/?from=model-internals-research#how-to-interpret-these-findings): the user highlighted the interpretation section as an important bridge to evaluation work.

## What the user wants

- Offer professional services around a problem a client recognizes and can hire someone to solve.
- Communicate expertise without exposing the entire research agenda or implementation playbook.
- Avoid making the landing page a biography, CV, or promotion of writing the user does not consider ready to foreground.
- Do not overemphasize inconclusive image-steering experiments. Preserve the broader question those experiments motivated.
- Draw internally on techniques that work, including automated review patterns, while framing the public offer around the client's problem.
- Preserve a considered visual identity and check actual rendered alignment, rather than treating a successful build as sufficient design verification.
- Preserve depth in project documentation even when public copy becomes shorter.

## Intellectual foundation and its limits

The broader operator-research synthesis asks when improving AI also improves people's capacity to understand, choose, create, and improve their own ways of working. It distinguishes effective capability, learned capability, and agency. Better assisted output does not by itself demonstrate human learning or meaningful control. The synthesis is a conceptual argument and research agenda; existing prototypes do not validate all of its claims.

The user explicitly connected the model-internals project to a more general evaluation question: whether an apparently convincing automated evaluation measures the intended outcome or a convenient proxy. Their interpretation section proposes independent testing of the measurement chain before a judge, verifier, or reward model supports a training decision or accuracy claim.

These strands support an evaluation-services direction, but the broader thesis should not be flattened into a claim that all of the user's work is about evals. The commercial bridge is narrower: help a team connect what it measures to what it wants to improve, and make the resulting evidence useful for a decision.

Public claims must distinguish work offered from work already demonstrated. Do not imply a validated proprietary methodology, certification, completed replication, staffed research institution, or proven client outcome without evidence.

## Demand signal collected

The user received inbound contact from a founder building a consumer AI product. The sender referred to the site's research-conversation invitation, expressed interest in comparing notes on evaluations, and also mentioned hiring. The sender described a small technical team and prior traction/funding; these were claims in the supplied message, not independently verified in this task.

What this supports: the existing question can attract a technically relevant conversation, and the site can function as a gateway to collaboration or employment as well as consulting.

What it does not support: established consulting demand, a budget, a defined paid engagement, or a validated customer segment. Do not present the sender or company as a client. Personal contact details and the full private message are intentionally not reproduced here.

## Audience hypotheses

| Audience | Recognizable trigger | Possible scoped help | Status |
|---|---|---|---|
| Technical founder, CTO, or AI product lead at a small team | A working product exists, but quality decisions rely on anecdotes or unstable scores | Establish useful tests, diagnose gaps, or compare a consequential change | Recommended primary landing-page audience; purchasing demand unvalidated |
| Product/engineering team doing extensive manual review | Output volume exceeds review capacity | Implement review that surfaces relevant failures and supporting evidence | Practical entry problem; capacity and accuracy requirements must be scoped |
| Research, training, benchmark, or verifier team | Judge/verifier scores drive selection or a performance claim | Investigate evaluator reliability and whether scores capture the intended outcome | Plausible specialist audience for targeted outreach |

Segment by the problem and the decision, not only company stage or industry. There is no agreed employee-count cutoff, funding-stage requirement, price, or duration. Consumer AI is one relevant example from inbound interest, not an established exclusive vertical.

## Problems and the outcomes worth explaining publicly

| Client's situation | What an engagement could resolve | Tangible result |
|---|---|---|
| Scores look good but important failures still occur | Which relevant failures the evaluation misses and how to investigate them | Assessment with supporting examples and prioritized next steps |
| The team cannot reliably judge whether a model, prompt, or workflow change is better | How to compare versions against the product's intended behavior | Repeatable evaluation with representative cases and usable criteria |
| Manual checking slows development | Which checks can be automated and which cases need human attention | Working review workflow with evidence and a documented handoff |

These are offers to perform bounded work, not guarantees of catching every failure, improving every metric, or proving readiness to launch.

## Internal capabilities worth preserving

1. **Evaluation design:** define intended outcomes, criteria, representative cases, and review procedures. Potential outputs include an evaluation plan, test cases, and scoring criteria.
2. **Automated review implementation:** inspect outputs or agent trajectories, flag candidate failures, expose relevant evidence, and integrate review with development workflows. Potential outputs include a working workflow and handoff documentation.
3. **Judge and verifier validation:** examine both reliable application of criteria and whether those criteria reflect the intended outcome. Potential outputs include reproducible tests, findings, and recommendations.

Useful method families include automated review, direct checks/replay, controlled failures and confounds, independent human or expert assessment, and tests under selection or optimization. These are an internal menu, not mandatory steps for every engagement.

Evidence boundaries retained from the detailed document:

- A bot's findings do not establish how often it misses failures; unflagged examples matter too.
- Passing explicit checks supports the checked requirements, not every broader claim.
- Constructed failures do not establish coverage of real-world failure distributions.
- Human agreement is not automatically correctness; disagreement and calibration may matter.
- A bounded selection experiment does not establish behavior throughout reinforcement learning.

### Harbor reference

The discussion used Harbor's automated PR/trajectory review as an internal example of the review-and-evidence pattern. The user wanted to adapt useful techniques, not market a direct copy or name Harbor as the service.

The earlier investigation recorded [Terminal Bench PR #112](https://github.com/harbor-framework/terminal-bench-2-1/pull/112) as an example of useful review and score adjustment. Keep the narrower inference: a useful finding demonstrates a use case, not overall judge accuracy. No completed local reproduction or client deployment of that method was established in this session. Recheck the underlying evidence before using it in external claims.

## Public detail versus engagement detail

| Location | Useful content |
|---|---|
| Landing page | Who it helps, recognizable triggers, two or three concrete forms of help, what the client receives, a concise engagement description, contact |
| Optional proof or example | A verifiable piece of work or clearly labeled sample showing judgment; only use material the user is comfortable presenting |
| Scoping conversation/proposal | The client's decision, access, scope, chosen deliverables, success criteria, effort, constraints, and relevant methods |
| Implementation/research documentation | Protocols, evaluator prompts, failure taxonomies, detailed experiments, and technical findings as appropriate to the engagement |

General category labels such as evaluation design reveal little by themselves. The main problem with the previous methods list was the burden it placed on the reader and its weak connection to a buying decision. Confidentiality and proprietary details still require deliberate handling; vague marketing is not a substitute for that.

## Website references and lessons

The following pages were reviewed on 9 September 2026. Observations concern their messaging, not measured sales effectiveness.

| Reference | Observed approach | Lesson for Labs |
|---|---|---|
| [Parlance Labs](https://parlance-labs.com/) | Leads with production usefulness, finding what is broken, repeatable improvement, and client proof | Lead with what a team can do after the work; do not transplant another firm's proof or implied track record |
| [Latacora](https://www.latacora.com/) | Defines the capability it builds, describes working with the client, and links to detailed services | A concise promise benefits from a concrete explanation of the relationship |
| [thoughtbot AI services](https://thoughtbot.com/services/machine-learning-artificial-intelligence-ai) | Connects discovery to feasibility and business decisions, lists outputs, and supports the offer with case studies | Useful deliverables help buyers assess the offer; the page need not hide all service detail |
| [Hamel Husain](https://hamel.dev/) | Establishes personal experience and frames evals as debugging, analysis, and measurement, with substantial writing and teaching | Optional reference for separating deeper technical material from a concise entry point; biography-led structure is not the user's chosen direction |
| [Evidently AI](https://www.evidentlyai.com/) | Presents testing/monitoring capabilities through recognizable AI failure categories | Secondary product-site reference for problem recognition; not a close model for an independent services engagement |

The preferred pattern is a clear promise, recognizable situations, a concrete offer, optional honest proof, and a direct invitation. The references do not justify a blanket rule that shorter pages are better.

## Copy and design tradeoffs for the next revision

- “Know what your AI scores mean” expresses the distinctive measurement question but assumes the visitor already uses scores. It may suit specialist outreach.
- “Know what to improve in your AI product” is more accessible but broader. Supporting copy needs enough evaluation specificity to distinguish Labs from a general AI consultancy.
- “When to bring me in” makes the service personal and names timely problems. The page should also explain what help follows.
- The current engagement paragraph compresses several possible outputs into one sentence. A short set of problem-to-help descriptions could improve clarity without restoring the long method catalogue.
- A biography is optional. Credibility still matters, but no testimonial, metric, logo, or case study should be invented to fill the gap.
- The cream/ink palette, serif headline, fine rules, and restrained presentation remain the agreed visual direction.
- Previous alignment faults came from inconsistent frame widths and different section grids. Keep the shared 960px frame, common column proportions, and 32px gutter; stack at 720px.
- Retain the existing `#request-research` contact anchor for inbound links even as the visible invitation changes.

## Open questions

- Which entry problem can the user most confidently deliver against now, and which requires more preparation?
- What relevant proof is the user comfortable sharing, if any?
- Which inbound conversations become scoped, paid work rather than research exchange or recruiting?
- How much service explanation makes the offer concrete while retaining the desired discretion?

These remain open. Do not silently turn the current audience hypothesis or shortest copy iteration into a permanent constraint.

## Review after the copy update

The user's subsequent “check your work” review found two unresolved gaps:

- **Engagement clarity:** the page still compresses the offer into one sentence ending “depending on what the problem needs.” It names possible outputs but does not connect each client problem to a concrete engagement result. The length concern was documented, not yet resolved in the public copy. A useful correction would explain the assessment, repeatable evaluation, and review-workflow options in client terms without disclosing protocols.
- **Social preview mismatch:** both `labs/assets/og-labs.svg` and the rendered `og-labs.png` still say “independent audits of AI training judgment.” The current page references that PNG for Open Graph and Twitter previews. Updating HTML titles and descriptions did not update the image. This asset needs matching service positioning before publication.

Verification on 9 September 2026: an isolated production build passed, and its Labs HTML exactly matched source. Internal `docs/` were absent from the output; local asset paths and contact anchors resolved; IDs were unique; `git diff --check` passed. Desktop and phone screenshots were inspected, with no horizontal overflow at 390, 768, and 1280px. Section frame edges aligned. The source disclosure opened and closed, and the masthead contact link reached the contact section. The mailto destination was inspected without sending email. Browser viewport was restored. The three linked framework sources were reopened and their attributed topics checked. This review did not change public copy or assets, commit, or publish the site.
