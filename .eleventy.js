const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function(eleventyConfig) {
  // ============================================
  // PASSTHROUGH COPIES
  // ============================================

  // index.html is processed as a Nunjucks template (not passthrough) so it has access to _data/site.json
  // works.html, writings.html, and vignettes.html are now generated from their respective index.njk files

  // Pass through assets directory (for future use)
  eleventyConfig.addPassthroughCopy("assets");

  // Publish the site mark at the conventional root paths browsers request for
  // tabs, bookmarks, and installed shortcuts.
  eleventyConfig.addPassthroughCopy({
    "assets/favicon.svg": "favicon.svg",
    "assets/favicon-32.png": "favicon-32.png",
    "assets/favicon-16.png": "favicon-16.png",
    "assets/favicon.ico": "favicon.ico",
    "assets/apple-touch-icon-180.png": "apple-touch-icon.png"
  });

  // Pass through CSS partials directory
  eleventyConfig.addPassthroughCopy("_includes/styles");

  // Pass through any images in writings
  eleventyConfig.addPassthroughCopy("writings/**/*.{jpg,jpeg,png,gif,svg,webp}");

  // Pass through any images in collections
  eleventyConfig.addPassthroughCopy("collections/**/*.{jpg,jpeg,png,gif,svg,webp}");

  // Pass through the public Labs landing page and its assets. Research drafts
  // live under labs/ too, but stay out of the production output until ready.
  eleventyConfig.addPassthroughCopy("labs/index.html");
  eleventyConfig.addPassthroughCopy("labs/assets");
  eleventyConfig.ignores.add("labs/**");

  // ============================================
  // COLLECTIONS
  // ============================================

  // Writings collection (markdown files in writings/)
  eleventyConfig.addCollection("writings", function(collectionApi) {
    return collectionApi.getFilteredByGlob("writings/**/*.md").sort((a, b) => {
      return b.date - a.date; // Sort by date, newest first
    });
  });

  // Works collection (markdown files in works/)
  eleventyConfig.addCollection("works", function(collectionApi) {
    const isProduction = process.env.ELEVENTY_ENV === 'production';
    return collectionApi.getFilteredByGlob("works/**/*.md")
      .filter(item => isProduction ? !item.data.draft : true)
      .sort((a, b) => {
        // Featured items first, then by year descending (per spec Section 4.2)
        if (a.data.featured && !b.data.featured) return -1;
        if (!a.data.featured && b.data.featured) return 1;
        return (b.data.year || 0) - (a.data.year || 0);
      });
  });

  // Vignettes collection (future: markdown files in vignettes/)
  eleventyConfig.addCollection("vignettes", function(collectionApi) {
    return collectionApi.getFilteredByGlob("vignettes/**/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Thematic collections (the collection definitions themselves)
  // Collections with `hidden: true` are excluded from the index but still accessible via direct URL
  eleventyConfig.addCollection("thematicCollections", function(collectionApi) {
    return collectionApi.getFilteredByGlob("collections/*.md")
      .filter(item => !item.data.hidden)
      .sort((a, b) => (a.data.order || 999) - (b.data.order || 999));
  });

  // All content items (works + writings + vignettes) for cross-collection filtering
  // Respects draft: true in production builds
  eleventyConfig.addCollection("allContent", function(collectionApi) {
    const isProduction = process.env.ELEVENTY_ENV === 'production';
    const works = collectionApi.getFilteredByGlob("works/**/*.md")
      .filter(item => isProduction ? !item.data.draft : true);
    const writings = collectionApi.getFilteredByGlob("writings/**/*.md")
      .filter(item => isProduction ? !item.data.draft : true);
    const vignettes = collectionApi.getFilteredByGlob("vignettes/**/*.md")
      .filter(item => isProduction ? !item.data.draft : true);
    return [...works, ...writings, ...vignettes].sort((a, b) => {
      const dateA = a.data.date ? new Date(a.data.date) : new Date((a.data.year || 2020) + '-01-01');
      const dateB = b.data.date ? new Date(b.data.date) : new Date((b.data.year || 2020) + '-01-01');
      return dateB - dateA;
    });
  });

  // ============================================
  // FILTERS
  // ============================================

  // Format date for display (e.g., "Jan 15, 2026")
  eleventyConfig.addFilter("formatDate", function(date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  });

  // ISO date for datetime attributes
  eleventyConfig.addFilter("isoDate", function(date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString();
  });

  // Reading time calculation
  eleventyConfig.addFilter("readingTime", function(content) {
    if (!content) return "1 min read";
    // Strip HTML tags and count words
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  });

  // Get previous item in collection
  eleventyConfig.addFilter("getPreviousCollectionItem", function(collection, page) {
    const index = collection.findIndex(item => item.url === page.url);
    return index > 0 ? collection[index - 1] : null;
  });

  // Get next item in collection
  eleventyConfig.addFilter("getNextCollectionItem", function(collection, page) {
    const index = collection.findIndex(item => item.url === page.url);
    return index >= 0 && index < collection.length - 1 ? collection[index + 1] : null;
  });

  // Filter content items by collection slug
  eleventyConfig.addFilter("worksInCollection", function(allContent, collectionSlug) {
    return allContent.filter(item =>
      item.data.memberOf && item.data.memberOf.includes(collectionSlug)
    ).sort((a, b) => {
      const dateA = a.data.date ? new Date(a.data.date) : new Date((a.data.year || 2020) + '-01-01');
      const dateB = b.data.date ? new Date(b.data.date) : new Date((b.data.year || 2020) + '-01-01');
      return dateB - dateA;
    });
  });

  // Get prev/next collections for navigation (wrapping)
  eleventyConfig.addFilter("prevNextCollections", function(collectionsArray, currentSlug) {
    const index = collectionsArray.findIndex(c => c.data.slug === currentSlug);
    const total = collectionsArray.length;
    return {
      prev: collectionsArray[(index - 1 + total) % total],
      next: collectionsArray[(index + 1) % total]
    };
  });

  // Serialize thematic collections to a JSON slug→title map for client-side back-link resolution
  eleventyConfig.addFilter("collectionsMap", function(thematicCollections) {
    if (!thematicCollections) return "[]";
    return JSON.stringify(
      thematicCollections.map(function(col) {
        return { slug: col.data.slug, title: col.data.title };
      })
    );
  });

  // Check if a string contains a substring (for segment type matching)
  eleventyConfig.addFilter("includes", function(str, substring) {
    if (!str || !substring) return false;
    return str.includes(substring);
  });

  // Short date format: "Dec 2024"
  eleventyConfig.addFilter("formatDateShort", function(date, year) {
    if (date) {
      const d = new Date(date);
      return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    if (year) return String(year);
    return "";
  });

  // ============================================
  // SHORTCODES
  // ============================================

  // Figure shortcode for images with captions
  eleventyConfig.addShortcode("figure", function(src, alt, caption, className = "") {
    const classAttr = className ? ` class="${className}"` : "";
    const captionHtml = caption ? `<figcaption>${caption}</figcaption>` : "";
    return `<figure${classAttr}>
  <img src="${src}" alt="${alt}" loading="lazy" decoding="async">
  ${captionHtml}
</figure>`;
  });

  // Video shortcode for embedded videos
  eleventyConfig.addShortcode("video", function(src, poster = "", autoplay = false, loop = false, muted = true) {
    const posterAttr = poster ? ` poster="${poster}"` : "";
    const autoplayAttr = autoplay ? " autoplay" : "";
    const loopAttr = loop ? " loop" : "";
    const mutedAttr = muted ? " muted" : "";
    return `<video${posterAttr}${autoplayAttr}${loopAttr}${mutedAttr} playsinline>
  <source src="${src}" type="video/mp4">
  Your browser does not support the video tag.
</video>`;
  });

  // ============================================
  // MARKDOWN CONFIGURATION
  // ============================================

  const markdownLibrary = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true
  })
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink(),
    slugify: eleventyConfig.getFilter("slug"),
    level: [2, 3, 4]
  })
  .use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLibrary);

  // ============================================
  // WATCH TARGETS
  // ============================================

  eleventyConfig.addWatchTarget("./_includes/styles/");
  eleventyConfig.addWatchTarget("./_data/");

  // ============================================
  // IGNORES
  // ============================================

  // Ignore docs folder (contains example code with shortcode syntax)
  eleventyConfig.ignores.add("docs/**");
  eleventyConfig.ignores.add("node_modules/**");

  // Ignore project config files
  eleventyConfig.ignores.add("CLAUDE.md");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add(".claude/**");
  eleventyConfig.ignores.add(".agents/**");

  // Ignore mockup files
  eleventyConfig.ignores.add("mockups/**");
  eleventyConfig.ignores.add("content-mockup.html");
  eleventyConfig.ignores.add("article-header-mockup.html");
  eleventyConfig.ignores.add("*-mockup.html");

  // Ignore old static HTML files (now generated dynamically)
  eleventyConfig.ignores.add("works.html");
  eleventyConfig.ignores.add("writings.html");
  eleventyConfig.ignores.add("vignettes.html");

  // Ignore component HTML snippets (not full pages)
  eleventyConfig.ignores.add("components/**");

  // ============================================
  // BUILD CONFIGURATION
  // ============================================

  return {
    // Template formats to process
    templateFormats: ["md", "njk", "html", "liquid"],

    // Markup engine for .md files
    markdownTemplateEngine: "njk",

    // Markup engine for .html files
    htmlTemplateEngine: "njk",

    // Directory structure
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data"
    }
  };
};
