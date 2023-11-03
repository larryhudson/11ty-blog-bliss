---
title: Making a better Spotify DJ
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

## Making a better DJ

- I'm a huge fan of Glenn McDonald's project [Every Noise at
  Once](https://everynoise.com), which is a
  collection of Spotify's algorithmic data. Every Noise at Once tracks over 6000
  'microgenres' and has algorithmic playlists for every genre. For example, you
  can check out "The Sound of Garage Psych" and explore the linked playlists in
  the playlist description.
- Using the Spotify API, you can find out what your top genres are, and then use
  those algorithmic playlists to find interesting music that other people are
  listening to. I made a web app for doing just that called [discover-mix](https://discovermix.app/).
- I think Spotify should be using this data more with its DJ feature. So I've
  started making a web app that crudely recreates the DJ feature, but uses the
  Every Noise at Once playlists to find relevant music.
- You can follow along my progress in the public [astro-spotify-enao-dj GitHub repository](https://github.com/larryhudson/astro-spotify-enao-dj).

## Coming up with 'brackets' - pulling interesting tracks based on the user's

listening

- I've started creating what I'm calling 'brackets', which are different ways to
  pull tracks based on the user's listening.
- You can see where I'm up to in this [JavaScript file on GitHub](https://github.com/larryhudson/astro-spotify-enao-dj/blob/main/src/brackets.js)
- I'm trying to come up with interesting brackets.
- For example, "an artist you haven't listened to in a while" pulls your top artists for the long term, and
  your top artists for the short term, and picks an artist that is in your long
  term but not your short term artists.
- Another example is "an artist you recently added to liked songs" looks for a
  song recently added to liked songs, that is not in your top artists. Hopefully
  this is an aritst you'd like to explore more.

## A limitation with the Spotify API that is making things harder

- I've run into a tricky hurdle with the Spotify API. While you can get a list
  of tracks in the user's queue, and add tracks to the queue, you can't clear the
  queue using the API. That means if you were making a web app, you can't include
  a button for the user to clear their queue. The user would need to open their
  Spotify app and clear the queue manually.
- There is a forum thread on the Spotify developer community forum that is
  asking for this feature but I'm not sure if anything is happening.
- That means if I want to get something working, I need to do a lot more
  client-side JavaScript programming to get this working. I'll need to maintain my
  own player state and list of songs, and play the songs manually etc.

## Still to do

- There are a few more things I need to do before this web app is ready to use.
- I need to set up caching so that I'm not requesting the same data over and
  over again. Because the brackets rely on common data, e.g. the user's list of
  top artists, it will be a lot faster and more efficient with API requests once I
  set up caching.
- I need to set up the Spotify web player SDK to set up a player in the web app.
  I need to handle the list of songs in the queue and play them at the right
  time etc.
- Like Spotify's DJ feature, I want to generate a greeting message that
  introduces the next set of tracks to give the user a bit of context about what
  they're hearing. I'd like to use the OpenAI API to generate the text, and then
  use the Azure text to speech API to generate audio from that text. Ideally the
  voice would be better if I used the Eleven Labs API but their pricing is many
  times more expensive than Azure.
