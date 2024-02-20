---
title: A web app for taking screenshots of maps using Protomaps and MapLibre
description: A little project to help me memorise landmarks in Paris
openGraphImage: /images/protomaps-maplibre-screenshot.png
customPermalink: /protomaps-maplibre-screenshot/
date: 2024-02-20
tags:
  - geography
  - programming
---

At the start of May, my partner and I will be moving from Australia to live in Paris for a year. We're really excited! I've been trying to learn a bit more French before our move, so I've been using the spaced repetition app [Anki](https://apps.ankiweb.net/) to learn vocabulary.

I'm also keen to learn a bit of European geography, to help with navigation. I've been using [this shared Anki deck](https://ankiweb.net/shared/info/1927594591) to help me memorise the locations of European countries on a map.

For example, where on the map is Croatia?

![Example of empty Anki flashcard](/images/protomaps-maplibre-screenshot/anki_geography_emptymap.png)

<details>
  <summary>Show the answer</summary>
  <div>

![Example of Anki flashcard with Croatia highlighted](/images/protomaps-maplibre-screenshot/anki_geography_croatia.png)

</div>
</details>

Last month, I came across the open source mapping libraries [Protomaps](https://protomaps.com) and [MapLibre](https://maplibre.org). These libraries make it possible to integrate maps into a web app using [OpenStreetMap's dataset](https://www.openstreetmap.org/). I thought it would be interesting to try making a little web app to generate screenshots of maps with locations highlighted. This could help me learn landmarks in Paris, and make me a bit more confident when travelling.

After a bit of experimentation with the Protomaps and MapLibre libraries, and a lot of help from Bishal Sapkota's [geojson.app project](https://github.com/bishalspkt/geojson-app), I've got a little demo up and running! In the blog post below, I'll explain how I got it working, and how you can try it out for yourself.

## Experimenting with Mapbox

To get a feel for how mapping libraries work in a web app, I started with the [examples on the Mapbox website](https://docs.mapbox.com/help/getting-started/web-apps/). Mapbox is a popular set of APIs and services, and has some good documentation for getting started. 

Because my app is a hobby project with only a couple of users, my usage would fit in [Mapbox's free tier](https://www.mapbox.com/pricing). Mapbox only becomes expensive if your app has more than a few thousand users.

But I wanted to learn more about the open-source mapping libraries [Protomaps](https://protomaps.com) and [MapLibre](https://maplibre.org/maplibre-gl-js/docs/), just for my own knowledge, and to work out what is possible with OpenStreetMap's dataset.

## Poking around the geojson.app project

[Bishal Sapkota's geojson.app project](https://github.com/bishalspkt/geojson-app) is a great example of a React app using Protomaps and MapLibre:
- It uses MapLibre for the interactive map on the frontend. MapLibre renders the map into a `<canvas>` element and visualises the GeoJSON data using markers, lines and polygons. 
- It uses Protomaps to self-host the vector map tiles. As you navigate around the map, it loads the tile data from tiles.geojson.app.

You can learn more about the project in [Bishal's recent talk 'Beyond Mainstream Maps' at MelbJS](https://www.youtube.com/watch?v=btaqCJSIG-E).

I learned a lot by poking around the source code of Bishal's project. By learning how to get a map working, and how to draw markers and polygons, I was able to get a head start on my own project. 

## Self-hosting the vector map tiles

In order to get my own app up and running, I needed to self-host my own vector map tiles. Here's what the process involved:
- using the [pmtiles CLI](https://docs.protomaps.com/pmtiles/cli#extract) to extract the vector map data for the Paris region, from the global OpenStreetMap dataset. The pmtiles file for the whole world is about 110GB, but the Paris region is only 10MB.
- uploading my pmtiles file to a Cloudflare R2 bucket using the rclone CLI.
- creating a Cloudflare worker to serve the HTTP requests on a subdomain. When the requests come in to pmtiles.larryhudson.net, the Cloudflare worker renders the data from the pmtiles file in the bucket.

I followed [these instructions on the Protomaps website](https://docs.protomaps.com/deploy/cloudflare).

I had a little bit of difficulty getting this working. One step that I missed initially, was setting the 'ALLOWED_ORIGINS' environment variable, so that requests from my `localhost:4321` development server would be allowed. Overall, this process took me around 30 mins to set up, so it wasn't too bad. 

## OpenStreetMap's search API 

OpenStreetMap has a [search API called Nominatim](https://nominatim.openstreetmap.org/) that allows you to search for locations and get their coordinates. It makes it fairly easy to lookup data for a specific place or region, and get GeoJSON data that can be visualised on a map. For example, [here's a search URL to look up the polygon data for the 11th arrondissement of Paris](https://nominatim.openstreetmap.org/search?q=18th%20arrondissement%20paris&format=geojson&polygon_geojson=1). 

OpenStreetMap allows developers to use the Nominatim API for free, but their usage policy only allows one request per second. While this is ok for a hobby project, if you need to make more requests, they have [alternatives on their wiki](https://wiki.openstreetmap.org/wiki/Nominatim#Alternatives_/_Third-party_providers).

OpenStreetMap is a real gift for developers who want to do interesting things with maps - I'm really interested in experimenting more.

It was fairly straightforward integrating a search box into my web app. Because the Nominatim API returns GeoJSON data, I was able to visualise that GeoJSON data using the [functionality within Bishal's example](https://github.com/bishalspkt/geojson-app/blob/27f5960212ec66ee1e5669050885f822046cf79c/src/lib/map-utils.tsx#L68C1-L84C2).

## Generating images from 'canvas' elements

The last part of the puzzle was taking screenshots of maps, so that I can use them in Anki flashcards.

I've recently been playing with the [html2canvas library](https://html2canvas.hertzen.com/) after finding out about it in [Andrew Walpole's great example for generating social media images for blog posts here](https://github.com/walpolea/andrewwalpole.com/blob/master/src/pages/preview/[slug].astro).

It turns out, if you can render a `<canvas>` element, it's fairly easy to turn that into a screenshot using JavaScript. You just need to get the `<canvas>` element from the DOM and then do `canvas.toDataURL('image/png')`.

Because the MapLibre library renders the map as a `<canvas>` element, I was almost there. I just needed to enable the `preserveDrawingBuffer` option so that the canvas would be able to be rendered to an image. This option is disabled by default for performance reasons.

One 'gotcha' that I ran into was with map markers - if I added markers using the MapLibre library, they were not rendered in the canvas, because they are added as separate DOM elements. To get around this, I added a 'layer' for each marker to the map. You can [see that in the source code here](https://github.com/larryhudson/astro-protomaps-maplibre-screenshot/blob/6627c158774bf0bf4d5c080511136767d1550f50/src/utils/map-utils.ts#L117C13-L129C16). 

## An example flashcard

Where on the map is the Arc de Triomphe?

![Map of Paris with no markers](/images/protomaps-maplibre-screenshot/paris_empty.png)

<details>
  <summary>Show the answer</summary>
  <div>

![Map of Paris with a marker on the Arc de Triomphe](/images/protomaps-maplibre-screenshot/arc_compressed.png)

</div>
</details>

## Video walkthrough and GitHub repo

You can view a video walkthrough of the web app here:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/FGsWjBhFo3c?si=lI5A3UE_wWVhbEtv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

You can also [explore the source code for the project on GitHub](https://github.com/larryhudson/astro-protomaps-maplibre-screenshot/).

## Let me know what you think

If this is interesting to you, I'd love to hear what you think. Have you made something similar? Do you have any other ideas for interesting use cases for mapping in a web app?

Feel free to reach out on [LinkedIn](https://www.linkedin.com/in/larryhudson4/) or [Twitter](https://twitter.com/larryhudsondev).