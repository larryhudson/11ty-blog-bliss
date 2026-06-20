---
title: "dev-agent: an agent that runs its own dev stack and fixes bugs"
description: A coding agent with a running dev environment that can reproduce bug reports, QA in a browser, and resolve issues.
date: 2026-05-21
type: building
externalUrl: https://github.com/larryhudson/dev-agent
tags:
  - ai
  - agents
  - side-project
---

I saw a [workshop by Jarred Sumner](https://www.youtube.com/watch?v=DlTCu_pNDHE) (the creator of Bun) about robobun, a bot that automatically reproduces issues whenever someone opens one on GitHub. I wanted to try the same idea myself.

`dev-agent` is an agent that already has the dev stack up and running, so it can reproduce a bug report, QA it in a real browser, take screenshots, and then have a go at fixing it. I got it working well enough that it reproduced and solved a bug on Mealie, an open source meal tracker.

The thing I like most about it: it's a good test of how agent-friendly your codebase actually is. If an agent can't easily set up the dev environment and debug, that tells you something.

[Source and a write-up of the design on GitHub](https://github.com/larryhudson/dev-agent).
