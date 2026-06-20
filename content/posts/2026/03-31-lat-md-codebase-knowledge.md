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

[lat.md](https://www.lat.md/) — an interesting tool for managing codebase knowledge for AI agents. It could help us scale beyond a single `AGENTS.md`.

- Instead of one flat file, you get a `lat.md/` directory of linked markdown files using Obsidian-style wiki links, both between sections and to actual code symbols. Agents search it and only pull in the relevant bits.
- The part I like most: `lat check` runs in CI and validates that the links between the docs and the code stay in sync, so specs can't silently drift away from the implementation. Stale references get caught automatically.

Found it via an [interview with Armin Ronacher](https://www.youtube.com/watch?v=2XhV3DsGm8Y).
