---
title: Using Weaviate's generative search for brainstorming
description: How combining vector search with a large language model can be a powerful tool for brainstorming.  
openGraphImage: /images/astro-weaviate-brainstorm-banner.png
customPermalink: /astro-weaviate-brainstorm/
date: 2024-02-10
tags:
  - programming
  - vector-search
  - ai
---

Lately I've been interested in generative search - the idea of searching through a database of text items by semantic similarity and then generating new text based on the search results. I think this is a really powerful idea. 

I've created [astro-weaviate-brainstorm](https://github.com/larryhudson/astro-weaviate-brainstorm) - an example web app that demonstrates this concept using the [Astro framework](https://astro.build) and the [Weaviate vector database](https://weaviate.io). The web app integrates vector search, which facilitates text search based on semantic meaning, with a large language model to generate new text based on search results. 

This project is heavily inspired by the brainstorming app [Brainstory](https://brainstory.ai), a web app that guides you through a brainstorming session by asking thought-provoking questions. At the end of the brainstorming session, it generates a concise summary for you. This encourages you to think deeper and can help you turn your idea into something tangible and shareable. If you want a real brainstorming app, try out Brainstory!

In this blog post, I'll introduce the idea of generative search, and then talk about how you can get started trying out the astro-weaviate-brainstorm project.

## What is generative search?

Generative search (also called Retrieval Augmented Generation or RAG) is a concept that uses vector search to find semantically similar text in a database, and then uses a large language model to generate new text based on the search results. Let's break that down a bit:
- vector search is a way to search through a database of text items by semantic similarity, rather than exact keywords. For example, the text strings "I love dogs" and "I love cats" are very similar semantically. Vector search can find these similarities between text items, and can make it easier to find related items to a search query.
- a large language model is a machine learning model that can generate new text based on a prompt. For example, if you give it the prompt "Summarise the key ideas from this text" along with a piece of text, it can generate a summary of the text. This is the technology that is behind ChatGPT.

By combining vector search with a large language model, generative search can be a really powerful tool. In the context of a brainstorming app, it could be used to:
- find similar ideas in different brainstorms
- find insights or connections between brainstorms that you might not think are related.

You can [find out more about generative search in the Weaviate docs](https://weaviate.io/developers/weaviate/search/generative).

## An example web app using Astro and Weaviate

I've created a new side project called [astro-weaviate-brainstorm](https://github.com/larryhudson/astro-weaviate-brainstorm) as a way to explore the possibilities of generative search. It's a fairly simple web app using the [Astro web app framework](https://astro.build) and the [Weaviate vector database](https://weaviate.io). The web app demonstrates the concept of generative search, and how it can be used in a brainstorming app.

[Astro](https://astro.build) is my favourite way to create simple web apps using Node.js. The framework's [`.astro` component files](https://docs.astro.build/en/basics/astro-components/) make it really easy to write pages and reusable components using HTML and CSS. Astro's 'fenced' section at the top of the file `---` component syntax makes it easy to include server-side logic at the top of the file, which makes it easy to work with HTML forms. 

[Weaviate](https://weaviate.io) is an open source vector database that can be used to store and search through text items by semantic similarity. While it can be deployed using Docker, for this project I am using Weaviate's [embedded client](https://weaviate.io/developers/weaviate/installation/embedded#embedded-options), which runs the database within the same process as the Astro web app. This is a great fit for small projects where you don't want to set up more complicated infrastructure. All you need to bring is an [OpenAI](https://openai.com/) API key, which generates the [text embeddings](https://platform.openai.com/docs/guides/embeddings) and powers the large language model.

## Getting started with astro-weaviate-brainstorm

To get the project running on your computer:
- clone [this git repository](https://github.com/larryhudson/astro-weaviate-brainstorm)
- change into the project directory and run `npm install` to install the Node.js dependencies
- duplicate the sample `.env.sample` file and rename it to `.env`, and then add your OpenAI API key to the `.env` file
- run `npm run dev` to start the local development server
- open your web browser and navigate to [http:/localhost:4321](http://localhost:4321)

## Video walkthrough

I've also recorded a video walkthrough where I talk through the idea and demonstrate a few things with the web app. I'm trying out a few different ways to share my side projects, so let me know if you like the video format. You can [view the video on YouTube](https://www.youtube.com/watch?v=aUSLy2p5RkE) below:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/aUSLy2p5RkE?si=hwjzjLF2g-hnEbGl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Let me know if this is interesting to you

I'm keen to hear if this concept is interesting to you, and if you have any ideas for how it could be used. I think generative search could be a really powerful tool for brainstorming, and I'm excited to explore it further.

If this idea is interesting to you, feel free to share it on Twitter or LinkedIn. 