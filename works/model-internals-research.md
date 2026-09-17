---
title: "Steering by recognition: can an image model learn a quality we struggle to describe?"
subtitle: "An experiment in visual recognition, activation steering, and the limits of evaluation"
date: 2026-06-19
type: "Research"
year: 2026
cover: "/assets/works/model-internals-research/cover.svg"
excerpt: "Can examples turn a recognizable visual quality into a model control? An activation-steering experiment became an inquiry into the relationship between perception, description, and judgment."
description: "A research account of activation steering from visual references, human and AI judgment, and the Jacobian lens as a perspective on representation and report."
featured: false
draft: false
badgeType: "research"
memberOf:
  - model-internals-research
---
In creative work, recognition often precedes explanation. I can see that a group of images belongs together before I can articulate what connects them. The resemblance may cross subject matter, composition, and medium; the words I reach for describe parts of it, yet leave something unresolved.

This experiment began with a question about making that recognition operational. Could a set of examples define a visual quality precisely enough to become a continuous control inside an image model? Instead of asking for another interpretation of a written prompt, could I steer by pointing to what I meant?

I explored this through activation steering: deriving a direction from the model's internal responses to reference images and applying it during generation. The intervention produced visible changes, but the pilot did not establish a dependable relationship between those changes and the quality I intended.

That result brought the problem of judgment into the experiment itself. To assess the control, I needed an account of what it was meant to preserve or intensify. A rubric built from my description only weakly recovered my selections in the scores I could verify, while my own recognition proved partly consistent across repeated sorting, with a shifting boundary.

The difficulty therefore extended beyond finding a useful direction inside the model. It concerned how a perceptual distinction becomes a reference, a description, and eventually a measure of success - and what is lost at each step.

## Recognition as a starting point

Creation is a loop between intention and encounter. I make something, respond to it, and discover more precisely what I wanted through that response. Reference images participate in this process: they allow a quality to be demonstrated while its description is still taking shape.

For an image model, however, an example is an ambiguous instruction. An empty room offers architecture, lighting, texture, composition, and associations. Which of these matters to the person who selected it? The attraction of a reference set is that several images might make the intended relationship more apparent than any individual example. The difficulty is establishing what, exactly, they share.

Reve's References interface makes this ambiguity concrete. It lets users assign examples roles such as Style, Person, or Place and add written instructions. Yet selecting “Style” still leaves the intended relationship underspecified. In a [user report cited in the original proposal](https://x.com/0xnichy/status/2062790808080617947), the complaint was that references were reproduced too literally as collages, rather than interpreted through their lighting, composition, texture, or style. The user wanted to “say why a reference matters and what should be extracted from it.” That distinction between supplying an example and specifying its relevance sits at the center of this experiment.

<figure>
  <a href="/assets/works/model-internals-research/reve_references_style_copy.png"><img src="/assets/works/model-internals-research/reve_references_style_copy.png" alt="Reve's reference editor with three images, Style selected as their role, and a field for additional instructions." loading="lazy" decoding="async"></a>
  <figcaption>Reve's reference editor, captured during the research: examples are assigned a role, with written instructions available to qualify how they should be used.</figcaption>
</figure>

I began by sorting a mixed pool of photographs and generated images into groups. Some resolved into familiar categories of subject or style. Others resisted a satisfactory description. One suggested a stillness with something slightly wrong about it; “quiet foreboding” became its working name. The phrase helped me refer to the group, but naming it did not settle the criteria for belonging to it.

<figure>
  <a href="/assets/works/model-internals-research/cluster_c.png"><img src="/assets/works/model-internals-research/cluster_c.png" alt="An early reference group containing portraits, empty rooms, night scenes, and illustrations." loading="lazy" decoding="async"></a>
  <figcaption>An early reference group assembled by recognition, before the target was refined. Open the image to inspect the references.</figcaption>
</figure>

<figure>
  <a href="/assets/works/model-internals-research/cluster_g.png"><img src="/assets/works/model-internals-research/cluster_g.png" alt="A second early reference group of 14 images, including landscapes, objects, a snake, and abstract forms, with provisional descriptive words entered above the images." loading="lazy" decoding="async"></a>
  <figcaption>A second early grouping, spanning objects, landscapes, and abstract forms. The provisional descriptions record an attempt to articulate a resemblance already perceived. Open the image to inspect the references.</figcaption>
</figure>

## From references to an intervention

Activation steering changes a model's internal activity during generation without retraining its weights. [Ostermann et al. (2026)](https://arxiv.org/abs/2604.14090) situate it as a form of model adaptation through interventions in activation space. In this pilot, I averaged the model's activations over images where I recognized the target quality, then subtracted the average over a comparison set. I attempted to match subject matter across the sets to reduce the chance that the resulting direction would simply distinguish, for example, interiors from portraits.

