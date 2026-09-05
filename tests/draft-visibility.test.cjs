const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } = require("node:fs");
const { tmpdir } = require("node:os");
const path = require("node:path");
const { test } = require("node:test");

const root = path.resolve(__dirname, "..");
const cli = path.join(root, "node_modules/.bin/eleventy");

for (const mode of ["production", "development", "standard"]) {
  test(`${mode} build applies draft visibility to pages and every collection`, () => {
    const fixture = mkdtempSync(path.join(tmpdir(), "thirdplane-drafts-test-"));
    try {
      for (const directory of ["_includes", "_data"]) {
        cpSync(path.join(root, directory), path.join(fixture, directory), { recursive: true });
      }

      for (const directory of ["works", "writings", "vignettes"]) {
        mkdirSync(path.join(fixture, directory));
        cpSync(path.join(root, directory, `${directory}.json`), path.join(fixture, directory, `${directory}.json`));
        for (const state of ["draft", "published"]) {
          writeFileSync(path.join(fixture, directory, `${state}.md`), `---
title: ${directory}-${state}
date: 2026-01-01
year: 2026
draft: ${state === "draft"}
memberOf:
  - artificial-creativity
---
${directory}-${state} body
`);
        }
      }

      // Exercise all custom and automatic tag collections, as well as the
      // filter used by thematic collection pages and their work counts.
      const collectionNames = ["all", "works", "writings", "vignettes", "allContent", "work", "writing", "vignette"];
      const collectionMarkup = collectionNames.map(name =>
        `${name}: {% for item in collections.${name} %}{{ item.data.title }};{% endfor %}`
      ).join("\n");
      writeFileSync(path.join(fixture, "visibility.njk"), `---
permalink: visibility.txt
eleventyExcludeFromCollections: true
---
${collectionMarkup}
thematic: {% for item in collections.allContent | worksInCollection("artificial-creativity") %}{{ item.data.title }};{% endfor %}
`);

      const env = { ...process.env };
      if (mode === "standard") delete env.ELEVENTY_ENV;
      else env.ELEVENTY_ENV = mode;

      execFileSync(process.execPath, [cli, `--config=${path.join(root, ".eleventy.js")}`, "--quiet"], {
        cwd: fixture,
        env,
        stdio: "pipe"
      });

      const output = path.join(fixture, "_site");
      const visibility = readFileSync(path.join(output, "visibility.txt"), "utf8");
      for (const [directory, route] of [["works", "works"], ["writings", "thoughts"], ["vignettes", "vignettes"]]) {
        assert.ok(existsSync(path.join(output, route, "published/index.html")), `${directory}: published page exists`);
        assert.equal(existsSync(path.join(output, route, "draft/index.html")), mode !== "production", `${directory}: draft page visibility`);
        assert.match(visibility, new RegExp(`${directory}-published`));
        if (mode === "production") {
          assert.doesNotMatch(visibility, new RegExp(`${directory}-draft`));
          const publishedPage = readFileSync(path.join(output, route, "published/index.html"), "utf8");
          assert.doesNotMatch(publishedPage, new RegExp(`/${route}/draft/`), "navigation must not link to drafts");
        } else {
          assert.match(visibility, new RegExp(`${directory}-draft`));
        }
      }
    } finally {
      rmSync(fixture, { recursive: true, force: true });
    }
  });
}
