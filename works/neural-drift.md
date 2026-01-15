---
title: "Neural Drift"
type: "AI Experiment"
year: 2024
cover: https://picsum.photos/seed/neuraldrift/1200/675
featured: false
---

A meditation on machine perception using fine-tuned diffusion models. Neural Drift generates landscapes that exist in the liminal space between recognition and abstraction, training AI to dream of places that never were.

## Concept

What happens when we teach a machine to forget? Neural Drift explores this question by deliberately degrading image generation models, introducing noise and decay into the training process. The results are hauntingly familiar yet fundamentally alien landscapes.

The project draws from the neuroscience of memory formation and dissolution, translating the biological process of forgetting into computational terms. Each generated image represents a memory that is actively being lost.

## Technical

Built on Stable Diffusion XL with custom LoRA adapters trained on corrupted datasets. The corruption process itself is generative, using Perlin noise and glitch algorithms to systematically degrade the training images before fine-tuning.

A feedback loop allows outputs to re-enter the training process, creating an evolving aesthetic that drifts further from photorealism with each iteration while maintaining structural coherence.
