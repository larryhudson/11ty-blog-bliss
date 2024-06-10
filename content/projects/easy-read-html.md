---
title: Easy Read HTML product for Information Access Group
description: description
openGraphImage: /images/image.png
customPermalink: /projects/easy-read-html/
date: 2021-01-01
stack: Eleventy, Astro, Azure TTS
published: false
---

Summary:
- Summary goes here
- Unsure about the date for this

## Why I did this, why it's exciting
- At my previous workplace the [Information Access Group](https://www.informationaccessgroup.com/) (IAG), they specialise in
making Easy Read documents - rewriting complex information using simple language
and using vector icons and stock images to illustrate the meaning.
- Easy Read documents are traditionally published as PDF documents, but PDF is
not a good format for document accessibility and usability:
  - PDF content does not reflow to fit the user's screen size, so reading a PDF
    is a bad experience on mobile devices.
  - in order to make a PDF document accessible, manual remediation work needs to
    be done, and even then, there are significant inconsistencies between
  different PDF viewer applications. [I wrote about these issues in an article on
  the IAG website
  here](https://www.informationaccessgroup.com/news/pdf-viewers-screen-readers.html).
- After learning about web accessibility and how people use assistive
technology, I was keen to work out a way to publish our Easy Read documents as
HTML webpages.

## Converting Word documents to HTML
- Microsoft Word is a surprisingly effective format when it comes to generating
  HTML. One reason for this is that the Microsoft Word `.docx` format is based
on XML, so it's relatively straightforward for tools to convert `.docx` to
`.html`.
- I found the npm library [mammoth](https://www.npmjs.com/package/mammoth) which makes it easy to convert .docx files to clean HTML.
- I used the static site generator Eleventy to prepare a static HTML webpage
- I used CSS variables to make it possible to apply the client's specific brand
  styles, including colours and fonts, to the HTML version.
- I created an Eleventy plugin [eleventy-plugin-docx](https://github.com/larryhudson/eleventy-plugin-docx) that makes it straightforward to use `.docx`
files as content in an Eleventy site.

## Adding the 'listen' button with Azure TTS
- Why an audio version is important - empowering people with disability to
engage with the content more independently.
- This is a good example of what you can do with webpages, versus traditional
document formats like PDF and Word. There's no limit to what you
- How we did it - added another plugin to Eleventy that takes the rendered HTML
  page content, converts to text then gets the audio
- Tricky thing - adding 

## Hosting static webpages on Netlify
- When we are creating HTML, we can either give the client a packaged HTML
folder for them to publish themselves, or we can host the webpage for them.
- If we are hosting the webpage for them, we use Netlify.
- Because Netlify makes it so easy to publish a static website, there is not
really a difference in the amount of work we need to do, compared to supplying a
static HTML folder

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
