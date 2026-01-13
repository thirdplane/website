# Vignettes Video Specification

> Third Plane Studios — AI-Generated Video Gallery
> Version: 1.0 | Date: 2025-01-13

---

## Overview

Vignettes are short AI-generated videos (10-60 seconds) showcasing generative art explorations. Unlike traditional image galleries, vignettes feature video content with hover-to-play interaction.

---

## Video Hosting: Cloudinary

### Why Cloudinary
- **Free tier**: 25GB bandwidth/month (sufficient for portfolio traffic)
- **Auto-optimization**: Serves WebM to Chrome, MP4 to Safari
- **Poster generation**: Auto-extract frame as thumbnail
- **No branding**: Clean HTML5 video player
- **Transformations**: Resize, trim, format conversion

### Account Setup

1. Sign up at https://cloudinary.com
2. Note your cloud name (e.g., `thirdplane`)
3. Create folder structure:
   ```
   /vignettes/
     emergence.mp4
     neon-city.mp4
     void-portrait.mp4
   ```

### URL Patterns

**Video URL:**
```
https://res.cloudinary.com/{cloud_name}/video/upload/vignettes/{filename}.mp4
```

**Auto-format (recommended):**
```
https://res.cloudinary.com/{cloud_name}/video/upload/f_auto/vignettes/{filename}
```

**Poster frame (first frame):**
```
https://res.cloudinary.com/{cloud_name}/video/upload/so_0/vignettes/{filename}.jpg
```

**Poster frame (specific timestamp, e.g., 2 seconds):**
```
https://res.cloudinary.com/{cloud_name}/video/upload/so_2/vignettes/{filename}.jpg
```

### Upload Workflow

**Option A: Dashboard (Simple)**
1. Go to Cloudinary Media Library
2. Navigate to /vignettes folder
3. Drag and drop video file
4. Copy URL

**Option B: CLI (Advanced)**
```bash
# Install Cloudinary CLI
npm install -g cloudinary-cli

# Configure
cld config -url cloudinary://API_KEY:API_SECRET@CLOUD_NAME

# Upload
cld uploader upload ./my-video.mp4 folder=vignettes public_id=my-video
```

**Option C: Node.js Script**
```javascript
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'thirdplane',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

await cloudinary.uploader.upload('./emergence.mp4', {
  resource_type: 'video',
  folder: 'vignettes',
  public_id: 'emergence'
});
```

---

## Video Requirements

### Specifications

| Property | Requirement | Notes |
|----------|-------------|-------|
| **Duration** | 10-60 seconds | Optimal: 15-30s for hover preview |
| **Resolution** | 1080p (1920x1080) | Cloudinary auto-scales for delivery |
| **Format** | MP4 (H.264) | Most compatible; Cloudinary converts |
| **Frame rate** | 24-30 fps | Standard for web |
| **File size** | < 50MB | Keeps upload fast |
| **Aspect ratio** | Flexible | 16:9, 1:1, 9:16 all supported |

### Recommended Export Settings

From Runway/Pika/etc:
- Codec: H.264
- Quality: High (not maximum — diminishing returns)
- Audio: None (videos play muted)

---

## Content Model

### Front Matter Schema

```yaml
---
title: "Emergence"                    # Required: Display title
date: 2025-01-15                      # Required: ISO date
prompt: "Particle system coalescing into form, slow motion, abstract cinematography"
                                      # Required: Generation prompt
model: "Runway Gen-3"                 # Required: AI model used
video: https://res.cloudinary.com/thirdplane/video/upload/f_auto/vignettes/emergence
                                      # Required: Cloudinary video URL
poster: https://res.cloudinary.com/thirdplane/video/upload/so_0/vignettes/emergence.jpg
                                      # Optional: Custom poster frame
duration: "0:24"                      # Optional: Video duration
series: "Void Studies"                # Optional: Group related pieces
draft: false                          # Optional: Exclude from production
---

Optional notes about the generation process, iterations, or concept...
```

### Collection Defaults

`vignettes/vignettes.json`:
```json
{
  "tags": ["vignette"],
  "draft": false,
  "layout": false
}
```

