---
title: "Steering an image model toward a quality: show not tell"
subtitle: "A one-week, $25 pilot on synthesized controls"
date: 2026-06-19
type: "Research"
year: 2026
cover: "/assets/works/model-internals-research/cover.svg"
excerpt: "Can we parameterize visual qualities, that people can recognize but can't put into words? i.e. more of this vibe?"
featured: false
draft: false
badgeType: "research"
memberOf:
  - model-internals-research
---
[Read the original Thinking Machines grant proposal PDF](/assets/works/model-internals-research/tm-interactivity-grant-proposal.pdf).

*June 2026 - Author's Note*

---
## TL;DR

- Designed *Steering by Recognition*, an experimental inference-time interface for Ideogram 4.0. It asked whether a qualitative visual target, such as a “vibe,” could be recognized, parameterized, and transferred through activation steering.
- Developed a blind two-alternative forced-choice (2AFC) evaluation that separated the rater’s preference from model-output presentation and tested whether an intervention improved perceived target alignment.
- Framed steering as a local-control problem: whether directions in activation space could behave as distinct aesthetic controls, and where that approximation became unstable or entangled. This is adjacent to, not an application of, Anthropic’s later J-lens research.

---
Can we parameterize visual qualities, that people can recognize but can't put into words? i.e. "more of this vibe"?

