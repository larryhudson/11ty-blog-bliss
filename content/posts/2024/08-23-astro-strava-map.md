---
title: Putting my Strava activities on a single map
description: A web application that displays all your Strava activities on a single, interactive map using Astro, React, and Mapbox GL.
customPermalink: /astro-strava-map/
openGraphImage: /images/astro-strava-map.png
date: 2024-08-23
tags:
  - programming
  - astro
  - react
  - strava
  - mapbox
  - paris
---

I'm excited to share a small project I've been working on: a web app that takes your Strava workout activiites and puts them on a single map using Astro, the Strava API and the Mapbox SDK.

After moving to Paris in early May this year, I have been walking a lot, as a way to stay healthy and to explore Paris and learn about its geography. I've been walking around the 18th, 9th, 10th and 11th arrondissements in particular.

I thought it would be interesting to make a small web app that takes my Strava activities and renders them on a single map, as a way to visualise the areas that I have been exploring, and encourage myself to check out more.

Here's a screenshot of my activities on a map:

![Screenshot of my Strava Activities Map showing my walks around Paris](/images/astro-strava-map-screenshot.jpg)

## Decoding polyline strings

When you retrieve your list of activities from the Strava API, it returns the map information as a long encoded string:
```json
{
"map" : {
    "id" : "a1410355832",
    "polyline" : "ki{eFvqfiVqAWQIGEEKAYJgBVqDJ{BHa@jAkNJw@Pw@V{APs@^aABQAOEQGKoJ_FuJkFqAo@{A}@sH{D...",
    "resource_state" : 3,
    "summary_polyline" : "ki{eFvqfiVsBmA`Feh@qg@iX`B}JeCcCqGjIq~@kf@cM{KeHeX`@_GdGkSeBiXtB}YuEkPwFyDeAzAe@..."
  },
}
```

These encoded strings follow the [Encoded Polyline Algorithm Format](https://developers.google.com/maps/documentation/utilities/polylinealgorithm). I used the [@mapbox/polyline](https://www.npmjs.com/package/@mapbox/polyline) npm library to turn these strings into coordinates that can be rendered on a map.

## Aider's AI pair programming

I've been using [Aider](https://aider.chat/) a lot in the last couple of weeks. It's an open-source AI coding assistant that lives in the terminal. I've been using it with Anthropic's Claude 3.5 Sonnet model and I've been really impressed with the results. It's been a big productivity boost to help me get stuff done.

## Check out the GitHub repo

If you're curious about how this project works and want to give it a try, check out the GitHub repository for more details and the source code.

GitHub: [https://github.com/larryhudson/astro-strava-map](https://github.com/larryhudson/astro-strava-map)
