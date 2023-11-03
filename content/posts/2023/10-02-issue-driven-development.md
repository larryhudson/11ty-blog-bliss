---
title: Simon Willison's issue-driven development
customPermalink: /issue-driven-development/
date: 2023-10-02
tags:
  - programming
  - productivity
---

For the past couple of years, I've been a big fan of [Simon Willison](https://simonwillison.net/), an open
source software developer who helped create Django, and has more recently been
interested in AI and large large models. I really admire Simon as someone who is
passionate about his work and gets so much done.

Back in 2022 he gave a talk called [_Coping strategies for the serial project hoarder_](https://simonwillison.net/2022/Nov/26/productivity/), which covered how he manages to make progress on so many little projects. One strategy he mentioned is 'issue-driven development', where he documents his ideas as GitHub issues, and then talks to himself in comments while he's working on them. That way, if he drops a project for six months, he can come back and pick up where he left off. It's a great way to document your work as you go, and clarify your thinking.

I really want to try to get into the habit of working this way. I
have [a lot of ideas that I start working
on](https://github.com/larryhudson?tab=repositories) and then give up on, maybe because
of motivation or running out of time.

Another reason I like this strategy is it helps you [learn in public](https://www.swyx.io/learn-in-public) and makes
your work easier to share. I'm keen to share my side projects with other
developers and get feedback, and also to include these projects in a portfolio.

Over the last couple of days, I've been trying to work in this way on my
[astro-sqlite-tts-feed](https://github.com/larryhudson/astro-sqlite-tts-feed/issues) project. You can [read a bit more about this project in my blog post here](/text-to-speech-podcast-feed/).
I've added the following features to the app:

- [when adding an article to be converted into audio, you can tweak the text
  content before the audio is generated](https://github.com/larryhudson/astro-sqlite-tts-feed/issues/5)
- [you can add 'extraction rules', either global or domain-specific, to remove
  unwanted HTML elements from the articles before it is converted into audio.](https://github.com/larryhudson/astro-sqlite-tts-feed/issues/4)

I'm trying not to create too many issues at once, because it becomes
overwhelming. It's like standing at the bottom of a mountain. Instead, I want to
keep the issue count low and keep putting one foot in front of the other. As I
implement more features, I'm discovering more surface area of the project, and
making it better and better.

It's difficult building up a habit of working in this way. Because I have a few
different interests and only limited time to work on side projects, I am always
rushing when I work on them. But if I can be a bit more disciplined, I will be
able to accomplish more in less time.