Note: `layout: false` because vignettes don't need individual pages — they display in the grid with lightbox.

---

## Interaction Design

### Grid Layout

```
┌─────────────────────────────────────────────────┐
│  // VIGNETTES                        06 Pieces  │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ ▶ poster│  │  poster │  │  poster │        │
│  │         │  │         │  │         │        │
│  ├─────────┤  ├─────────┤  ├─────────┤        │
│  │ Title   │  │ Title   │  │ Title   │        │
│  │ Model   │  │ Model   │  │ Model   │        │
│  └─────────┘  └─────────┘  └─────────┘        │
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  poster │  │  poster │  │  poster │        │
│  │         │  │         │  │         │        │
│  └─────────┘  └─────────┘  └─────────┘        │
│                                                 │
└─────────────────────────────────────────────────┘
```

### State Machine

```
┌──────────────┐
│    IDLE      │  Poster visible, video paused
└──────┬───────┘
       │ mouseenter
       ▼
┌──────────────┐
│   PLAYING    │  Video plays (muted, looped)
└──────┬───────┘
       │ mouseleave
       ▼
┌──────────────┐
│    IDLE      │  Video pauses, resets to 0
└──────────────┘
       │ click
       ▼
┌──────────────┐
│  LIGHTBOX    │  GLightbox opens, full video
└──────────────┘
```

### HTML Structure

```html
<a href="{{ video }}"
   class="vignette-card glightbox"
   data-gallery="vignettes"
   data-title="{{ title }}"
   data-description="Prompt: {{ prompt }}<br>Model: {{ model }}{% if duration %}<br>Duration: {{ duration }}{% endif %}">

  <figure class="vignette-media">
    <video
      src="{{ video }}"
      poster="{{ poster }}"
      muted
      loop
      playsinline
      preload="metadata"
    ></video>
  </figure>

  <div class="vignette-content">
    <h3 class="vignette-title">{{ title }}</h3>
    <div class="vignette-tech">
      <span class="tech-tag">{{ model }}</span>
    </div>
  </div>
</a>
```

### JavaScript: Hover Autoplay

```javascript
(function() {
  'use strict';

  const cards = document.querySelectorAll('.vignette-card');

  cards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    // Hover to play
    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {
        // Autoplay blocked — user hasn't interacted yet
        // Video will show poster, which is fine
      });
    });

    // Leave to pause and reset
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });

    // Prevent video click from triggering lightbox twice
    video.addEventListener('click', (e) => {
      e.stopPropagation();
      card.click(); // Delegate to card's lightbox trigger
    });
  });
})();
```

### CSS: Video Card

```css
.vignette-card {
  display: block;
  position: relative;
  overflow: hidden;
  background: var(--ink-850);
  border-radius: 6px;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: transform var(--spring-hover), border-color var(--transition-fast);
}

.vignette-card:hover {
  border-color: rgba(125, 231, 255, 0.3);
  transform: translateY(-4px);
}

.vignette-media {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.vignette-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Smooth transition when video starts playing */
.vignette-media video {
  transition: opacity 0.3s ease;
}

.vignette-content {
  padding: 16px;
}

.vignette-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-200);
  margin-bottom: 8px;
}

.tech-tag {
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 3px 8px;
  background: rgba(125, 231, 255, 0.1);
  border: 1px solid rgba(125, 231, 255, 0.2);
  border-radius: 4px;
  color: var(--ice-400);
  text-transform: uppercase;
}
```

### GLightbox Configuration

```javascript
const lightbox = GLightbox({
  touchNavigation: true,
  loop: true,
  autoplayVideos: true,  // Auto-play when lightbox opens
  openEffect: 'fade',
  closeEffect: 'fade',
  videosWidth: '80vw',   // Responsive video width
  plyr: {
    config: {
      muted: false,       // Unmute in lightbox (user initiated)
      hideControls: false,
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
    }
  }
});
```

---

## Nunjucks Template

### vignettes/index.njk

