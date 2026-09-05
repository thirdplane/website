# Thirdplane studio directions

Design prototypes for review before changing the production website.

Open `preview.html` for the standalone interactive comparison:

- **A — Studio notebook:** selected experiments first, followed by writing and a short personal introduction.
- **B — Live workbench:** an illustrative halo with adjustable color and softness, an experiment index, and field notes.
- **C — Research journal:** a lead research question, its evidence and limits, and related creative studies.

The tabs switch directions. Project buttons open proposed field-note summaries; the workbench sliders adjust the illustrative halo. Links to existing write-ups are references, not replacement production pages.

## Files

- `preview.html`: standalone preview with the rendering wrapper and embedded images.
- `studio-directions.html`: source visualization fragment; its host supplies shared styles and tab behavior.
- `remix.jpg`, `intent.jpg`, `holovibes.jpg`: reference screenshots used for the studies.

These are preserved September 4 studies. The Holovibes image and summary show an earlier material-playground iteration, not the current Souvenirs from SF gallery. Refresh that content after choosing a direction. The color and typography alternatives are proposals, not approved changes to Neon Noir.

## Local preview

From this directory:

```sh
python3 -m http.server 8091 --bind 127.0.0.1
```

Then open `http://localhost:8091/preview.html`.

`mockups/**` is excluded by the Eleventy configuration. This branch does not change homepage, About, collection, navigation, or hosting behavior. Its normal Vercel build will therefore show the existing site, not these prototypes.
