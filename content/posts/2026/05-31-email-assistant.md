---
title: "email-assistant: an AI assistant you talk to over email"
description: A sandboxed AI agent you interact with by email, with its own memory and budget. I built it for my mum.
date: 2026-05-31
type: building
externalUrl: https://github.com/larryhudson/email-assistant
tags:
  - ai
  - agents
  - side-project
---

A little side project: a sandboxed AI assistant you talk to over email. You send it a message, it does the work in its own sandbox, and it emails you back.

I set it up for my mum, which felt like a good test — if it works for someone who doesn't want to think about agents or terminals at all, it's doing its job. Each assistant gets its own memory, its own sandbox and its own budget, so they stay isolated from each other.

Built with FastAPI, Procrastinate, PydanticAI and Mailgun. [Code is on GitHub](https://github.com/larryhudson/email-assistant).
