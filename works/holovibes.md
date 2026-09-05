---
title: "Holovibes: souvenirs from San Francisco"
subtitle: "Making digital keepsakes that catch the light"
date: 2026-08-25
type: "Creative Coding"
year: 2026
cover: "/assets/works/holovibes/souvenirs.png"
excerpt: "I missed the gift shop, so I made my own souvenirs: interactive postcards with foil, surface relief, and a little depth."
description: "Making interactive San Francisco souvenirs with generated SVG artwork, holographic foil, and depth that responds to your movement."
live: "https://holovibes.vercel.app/"
featured: false
draft: false
badgeType: "generative art"
memberOf:
  - artificial-creativity
---

I missed the gift shop on a quick trip to San Francisco, so I made the keepsakes I wanted to bring home.

Holovibes is a small collection of interactive postcards: cable cars, steep streets, and a waterfront, finished with holographic foil. Move your pointer across a card, or drag on your phone, and it tilts to catch the light. A detail flashes, a color shifts, the cable car moves slightly against its background.

[Open the souvenir studio](https://holovibes.vercel.app/). Browse the cards with the arrows, then try **Tune foil** to change the finish.

{% figure "/assets/works/holovibes/souvenirs.png", "Holovibes title artwork: a San Francisco cable-car postcard with iridescent details and a scalloped border.", "Souvenirs from SF — the project's cover artwork." %}

## A picture you can turn in your hand

There is a particular pleasure in a foil postcard. You turn it a few degrees and something changes. The picture stays familiar, but the surface keeps giving you another way to look at it.

That became the interesting part of this experiment: giving a digital image some of that behavior. A rainbow painted into the artwork stays in the same place. A material rendered in the browser can respond to your movement. The image supplies the scene; the renderer supplies the changing light.

The gallery brings together photo vectorizations and generated SVG artwork made with Quiver. These are prepared, checked-in cards. Browsing changes which one is on display; it does not generate a new image each time.

## Depth and shine need different instructions

The cable-car study separates the car from the background. Giving those layers a little distance and different amounts of movement creates parallax: the foreground shifts against the scene behind it.

That alone does not tell a surface how to shine. Two layers can sit at different depths and still reflect light in much the same way. The material needs its own information: where foil is exposed, where the printed artwork remains visible, and which surface details should catch a highlight.

Holovibes keeps those decisions separate. Scene layers control depth and movement. Material maps control the artwork, foil coverage, and apparent surface relief. The relief changes how light falls across the surface; it does not turn every illustrated detail into a sculpted 3D object.

The live gallery lets you compare those choices. There is a raised cable-car study, a depth-parallax version, and a version that combines depth with holographic foil. Some studies pause the holographic controls so you can look at the reflective surface or depth on its own.

Getting there required work beyond prompting. In the SVG experiments, requests for neatly named objects and material groups did not reliably survive generation. The current cable-car card uses an explicit selection of paths to separate foreground from background, paired with prepared material maps. It is a composed study, with decisions made for that artwork.

## Leave the finish open

The controls make the last part of the process available to the viewer. Effect intensity, sparkle, and saturation change the immediate impression. The advanced settings adjust the density and direction of the diffraction pattern, plus the foil tint.

On a phone, the controls open in a sheet so the postcard has room to breathe. You can change the finish, browse another card, or reset to the original look. The settings last for the visit.

This connects Holovibes to [Generative Remix](/works/generative-remix/): both make a visual result something you can keep adjusting through a small set of controls. Here, the object is deliberately personal and small. A souvenir is a good place to ask how much of the pleasure of a physical surface can survive on a screen.

## Where it started

Holovibes builds on [Holocloth](https://github.com/dmitrykurash/holocloth), created by [Dmitry Kurash](https://x.com/DmitryKurash). Its holographic material and cloth work provided the starting point. The separate [cloth studio](https://holovibes.vercel.app/cloth) remains available for experimenting with deformable surfaces and custom artwork; the postcard gallery concentrates on prepared keepsakes.

{% figure "/assets/works/holovibes/cover.png", "An earlier Holovibes interface showing a vectorized street scene and six holographic material controls.", "An earlier iteration exposed the material workbench directly. The current gallery gives the postcards the foreground." %}

The next question is how to make the preparation reusable across more images: keeping the composition intact while assigning depth and material behavior with less work on each individual card. For now, the gallery is a small set of souvenirs and material studies to pick up and turn toward the light.
