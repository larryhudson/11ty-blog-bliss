---
title: Easy Read HTML with Eleventy and Azure AI Speech
description: description
customPermalink: /projects/easy-read-html/
date: 2022-07-01
stack: Eleventy, Azure AI Speech
---

Summary:
- Traditionally Easy Read documents are published as PDF files online, but this
  isn't ideal for accessibility or usability 
- Using the static site generator Eleventy, I set up a process for turning Microsoft Word working files into accessible HTML
versions that work better on mobile, are faster to produce and work better for
assistive technology users.
- Using the Azure AI Speech API, I added the ability to generate an audio
version that would highlight the text as it is read out.

## Background context

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

## Turning Word documents into HTML with Eleventy

- I investigated ways to turn Microsoft Word documents into HTML webpages. Because the ‘docx’ format is based on XML, it is quite a good format for turning into HTML while maintaining the semantic information in the source file. Eg. if you use paragraph styles consistently, these can come through to the HTML as semantic markup.
- I started using a JavaScript static site generator called [Eleventy](https://www.11ty.dev/) to prepare static HTML webpages from the Word working files. Eleventy would generate a static folder of HTML files, making it easy to supply to our clients as a packaged zip file, or host using a static web host like [Netlify](https://www.netlify.com).
- I created an Eleventy plugin called eleventy-plugin-docx, using the ‘mammoth’ npm library under the hood, to make it possible to use docx files as input in an Eleventy project.
- Using CSS variables, I set up a template that would make it easy to apply our clients’ brand styles to the HTML, including brand fonts and colours.
    
## Generating audio with Azure AI Speech API
    
I became interested in using a text to speech API to prepare an audio version of the content. While people who use assistive technology can listen to the document using a screen reader, the main target audience for Easy Read content is people with low literacy levels and people with intellectual disability, who may not use assistive technology. By integrating an audio version with an easy-to-use interface, there was potential to make it easier for the target audience to engage with Easy Read documents independently.

I used Microsoft’s Azure AI Speech API to generate an audio version of the HTML content. To do this, I needed to overcome a few technical challenges:
- using caching to only re-generate the audio if the content changed (because the Speech API is slow and expensive).
- breaking up the content into multiple chunks, because the Speech API has a 10-minute limit per request
- writing clientside JavaScript that highlights the text as it reads out. The Speech API returns word-level timestamps, but I needed to figure out how to manipulate the HTML content to break up the words into `<span>` elements that could be highlighted as the text is read out.

I’m really proud of the Easy Read HTML product that I was able to help build at the Information Access Group. I think it’s a great example of what you can do when you publish information in a ‘web-first’ way, rather than using traditional document formats.

<!-- TODO: insert a link to Easy Read HTML builder case study when that's done -->
