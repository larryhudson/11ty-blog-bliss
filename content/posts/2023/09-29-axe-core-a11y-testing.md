---
title: Running accessibility tests after your Eleventy build completes
description:
date: 2023-09-29
tags:
  - programming
  - accessibility
disclaimer:
  text: This is a stub of a blog post.
---

- There was some discussion in the Shop Talk Show Discord about Polypane
  introducing a new feature that runs accessibility tests across your whole
  website.
- Melanie Sumner brought up the question "why doesn't everyone integrate
  axe-core into their CI/CD pipeline?"
- I did a bit of googling and found `netlify-plugin-a11y`: a Netlify plugin that
  runs after your build is complete, that runs `pa11y` (a wrapper around
  axe-core) to check for accessibility issues on your site.
- That got me thinking about creating an Eleventy plugin that would run after
  the Eleventy build is complete. As I've also been using Astro a lot lately, I'm
  also looking into whether I could create an Astro plugin.
- pa11y hasn't been updated in about a year, while axe-core has a new minor
  release every 3-5 months. So if possible, it might be better to use axe-core
  directly. axe-core has a CLI package which might be good enough, although it
  might introduce extra complexity in installing a browser driver etc.

## Spinning up a local web server after the build completes

- After the Eleventy build completes, you need to start up a local web server to
  serve the built website, so that the CLI can access it. In the past, for
  example in my Eleventy plugin for generating PDFs with Prince, I have used the
  node-static library for this. However, node-static hasn't been updated in a few
  years and I get security vulnerability warnings when I install it.
- Now that Eleventy has its own dev server built in, I think I can use that for
  quickly spinning up a web server. That way, it's one less dependency.

## Back to an old idea - `puppeteer-after`

- Looking into setting up a plugin for doing accessibility tests after the build
  has complete has reminded me of an idea I was working on earlier this year
  called 'eleventy-plugin-puppeteer-after'
- The idea was to allow you to do stuff with Puppeteer on your site after the
  build completes. I was originally using this for generating open graph images -
  inside the Eleventy build, it would create temporary HTML webpages with the
  headings and excerpts at the correct size for social media images, then
  Puppeteer would take a screenshot of each of them and delete the temporary
  webpages.
- [This plugin code is currently hidden in my old blog repo here](https://github.com/larryhudson/11ty-blog/blob/blog-refresh/plugins/puppeteer-after.js) but I might
  revisit it and see what else
- There's quite a few possibilities of what you can do with Puppeteer - take
  screenshots of each page for visual regression testing, generate PDFs of each
  page ([puppeteer can now generate tagged PDFs](https://blog.chromium.org/2020/07/using-chrome-to-generate-more.html) by the way!)
- I can see there is a [specific axe npm library for working with Puppeteer](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/puppeteer/README.md), so
  these ideas might play well together.
