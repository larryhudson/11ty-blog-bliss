---
title: Active music explorer with Astro + Astro DB
description: Sharing a project that helps you do X with Y for Z.
customPermalink: /projects/astro-db-music-explorer/
date: 2024-04-01
githubRepo: https://github.com/larryhudson/astro-db-music-explorer
stack: Astro, Astro DB, Spotify
---

Summary:
- Web app to encourage users to engage with music more actively and find cool
new sources.
- It allows you to save articles that you want to check out and link them to Spotify music items.
- It also allows you to save sources (blogs and websites) that you want to check out periodically. 
- I built this using Astro and Astro DB.

## Why I did this project, why it's exciting
- I have always been a big music fan, but in the last couple of years I've been
  in a lull where I haven't been exploring new music much. I've been listening
to the same music over and over again.
- When I was a teenager, I was always seeking out new music and new sources of
music. Even though music is more freely available now thanks to platforms like
Spotify, it can be harder to find sources of music, and it can be harder to
engage with music actively. It's easy to just listen to Spotify's radio
recommendations and keep listening to the same thing over and over again. 
- Spotify's recommendation algorithm is set up to recommend similar music to
what you like, rather than challenging you to listen to music outside your
comfort zone.
- I want to build an app that encourages more active music exploration. Rather
than just recommending more of what you already like, I want something that will
encourage me to listen wider, and to 'open my ear' to new music. I believe that
an app could help people form habits around their listening and exploration, and 
- I also think there is potential for some interesting social features - eg.
sharing music with friends, exploring new music with friends, competitions and
challenges to explore more music.
- I have started building this app using Astro and Astro DB.
- Rather than the app recommending music that you might like, it is more of a
tool that you can use to save music that you want to check out. In this way, it
is encouraging you to do the exploration, rather than bringing the music to you.

## Running into limitations with Astro DB
- With this music discovery app, I am keen to build in some social features -
eg. friend requests, collaborative lists, and shared challenges. As I started to
build some of these out, I ran into some tricky issues.
- As Astro DB is quite a new library, and it is a fairly simple implementation
of SQLite, you need to implement features like authentication and authorisation
yourself.
- I was able to implement authentication using Lucia, but after looking at more
  mature frameworks like Laravel, it feels like with Astro DB, you need to write
  a lot of boilerplate to hook things up properly.
- If I continue building this app, I will probably switch to something like
Laravel that handles more of the authentication and authorisation for me. That
way, I can focus on the unique value of the app rather than tripping myself up
with boilerplate.

## Future ideas
