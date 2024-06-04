---
title: RA Mix of the Day Explorer with Weaviate
description: Sharing a project that helps you do X with Y for Z.
customPermalink: /projects/weaviate-ra-mix-of-the-day-explorer/
date: 2024-01-01
githubRepo: https://github.com/larryhudson/astro-weaviate-ra-motd
stack: Astro, Weaviate, HTMX
---

Summary: 
- Web app that allows users to search through Resident Advisor's Mix of the Day blog posts.
- I scraped the blog posts using their GraphQL API, then fed them into a Weaviate vector database.
- I set up the web app using Astro and Weaviate's embedded JavaScript client.
- I used HTMX to allow the user to navigate around the web app without stopping the current mix.

## Why I did this project, why it's exciting
- Up until a couple of years ago, I was a bit more close-minded when it came to
my music taste. I knew what I liked, and I stuck to it. But in the last couple of years, I have been getting more into electronic and dance music.
- A great source of dance music is DJ mixes on Soundcloud. But it can be quite
difficult to find music that fits a certain vibe. If you stick to keyword
search, it can be difficult to find what you're looking for. Even if you find
something you like, it can be tricky to find music that is similar. I have found
it difficult to differentiate between the different subgenres (eg. house, deep
house, microhouse).
- Resident Advisor is another great source of dance music. They have a 'Mix of
the Day' blog where they post an interesting DJ mix every day.
- I had been playing around with the vector database Weaviate, which makes it
possible to search semantically, eg. search for content that is similar in
meaning, rather than just keyword search.
- This gave me the idea to make a web app that could search through DJ mixes by
vibe, by indexing Resident Advisor's text descriptions of the mixes.


## More info

- When?
- Why?
- What I did
- Stats?
- Record a video talking about?

Introduction to the idea of doing X with Y for Z. What is the core idea I'm trying to share?

This project is aimed at this audience. This assumes some knowledge with:
- tool X 
- fundamental concept Y

## What is [core thing I'm talking about]?

The thing that I'm talking about is blah blah blah.

## How does it work?



## Getting started with this project

- Clone this Git repo. Change into the directory and run `npm install` to install the dependencies.
- Duplicate the `.env.sample` file and rename it to `.env`. Fill in the required environment variables.
- Run `npm run dev` to start the local development server.
- Open your web browser and navigate to http://localhost:4321.
