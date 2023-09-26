---
title: Hooking up yt-dlp to a podcast feed
customPermalink: yt-dlp-podcast-feed
description:
date: 2023-09-26
tags:
  - programming
  - podcasts
  - projects
disclaimer:
  text: This is a stub of a blog post.
---

- What is yt-dlp? A command line utility for downloading videos from many
  different websites, including YouTube, Soundcloud, etc.
- Why hook it up to a podcast feed?
  - You have media that you want to consume in a podcast sort of way.
  - For example, I have been getting into listening to DJ mixes on Soundcloud.
    But Soundcloud doesn't keep track of where you're up to, if you stop listening
    to a song. So I wanted to be able to listen to a DJ mix, get half way through,
    jump to another one, and then come back to finish off the first one.
  - You want to get away from the addictive scrolling that social media sites
    encourage - eg. YouTube shorts.
- How to hook it up to a podcast feed
  - Create an Astro app with an SQLite database and a background task queue.
  - Create a background task for executing the yt-dlp command.
  - With Astro, serve the podcast feed - when someone requests the RSS feed,
    read the records from the database and get the MP3 / MP4 URLs etc.
