---
title: Hooking up yt-dlp to a podcast feed
customPermalink: /yt-dlp-podcast-feed/
description:
date: 2023-09-26
tags:
  - programming
  - podcasts
  - projects
disclaimer:
  text: This is a stub of a blog post.
---

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) is a command line utility for downloading videos from many
  different websites, including YouTube, Soundcloud, etc. It's a really powerful
  tool, that can also do things like extract audio and scrape metadata from the
  webpage.
- I've been working on a separate project called `astro-sqlite-tts-feed`, which
  is a web app that allows me to submit web articles I want to read, and it
  generates an audio version of the article using the Azure text to speech API,
  and generates a podcast feed that I can use with the Pocket Casts app. You can
  read more about that in my other post: [Making a web app that generates a podcast of interesting web articles](/text-to-speech-podcast-feed/).
- On top of the text to speech functionality above, I've added the ability to
  submit URLs and download them with `yt-dlp`. This means I can add any YouTube,
  Soundcloud or any other websites that yt-dlp supports, and it will download,
  extract audio and add it into the podcast feed.
- I came up with this idea originally because I'm getting into listening to DJ
  mixes, which are long Soundcloud tracks (1-2 hours each) but Soundcloud doesn't
  keep track of where you get up to if you stop listening to a track. There are
  also a bunch of DJ mixes available on YouTube that I wanted to listen to in an
  audio player.
- I really like Pocket Casts' queue functionality. Once you have items in your
  queue, clicking play on a new podcast will not clear the queue. It just adds the
  new item to the front of the queue. That way, you can continue working through
  the queue once you're done with the current one.

## Getting away from the addictive scrolling that social media sites encourage

- Another unexpected benefit of this approach has been moving content away from
  YouTube's app, which encourages addictive scrolling, especially since it has
  been promoting Shorts more and more.
- In the last few months I've been using Shorts more and more, and I don't even
  like it that much!
- So to have the power to take interesting content and put it in a feed that I
  can listen to without being sucked into that addictive, passive scrolling, is a
  good feeling!

## How to hook up yt-dlp to a podcast feed

- You can start by cloning my [astro-sqlite-tts-feed repository on GitHub](https://github.com/larryhudson/astro-sqlite-tts-feed). At
  the moment this is coupled with my TTS feed app but I may separate it out in the
  future.
- I'd recommend deploying this on an Ubuntu VPS server where you can install the
  `yt-dlp` command line utility. I'm writing about my process in this post: [Deploying Node apps on an Ubuntu VPS server](/deploying-node-ubuntu-vps/).
