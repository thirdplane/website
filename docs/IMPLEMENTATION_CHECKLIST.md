# Implementation Checklist

> Third Plane Studios — Eleventy Migration
> Target: Static site with markdown-driven content

---

## Pre-Flight

- [ ] Node.js 18+ installed
- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] Cloudinary account created (for vignettes)
- [ ] Current site backed up / committed

---

## Phase 1: Foundation (Est. 1-2 hours)

### 1.1 Project Setup
- [ ] Initialize npm: `npm init -y`
- [ ] Install Eleventy: `npm install @11ty/eleventy`
- [ ] Install dependencies:
  ```bash
  npm install markdown-it markdown-it-anchor markdown-it-attrs
  ```
- [ ] Create `.eleventy.js` configuration file
- [ ] Create `.gitignore` with `_site/` and `node_modules/`

### 1.2 Directory Structure
- [ ] Create `_data/` directory
- [ ] Create `_data/site.json` with:
  ```json
  {
    "title": "Third Plane Studios",
    "description": "The curation of latent space.",
    "url": "https://www.thirdplane.io",
    "email": "j@thirdplane.io",
    "author": "Third Plane Studios"
  }
  ```
- [ ] Create `_includes/` directory
- [ ] Create `_includes/layouts/` directory
- [ ] Create `_includes/components/` directory
- [ ] Create `_includes/styles/` directory

### 1.3 Base Layout
- [ ] Create `_includes/layouts/base.njk`
  - Extract common HTML structure
  - Include head, nav, footer
  - Add block placeholders for styles/scripts/content
- [ ] Create `_includes/components/nav.njk`
  - Dynamic active state based on page.url
- [ ] Create `_includes/components/footer.njk`
- [ ] Create `_includes/components/head.njk`

### 1.4 CSS Extraction
- [ ] Create `_includes/styles/tokens.css` (design tokens from :root)
- [ ] Create `_includes/styles/base.css` (reset, body, container)
- [ ] Create `_includes/styles/nav.css`
- [ ] Create `_includes/styles/footer.css`

### 1.5 Passthrough Configuration
- [ ] Configure passthrough for existing HTML files
- [ ] Configure passthrough for assets/
- [ ] Test: `npm run dev` serves existing site unchanged

### 1.6 Vercel Configuration
- [ ] Create `vercel.json`:
  ```json
  {
    "buildCommand": "npm run build:prod",
    "outputDirectory": "_site",
    "cleanUrls": true
  }
  ```
- [ ] Update `package.json` scripts:
  ```json
  {
    "scripts": {
      "dev": "ELEVENTY_ENV=development eleventy --serve",
      "build": "eleventy",
      "build:prod": "ELEVENTY_ENV=production eleventy"
    }
  }
  ```

### 1.7 Verification
- [ ] Run `npm run dev`
- [ ] Verify localhost:8080 shows site
- [ ] Verify existing index.html, works.html work
- [ ] Commit: "feat: initialize Eleventy foundation"

---

## Phase 2: Works (Est. 2-3 hours)

### 2.1 Collection Setup
- [ ] Create `works/` directory
- [ ] Create `works/works.json`:
  ```json
  {
    "layout": "layouts/work.njk",
    "tags": ["work"],
    "draft": false
  }
  ```
- [ ] Add works collection to `.eleventy.js`

### 2.2 Layout & Styles
- [ ] Create `_includes/layouts/work.njk` (case study template)
- [ ] Create `_includes/styles/work.css`
- [ ] Create `_includes/styles/prose.css` (shared with writings)

### 2.3 Index Page
- [ ] Create `works/index.njk`
  - Keep DIA-style masonry grid
  - Iterate over collections.works
  - Link cards to {{ work.url }}
- [ ] Move works.html grid CSS to vignettes.css or keep inline

### 2.4 Sample Content
- [ ] Create `assets/works/lumina/` directory
- [ ] Add placeholder cover image
- [ ] Create `works/lumina.md`:
  ```yaml
  ---
  title: "Lumina"
  type: "Brand Identity"
  year: 2024
  github: https://github.com/thirdplane/lumina
  cover: /assets/works/lumina/cover.jpg
  featured: true
  ---

  ## Overview
  ...
  ```
- [ ] Create second sample: `works/synthesis.md`

### 2.5 Verification
- [ ] Visit /works/ — see grid
- [ ] Click card — navigate to /works/lumina/
- [ ] Verify case study renders with prose styles
- [ ] Commit: "feat: add works collection with case studies"

---

## Phase 3: Writings (Est. 1-2 hours)

### 3.1 Collection Setup
- [ ] Create `writings/` directory (if not exists)
- [ ] Create `writings/writings.json`
- [ ] Add writings collection to `.eleventy.js`

