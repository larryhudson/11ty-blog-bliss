---
title: HTML builder web app with Astro and Eleventy's programmatic API
description: description
customPermalink: /projects/easy-read-html-builder/
date: 2022-01-01
stack: Eleventy, Astro, Azure TTS
published: false
---

Summary:
- Summary goes here

## Making a 'HTML builder' web app with Astro and Eleventy's programmatic API
- Using Eleventy to generate a static site is great, but we wanted to make it
possible for other team members to generate HTML versions. We can't expect all
team members to set up a Node.js development environment, in order to run the
`npm run build` command to
- Eleventy has a programmatic API, which means you can run builds from within
other web applications.
- We created an Astro web app, connected to a background task queue powered by
Redis and Bullmq. In one of the background tasks, we set up the functionality to
execute an Eleventy build using a supplied source .docx file and a supplied
template.
- Inside the web app, we made it possible to create client-specific themes,
allowing the user to choose fonts and brand colours.
- Using the Netlify API, we made it possible to create a new site and deploy by
  clicking one button, after 
- This web app reduced bottlenecks as it allowed other team members to get
involved creating HTML versions of documents, not just relying on the team
members who were comfortable with the command line. 
- It also lowered the barrier for other team members to learn about HTML. We
added interactive checklists that help team members create HTML and review the
files before they get sent to the client. This helped team members gain an
understanding of how HTML, CSS and JavaScript work together.
