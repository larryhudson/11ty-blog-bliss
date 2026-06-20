---
title: "minimise-complexity: a Claude Code skill for keeping code simple"
description: A design-and-review skill that pulls together The Grug Brained Developer and Ousterhout's A Philosophy of Software Design.
date: 2026-06-04
type: building
externalUrl: https://github.com/larryhudson/minimise-complexity
tags:
  - ai
  - claude-code
  - side-project
---

Agents are great at writing code, and especially good at small, well-scoped tasks. The catch is they tend to focus on the task right in front of them, not the wider system or how maintainable it will be in a year. They're good at adding things and not so good at simplifying, so they happily pile on complexity we have to live with later.

`minimise-complexity` is a Claude Code skill that gives the agent a lens for keeping things simple, both when designing something and when reviewing a change. It pulls together two sources I really like: [The Grug Brained Developer](https://grugbrain.dev/) and John Ousterhout's *A Philosophy of Software Design*. Both make the same argument — complexity is the enemy — so the skill nudges towards the simpler 80/20 option and flags things like shallow abstractions and over-DRYing.

[Code is on GitHub](https://github.com/larryhudson/minimise-complexity).
