---
title: Making a better Spotify DJ
description:
date: 2023-09-26
tags:
  - spotify
  - music
  - programming
  - projects
disclaimer:
  text: This is a stub of a blog post.
---

- Spotify has a new AI 'Spotify DJ' that I've been playing around with.
- It has a fun robot voice, similar to what Eleven Labs are doing.
- It cycles through a few different groups of tracks that it thinks you might
  like. These are things like:
  - Music similar to an artist you've been listening to lately
  - A throwback to a song you liked a long time ago (from a previous year's top
    songs playlist)
  - Songs from Spotify's editorial playlists (eg. Front Left)
- Overall I think it's a good feature - because it cycles through different
  groups of songs, you can listen to it for a while without getting sick of it.
- But I think Spotify can do better to help with music discovery.
- I'm a huge fan of Glenn McDonald's project Every Noise at Once, which is a
  collection of Spotify's algorithmic data. Every Noise at Once tracks over 6000
  'microgenres' and has algorithmic playlists for every genre.
- Using the Spotify API, you can find out what your top genres are, and then use
  those algorithmic playlists to find interesting music that other people are
  listening to. I made a web app for doing just that called [discover-mix](https://discovermix.app/).
- I think Spotify should be using this data more with its DJ feature. So I've
  started making a web app that crudely recreates the DJ feature, but uses the
  Every Noise at Once playlists to find relevant music.
- You can follow along my progress in the public [astro-spotify-enao-dj GitHub repository](https://github.com/larryhudson/astro-spotify-enao-dj).
