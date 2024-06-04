---
title: Spotify playlist tracker with Ruby on Rails
description: Sharing a project that helps you do X with Y for Z.
customPermalink: /projects/spotify-playlist-tracker/
date: 2020-05-01
stack: Ruby on Rails
---

- Spotify playlist tracker using Ruby on Rails and the Spotify API.
- It allows you to track a list of artists, and a list of playlists.
- Using a background job, it scans the playlists to see if your tracked artists showed up, saving the playlist positions.
- It would generate thumbnail images that could be easily copied and pasted into an email report.

## Background context
- My partner Claire works in the music industry, and in her previous role, she
needed to make a weekly report of where her record label's artists showed up in
editorial playlists on Spotify and Apple Music. She needed to manually scroll
through editorial playlists and look for her artists, and then note down the
playlist positions and send an email.
- While there were data aggregation services that generated these reports
automatically, they only updated every few days, and Claire needed up-to-date
data. She needed to generate these reports on a Friday, after the 'New
Music Friday' playlists had been updated for the week.
- Because I had some experience with the Spotify API, I thought I could make a
web app that would automate the process. I had been playing around with Ruby on
Rails, so I decided to use it for this project.

## What I did
- I made a simple web app that allowed the user to track certain artists and
certain playlists. It would run a background task that would use the Spotify API
to index the tracks in the playlists, and then generate a report by looking at
the list of tracks for the tracked artists.
- I also added a feature that would automatically generate thumbnail images with
  the playlist position - eg. the album artwork with a '#1' in the bottom
corner. These images were easy to copy and paste into the email report.
- Later, I added support for the Apple Music API. This was a bit more of a
challenge, as I was using a third-party library integration for the Spotify API,
but there wasn't one available for Apple Music, so I needed to build the
integration myself, matching the API of the Spotify integration.
- I learned a lot about how Ruby on Rails works in the process. I also learned
how to deploy Ruby on Rails apps on a Virtual Private Server (VPS) using
capistrano.
- It was really rewarding to make something that saved my partner time and made
  her life easier. My favourite thing about programming is making something with
  a real impact.
