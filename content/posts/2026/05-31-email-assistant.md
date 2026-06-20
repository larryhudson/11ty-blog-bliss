---
title: "email-assistant: an AI assistant you talk to over email"
description: A sandboxed AI assistant you interact with by email, with its own tools, memory and budget. I built one for my mum.
date: 2026-05-31
type: building
externalUrl: https://github.com/larryhudson/email-assistant
tags:
  - ai
  - agents
  - side-project
---

An AI assistant you talk to entirely over email — you send it a message, it does the work in its own sandbox, and it emails you back. This one started small but turned into a project I'm really proud of.

Most of the interesting work was in the architecture:

- Each assistant runs in its own isolated sandbox and can install its own tools.
- Its tools can call external APIs, but the agent itself never sees the API keys.
- An admin can set up an assistant for someone else to use. I'm the admin for my mum's assistant, so I get an email whenever something goes wrong.
- Detailed logging and an admin interface for seeing what's happening.

I learned a lot about the trade-offs of sandboxing agents, and of letting an agent build its own skills. It's a genuinely tricky design problem: how do you give an agent enough power to be useful while keeping it secure?

Built with FastAPI, Procrastinate, PydanticAI and Mailgun. [Code is on GitHub](https://github.com/larryhudson/email-assistant).
