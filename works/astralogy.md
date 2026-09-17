---
title: "Astralogy: how far can we go with AI?"
subtitle: "A playful journey home, and a question about human capability"
date: 2026-09-16
type: "Hackathon experiment"
year: 2026
model: "GPT-6 (Astra)"
cover: "/assets/works/astralogy/cover.jpg"
demoVideo: "https://res.cloudinary.com/dxghuzxip/video/upload/v1789621077/demo-vid_xnzumr.mp4"
excerpt: "A just-for-fun space adventure for the GPT-6 (Astra) hackathon, exploring how far we can lean on AI to extend what we're able to do."
description: "Astralogy is a playful GPT-6 (Astra) hackathon build about extending human capability: finding our bearings, shaping a route, and getting home together."
featured: true
draft: false
badgeType: "prototype"
memberOf:
  - artificial-creativity
---

I built Astralogy for the GPT-6 (Astra) hackathon. It's a just-for-fun space adventure with a question underneath it: **how far can humankind lean on AI to become capable of more?**

Space gives that question somewhere to play. You're looking at an unfamiliar sky. You have a ship, limited fuel, a lifetime budget, and an AI companion. You want to get home. The interesting part is discovering what you and Astra can do together along the way.

<figure>
  {% if demoVideo %}
  <video controls playsinline preload="none" poster="/assets/works/astralogy/plan.jpg" width="1920" height="1080" aria-label="Astralogy hackathon demo: locating the ship, editing a route, and arriving home" aria-describedby="astralogy-demo-caption" style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="{{ demoVideo }}" type="video/mp4">
    <a href="{{ demoVideo }}">Watch the Astralogy demo</a>.
  </video>
  <figcaption id="astralogy-demo-caption">The hackathon demo, labelled Stellar Atelier in the interface. 49 seconds. The journey is described below.</figcaption>
  {% else %}
  <img src="/assets/works/astralogy/plan.jpg" alt="Astralogy's route preview shows a bendable gravity field, a fuel and lifetime comparison, and controls for shaping the journey home." width="1600" height="922">
  <figcaption>A route home, with its consequences in view. Still from the hackathon demo, labelled Stellar Atelier in the interface.</figcaption>
  {% endif %}
</figure>

## First, make the sky useful

At the beginning, there are stars to look at and questions to ask. A point of light gives you something to point toward, but it doesn't tell you where you are, how far away it is, or whether heading that way will help.

Astra helps turn that view into something you can act on. Calibration establishes a usable position in the simulation. A home bearing appears. The same sky now has a relationship to your goal.

That transition is central to the experiment. The person gains evidence, a spatial representation, and a way to make a better-informed decision. The interface gives them something they can inspect and work with.

## Give the person a hand on the plan

Once home has a direction, getting there becomes a problem of motion and resources. In this fictional world, you can bend a temporary gravity field to redirect the ship. Astra helps make that power usable through a route preview and controls tied to the simulation.

The video shows a proposed journey, followed by adjustments to the field and its speed. The curve changes. Fuel and travel-time estimates change with it. Some previews exceed the available fuel, making the limit visible before a flight is committed.

This is the kind of interaction I wanted to explore: you can ask for help, see what the help means, and put your hand on the result. A preference such as using less fuel becomes a tradeoff you can examine. A faster journey has a cost. You still get to decide what matters.

The build supports both planning and delegated flight. Astra can take the helm within a visible budget, while the person can interrupt. Being able to lean on an agent and being able to redirect it belong in the same experience.

## Follow the plan all the way home

The recording ends with flight, braking, and an arrival receipt. In this run, the simulated journey takes 294.9 years and leaves 2.04 fuel, 9 Astra credits, and 205.1 years of lifetime. Position and speed are checked at arrival.

Those details make the loop concrete. The preview commits to consequences, and the simulation accounts for them. Getting home includes having enough resources to stop.

{% figure "/assets/works/astralogy/cover.jpg", "Earth fills the Astralogy viewport beside an arrival receipt showing 294.9 journey years, 2.04 fuel remaining, 9 credits, and 205.1 years of lifetime remaining.", "Home, with the outcome checked against the simulation. Still from the supplied demo." %}

## A small build for a much bigger question

Astralogy is a toy world. Its gravity controls, resource credits, and centuries-long journey are part of the fiction. Astra works through supported tools and controls; the simulation computes their effects. This is a proof of concept for an interaction, with plenty left to learn about how well it transfers beyond this setting.

What interests me is the possibility that AI can expand the set of things a person can meaningfully attempt. It can help us acquire information, understand unfamiliar relationships, try possible actions, and shape a solution as we learn. The interface matters because it gives us a way to participate in that process.

That question runs through [Generative Remix](/works/generative-remix/) and the [Intent Configuration Interface](/works/taste-score/) too: how do we make what a model understands visible and adjustable? Astralogy takes it into a little world where the adjustment changes where you end up.

For a hackathon, getting home was enough. The question I want to keep exploring is how much further we might reach with AI beside us—and what we need to be able to see, question, and steer along the way.
