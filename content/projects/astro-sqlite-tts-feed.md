---
title: Web article to audio podcast generator
description: Sharing a project that helps you do X with Y for Z.
customPermalink: /projects/astro-sqlite-tts-feed/
date: 2023-09-01
githubRepo: https://github.com/larryhudson/astro-sqlite-tts-feed
stack: Astro, SQLite, Bullmq, Azure TTS
---

Summary:
- Web app that would allow users to save online articles they want to read.
- It generates an audio version of the article using the Azure text to speech API, and then give them a podcast feed so they could listen to the articles using their podcast player app.
- This uses the Astro framework, SQLite for the database and Bullmq for the background task queue.

## Why I made this project
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

## How I built 
- I started making a basic web app with Astro, connected with HTML forms.
- Using the `better-sqlite3` npm library, I added a SQLite database. The
application code uses simple SQL to interact with the database, rather than
using an ORM like Prisma or Drizzle.
- For the background task queue, I used

## What I learned
- I learned a lot about SQL and SQLite - how to get a basic database up and running, and
   how to interact with it using the `better-sqlite3` library. Before this
project, I was hesitant to build a database-backed web app without using an ORM. But thanks to online resources and tools like ChatGPT and Copilot, writing simple SQL queries feels pretty straightforward to me. 
- I learned more about handling background tasks with BullMQ and Redis. By
building a simple task queue for handling the audio generation, I gained a
better understanding of how Redis works and its use cases. 

## Future ideas
- I would like to try rebuilding this web app using a different software stack.
  While Astro + SQLite is a good combination for simple web apps, I would like
to try building it using a more mature framework like Laravel. This would make
it easier to turn this into something real, and maybe a product that I could
charge a subscription for.
