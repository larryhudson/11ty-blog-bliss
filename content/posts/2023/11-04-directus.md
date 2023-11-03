---
title: Why I like Directus
description: My thoughts on Directus, my experience self-hosting with Docker and creating extensions
customPermalink: /why-i-like-directus/
date: 2023-11-04
tags:
  - directus
  - programming
  - docker
---

I’ve been playing with [Directus](https://directus.io/) on and off for about a year now. It is a customisable headless CMS with a bunch of interesting features that make it exciting to me.

The features that make it appealing to me are:

- a user-friendly web interface for managing the database structure. You create “collections” and “items” without writing any code. On first glance this reminded me of Django’s admin interface, if Django let you create and configure models using a web interface.
- as you set up your database, Directus automatically creates a REST API for the database. It also gives you an NPM library that makes it fairly easy to interact with your Directus instance as an API. For example, I’ve been experimenting with creating an Astro frontend that pulls data from the Directus backend to generate pages.
- ‘Flows’ give you a way to create automations by chaining together operations, similar to Zapier or IFTTT.
- an extensions SDK that makes it possible to create little add-ons that extend Directus to do what you want it to do. I’ll talk more about this below.
- Directus is open source and can be self-hosted using Docker Compose. It has an active community on Discord so it’s fairly easy to get support if you run into a bug.

## My experience self-hosting Directus with Docker Compose

- While I’ve been experimenting with Directus on and off since January this year, I’ve run into a few issues with Docker that have slowed down my progress
- Docker is [Directus’ recommended method for self-hosting](https://docs.directus.io/self-hosted/quickstart.html) because it takes away a lot of variables when it comes to hosting. If you do everything in a Docker container, you should be able to run it anywhere you can run Docker.
- Without any Docker experience, I jumped in and tried to get Directus up and running using their recommended Docker Compose configuration.
- While I got it running pretty quickly, I found that running Docker containers on my work laptop (a HP laptop running Windows) felt pretty sluggish. It seems like Docker takes up a lot of disk space and a lot of memory.
- In the last couple of months, I completed the Docker course on [boot.dev](http://boot.dev) and that gave me a good introduction to how Docker works. I feel a bit more confident now in self-hosting these Docker containers.

## Creating Directus extensions

- Because Directus automatically makes an API for your data, it can be a little confusing working out where your ‘custom business logic’ should live.
- At first, I thought that I should create a frontend app that does the work and then stores the data in the Directus backend using the API.
- For example, say you wanted to make a web app that gives you a searchable database of Word documents. You might set up your collections in Directus, then set up a frontend web app where the user can upload a Word document. The ‘custom business logic’ in the frontend web app would convert the Word document to HTML, then the HTML would be stored in the Directus backend using the Directus JS SDK.
- This approach above limits you in a couple of ways:
  - that custom logic will not run if you add new items to your collection in the Directus web interface
  - to get up and running, you will need to recreate quite a bit of Directus’ web interface in your frontend, eg. the CRUD views. This means you’re maintaining more code, and you don’t benefit from all the great work that has gone into Directus’ web interface.
  - that custom logic is limited to your single frontend web app. If you build another web app connected to your Directus API, it will not have access to that custom logic.
- Instead of writing that custom logic in an external frontend app, the way to do it is to create a Directus extension.
- There are quite a few types of extensions, but I’ve been mostly playing with:
  - **flow operations** - steps in ‘Flow’ automations that run some JavaScript code and then return a result that can be passed to the next step in the chain.
  - **hooks** - JavaScript code that automatically runs when a certain Directus ‘event’ is fired. For example, you can set up a hook that will execute whenever an item is created. This can be used to validate incoming data or automatically run some code after something else happens. There is some overlap here with flow operations above - the difference is flow operations can be chained in automations using ‘Flows’ and hooks are not configurable in the Directus web interface.
  - **endpoints** - additional HTTP routes that are added to Directus’ Express server. This can be handy for connecting Directus to external API services.
  - **modules** - additional sections that you can add to Directus’ web interface. These are defined as Vue components. I’ve been experimenting with making a module that fetches data from a custom endpoint above,
- Here’s the way I’ve been developing extensions:
  - In the `docker-compose.yml` file, set up a volume that binds the `./data/extensions` folder on the host machine to the `/directus/extensions` folder inside the Docker container.
  - use `npx create-directus-extension@latest` to scaffold an extension into the root of the extensions folder. Make sure the extension name begins with `directus-extension` Ignore the subfolders for types of extensions (eg. data/extensions/hooks/, /data/extensions/endpoints) as those subfolders are for the old way of making extensions.
  - I have been creating a ‘bundle’ extension which allows you to create multiple extensions that live in the same source folder. This is handy if you want to share utility functions across multiple extensions.

## Connecting Directus to Weaviate with custom flow operations, endpoints and modules

- This year, I’ve been trying to work out the best way to make a searchable document database with Directus, including semantic search powered by [Weaviate](https://weaviate.io/).
- I’m working on creating a backend where I can add Word documents that are automatically indexed in Directus and then added to Weaviate
- I have almost got this working and I’m pretty excited about the result!
- I’ve been working on a few flow operation extensions to make this possible:
  - `operation-docx-to-html` converts the Word doc to HTML using the `mammoth` npm library.
  - `operation-cheerio` parses the HTML using the `cheerio` library and transforms into an array of document sections
  - `operation-add-to-weaviate` sends a request to the Weaviate API to create the ‘object’ in Weaviate and return an ID. This can then be added to the Directus item so that we know what has been indexed.
  - `operation-html-to-text` converts HTML content into plain text using the `html-to-text` NPM library for easier indexing with Weaviate
  - `operation-split-text-into-chunks` splits text into chunks based on a ‘chunk size’ number of characters that should be in each chunk. This helps break up larger documents into smaller pieces for embedding with Weaviate
- I’m still experimenting to find the best way to set this up, but I’m keen to share my process once I am happy with it.
