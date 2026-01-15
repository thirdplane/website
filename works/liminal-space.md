---
title: "Liminal Space"
type: "Web Experience"
year: 2024
cover: https://picsum.photos/seed/liminalspace/800/600
featured: false
---

An experimental web experience that exists in the threshold between sites. Liminal Space intercepts browser navigation, creating a transitional realm that visitors pass through without fully arriving or departing.

## Concept

The internet is full of in-between moments: loading screens, redirects, 404 pages. Liminal Space colonizes these thresholds, transforming moments of waiting into spaces of contemplation.

Drawing from the architectural concept of liminality and the phenomenology of digital waiting, the project asks what would happen if we lingered in these transitional spaces rather than rushing through them.

## Technical

Built as a Service Worker that intercepts network requests and injects transitional content. The liminal space itself is a WebGL environment that responds to the context of the navigation, different destinations producing different transitional experiences.

Three.js renders abstract spatial environments while custom shaders create fog and depth effects that suggest infinite extension. Ambient audio generated with Web Audio API completes the atmospheric experience.

The technical challenge was creating an experience that feels expansive and contemplative while loading quickly enough to not frustrate the user's ultimate navigation goal.

## Experience

Liminal Space was deployed as a browser extension and as embedded code on participating websites. Visitors reported experiencing time dilation, perceiving the few-second transitions as much longer immersive moments.
