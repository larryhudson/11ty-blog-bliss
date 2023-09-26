---
title: Making a web app that generates a podcast of interesting web articles
customPermalink: /text-to-speech-podcast-feed/
description:
date: 2023-09-26
tags:
  - text to speech
  - programming
  - podcasts
  - projects
disclaimer:
  text: This is a draft.
---

- I've been working on an app idea that has been in the back of my mind for a
  few years now.
- The idea is to have a web app where you can save articles that you'd like to
  read, and it saves an audio version of those articles and gives you a podcast
  feed to listen to.
- I've been drawn to the idea because I always prefer to listen to audio
  content, rather than read. I'm a big fan of podcasts and audiobooks.
- I've tried to make this a few times. I've experimented with different
  combinations of frameworks, languages and deployment options. But I've finally
  landed on a solution that I'm happy with.
- It's an Astro web app, backed by a SQLite database and BullMQ for handling
  background tasks. I'm using the Azure TTS API for the text to speech. It's
  deployed on a DigitalOcean VPS server, using Nginx to route the requests through
  to the web app, and PM2 for handling the
- In making this app, I've learned a lot about SQLite. In the past I was
  intimidated by SQL and always used ORMs, sticking to frameworks like Django. But
  with GitHub Copilot and ChatGPT, I've been learning to write simple SQL and it's
  not too hard! The resulting web app feels a bit simpler, because there's less
  abstraction.
- I've also learned quite a bit about handling background tasks with BullMQ and
  Redis. Again, this was something I was previously intimidated by. A few years
  ago, I made a Rails app that had background tasks using Active Job and I
  thought it was like magic. I thought it was weird there wasn't an equivalent
  library for NodeJS that made it feel that easy. But after learning more about
  how Redis works in the backend, I understand it a bit better now, and I'm more
  confident with it.
- One more thing I'm getting practice with is deploying NodeJS apps on VPS
  servers. In the past, I've experimented with different deployment optiions like
  serverless (Netlify and Vercel) and Docker containers. But I'm trying to make
  things a bit more simple. It feels good to have my own web server with less
  abstraction.