To tackle this question, I ran an independent research program to implement a "steering" technique that uses model activations as controls. The technique is based on a [new research paper](https://arxiv.org/abs/2604.14090) (*From Weights to Activations: Is Steering the Next Frontier of Adaptation? by Ostermann et al.*). This is an interface challenge that top image AI labs (Reve, Ideogram) are tackling with their new image generation models (Reve 2.1 and Ideogram 4.0) but the product features lack specificity (see proposal linked above). The apparatus is an activation-steering harness inside a diffusion model's internals, blind-rating servers with sealed answer keys, confound-controlled reference sets. However, the results showed that a human rater’s judgment of “taste” was statistically no better than a coin flip, and a frontier VLM that is commonly used as a judge, did not provide any correlation with human judgment on visual qualities or taste. 

While the experiment failed to produce “controllable parameters of taste”, I discovered that *the gap* between actual human ratings, and VLM and AI-as-a-judge ratings, specifically for unverifiable tasks, is a ripe area to explore and solve problems in. This project began as an attempt to give people a control for visual qualities they can recognize but cannot reliably put into words. It did not produce that control with the technique applied. The pilot did not establish the mechanism that would make such a control dependable. It did, however, produce a useful lesson: when used as a judge, an AI system can make outputs that look coherent while measuring the wrong thing. That lesson now informs my current work on how AI evaluation systems are tested.


---
## The question
Creation is a loop: you make something, see it, and discover what you wanted by reacting to what you got. Image generation collapses that loop into prompt-and-reroll. The problem isn't that intent is unclear - it's that language is imprecise. You can recognize the right result on sight and still not put the deciding quality into words. For nameable properties ("golden hour," "35mm film") prompting works fine. It is much harder when someone can recognize the deciding quality in a group of images but cannot give it a description that reliably reproduces the group.

I wanted to replicate this intuitive mechanism that we humans so instincitively reach for in the creative process. Instead of naming the quality, could a
person point to examples of it and obtain a continuous control inside an image model?

Sample Image Clusters (a mix of generated and real images:)
![Image Clusters](/assets/works/model-internals-research/cluster_c.png)
![Image Clusters](/assets/works/model-internals-research/cluster_g.png)


*Reve has a product feature called "References" where users can upload images and the model will generate images that are similar to the uploaded images. However, it doesn't work too well. A Reve user (post retweeted by Reve, 5 June 2026) reports it "reproduces my references too literally and made collages of them rather than applying qualities, like the lighting, composition, textures, or style," and asks to "say why a reference matters and what should be extracted from it."*
![reve user report](/assets/works/model-internals-research/reve_references_style_copy.png)

## The mechanism

The technique was to take reference images that share a quality, extract the quality as a continuous control - a *synthesized adjective*, learned from images rather than stated in language. The mechanics are established (the CASteer / Concept Sliders family) and training-free:

- Average the model's internal activations over the reference images.
- Subtract the average over a content-matched neutral set.
- Inject the difference during generation, scaled by a knob alpha.

The hypothesis was that we could construct a direction from model activations, then add or subtract that direction during generation. My contribution was not the
arithmetic. It was the source of the direction from a person’s reference images and the attempt to test whether the resulting control changed the quality the
person actually recognized. I ran it on Ideogram-4's open weights, on a rented RTX 4090, in a week, for about $25 in hosted compute.

## Methodology

1. A layman assembled a reference set around a visual quality they could recognize, then wrote the best available description of the grouping or cluster.
2. I used content-matched neutral images as a comparison set, so the direction would not merely encode subject matter.
3. I averaged image-model activations for the two sets, subtracted the averages, and injected the resulting direction at several strengths during
   generation.
4. Before looking at results, I used a blind two-alternative forced-choice (2AFC) protocol, sealed answer keys, and written decision rules to reduce the chance that an appealing image
   sequence would become a post-hoc success story.

The experiment asked three separate questions. Keeping them separate matters:

| Question | Test | What the result can establish |
| --- | --- | --- |
| Can the written description transmit the intended quality? | Independent VLM judges classified images using the description only. | Whether the description was sufficient for those judges on this task. |
| Is the reference quality merely an AI-image artifact? | The expert sorted a blinded mix of generated images and real photographs. | Whether the selected examples appeared in both sources. |
| Does the activation direction control the intended quality? | Fixed-subject α sweeps, assessed without revealing the intended dose or original labels. | Whether the direction changed images consistently and in the intended way. |

---

## Observations

**1. Description doesn't transmit the quality.** An expert sorted images by a quality they could see instantly, then wrote down what it was. Two independent VLM judges, given only the description, could not reproduce the described sort - it indicated that sorting was near chance.
They agreed with *each other*, so there was artificial consensus; but artifical vision did not correlate with human perception. Human words described a cluster without capturing a machine-readable boundary.

**2. The quality is real, and it lives in scenes - not in AI artifacts.** Mixed blind with real photographs, the user's picks landed about equally in real and generated images (~16% each). Human sorting indicates that the selected "vibe" was a property of the world the generator sometimes hits.

**3. The mechanism produces a coherent control - but an unaimed one.** A single synthesized dial moved the image coherently and monotonically while holding the subject fixed. That part works. But what moved tracked the model's *default color grade*, not the target quality, and it didn't transfer across subjects.

*Figure: Pilot across control α-sweep: a single synthesized control levels α = −0.7 t → +0.3 (left → right). The image moves coherently and monotonically with the subject's own color grade rather than the target quality.*
![alpha sweep](/assets/works/model-internals-research/qf_l24_sweep.png)

## The Jacobian lens

In July 2026, Anthropic published [“A global workspace in language models”](https://www.anthropic.com/research/global-workspace), introducing the Jacobian lens, or J-lens. It reads a limited set of representations in Claude that are positioned to influence what the model could report if asked. Anthropic calls that collection J-space. In its experiments, Anthropic found that J-space supported verbal report, deliberate control, and some multistep reasoning while accounting for only a small share of the model’s internal activity.

This is not a mechanism claim about this pilot. Anthropic studied a language model; this experiment steered an image model. The pilot neither measured J-space nor established what the VLM judge used internally. The connection is methodological: an explanation, rubric, or apparently interpretable activation direction is a partial observable, not proof of what determines a verdict. Here, a person could recognize a visual quality but could not write a description that let independent VLM judges reproduce the sort. The activation control also moved images coherently, but not toward that intended quality. Better prompts may help when language is the missing link, but they cannot be assumed to fix an unmeasured proxy. Blind, sealed-key comparisons remain the test: did the intervention change the outcome the person recognizes?

---

## Caveats 

The observations show that a small, pre-specified evaluation can catch a compelling but misleading proxy. It also shows why a smooth model control or agreement between
automated judges is not enough evidence that a system tracks a perceptive quality used by human judgment. 

It does not show that activation steering cannot work, that VLMs cannot judge visual work, or that one small study establishes a general theory of taste. The
study used one model, one experimental design, and a limited set of reviewers.

## How to interpret these findings

I began this project to make image-generation controls more responsive to human recognition. I left it with a more general question: when an automated
evaluation looks convincing, how do we know it is measuring the intended thing rather than a convenient proxy?

That question now guides my work on AI evaluation systems. Before an AI company uses a judge, verifier, or reward model to support training or an
accuracy claim, the measurement chain should be tested independently: freeze the evidence, define failure tests before seeing results, use independent human review where judgment is necessary, and publish the scope and limits of the conclusion.

---
## Methods and limits

The pilot used sealed answer keys, blinded presentation, content-matched comparison sets, and pre-written decision rules. Those controls reduced the
risk of fitting the conclusion to attractive outputs; they did not eliminate the limitations of a small study.

The original proposal describes the intended control design and research
context: [read the grant proposal](</assets/works/model-internals-research/tm-interactivity-grant-proposal.pdf>).

*For a fuller public version of this note, I would add the complete protocol, the judge prompts and model versions, the sample counts, the blinded results table, and a reproducible artifact bundle. Until then, this page should be read as a transparent pilot report, not a general benchmark or product claim.*
