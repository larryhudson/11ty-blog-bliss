---
title: Easy Read PDF utility
description: Sharing a project that helps you do X with Y for Z.
customPermalink: /projects/easy-read-pdf-utility/
date: 2019-04-01
stack: Node.js, Gatsby
---

Summary:
- Web app to automate repetitive tasks when making a PDF accessible.
- When we create an Easy Read PDF at the Information Access Group, we must do a few manual tweaks to the PDF in Acrobat, including manipulating the order of tags.
- I worked out how to automate some of these tasks using the pdfassembler NPM library.

## Background context
- At the Information Access Group, when we are creating an Easy Read document in
Microsoft Word, we use a table structure to lay out images and text side by side. This isn't ideal because when you
export a PDF, the content is in a table tag, even though it is not an accessible
data table. An accessible data table requires a meaningful header cell that
describes the content that comes below.
- In my early days at the Information Access Group, one of my main tasks was
creating accessible PDFs when we finalised an Easy Read document for a client.
This meant I needed to do a lot of manual accessibility work in Acrobat. This
included manually 'stripping the table structure' - taking the content that was
inside the table structure, dragging it out of the table tag, and deleting the
table tag. 
- While this was tedious, it gave me time to think about how we could make this process
more efficient.

## Manipulating PDFs with pdfassembler
- I found an NPM library called [pdfassembler](https://github.com/DevelopingMagic/pdfassembler) that would allow you to
manipulate the structure of a PDF file using JavaScript. This allowed me to work
out how to process a PDF and automate repetitive tasks.
- To do this in a reliable way, I needed to learn quite a bit about how PDFs
work internally. I read through a lot of the [PDF
Reference](https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/pdfreference1.7old.pdf),
learning how content and tags interact. This involved a lot of trial and error.
- This gave me a solid understanding of how PDFs work and how they can be
manipulated using JavaScript. This technique came in handy in many projects,
especially when we needed to make minor content tweaks across every page in larg
e documents (for example, incrementing the page number in the corner of a page
after inserting an extra page in the middle of a document).
- This tool is now used whenever we create our finished art files for any Easy
Read document.