I applied this difference during generation, scaled by an intervention strength, α. The hypothesis was that movement along the direction would correspond to movement in the perceived quality.

I imagined the control as a *synthesized adjective*: a visual quality learned from examples, whose intensity could be adjusted without first finding the words for it.

The closest methodological precedent is [SHIFT: Steering Hidden Intermediates in Flow Transformers](https://arxiv.org/abs/2604.09213) (Konovalova et al., 2026), which constructs steering directions from contrasting activations and applies them during image generation. Here, I used curated visual references to define the target and assessed the resulting control against recognition. The initial pilot used Ideogram-4's open weights on a rented RTX 4090, over about a week and roughly $25 in hosted compute. Curation and follow-up analysis extended beyond that initial run.

I set out criteria before reviewing the outputs: the intervention should produce a perceptible change, preserve the subject, and carry a consistent meaning across new subjects. Image sequences were shuffled and their settings withheld during review.

## Visible movement and the problem of transfer

The generated sequences showed changes in light, color, and texture. Within a limited range, some images retained a recognizable subject and composition; at stronger settings, visible degradation became prominent.

<figure>
  <a href="/assets/works/model-internals-research/qf_l24_sweep.png"><img src="/assets/works/model-internals-research/qf_l24_sweep.png" alt="Three rows of generated images: a street, a portrait, and a fruit bowl. Four intervention settings change their lighting and color, with visible distortion in the left column." loading="lazy" decoding="async"></a>
  <figcaption>Selected pilot outputs, with prompt and random seed held fixed within each row. The labels indicate intervention strength, not measured amounts of the target quality. The leftmost setting visibly degrades the images.</figcaption>
</figure>

The ambition was to give a person distinct aesthetic controls: the ability to intensify one quality while preserving others they wanted to keep. I treated that independence as a local approximation to test, since a direction associated with one quality might also change several others.

In my blind reviews, the perceived direction changed across subjects. Descriptions of the changes centered on photographic properties such as warmth, saturation, and grain. A subsequent intervention that removed warmth and saturation directions still failed the specified consistency test across subjects.

This failure of transfer matters for the interface. If increasing a setting means something different in a portrait than in a street scene, the user must rediscover the control's meaning each time.

Analysis of the saved activations suggested several possible contributors: overlapping reference directions, differences between representations of real and generated images, and a gap between separating reference sets and controlling generation. Their relative contributions remained unresolved.

## Description and construct validity

Alongside the steering tests, I examined whether a verbal account could recover my grouping. My description, recorded on June 12, was:

> “nothing's 'wrong' per se with these clusters, they just have the same energy / vibe. soft light. center aligned. one directional light.”

Two AI judges then scored 62 interiors separately on the three named features, using a 0–2 scale and without seeing my selections. The analysis tested whether the individual scores and their sum recovered my grouping.

Only one judge's individual scores could be recovered and checked; the complete instructions sent to the judges could not be located in the available archive. In those recoverable scores, the sum of the three features only weakly distinguished the images I had included from those I had excluded. A single directional light was more informative on its own. Soft light, despite appearing in my description, pointed in the opposite direction to my selections.

This raised a question of *construct validity*: how well did the measurement represent the quality I intended to study? Scoring the features I had named was only useful insofar as those features captured the basis of my recognition.

The test concerned a particular translation of recognition into measurement: three named features, scored separately and combined by addition. What mattered may have included relationships between those features, other qualities I had not articulated, or distinctions the scoring rubric did not preserve. The experiment exposed a mismatch without locating where in that translation it arose. The stability of the grouping itself also needed examination.

## The stability of recognition

Human judgment was also an instrument in this experiment. The author alone selected the reference groups, so the target depended on the consistency of those selections.

In a July follow-up, I re-sorted the same 128 generated images with their previous labels hidden. Most decisions repeated, although most images had originally been excluded. Of the 24 I had included, I selected 16 again, while the total number included rose to 31.

Recognition was partly reproducible, with meaningful movement at the boundary. That result complicates the interpretation of the steering failure. A mismatch could arise in the model's representation, the intervention, or the definition of the target supplied to it. Repeated human judgments help distinguish these possibilities by making the target's own variability observable.

I also investigated whether I was responding to characteristics of generated imagery. In two small tests of interiors without people, I selected similar proportions of real photographs and generated images - approximately 16% of each. This weakened simple recognition of AI origin as an explanation in those pools. Equal selection rates do not establish an identical percept across sources, however, and a later comparison was confounded by different image-selection procedures.

## The Jacobian lens: representation and report {id="the-jacobian-lens"}

Anthropic's July 2026 research on the **Jacobian lens**, or J-lens, offers a useful perspective on these questions. The technique identifies representations associated with what a language model could verbalize, including concepts absent from its actual response. Anthropic calls this collection *J-space* and reports that it supports deliberate modulation, flexible reasoning, and verbal report, alongside a much larger body of processing. [A global workspace in language models](https://www.anthropic.com/research/global-workspace).

A revealing example concerns a Spanish passage. Changing its language representation from Spanish to French in J-space changed the model's answer when asked to identify the language, yet left its continuation of the passage in Spanish unaffected. The same input informed several behaviors through different computational routes. [Full paper](https://transformer-circuits.pub/2026/workspace/index.html).

I read this as a reason to distinguish the information a system uses, the information it can report, and the information an intervention can make available to other tasks. The connection to this pilot is interpretive: I did not measure J-space in the image model or inspect the internal processes of the AI judges.

What the lens sharpens is the question of access. A description may make certain features available for explicit judgment while leaving other distinctions inadequately represented. A direction that separates reference sets may reveal a regularity in the model without providing the control a person intended. In this experiment, the reference set, verbal rubric, and steering direction each expressed an approximation of the target; their correspondence had to be tested.

That makes interpretability and evaluation complementary. Interpretability can help investigate which representations influence a decision and how they are used. Evaluation must still ask whether the resulting behavior preserves the distinction that motivated the intervention. An intelligible account of a system's activity is valuable, but its relevance to the intended judgment remains an empirical question.

## From steering to evaluation {id="how-to-interpret-these-findings"}

I began with an interface problem: how might a person guide an image model through recognition? The work led me toward a measurement problem embedded within it. A control learned from examples needs an account of what those examples mean, and an evaluator needs evidence that its judgments remain connected to that meaning.

A useful continuation would compare verbal descriptions with example-based judgments, repeat the author's selections, and ask whether other people recognize the same distinction. The steering method would then be assessed on subjects outside the reference set. Together, these tests could help separate a communication failure from an unstable target or an intervention that fails to transfer.

I remain interested in the possibility that a judgment can become usable before it is fully explainable. The practical question is how much of it survives being expressed in another form: a group of references, a rubric, a model representation, or a score. Each can support a different kind of action. Each also introduces choices about which distinctions to preserve.

That is what connects this experiment to my interest in AI evaluation. When a judge's scores guide selection, training, or another agent's decisions, agreement and apparent coherence are only part of the evidence we need. We also need to understand what the judgment carries forward - and whether it remains responsive to the quality we meant to capture.

---

*June 2026 pilot; July follow-up; account revised September 2026.*

[Original grant proposal](/assets/works/model-internals-research/tm-interactivity-grant-proposal.pdf)

<details class="research-methods" id="methods-and-results">
<summary><strong>Methods and supporting references</strong></summary>

### Methodological lineage

The difference-of-means construction has a precedent in language-model steering: [Contrastive Activation Addition](https://arxiv.org/abs/2312.06681) averages activation differences between positive and negative examples, then adds the resulting vector during inference. SHIFT extends this family of interventions to image generation in FLUX, steering text-token representations and pooled text embeddings. This pilot instead derived its direction from image references and intervened at image-token positions.

[Concept Sliders](https://arxiv.org/abs/2311.12092) (Gandikota et al., 2023) provides a related precedent for continuous visual controls learned from prompts or example images. Its controls use trained low-rank weight adapters; the pilot used additive activation changes with the model's weights fixed. Ostermann et al. provide the broader conceptual framing for steering as adaptation.

### Scope and steering protocol

The author defined the reference groupings. The steering method compared average internal activations for reference and comparison images, then applied a scaled difference during generation. The initial pilot used Ideogram-4 open weights on an RTX 4090; the later analyses examined the saved activations and repeated the human sorting.

Initial steering reviews used shuffled image strips with intervention settings hidden from the author. Review tasks included ordering the images and describing their changes. Two candidate controls were assessed across five subjects. The follow-up removed warmth and saturation directions; a proposed grain control failed its preliminary check and was excluded from that removal.

The follow-up record does not unambiguously identify an independent human reviewer, limiting claims about agreement across observers.

### Reconstructing the grouping from named features

The feature analysis compared each score, and the sum of the three scores, with the author's inclusion decisions. It measured how often an included image ranked above an excluded image, counting tied scores as half a correct ranking. This tests the ranking produced by the stated rubric on this sample; it does not test every possible combination of features or description of the quality.

### Real photographs and generated images

The two source comparisons used neutral interiors without people. A later comparison mixed generated images prompted toward the target with real photographs obtained through neutral queries. Different selection procedures confounded that comparison, so its source difference cannot resolve whether rendering artifacts contributed to recognition.

### Figure selection

The article's output grid shows three subjects at four intervention settings: −0.7, −0.3, 0, and +0.3. The cover uses three unchanged fruit-bowl outputs at −0.3, 0, and +0.3, selected for retaining a recognizable subject.

</details>
