---
title: Giving HTML elements the power to update themselves with HTMX and Astro
customPermalink: /htmx-elements-that-update-themselves/
description: How HTMX can add interactivity to HTML elements
date: 2023-10-07
tags:
  - programming
  - htmx
  - astro
---

Say you’re building a web app that allows the user to upload a PDF document. The web app processes the PDF document, but it takes more than 10 seconds to complete.

Initially, that processing task happens within the HTTP request when someone submits a HTML form with the PDF file, and the browser tab loading spinner spins and spins. If their internet connection is interrupted, or they accidentally close the tab, the progress will be lost.

So you set up a background task queue with Redis. Now, when the user submits a HTML form, you add the task to the task queue and respond with a ‘Task added to queue!’ message:

```html
<h1>Job</h1>
<div class="message">
  <p>Task added to queue!</p>
</div>
<p>Job progress: <span id="job-progress">0%</span></p>
```

The user needs to refresh their window to check the job progress. While this is an improvement over doing the job within the HTTP request, this isn’t great.

You could write some client-side JavaScript that sends a `fetch` request to an API endpoint that checks the job progress, and then update the `#job-progress` span.

But you prefer to have as little client-side JavaScript as possible. You prefer to work in the backend, and have full control over the server. You want to do as much as possible on the server.

Instead of just returning static HTML that returns the current progress of the job, using [HTMX](https://htmx.org/), we can return **HTML with the power to update itself**:

```html
<h1>Job</h1>
<div class="message">
  <p>Task added to queue!</p>
</div>
<p>
  Job progress:
  <span
    id="job-progress"
    hx-get="/job/1/progress"
    hx-trigger="every 500ms"
    hx-swap="outerHTML"
  >
    0%
  </span>
</p>
```

Those `hx-` attributes on the `<span>` element will send a GET request to `/job/1/progress` every 500ms, and replace the full `<span>` tag with what comes back.

So in your project, you now need to implement a new endpoint, `/job/[id]/progress` that will return a HTML fragment with the current progress of the job. When you’re rendering the HTML, you can check if the job is done. If it’s not done yet, you’ll include the `hx-` attributes for it to update itself, and if it is done, you get rid of those attributes. For example, in Astro you would do something like:

```html
---
// src/pages/job/[id]/progress.astro

import {getJobProgress} from "@src/utils/job"

const {id} = Astro.params;
const progress = getJobProgress(id);
const isDone = progress === 100;
---

{isDone ? (
	<span id="job-progress">100%</span>
) : (
	<span
		id="job-progress"
		hx-get={`/job/${id}/progress`}
		hx-trigger="every 500ms"
		hx-swap="outerHTML">
			{progress}%
	</span>
)}
```

To reduce duplicated code, you can create a component:

```html
---
// src/components/JobProgress.astro

const {id, progress} = Astro.props;
const isDone = progress === 100;
---

{isDone ? (
	<span id="job-progress">100%</span>
) : (
	<span
		id="job-progress"
		hx-get={`/job/${id}/progress`}
		hx-trigger="every 500ms"
		hx-swap="outerHTML">
			{progress}%
	</span>
)}
```

And then use that component, both when you render the initial `job` page, and the HTML fragment:

The job page at `src/pages/job/[id]/index.astro`:

```html
---
// src/pages/job/[id]/index.astro

import {getJobProgress} from "@src/utils/job";
import JobProgress from "@src/components/JobProgress.astro";

const {id} = Astro.params;
const progress = getJobProgress(id);
const isDone = progress === 100;
---

<h1>Job</h1>
<p>Job progress: <JobProgress {progress} {id} /></p>
```

HTML fragment page at `src/pages/job/[id]/progress.astro`:

```html
---
// src/pages/job/[id]/progress.astro

import {getJobProgress} from "@src/utils/job"

const {id} = Astro.params;
const progress = getJobProgress(id);
const isDone = progress === 100;
---

<JobProgress {progress} {id} />
```

This is just one of the ways that HTMX can power-up the HTML in your web app. I’m exploring [the examples on the HTMX site](https://htmx.org/examples/) and building them, to get more comfortable with the HTMX way of working.

Extra note: if you’re having trouble installing HTMX into your Astro project (like I did), the trick is to import HTMX as an explicit URL import by adding `?url` to the end of the import path. So install HTMX into Astro, run `npm install htmx.org` then add this to your `.astro` file (page or component):

```html
---
import HtmxPath from "htmx.org/dist/htmx.min.js?url"
---

<script is:inline src="{HtmxPath}"></script>
```
