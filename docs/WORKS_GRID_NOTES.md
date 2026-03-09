## Works Grid — Implementation Notes

- **Layout**  
  - Full-width section on dark background (`#0b0d11`–`#0d0f14`).  
  - Heading row with left label (e.g., “Selected Work”) and right-side index/filters.  
  - CSS grid: `display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px 28px;` (adjust gaps per breakpoint).

- **Card Structure**  
  - Anchor wraps each card.  
  - Media wrapper with fixed aspect ratio (`aspect-ratio: 3 / 4`), `overflow: hidden`, small radius.  
  - `<img>` fills wrapper (`object-fit: cover; width/height: 100%`).  
  - Metadata below the image: title (uppercase/small caps, tight tracking), optional “+” or index aligned right.

- **Hover / Motion**  
  - `img` hover: `transform: scale(1.04); transition: transform 320ms ease, filter 320ms ease;`.  
  - Optional card lift: `transform: translateY(-2px);`.  
  - Respect `prefers-reduced-motion`: disable transforms for reduced-motion users.

- **Spacing & Typography**  
  - Section padding: ~`48px 56px 72px` desktop; tighten on mobile.  
  - Text color muted white (`rgba(255,255,255,0.72)` for labels, `0.6–0.7` for body).  
  - Align grid gutters with page gutters for a clean frame.

- **Responsiveness**  
  - `auto-fit/minmax` lets cards wrap gracefully.  
  - Aspect-ratio wrapper scales down on mobile without cropping center focus.

- **Performance**  
  - `loading="lazy"` on images.  
  - If many items, use `IntersectionObserver` to fade/translate rows as they enter view.

- **Starter CSS Snippet**  
  ```css
  .works-section { background:#0b0d11; color:#e8ecf2; padding:48px 56px 72px; }
  .works-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
  .works-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:24px 28px; }
  .work-card { color:inherit; text-decoration:none; transition:transform 220ms ease; }
  .work-media { position:relative; aspect-ratio:3/4; overflow:hidden; border-radius:4px; background:#10131a; }
  .work-media img { width:100%; height:100%; object-fit:cover; display:block;
    transition:transform 320ms ease, filter 320ms ease; }
  .work-card:hover img { transform:scale(1.04); }
  .work-meta { margin-top:10px; font-size:13px; letter-spacing:0.02em; text-transform:uppercase; }
  @media (prefers-reduced-motion: reduce) {
    .work-card, .work-card img { transition:none; transform:none !important; }
  }
  ```

- **Starter HTML Skeleton**  
  ```html
  <section class="works-section" id="works">
    <div class="works-head">
      <div>Selected Work</div>
      <div class="works-index">Index +</div>
    </div>
    <div class="works-grid">
      <a class="work-card" href="#">
        <div class="work-media">
          <img src="..." alt="Project alt text" loading="lazy" />
        </div>
        <div class="work-meta">Project Title</div>
      </a>
      <!-- repeat -->
    </div>
  </section>
  ```
