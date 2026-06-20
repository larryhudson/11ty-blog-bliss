---
title: "lat.md, managing codebase knowledge for AI agents"
description: A tool by Yury Selivanov for keeping a navigable knowledge base next to your code, with a CI check that catches drift.
date: 2026-03-31
type: reading
externalUrl: https://www.lat.md/
tags:
  - ai
  - agents
  - reading
---

[lat.md](https://www.lat.md/) — an interesting tool for managing codebase knowledge for AI agents, a step beyond a single `AGENTS.md`.

- Instead of one flat file, you get a `lat.md/` directory of linked markdown files using Obsidian-style wiki links, both between sections and to actual code symbols. Agents search it and only pull in the relevant bits.
- The part I like most: `lat check` runs in CI and validates that the links between the docs and the code stay in sync, so specs can't silently drift away from the implementation. Stale references get caught automatically.

The bigger idea is the bit I find most interesting: a way to hold the semantic intent behind what you're building, and the important business context that lives outside the code itself, in a form agents can read token-efficiently. I'm not sure lat.md is the tool to actually adopt, but it's well worth a look for inspiration.

Found it via an [interview with Armin Ronacher](https://www.youtube.com/watch?v=2XhV3DsGm8Y).
