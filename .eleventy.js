const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function(eleventyConfig) {
  // ============================================
  // PASSTHROUGH COPIES
  // ============================================

  // Pass through existing HTML files
  eleventyConfig.addPassthroughCopy("index.html");
  // works.html, writings.html, and vignettes.html are now generated from their respective index.njk files

  // Pass through assets directory (for future use)
  eleventyConfig.addPassthroughCopy("assets");

  // Pass through CSS partials directory
  eleventyConfig.addPassthroughCopy("_includes/styles");

  // Pass through any images in writings
  eleventyConfig.addPassthroughCopy("writings/**/*.{jpg,jpeg,png,gif,svg,webp}");

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

  // ============================================
  // FILTERS
  // ============================================

  // Format date for display (e.g., "Jan 15, 2025")
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

  // Pad filter for zero-padded numbers (e.g., "02 Projects")
  eleventyConfig.addFilter("pad", function(num, size = 2) {
    return String(num).padStart(size, '0');
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

  // Ignore mockup files
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
