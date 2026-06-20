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

As agents write more and more of our code, the risk isn't that they can't write it — it's that they happily add complexity we'll have to live with later. They're good at adding things and not great at simplifying.

`minimise-complexity` is a Claude Code skill that gives the agent a lens for keeping things simple, both when designing something and when reviewing a change. It pulls together two sources I really like: [The Grug Brained Developer](https://grugbrain.dev/) and John Ousterhout's *A Philosophy of Software Design*. Both make the same argument — complexity is the enemy — so the skill nudges towards the simpler 80/20 option and flags things like shallow abstractions and over-DRYing.

[Code is on GitHub](https://github.com/larryhudson/minimise-complexity).