### 3.2 Layout
- [ ] Create `_includes/layouts/writing.njk`
- [ ] Create `_includes/styles/writing.css`
- [ ] Add reading time filter to `.eleventy.js`
- [ ] Add date formatting filter

### 3.3 Index Page
- [ ] Create `writings/index.njk`
  - List view with title, date, description
  - Link to individual articles

### 3.4 Content Migration
- [ ] Convert existing article to `writings/designing-in-the-void.md`
- [ ] Add proper front matter
- [ ] Verify slide-replace header works

### 3.5 Verification
- [ ] Visit /writings/ — see list
- [ ] Click title — navigate to article
- [ ] Verify prose styling, reading time
- [ ] Commit: "feat: add writings collection"

---

## Phase 4: Vignettes (Est. 2-3 hours)

### 4.1 Cloudinary Setup
- [ ] Create Cloudinary account (if not done)
- [ ] Note cloud name: `thirdplane` (or your choice)
- [ ] Create `vignettes` folder in Cloudinary
- [ ] Upload 2-3 sample videos
- [ ] Note URL pattern

### 4.2 Collection Setup
- [ ] Create `vignettes/` directory
- [ ] Create `vignettes/vignettes.json`:
  ```json
  {
    "tags": ["vignette"],
    "draft": false
  }
  ```
- [ ] Add vignettes collection to `.eleventy.js`

### 4.3 Index Page
- [ ] Create `vignettes/index.njk`
- [ ] Update grid to use <video> elements
- [ ] Add poster attribute for thumbnails
- [ ] Configure GLightbox for video

### 4.4 Hover Autoplay
- [ ] Add hover-to-play JavaScript:
  ```javascript
  const videos = document.querySelectorAll('.vignette-card video');
  videos.forEach(video => {
    const card = video.closest('.vignette-card');
    card.addEventListener('mouseenter', () => video.play());
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
  ```
- [ ] Ensure videos have `muted loop playsinline preload="metadata"`

### 4.5 Sample Content
- [ ] Create `vignettes/emergence.md`:
  ```yaml
  ---
  title: "Emergence"
  date: 2025-01-15
  prompt: "Particle system coalescing into form"
  model: "Runway Gen-3"
  video: https://res.cloudinary.com/thirdplane/video/upload/vignettes/emergence.mp4
  poster: https://res.cloudinary.com/thirdplane/video/upload/so_0/vignettes/emergence.jpg
  duration: "0:24"
  ---
  ```
- [ ] Create 2-3 more sample vignettes

### 4.6 Verification
- [ ] Visit /vignettes/ — see grid with posters
- [ ] Hover card — video autoplays (muted)
- [ ] Click card — GLightbox opens with video
- [ ] Verify prompt/model shows in lightbox caption
- [ ] Commit: "feat: add vignettes collection with video support"

---

## Phase 5: Polish (Est. 1-2 hours)

### 5.1 Navigation
- [ ] Update nav component with active states
- [ ] Verify all pages have consistent nav
- [ ] Test mobile navigation

### 5.2 SEO
- [ ] Add RSS feed (eleventy-plugin-rss)
- [ ] Add sitemap generation
- [ ] Verify Open Graph tags on all pages
- [ ] Add canonical URLs

### 5.3 Error Page
- [ ] Create `404.njk` or `404.html`
- [ ] Style consistently with site

### 5.4 Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images if needed
- [ ] Verify lazy loading works
- [ ] Check Core Web Vitals

### 5.5 Cleanup
- [ ] Remove old standalone HTML files (after migration complete)
- [ ] Remove mockup files if no longer needed
- [ ] Update README if exists

### 5.6 Final Verification
- [ ] Test all routes work
- [ ] Test on mobile
- [ ] Test reduced motion preference
- [ ] Deploy to Vercel
- [ ] Verify production build
- [ ] Commit: "feat: complete Eleventy migration"

---

## Post-Launch

- [ ] Set up Cloudinary upload workflow (CLI or dashboard)
- [ ] Document content authoring process
- [ ] Consider: Search (Pagefind)
- [ ] Consider: Comments (Giscus)
- [ ] Consider: Newsletter signup

---

## Quick Reference

### Commands
```bash
npm run dev          # Start dev server
npm run build        # Build site
npm run build:prod   # Production build
vercel               # Deploy to Vercel
```

### URLs
- Dev: http://localhost:8080
- Cloudinary: https://cloudinary.com/console
- Vercel: https://vercel.com/dashboard

### File Locations
- Config: `.eleventy.js`
- Data: `_data/site.json`
- Layouts: `_includes/layouts/`
- Styles: `_includes/styles/`
- Content: `writings/`, `works/`, `vignettes/`