```nunjucks
---
layout: layouts/base.njk
title: Vignettes
description: AI-generated videos — explorations in latent space
bodyClass: vignettes-page
---

{% block styles %}
{% include "styles/vignettes.css" %}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
{% endblock %}

<section class="vignettes-section">
  <div class="container">
    <header class="vignettes-head">
      <span class="section-label">// VIGNETTES</span>
      <span class="vignettes-count">{{ collections.vignettes.length | pad(2) }} Pieces</span>
    </header>

    <div class="vignettes-grid">
      {% for vignette in collections.vignettes %}
      <a href="{{ vignette.data.video }}"
         class="vignette-card glightbox"
         data-gallery="vignettes"
         data-title="{{ vignette.data.title }}"
         data-description="Prompt: {{ vignette.data.prompt }}<br>Model: {{ vignette.data.model }}{% if vignette.data.duration %}<br>Duration: {{ vignette.data.duration }}{% endif %}">
        <figure class="vignette-media">
          <video
            src="{{ vignette.data.video }}"
            poster="{{ vignette.data.poster | default(vignette.data.video | replace('.mp4', '.jpg') | replace('f_auto', 'so_0')) }}"
            muted
            loop
            playsinline
            preload="metadata"
          ></video>
        </figure>
        <div class="vignette-content">
          <h3 class="vignette-title">{{ vignette.data.title }}</h3>
          <div class="vignette-tech">
            <span class="tech-tag">{{ vignette.data.model }}</span>
          </div>
        </div>
      </a>
      {% endfor %}
    </div>
  </div>
</section>

{% block scripts %}
<script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>
<script>
  // GLightbox init
  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    openEffect: 'fade',
    closeEffect: 'fade'
  });

  // Hover autoplay
  document.querySelectorAll('.vignette-card').forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    card.addEventListener('mouseenter', () => video.play().catch(() => {}));
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
</script>
{% endblock %}
```

---

## Sample Content

### vignettes/emergence.md

```yaml
---
title: "Emergence"
date: 2025-01-15
prompt: "Particle system coalescing into humanoid form, slow motion, abstract cinematography, dark void background, bioluminescent particles"
model: "Runway Gen-3"
video: https://res.cloudinary.com/thirdplane/video/upload/f_auto/vignettes/emergence
poster: https://res.cloudinary.com/thirdplane/video/upload/so_2/vignettes/emergence.jpg
duration: "0:24"
series: "Void Studies"
---

First exploration in the Void Studies series. Generated through iterative prompting, focusing on the moment of coalescence—when chaos becomes form.
```

### vignettes/neon-city.md

```yaml
---
title: "Neon City"
date: 2025-01-10
prompt: "Cyberpunk cityscape, rain-slicked streets, neon reflections, moody atmosphere, cinematic drone shot"
model: "Pika 1.0"
video: https://res.cloudinary.com/thirdplane/video/upload/f_auto/vignettes/neon-city
duration: "0:18"
---

Urban dreamscape exploring the intersection of technology and atmosphere.
```

---

## Troubleshooting

### Video doesn't autoplay on hover
- Ensure `muted` attribute is present (browser requirement)
- Check console for autoplay policy errors
- Verify video file is loading (check Network tab)

### Poster not showing
- Verify poster URL is correct
- Try explicit `.jpg` extension
- Check Cloudinary transformation syntax

### GLightbox not opening
- Ensure GLightbox JS is loaded
- Check that `glightbox` class is on the anchor
- Verify `href` points to video URL

### Video quality issues
- Upload higher resolution source
- Check Cloudinary transformation isn't downscaling
- Use `f_auto,q_auto` for optimal delivery

---

## Cost Estimation

### Cloudinary Free Tier
- 25 GB bandwidth/month
- 25,000 transformations/month

### Usage Estimate (Portfolio Traffic)
- ~50 vignettes × 30 MB average = 1.5 GB storage
- ~1,000 monthly visitors × 3 videos watched × 30 MB = 90 GB bandwidth

**Result**: Free tier may not suffice for moderate traffic. Consider:
- Cloudinary Plus ($89/mo) for 225 GB bandwidth
- Or use Bunny.net (~$0.01/GB) as CDN in front of Cloudinary

---

*Document created: 2025-01-13*
