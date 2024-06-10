---
title: Text template filler
description: Sharing a project that helps you do X with Y for Z.
customPermalink: /projects/text-template-filler/
date: 2022-02-01
stack: petite-vue
---

Summary:
- I was working on a project where we needed to write alternative text for dozens of complex graphs.
- I created a little web app using petite-vue that would allow us to copy and paste in a text template, and then values to fill the template, and it would automatically update the output.
- The web app allowed the user to save configurations in their web browser using the LocalStorage API.

## Why I did this project, why it's exciting
- At the Information Access Group, we worked on some large-scale document
accessibility projects for our clients. One project was a quarterly report that
included many complex graphs. We needed to write alternative text for all the
graphs in the document in the most efficient way possible.
- We were given the data for the graphs in Microsoft Excel spreadsheets, but it
  was tedious to type the alternative text descriptions from scratch, filling in
  the figures. It was also prone to human error and mistyping.
- I had been playing around with the library 'petite-vue' which is a lightweight
  way to add clientside interactivity to HTML. You can declare 'reactive' variables in
JavaScript that automatically update when the other variables change.
- I created a little web app using petite-vue that would allow us to copy and paste in a text template, and then values to fill the template. Whenever the template or values changed, it would automatically update the output.
- You can play around with the web app here: [Text template filler](https://text-template-filler.netlify.app/
).
- This was a handy little tool that saved us a lot of time. Once we had written
  out the templates for the graphs, it was as simple as copying and pasting the
  values frmo the Excel spreadsheet into the 'values' box and then we had the
alternative text ready to go.
- I like that with petite-vue, the source code and the final HTML are the same
thing. You can open up the [Text template filler](https://text-template-filler.netlify.app/), click 'view source' and see how everything works. Even after revisiting the project after two years, it's clear how everything connects together. You can't say that for many web apps that are made with a bundler or a complex JavaScript toolchain.
