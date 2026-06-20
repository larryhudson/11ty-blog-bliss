---
title: "agent-acp-bridge: connecting coding agents to different work platforms"
description: An experiment in connecting coding agents (using the ACP protocol) to the services where we work, like Linear, Slack and GitHub, so we can build helpful AI agents that are close to where the work happens.
date: 2026-02-08
type: building
externalUrl: https://github.com/larryhudson/agent-acp-bridge
tags:
  - ai
  - agents
  - side-project
---

`agent-acp-bridge` is an experiment in connecting coding agents to the services where we actually work.

The idea is a bridge that's both agent-agnostic (so it can talk to Claude Code, Codex, Gemini and so on) and service-agnostic (so it can connect to Linear, Slack, GitHub and so on). That way you can put a powerful agent right where the work already is, connected to the system of record for context and useful to the people there.

The part I'm most interested in is agents that work in a shared space, like a Slack thread or a Linear ticket. Instead of everyone talking to their own private Claude or Codex, the agent works in the group chat. That saves time, and because people are working with the agent out in the open, it helps spread good practices across the team.

Code is on [GitHub](https://github.com/larryhudson/agent-acp-bridge).
