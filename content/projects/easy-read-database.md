---
title: Searchable document database with Django
description: description
openGraphImage: /images/image.png
customPermalink: /projects/docx-database/
date: 2019-11-01
stack: Django, Python
published: false
---

Summary:
- Searchable database web app that indexes Microsoft Word documents and images that are reused across multiple documents.
- I used Django to build the web app.
- I set up a process for converting Word docs to HTML, to index the document content using Django models.
- I used image hashing to detect duplicate images.
- I deployed this web app on premises so that team members could only access the database while working on our company VPN.

## Why I did this project, why it's exciting
- At the Information Access Group, we create most of our Easy Read documents in
  Microsoft Word documents. We work off a shared network drive on Windows.
- As part of our Easy Read work, we reuse images (vector icon illustrations,
photoshoot images and stock images) across multiple documents.
- Previously, it was difficult to search across our previous work. Using the
built-in search function in Windows' File Explorer was laggy and inconsistent.
When searching for a document related to a topic, we needed to rely on team members' memory of projects with related subject
matter.
- I remember coming across a Python library that would convert a Microsoft Word
  document to HTML. I played around with it, and realised that we can convert
Microsoft Word documents to HTML in a consistent way, because our Easy Read
documents follow a consistent structure. This means we can turn the unstructured
data into structured data, and store it in a database for easy searching.
- My previous director at the Information Access Group had a lot of experience
with Django, so I tried building an initial prototype using Django.
- It was fairly straightforward to get it up and running - I just needed to set
  up a few models and set up a script for converting the Word doc to HTML, then
  parsing the HTML and creating objects in the database.

## Image hashing
- One tricky thing was related to duplicate images - because we reuse images
across multiple documents, we needed a way to detect duplicates
- After a bit of research, I found an article about perceptual hashing, which is
  a technique that turns image data into a simple matrix of number values, so
they can be compared against other images. This worked great for our needs. So
instead of storing every image copy in the database, when importing a new image,
it searched for an existing image. If it is a close enough match, then the new
image is created as an 'image instance' of the original 'image'. That way, in
the image search results, only unique images are shown. 

## Background context
- Working with Microsoft Word documents on a shared network drive - difficult to search across
- Specifics around Easy Read images
- Reusing images across multiple documents - lots of copies of images
- We write alternative text for every image - so we have a solid set of image
    descriptions for searching

## What I did
- This project had a big impact on the team and my career. Before this project,
  I was a 'content producer' that was a little lost at work - I was between the
  editorial and design teams. Because this project was such a success, I was
given more time in my week to focus on using programming to innovate and find
creative solutions to problems. This was a big part of why I was promoted to
being the team leader of innovation, tech and web.
