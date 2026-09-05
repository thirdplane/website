---
title: "Holovibes"
subtitle: "Turn photos and vector artwork into responsive holographic postcards"
date: 2026-08-25
type: "Creative Coding"
year: 2026
cover: "/assets/works/holovibes/cover.png"
excerpt: "A WebGL material playground for transforming photos and SVG artwork into interactive holographic postcards."
description: "Turn photos and SVG artwork into interactive holographic postcards with a WebGL material playground."
featured: false
draft: false
badgeType: "generative art"
memberOf:
  - artificial-creativity
---

{% figure "/assets/works/holovibes/cover.png", "Holovibes showing a holographic street scene beside controls for diffraction, sparkle, saturation, and foil tint.", "A photo becomes a holographic postcard, with material controls exposed alongside the artwork." %}

## Overview

Holovibes is an interactive 3D SVG generator for turning photos and vector
artwork into commemorative holographic postcards. Its controls expose the
material rather than hiding it: tune diffraction intensity and direction,
sparkle, color saturation, and foil tint while the result responds live.

The project combines cleaned SVG geometry with a real-time WebGL material
pipeline. Artwork can be rerolled between visual candidates, loaded from local
SVG layers, or carried into a separate cloth lab for a softer, deformable
rendering treatment.

## Approach

The experiment explores how generated artwork can retain a flat, graphic
identity while gaining view-dependent qualities that cannot be baked into a
still image. Vector geometry supplies composition and material masks; the
renderer supplies diffraction, glints, lighting, and relief.

## Origins

Holovibes builds on [Holocloth](https://github.com/dmitrykurash/holocloth),
created by [Dmitry Kurash](https://x.com/DmitryKurash), and extends its
holographic rendering work toward generated and layered artwork.
