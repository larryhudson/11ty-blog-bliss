---
title: My experience at the Information Access Group
description: I wrote an article for the Information Access Group newsletter about the benefits of text-to-speech for readers and content authors.
customPermalink: /my-experience-at-iag/
published: false
date: 2024-05-24
tags:
  - career
---

TODO - do a brainstory about this, make it into a better piece of writing about
what my experience is and where my value is

Last month, in April 2024, I finished up in my role at the Information Access Group. I worked there for just over seven years, starting there in a part-time position in January 2017. Because it is the only company I have worked at, I have been finding it difficult to properly describe my experience.

I wanted to try writing up a blog post about my experience. Here we go.

## About the Information Access Group

The Information Access Group (IAG) is an accessibility-focused communications agency based in Melbourne, Australia - they are market leaders for Easy Read information in Australia. Accessible website design and development is a smaller part of their service offering.

I joined IAG in 2017 and learned about web accessibility and document accessibility, including the Web Content Accessibility Guidelines (WCAG) and how to test a website with a screen reader. I learned how to build and maintain websites using the Django web framework and the WordPress content management system.

## Creating internal tools

As Easy Read development was our main service offering, I created internal tools to help our editors and designers create Easy Read more efficiently. Using Python and Django, I created a searchable document database that would index the images and text content inside Microsoft Word documents. As we reuse images across multiple documents, it used perceptual image hashing to detect duplicate instances of images. This quickly became an integral part of our workflow.

## Easy Read HTML

Traditionally Easy Read documents are published as PDF documents, but PDF is one of the worst document formats for people who use assistive technology. Even when extra work is done to make a PDF accessible, it can still be an inconsistent and frustrating experience for screen reader users.

I worked out a way to generate accessible HTML versions of our Easy Read documents so that our Easy Read content was more accessible for people who use assistive technology and people using mobile devices. This involved using a static site generator called Eleventy.

I also used the Microsoft Azure text to speech API to generate an audio version of the Easy Read content and add a ‘Listen’ button to the Easy Read HTML version. This allows users to listen to the content while they read, allowing users with low literacy to engage with the content more independently. This is a good example of what is possible with the web platform versus traditional document formats.

I was involved with the planning, strategy and marketing for the Easy Read HTML product. I also ran training sessions for clients to introduce them to web accessibility and the need

## Becoming a team leader
In 2021, I became the Team Leader of Innovation, Tech and Web. Between then and April 2024, my role focused on managing and training up other team members. This meant a strong focus on sharing knowledge, documenting and streamlining processes and preparing training materials.

In the last couple of years, I have become a big proponent of recording little videos as a way to communicate asynchronously. It became one of my main ways of sharing knowledge, explaining how to do things and sharing ideas. As of April 2024, there are over 240 video resources in the shared library.


## Client websites I have worked on
- ACD website - using WordPress + Advanced Custom Fields (ACF)
- Inclusion Australia - using WordPress + ACF
- Everyone Can Work - using WordPress + ACF
- “What do you think?” survey website for ACD - using a WordPress backend with Gravity forms connected to an Eleventy
- AdvoKit - website for disability advocates during COVID-19

## Technologies I’ve worked with

- Solid understanding of HTML, CSS and JavaScript - including accessibility best practices and compliance with WCAG
- Conducting website accessibility audits following the Web Content Accessibility Guidelines up to version 2.2
    - Using screen readers
- Content management systems such as WordPress, Drupal. Headless CMS such as Directus,
- Working with REST and GraphQL APIs - eg. making external API requests from a Django web app
- Front-end frameworks such as React
- Web frameworks such as Django (Python). I have also created side projects with Ruby on Rails and Laravel (PHP).
- Serverless deployments with Netlify and Cloudflare Workers
- Solid understanding of how websites and web apps work - eg. DNS, IP, HTTP, caching,
- Relational databases - understanding of SQL, backups, restoring. Have worked with SQLite, Postgres, MySQL
- Version control with Git using GitHub and GitLab
- Administration of Virtual Private Servers including Linux command line, Nginx, Supervisor, Postgres
        - Migrating websites from a VPS server across to managed hosting platform such as Flywheel or Cloudways

## Current learning and focus
- I am currently diving deeper into data structures and algorithms in order to bolster my programming knowledge following [this course on Frontend Masters](https://frontendmasters.com/courses/algorithms/)
- I am also learning more advanced React techniques following [Josh W Comeau’s Joy of React course](https://www.joyofreact.com/). I have a
