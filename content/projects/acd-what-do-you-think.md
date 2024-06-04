---
title: ACD 'What Do You Think?' survey? (WordPress + Gravity Forms + Eleventy + Vite)
description: Sharing a project that helps you do X with Y for Z.
customPermalink: /projects/acd-what-do-you-think/
date: 2022-10-01
stack: Eleventy, Vite, Gravity Forms, Netlify
---

Summary:
- I led the project management and development for a bespoke survey platform for Association for Children with a Disability (ACD).
- Traditionally surveys for children with disability are completed by their parents, but ACD wanted to create a survey that children could engage with independently.
- We planned and designed an inclusive and accessible survey that would allow children to answer questions with text, uploading a picture or recording their voice.
- We built this using the Eleventy static site generator, the Vite bundler connected to a Gravity Forms WordPress backend.


## Why I did this project, why it's exciting
- Traditionally surveys for children with disability are completed by their parents, but ACD wanted to create a survey that children could engage with independently. The first survey for the platform would be gathering data about inclusive playgrounds.
- At the Information Access Group, we had worked with ACD previously on their
website. We were excited about the idea and wanted to help as much as we could.
- Because there wasn't an existing brand to work with, this was a great
opportunity for our designers to create something from scratch. We wanted it to
be playful and friendly.

## What we did
- Our designers created some mockup characters that the child could choose at
the start of the survey. The chosen character would then ask the child the
questions about playgrounds.
- Because we were creating this survey from scratch, we were able to do a few
things that weren't possible with off-the-shelf survey platforms / form
builders. For example, for each question, we allowed the child to answer in
three ways:
  - write the answer in the text input
  - upload a picture to answer the question
  - record your voice to answer the question

## Learning
- This was a challenging project when it came to project management. Because we
  had not worked on a project like this before, the scope was not firmly set,
and grew during the project. This meant that we needed to do more and more work
to resolve the client's queries before the survey was launched publicly. If I
was doing this project again, I would have set expectations around the project
stages more firmly.
- We also ran into some technical difficulties with the custom form inputs.
When building the audio recorder component, we ran into some issues with iPhones
on different versions of iOS. While Google Chrome and Mozilla Firefox are
'evergreen' browsers that automatically update themselves, Safari on iOS is
locked to the version corresponding to the iOS version. This mean that some iOS
devices do not get the new browser features. The testing platform
[BrowserStack](https://www.browserstack.com/) was really helpful for testing
across different iOS devices.

## More info

### Background


- When?
- Why?
- What I did
- Aspects I'm proud of
  - Working with designers
  - Designing something from scratch
  - Allowing different ways to answer question
- What I learned
  - Testing across different iOS devices is tricky, especially for complicated
  web features like audio input
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
