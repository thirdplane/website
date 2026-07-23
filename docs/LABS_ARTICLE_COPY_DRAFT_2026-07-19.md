# Who checks the judge? The missing layer in AI evaluation

*Draft for thirdplane.io/labs. 19 July 2026.*

**Standfirst:** AI systems increasingly use verifiers, judges, reward models, and labels to turn a messy outcome into a score. Those tools can be useful. But once people optimize against a score, its blind spots can become targets. An independent review is a way to test that risk—and state its limits—rather than argue about it.

## TL;DR

- Designed *Steering by Recognition*, an experimental inference-time interface for Ideogram 4.0. It asked whether a qualitative visual target, such as a “vibe,” could be recognized, parameterized, and transferred through activation steering.
- Developed a blind two-alternative forced-choice evaluation that separated user preference from model-output presentation and tested whether an intervention improved perceived target alignment.
- Explored a local-geometry lens for steering: whether directions in activation space could act as distinct controls, and where that approximation became unstable or entangled. This is related to, but distinct from, Anthropic’s later J-space analysis.

---

An AI benchmark score can look like a fact: an accuracy rate, a pass rate, a reward-hack rate, or a claim that a training environment produces an improvement.

But every score rests on a measurement system. Someone chose the task, the verifier, the judge, the data, and the rule for deciding what counts as success. A score can be useful while its measurement system still has blind spots.

Some claims are directly checkable. A date was extracted correctly. A program passed its test suite. A required action happened. In those cases, the outcome and the measurement may be close enough that a separate review adds little.

Other claims use a score to stand in for a harder human or semantic question: was the answer useful, did the agent complete the task in the way a customer needs, or would an expert trust the result? An automated judge can apply its rubric consistently and still miss the outcome the score is meant to represent.

The reasonable question is simple: **who checked the measurement?**

## Optimization changes the problem

The risk becomes sharper when a model is trained, ranked, or selected against a score. Optimization searches for the things a measurement rewards, including places where that measurement has stopped tracking the underlying outcome.

This is not an argument against automated evaluation. Verifiers, judges, and labels make many kinds of work possible. It is an argument for treating them as part of the system under review when a score carries a consequential decision: a training run, a procurement decision, a release gate, or a public claim.

For a buyer, the relevant question is not only whether the score is high. It is whether the score still means what the buyer has been asked to believe it means.

## The score can sit upstream in the training data

A score does not only appear on a benchmark or release dashboard. A preference-data or reward pipeline can turn raw or synthetic model outputs into selected training examples: a rubric ranks responses, a jury chooses a winner, and the resulting labels train a model to reproduce those preferences.

Controls such as multiple model providers, swapped answer order, confidence thresholds, and human escalation can improve that process. They do not, by agreement alone, establish that the selected preference tracks the outcome a customer cares about. Once a model is optimized against that signal, a small systematic shortcut can become trained behavior. Agno's public preference-data and quality-pipeline examples illustrate both the operational controls and their limit: agreement is not proof that a label is correct. [Preference-data guidance](https://docs.agno.com/use-cases/data-labeling/preference-data) · [Quality-pipeline guidance](https://docs.agno.com/use-cases/data-labeling/quality-pipeline)

The question is therefore not only “were the labels produced consistently?” It is “does this frozen selection system provide credible evidence for the capability or quality claim being sold?”

## Automated integrity checks are progress

