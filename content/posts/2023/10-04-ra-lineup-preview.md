---
title: Making a web app for previewing Resident Advisor event lineups with Astro and HTMX
customPermalink: '/ra-lineup-preview/'
description:
date: 2023-10-04
tags:
  - programming
  - music
  - htmx
---

As I've been exploring the world of electronic music through DJ mixes, I've been using Resident Advisor
as a source of inspiration. If I find a DJ I like (for example, [Folamour](https://ra.co/dj/folamour)), I look them up on [Resident
Advisor](https://ra.co/), and look at their upcoming and past events. If an event looks
interesting (for example, this [Vortex closing party gig](https://ra.co/events/1771280)), I'll browse through the artist lineup, and look up each artist on Soundcloud, [searching for tracks longer than 30 mins](https://soundcloud.com/search/sounds?q=Dan%20Shake&filter.duration=epic), to get an idea of what
they sound like. If I like the sound of the mix, I'll save the mix to my [yt-dlp
podcast feed](/yt-dlp-podcast-feed/) and check it out later.

As an aside, if you're not into electronic music, you can do something similar
with [Songkick](https://www.songkick.com/) - you can look up an artist, look at their list of past events and
see which artists they've played gigs with. This can be an interesting way of
exploring a scene if you're not familiar with a band or artist. [A few months ago
I made a web app combining Songkick, Bandcamp and Discogs data to help research
music](https://github.com/larryhudson/music-researcher/).

I've started experimenting with a little web app to make the Resident Advisor +
Soundcloud exploration process a bit
faster. It's a simple web app that takes a Resident Advisor event URL, and then
scrapes the artist list and allows me to search Soundcloud for the artist name
for tracks with a duration longer than 30 mins. For each of the search results,
I include a button that loads the Soundcloud embed iframe onto the page, so I
can click through the mix and preview it. [You can have a look at the repository
on GitHub](https://github.com/larryhudson/ra-lineup-preview).

## Getting data from Resident Advisor and Soundcloud

To get this working, I started with a basic [Astro](https://astro.build) starter
and wrote a couple of scraping functions for Resident Advisor and Soundcloud:

- I worked out that on each Resident Advisor event page, there is a `<script
type="application/ld+json">` script that includes data about the event in a
  machine-friendly format. This made it easy to get a list of artists under
  'performer'.
- Looking in the network tab of my browser dev tools, it looks like Resident
  Advisor is powered by a GraphQL API. It looks fairly straightforward to get
  information like related artists, related venues etc. I don't need that for this
  web app but might be interesting to explore separately.
- For the Soundcloud search function, I looked around on `npm` but couldn't find
  anything that has been updated recently, because Soundcloud shut down their
  public API. However, after playing around in the browser dev tools, I worked out
  how to execute searches against the API. In Firefox, you can right click on a
  network request and click 'use as fetch in console'. This gives you a `fetch`
  command with all the headers already set, ready to copy and paste into the
  NodeJS code. This is really handy.
- With each Soundcloud search request, a 'user ID' and a 'client ID' is
  included. So I switched over to an incognito window, got those values from the
  network tab and copied and pasted them into the `.env` file. Will see how this
  goes, not sure if it will get cut off.

For the Soundcloud embeds, I clicked on the 'share' -> 'embed' button and then
copied the `<iframe>` code, then found that I could substitute a track ID and
get the `<iframe>` code for any track. This is good enough for my purposes!

## Astro and HTMX

For the interface, I used [HTMX](https://htmx.org). For most of my little web
apps, I try to keep it super simple with HTML forms in a 'multi-page app' style.
But HTMX feels like a good fit for this project because the interface is a bit more interactive. As you look up multiple artists and preview multiple Soundcloud mixes, the user stay on the same page rather than opening new pages and needing to click 'back' over and over again.

Overall, I am on board with the HTMX philosophy of adding interactivity to HTML.
I like how it fits into the 'older' way of doing server-rendered web
development. However, I think adding client-side interactivity to HTML is an
inherently complicated process that requires quite a bit of thought. What is a
page, and what is a fragment that gets loaded onto the page? Which actions are
worth doing a full page navigation, and which actions can be done while the user
looks at this page? I get tripped up by those sorts of questions. Most of the
time, I think it's simpler to just do a full page navigation if it doesn't harm
the user experience too much.

Astro and HTMX are an interesting combination. Astro is a framework for building
server-rendered, HTML-first webpages using JavaScript as the server-side
language. It seems like some people in the HTMX crowd use HTMX because they
don't want to use JavaScript at all, and would rather use another server-side
language like Go, Rust or Python. But NodeJS is what I'm comfortable with, and I
think it makes a pretty good match. As of October 2023, there is a bit of extra work to make them play
nice together, because by default when Astro renders a webpage, it includes the
`<!DOCTYPE HTML>` and `<head>` tags, whereas HTMX just wants the HTML fragment.
But it looks like [the Astro team is working on this in an RFC](https://github.com/withastro/roadmap/pull/721).

I ran into one issue trying to include HTMX in my Astro HTML template. HTMX is
available on npm (`npm install htmx.org`) and after you install the package, the
production JS file is available at `node_modules/htmx.org/dist/htmx.min.js`. So
all I needed to do was include `<script src="/path/to/htmx.min.js"></script>` in
my HTML template. But this is a bit trickier to do, because Astro and Vite
processes and bundles all script tags by default. After a bit of trial and
error, I found a note in the Vite docs about [explicit URL imports](https://vitejs.dev/guide/assets.html) which solved my issue. Basically, the way to get the URL of a JavaScript file in node_modules in a `.astro` component is to add `?url` to the end of the import path:

```html
---
import HtmxPath from "htmx.org/dist/htmx.min.js?url"
---

<script src="{HtmxPath}"></script>
```
