# Labs: disagreement framework

> Current editorial reference: [consolidated live-page comparison and proposed copy](LABS_COPY_REVIEW_2026-09-09.md). The consolidated revision is now approved and implemented for branch preview. This document preserves earlier context; its public-copy/layout recommendations and verification statements describe their respective earlier iterations.

9 September 2026. Research and design rationale for the comparison added to `labs/index.html`, following the shorter client-facing copy. This document supplements the positioning documents; it does not replace their copy.

## Why this belongs in the offer

The useful distinction is not simply automated versus human evaluation. Both can be inconsistent, use an unclear standard, or miss the intended outcome. Disagreement helps identify what to investigate; it does not, by itself, establish who is wrong.

My interpretation of the request: make the studio's diagnostic judgment visible. A client should recognize the problem and see a plausible next step without needing the full technical procedure. The commercial outcome is a clearer basis for improving an AI product, supported by criteria, calibrated evaluation, and an actionable review workflow.

## Research findings

1. **AI judges can have systematic biases.** Zheng et al. examine position, verbosity, and self-enhancement biases, reasoning limitations, and agreement with human preferences. This supports testing order effects and inspecting evaluator behavior rather than treating a model's verdict as ground truth. Their agreement results are specific to their benchmarks and are not a guarantee for a client's domain. [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena, 2023](https://arxiv.org/abs/2306.05685).
2. **Human disagreement has different causes.** Jiang and de Marneffe distinguish uncertainty in meaning, annotator biases, and task artifacts in natural language inference. Their findings support investigating ambiguity and retaining multiple interpretations where justified, rather than automatically collapsing every difference into a majority label. The study is about NLI; applying this principle to service design is our synthesis. [Investigating Reasons for Disagreement in Natural Language Inference, 2022](https://aclanthology.org/2022.tacl-1.78/).
3. **Evaluation benefits from complementary evidence.** Anthropic describes code-based, model-based, and human graders, calibrating model graders with experts, and assessing the result of an agent's work. This supports combining direct checks and human review according to the task, with model grading validated on relevant cases. [Demystifying evals for AI agents, 2026](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).

These sources inform the framework; none establishes a universal procedure that resolves every disagreement. The chart is a conceptual synthesis, not a published taxonomy or a display of measured client results.

## Comparison and connection to services

All comparisons concern judgments of the same work, under comparable task context and criteria. “Agent” means an AI evaluator, not a separate agent whose performance is being scored.

| Pairing | What to investigate | Methods to address it | Connection to the offer |
| --- | --- | --- | --- |
| Agent–agent | Run variability, order effects, model or prompt differences, and disputed evidence | Repeat scoring under controlled conditions; test answer-order sensitivity where relevant; verify claims against task evidence; escalate unresolved cases | Judge/verifier validation; diagnose scores that conceal failures |
| Agent–human | Errors on either side, missing context, implicit criteria, or an unreliable reference label | Collect independent reviews before exposing others' verdicts; inspect mismatches; use expert-reviewed examples to calibrate the judge; assess on fresh held-out cases | Reliable automated review; reduce reliance on manual review without blindly substituting an AI judge |
| Human–human | Ambiguous criteria, inconsistent application, factual error, or legitimate differences in priorities | Calibrate the rubric with concrete examples; adjudicate factual disputes; preserve defensible alternatives or uncertainty; have the relevant decision owner settle policy choices | Evaluation design; help teams decide whether a change is better |
| Shared evidence check | Reviewers agree, but the evaluation may still miss the intended outcome | Direct task checks or independent outcome assessment where available; state unresolved uncertainty | Cross-cutting validation; ensure the assessment informs the client's actual product decision |

“Resolve” can mean correcting an error, clarifying the decision rule, escalating a case, or preserving uncertainty. It should not imply forcing agreement. Higher agreement is not sufficient evidence of correctness, and observed human agreement is not automatically a universal ceiling on model performance.

## Design decision

There are three unique unordered pairings. A literal agent/human by agent/human matrix repeats the mixed pairing in its off-diagonal cells. Instead, use a **2 × 2 comparison grid**: the three pairings plus a visibly distinct shared evidence panel. Do not give the grid quantitative axes or imply the fourth panel is a fourth pairing.

Use the existing cream/ink palette, serif headings, mono labels, and shared page width. The fourth panel uses a paper tint and a small orange marker to indicate a shared principle. Keep equal column widths and consistent padding. Stack the panels on phones, retaining their order and full text. Use HTML text and a semantic list within a figure so the comparison remains accessible and searchable.

Place it after “When to bring me in” and before “A focused engagement”: recognizable symptom → diagnostic approach → engagement. Preserve the shorter hero, client situations, and contact invitation. Keep supporting citations in an optional disclosure, not in the primary reading path.

## Public versus engagement detail

Public: the three disagreement types, the next investigative action, and the shared requirement for evidence. This demonstrates a point of view and a practical offer.

Project discussion and delivery: concrete rubrics, prompts, sampling plans, scoring thresholds, task-specific tests, error taxonomies, escalation rules, and case-level findings. Those require the client's context and need not be reproduced on the landing page.

## Implementation status

Prepared against the shorter copy on 9 September 2026. The first insertion attempt against the earlier page failed its context check and changed no files. Work paused while the other agent finished the copy update, then resumed against the new page.

## Integration verification

The primary task inspected the integrated comparison on desktop and at 390px phone width. The two-column comparison stacks into one column on mobile without horizontal overflow. The native source disclosure opens and closes. Browser viewport restored after verification. No publication or commit was performed. Broader audience and editorial context is preserved in `LABS_STRATEGY_CONTEXT_2026-09-09.md`.