Terminal Bench offers a useful public example. In its April 2026 integrity update, the project documented cheating and reward-hacking incidents and added new measures: trajectories are required for passing trials, and an agent judge reviews passing trials for reward hacking. Submitters can challenge claims. [Terminal Bench describes the policy here](https://www.tbench.ai/news/leaderboard-integrity-update).

That is valuable work. It creates a defined evidence path for passing trials, catches some problems that ordinary task verifiers miss, and creates a process for reviewing a flag.

But the automated judge is itself part of the measurement system. A false positive has a natural path to scrutiny because the submitter has a reason to appeal. A false negative needs a deliberate path of its own: a way to look for shortcuts the judge did not flag and to distinguish them from a task defect or an unsupported inference.

Without that path, a published hack rate documents cases the system found. It does not, by itself, estimate the cases it missed.

This is not a claim that Terminal Bench’s integrity process is inadequate or that any particular submission used a shortcut. It is the general measurement question: what independent evidence would be needed to characterize performance on a defined set of possible misses?

## What an independent review adds

An independent review should not be another AI model simply agreeing with the first one. It should create a separate evidence path.

At a minimum, that means four things:

1. **Freeze the evidence.** Record the exact task, dataset, and split version; relevant source or synthetic-data lineage; verifier or judge configuration; rubric, prompt, and model version; selection rule; traces; and date being reviewed. A conclusion about a moving target is not useful.
2. **Define the tests before looking at the result.** State which failure modes will be checked and how a finding will be counted. This reduces the temptation to search until something dramatic appears.
3. **Use a genuinely separate review path.** Inspect task design and traces, test known failure modes, and have qualified reviewers assess a defined sample without seeing the original verdict.
4. **Publish the limits with the findings.** Say which population was examined, what evidence was unavailable, and what the result does not establish.

This is less glamorous than declaring a benchmark trustworthy or broken. It is more useful. A buyer can see what was checked and decide whether the evidence is sufficient for the decision at hand.

## Why a human reference sometimes matters

Thirdplane’s earlier visual research raised this problem in a concrete form. An initial pilot asked whether vision-language models could reproduce a blinded visual judgment that people could recognize but could not fully state as a verbal rubric. One model appeared to track a crop artifact that people barely registered.

The pilot had only partial construct stability, and a related comparison was confounded. It does not establish a limitation of every vision model or every visual task. Its narrower lesson is that, where a score is meant to stand in for a human judgment beyond the available rubric, an independent human reference may be necessary. The visual study’s methods and limits are documented separately in [the research note](/works/model-internals-research/).

### The Jacobian lens

Anthropic’s July 2026 [research on the Jacobian lens](https://www.anthropic.com/research/global-workspace) offers a related reason not to treat a model’s explanation as a full account of its judgment. Applied across a language model’s layers, the lens identifies representations associated with words the model could say if asked. Anthropic calls the resulting J-space small: the component modeled this way accounted for less than a tenth of activation variance. In its experiments, the J-space supported report, deliberate control, and some multistep reasoning. The authors also describe the lens as incomplete and token-anchored, not a map of all model cognition.

The visual pilot makes a narrower, behavioral point. Two independent VLM judges, working only from an expert’s written description, could not reproduce that expert’s blinded sort much better than chance. The description was not enough to transfer the boundary that guided the judgment. This is not evidence that people and language models share a mechanism.

For a model judge, an explanation should therefore be treated as one artifact of the measurement system, not its full audit trail. Whether a better prompt or rubric repairs a particular error is an empirical question. For a consequential claim, the check remains behavioral: compare blinded judgments against an independent reference, hold plausible confounds fixed, and show that the score tracks the outcome it is meant to represent.

## A bounded public study can still be useful

Thirdplane Labs is first assessing whether the public Terminal Bench artifacts can support a limited, reproducible study. No study should begin until the accessible evidence can be preserved as a dated snapshot and shown to support the stated population.

If that feasibility gate is met, the study would inspect defined task and verifier defects, examine trace evidence under a pre-specified exploit-use rule, and test a small, stated set of exploit patterns. It would not certify the whole benchmark. Public evidence for passing trials is not automatically complete evidence for all failures, and planted patterns establish detection only for the patterns tested. Those limits belong in the report, not in the footnotes.

The point is to demonstrate a method: preserve the evidence, test the measurement system, and produce a report that someone outside the system can inspect.

## What should be checked next?

If your team sells an RL environment, preference-data, reward-model, synthetic-data, or evaluation system that a customer must rely on, consider three questions:

1. What outcome is this score meant to represent?
2. Who is optimizing for or relying on it?
3. What evidence would a person outside the system need to believe it?

Thirdplane Labs is conducting a small number of research conversations. If a consequential score is carrying a decision for your customer or counterparty, [request a 20-minute research conversation](/labs/#request-research).

An evaluation claim is stronger when the person making it is not the only person who has checked it.

## Sources

- [Terminal Bench, “Leaderboard Integrity Update” (19 April 2026)](https://www.tbench.ai/news/leaderboard-integrity-update)
- [Terminal Bench, “Terminal-Bench 2.1” (6 May 2026)](https://www.tbench.ai/news/terminal-bench-2-1)
- [Terminal Bench leaderboard](https://www.tbench.ai/leaderboard)
- [Agno, “Preference data for RLHF”](https://docs.agno.com/use-cases/data-labeling/preference-data)
- [Agno, “Quality pipeline”](https://docs.agno.com/use-cases/data-labeling/quality-pipeline)
- [Anthropic, “A global workspace in language models” (6 July 2026)](https://www.anthropic.com/research/global-workspace)

## Editorial checks before publishing

- Confirm the final landing-page anchor or replace `/labs/#request-research` with the deployed form URL.
- Verify that the visual research note contains the exact methods and limits required to support its paragraph; otherwise replace that paragraph with a one-sentence link to work in progress.
- Re-check the Terminal Bench policy and release links on publication day.
- Create a dated evidence ledger that distinguishes public facts, accessed artifacts, and proposed tests before publishing any Terminal Bench-specific claim.
