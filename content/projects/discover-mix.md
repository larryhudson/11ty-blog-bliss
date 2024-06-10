---
title: discover-mix - Spotify playlist maker
description: Sharing a project that helps you do X with Y for Z.
customPermalink: /projects/discover-mix/
date: 2022-12-01
githubRepo: https://github.com/larryhudson/spotify-merge-playlist
stack: Eleventy, Netlify Edge Functions, petite-vue
---

Summary:
- Web app that would generate big Spotify playlists for shuffling, using Every Noise at Once's algorithmic playlists.
- I used the Eleventy static site generator, Netlify Edge Functions and the Spotify API to make this work.

## Why I did this project, why it's exciting
- Every Noise at Once was a project created by Glen McDonald when he worked at Spotify. Unfortunately the project has shut down after he was laid off in [date].
- Every Noise at Once was an amazing project for music nerds - it was such a
good use of Spotify's vast listener data. While Spotify's regular
recommendations can be underwhelming, serving you the same music over and over
again, Every Noise at Once opened up the world of music. Browsing through their
list of genres, you really get a feeling of how much music is out there, and how it would be impossible to check it all out. In a good way!
- One part of Every Noise at Once was automatically generated algorithmic
playlists for genres - eg. The Sound of Indie Rock, the Pulse of Indie Rock, the
Edge of Indie Rock
- These playlists were a great way to find new music outside of Spotify's
regular recommendations.

## What I did
- I made a little web app that would allow you to pick genres that you would
like to check out, and then it would combine the algorithmic playlists into one
big playlist.
- Using the Spotify API, it would get your recent top artists, and then make a
list of genres related to those artists. 
- You would create a mix by choosing the genres you're interested in.
- You could choose the types of playlist you wanted to include, for example
'Sound', 'Pulse', or 'Edge'.
- When you click 'create', it would create a new playlist in your Spotify
account, and add all the tracks from the matching Every Noise at Once playlists.

## How I made it
- For this project, I used the static site generator Eleventy. This allowed me
to stay close to the HTML output of the web app.
- I used Eleventy's Edge plugin, coupled with Netlify Edge Functions, to dynamically generate the genre and artist
pages using data from the Spotify API.
- I used petite-vue for the client-side interactivity.

## What I learned
- I built this using the Eleventy static site generator coupled with Netlify
Edge Functions. Because Netlify Edge Functions are powered by Deno, it was a
little different to working with regular Node.js / npm packages.
- This was a good way to learn about edge rendering and running
edge functions.
- As the project became more complicated, the code became a little unwieldy.
Have a look at all the edge functions in the folder here.
- While I like how Eleventy allows you to stay close to the HTML, the
integration between Eleventy's 'Edge' plugin and Netlify Edge Functions is a
little clunky. I find Astro a bit more seamless to work with.
