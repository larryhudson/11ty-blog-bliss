---
title: An app that takes articles you want to read and makes an audio podcast
description: Sharing a project that helps you do X with Y for Z.
customPermalink: /projects/astro-sqlite-tts-feed/
date: 2023-09-01
githubRepo: https://github.com/larryhudson/astro-sqlite-tts-feed
stack: Astro, SQLite, Bullmq, Azure TTS
---

Summary:
- Web app that would allow users to save online articles they want to read.
- It generates an audio version of the article using the Azure text to speech API, and then give them a podcast feed so they could listen to the articles using their podcast player app.
- This used the Astro framework, SQLite for the database and Bullmq for the background task queue.

## Why I did this project, why it's exciting
- I've never been a big reader - I struggle to maintain my attention when
reading longform text content. In university when I majored in History, I found it really difficult to get through my readings each week.
- I'm a big fan of podcasts and audiobooks - I find it much easier to pay
attention and retain information when I listen to it.
- In the last couple of years, AI text to speech services have improved in a
huge way. I'm a big fan of Microsoft's Azure Text to Speech API, OpenAI's text
to speech API and Eleven Labs.
- In my work at the Information Access Group, I was always interested in
generating alternative versions of content. For example, generating audio
versions of documents. You can find out more in my writeup about the [Easy Read
HTML product](/projects/easy-read-html/).
- Because it's relatively simple to make a podcast by generating an RSS feed, I
thought it would be interesting to make an app that generates a personalised
podcast feed of articles you want to read. That way, you can listen to articles
in your preferred podcast player.

## Learning
- In this project, I learned a lot about SQLite and Bullmq
