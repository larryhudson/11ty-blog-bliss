---
title: "claude-bookmarks-plugin: notes that don't eat the agent's attention"
description: A Claude Code plugin for dropping notes into your session transcript without triggering an agent reply.
date: 2026-04-24
type: building
externalUrl: https://github.com/larryhudson/claude-bookmarks-plugin
tags:
  - ai
  - claude-code
  - side-project
---

A small Claude Code plugin that scratches an itch I kept hitting.

When you're working with an agent, sometimes you want to jot down a note mid-session — a reminder, a thing to come back to — without that note affecting the conversation. `claude-bookmarks-plugin` lets you drop a note straight into the session transcript so it's saved for later, without sending it to the agent.

It works with an agent hook that blocks the user message from being sent, while still letting it land in the session transcript. A second `/list-bookmarks` tool then greps across your session transcripts for the marker value and pulls them all back out.

[Code is on GitHub](https://github.com/larryhudson/claude-bookmarks-plugin).
