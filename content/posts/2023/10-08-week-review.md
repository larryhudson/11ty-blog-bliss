---
title: Weeknotes - 8 October 2023
description: A round of what I've been working on and enjoying this week
customPermalink: /2023-10-08-week-notes/
date: 2023-10-08
tags:
  - weeknotes
---

This is a little round up of stuff that I worked on and enjoyed this week. I’m doing this review as a part of [my habit to organise my ideas and block out my time using Notion](https://larryhudson.io/organising-ideas-in-notion/).

## Programming

- [ra-lineup-preview](https://github.com/larryhudson/ra-lineup-preview) - a web app that makes it easier to explore [Resident Advisor](https://ra.co/) event lineups
  - Made a hacky prototype of a web app that lets you input a Resident Advisor event URL and it allows you to quickly search Soundcloud for mixes by the artists on the lineup. For each search result, you can preview the mix by clicking through the embed.
  - I wanted to do a bit more with this but the code I wrote to scrape the Resident Advisor code page didn’t work when I deployed the web app to Vercel unfortunately
  - But I have about fifty mixes in my feed to work through now, so it did the trick! I might revisit this sometime in the future.
  - I wrote a blog post about this here: [Making a web app for previewing Resident Advisor event lineups with Astro and HTMX](https://larryhudson.io/ra-lineup-preview/)
- [astro-sqlite-tts-feed](https://github.com/larryhudson/astro-sqlite-tts-feed) - my web app that allows me to save web articles that I want to read, makes an audio version and gives me a podcast feed so I can listen to them in my podcast player app
  - The web app now saves hyperlinks mentioned inside article content as ‘related links’ so they can be easily added for listening. See [pull request on GitHub](https://github.com/larryhudson/astro-sqlite-tts-feed/pull/20)
  - I’ve still got a few more ideas that I want to work on in this project. The challenge is completing the ideas before adding more to the pile!
  - At the moment, the web app does both text-to-speech for web articles and downloading media from YouTube and Soundcloud through yt-dlp. To make these projects easier to maintain and more focused, I think I will need to split them up into two different apps.
- Experimenting with HTMX and progress bars for background tasks
  - I’m trying to wrap my head around the HTMX way of thinking when it comes to interactivity on webpages. While it’s simple on the surface, I’m having a bit of trouble with it, but I’m trying to work through [the list of examples](https://htmx.org/examples/) and build up my mental model incrementally.
  - I wrote a blog post here: [Giving HTML elements the power to update themselves with HTMX and Astro](https://larryhudson.io/htmx-elements-that-update-themselves/)
- Started working on a document database web app using Astro, SQLite, Bullmq and HTMX
  - To solidify my knowledge around creating web apps with Astro, SQLite, Bullmq and HTMX, I’ve started making a web app that will be a document database, so you can add Word docs, PDFs and webpages and it will index them and allow to search through them.
  - I originally wanted to include [sqlite-vss](https://github.com/asg017/sqlite-vss) in this but I’m having trouble installing it on Arch Linux, so I might leave it out now and just use the [full text search extension for SQLite](https://www.sqlite.org/fts5.html).
  - You can see my progress in the GitHub repo here: [astro-sqlite-htmx-document-db](https://github.com/larryhudson/astro-sqlite-htmx-document-db)

## Writing

I wrote a couple of blog posts this week:

- [Simon Willison’s issue-driven development](https://larryhudson.io/issue-driven-development/)
- [Write up about ra-lineup-preview](https://larryhudson.io/ra-lineup-preview/)
- [Giving HTML elements the power to update themselves with HTMX and Astro](https://larryhudson.io/htmx-elements-that-update-themselves/)

I’m getting a bit more comfortable writing and sharing these ideas - looking through my list of posts, I can see the reading time is getting longer. That means I must be getting more confident! Now that I’ve got [a few blog posts under my belt](https://larryhudson.io/archive/), and a solid blog template, I feel like I’ve got a bit of momentum. Hopefully I can keep it up!

## Reading

- Tomorrow, and Tomorrow, and Tomorrow by Gabrielle Zevin - I finished this book this week. I really loved this book - I thought it was so well done. I loved reading the story about the creative relationship of the two main characters. I also thought it was really poignant and moving in parts.
- Making Australian History - after watching a couple of episodes of The Australian Wars documentary series, I’ve picked up this book again, which I started reading months ago. I’m listening to the audiobook which is narrated by the author. I’m only at the start of it but I’m enjoying it so far - it’s about historiography as much as it is about history.

## Music

- DJ mixes - I’ve been going through a list of mixes that I picked up off the [Lost Village 2023 lineup](https://ra.co/events/1648545). This festival has a very high hit rate! [This Spotify playlist](https://open.spotify.com/playlist/1YLOgdvPlLgxgkKfYLinRp) is where I discovered [Chloe Caillet](https://soundcloud.com/chloecaillet/chloe-caillet-bbc-radio-1-essential-mix), who is my favourite DJ at the moment.
  - [Rebecca Vasmant - Live from Sub Club with Derrick Carter](https://soundcloud.com/rebecca_vasmant/rebecca-vasmant-live-from-sub-club-with-derrick-carter) - interesting house
  - [Laurence Guy - Live at the Love Inn](https://soundcloud.com/laurenceguymusic/live-at-the-love-in-090616) - lots of fun, mixing disco and house
  - [Kitty Amor - Recorded Live at Hi Ibiza 2023](https://soundcloud.com/hiibizaofficial/kitty-amor-recorded-live-at-hi-ibiza-2023) - deep and intense house
  - [Suze Ijo @ X-Ray, Lowlands 2023](https://soundcloud.com/suze_ijo/suze-ll-23) - energetic house
- One of my favourite bands [Truth Club](https://truthclub.bandcamp.com) put out their second album _Running from the Chase_ on Friday, and it’s fantastic! I listened to it a few times in a row on Friday morning. My favourite song on the album so far is [Exit Cycle](https://www.youtube.com/watch?v=ou4kZmQsZiY), which features Indigo De Souza.
  - [Check it out on Bandcamp](https://truthclub.bandcamp.com/album/running-from-the-chase)
  - [See a track-by-track breakdown by the band on Consequence of Sound](https://consequence.net/2023/10/truth-club-running-from-the-chase-track-by-track/)

## Movies and TV

- [Past Lives](https://a24films.com/films/past-lives) - a really great romance film, touching on how people can hold onto their image of a person
- Better Call Saul - I have only seen up to half way through season 4 but dropped off a couple of years ago. I watched a recap of season 3 and have started working through season 4 again.
- [The Australian Wars](https://www.sbs.com.au/ondemand/tv-series/the-australian-wars) - documentary series about the wars between the British settlers and the Indigenous Australians in the early days of white settlement in Australia. Really well done, it is great to see Australian history in this format.

## What I’d like to do more next week

- Learning French - doing a bit more Duolingo and listening practice
- I need to replace the [generic template open graph image on this blog](https://larryhudson.io/images/share-1200x600.jpg) so that I can share these posts on social media!
