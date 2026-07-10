---
title: "Steering an image model toward a quality: show not tell"
subtitle: "A one-week, $25 pilot on synthesized controls"
date: 2026-06-19
type: "Research"
year: 2026
cover: "/assets/works/model-internals-research/cover.svg"
excerpt: "A one-week pilot on synthesized image-generation controls: what worked, what failed, and why the failure is the useful part."
featured: false
draft: false
badgeType: "research"
memberOf:
  - model-internals-research
  - artificial-creativity
---
[Read the original Thinking Machines grant proposal PDF](/assets/works/model-internals-research/tm-interactivity-grant-proposal.pdf).

*June 2026 - Author's Note*
---
Can we parameterize visual qualities, that people can recognize but can't put into words? i.e. "more of this vibe"?

To tackle this question, I ran an independent research program to implement a "steering" technique that uses model activations as controls. The technique is based on a [new research paper](https://arxiv.org/abs/2604.14090) (*From Weights to Activations: Is Steering the Next Frontier of Adaptation? by Ostermann et al.*). This is an interface challenge that top image AI labs (Reve, Ideogram) are tackling with their new image generation models (Reve 2.1 and Ideogram 4.0) but the product features lack specificity (see proposal linked above). The apparatus is an activation-steering harness inside a diffusion model's internals, blind-rating servers with sealed answer keys, confound-controlled reference sets. However, the results showed that a human rater’s judgment of “taste” was statistically no better than a coin flip, and a frontier VLM that is commonly used as a judge, did not provide any correlation with human judgment on visual qualities or taste. 

While the experiment failed to produce “controllable parameters of taste”, I discovered that *the gap* between actual human ratings, and VLM and AI-as-a-judge ratings, specifically for unverifiable tasks, is a ripe area to explore and solve problems in.


---

Sample Image Clusters (mix of generated and real images:)
![Image Clusters](/assets/works/model-internals-research/cluster_c.png)
![Image Clusters](/assets/works/model-internals-research/cluster_g.png)


## Pretext

Creation is a loop: you make something, see it, and discover what you wanted by reacting to what you got. Image generation collapses that loop into prompt-and-reroll. The problem isn't that intent is unclear - it's that language is imprecise. You can recognize the right result on sight and still not put the deciding quality into words. For nameable properties ("golden hour," "35mm film") prompting works fine. The qualities that make work distinctive usually aren't like that: you can assemble a pile of examples that all have *a vibe* and fail to produce the word, because there is no word.

So: instead of naming the quality, point at it.


* Reve has a product feature called "References" where users can upload images and the model will generate images that are similar to the uploaded images. However, it doesn't work too well. A Reve user (post retweeted by Reve, 5 June 2026) reports it "reproduces my references too literally and made collages of them rather than applying qualities, like the lighting, composition, textures, or style," and asks to "say why a reference matters and what should be extracted from it."*
![reve user report](/assets/works/model-internals-research/reve_references_style_copy.png)

## The mechanism

From reference images that share a quality, extract the quality as a continuous control - a *synthesized adjective*, learned from images rather than stated in language. The mechanics are established (the CASteer / Concept Sliders family) and training-free:

- Average the model's internal activations over the reference images.
- Subtract the average over a content-matched neutral set.
- Inject the difference during generation, scaled by a knob alpha.

The user turns the knob until they recognize the result. What's new here isn't the arithmetic - it's the source (a user's references for a quality they can't name, not a labeled concept) and the validation (blind human perception of the intended quality, with predictions and answer keys locked before anyone scored). I ran it on Ideogram-4's open weights, on a rented RTX 4090, in a week, for about $25.


---

## Findings

**1. Description doesn't transmit the quality.** An expert sorted images by a quality they could see instantly, then wrote down what it was. Two independent VLM judges, given only the description, could not reproduce the described sort - it indicated that sorting was near chance.
They agreed with *each other*, so there was artificial consensus; but artifical vision did not correlate with human perception. Human words described a cluster without capturing a machine-readable boundary.

**2. The quality is real, and it lives in scenes - not in AI artifacts.** Mixed blind with real photographs, the user's picks landed about equally in real and generated images (~16% each). Human sorting indicates that the selected "vibe" was a property of the world the generator sometimes hits.

**3. The mechanism produces a coherent control - but an unaimed one.** A single synthesized dial moved the image coherently and monotonically while holding the subject fixed. That part works. But what moved tracked the model's *default color grade*, not the target quality, and it didn't transfer across subjects.

*Figure: Pilot across control α-sweep: a single synthesized control levels α = −0.7 t → +0.3 (left → right). The image moves coherently and monotonically with the subject's own color grade rather than the target quality.*
![alpha sweep](/assets/works/model-internals-research/qf_l24_sweep.png)

---

## The conclusion, once again

While the experiment failed to produce “controllable parameters of taste”, I discovered that *the gap* between actual human ratings, and VLM and AI-as-a-judge ratings, specifically for unverifiable tasks, is a ripe area to explore and solve problems in.

[Read the original grant proposal PDF](/assets/works/model-internals-research/tm-interactivity-grant-proposal.pdf).
