---
title: Giving Claude 3.5 Sonnet extra abilities with custom tools
description: Allowing a chatbot to search and add to a vector database
customPermalink: /anthropic-claude-chatbot-custom-tools/
openGraphImage: /images/anthropic-claude-chatbot-custom-tools.png
date: 2024-07-03
tags:
  - programming
  - llm
  - claude
---

I'm excited to share a demo chatbot interface built with Next.js that allows you
to chat with [Claude 3.5 Sonnet](https://www.anthropic.com/news/claude-3-5-sonnet) (a competitor to ChatGPT and the current state of
the art large language model) and create custom tools that extend its
capabilities. By connecting Claude to a Weaviate vector database, the chatbot
has the ability to save notes for future reference, and search for relevant
information to be more helpful.

You can [check out the project on
GitHub](https://github.com/larryhudson/claude-chat-with-weaviate).

As a side note, in the last couple of weeks I've been playing with Claude 3.5
Sonnet a lot, and I'm super impressed with its abilities. I'm having a lot of
fun creating little web apps and tiny projects. It feels like you can make
anything with it, as long as you can think it through piece by piece.

## Project highlights

This demo project showcases several key features and technologies:

1. **Anthropic API Integration**: 
2. **Custom Tool Integration**: This allows the AI to perform actions beyond its training data, such as searching through notes, fetching real-time information, or interacting with external systems.
3. **Weaviate Vector Database Integration**: Weaviate, a vector database enables semantic search capabilities
5. **Dynamic Note Saving and Retrieval**: The assistant can save and retrieve notes, creating a growing knowledge base. 
4. **Streaming Interface**: The chatbot provides real-time, streaming responses This is implemented using server-sent events
6. **Next.js Framework**: Built on [Next.js](https://nextjs.org/) using the [App
   Router](https://nextjs.org/docs/app) model.

## Tool use with Claude

In this project, I've added a few custom tools that Claude can choose to use
within the chat interface.

* Tools are defined with a name, description, and input schema in the API request.
* Claude can decide when to use tools or be instructed to use specific tools.
* The process involves Claude requesting tool use, your application executing the tool, and optionally sending results back to Claude.

For a deep dive into tool use with the Anthropic API, check out these resources:

* [Anthropic's tool use documentation](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)
* [Anthropic's free tool use course on GitHub](https://github.com/anthropics/courses/tree/master/ToolUse)

### Weaviate vector database integration

1. **Semantic Search**: Weaviate allows Claude to perform semantic searches rather than simple keyword matching.
2. **Efficient Information Retrieval**: The vector database enables quick and efficient retrieval of relevant information from a large corpus of data.
3. **Dynamic Knowledge Base**: new information can be stored in Weaviate, allowing the assistant to expand its knowledge over time.

## Limitations and drawbacks of this approach

One limitation of this approach is cost. The more tools that you share with
Claude, and the more output that these tools create, use up tokens, which makes
your API usage more expensive. While the latest AI models have large context
windows, the costs add up, and would be a concern if you were trying to make an
app for a large user base.

If you were making a production app, you would need to pass the cost onto the
user, or implement severe rate limits which would be annoying for the user.

However, as Ethan Mollick says, you should always treat the current AI model as
the worst one you will ever use again, so abilities are going to keep getting
better. And costs will go down. So it's worth experimenting to push these models
to get the most out of them.

## Running the project locally

To get this project up and running, you can find detailed instructions in the [GitHub repository README]().

## Ideas for future improvements

* **Scheduled workflows** - I like the idea of being able to create specific tasks
that the assistant would perform periodically - eg. monitoring websites and
generating summaries, or keeping an eye on to do lists and creating plans for
what needs to get done. I think doing automation in this way, using natural
language, has a lot of potential.
* **Text-to-speech integration** - I think it would be great to be able to talk to
the assistant using speech, and to listen to the assistant using a 'read aloud'
feature. That could reduce the amount of time the user needs to type into a text
box. I like the [ChatGPT
app](https://openai.com/index/introducing-the-chatgpt-app-for-ios/) for this reason. 
* **Claude's Artifacts feature** - I'm a big fan of the Claude web UI's [Artifacts](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them) feature, which is how you can
  collaborate with Claude on a document or a piece code. If it's a web app, you
  can preview it without needing to copy and paste it elsewhere. I like the idea
  of integrating a code editor (like [Sandpack](https://sandpack.codesandbox.io/)) into the chatbot interface.

## Let me know what you think

If this project is interesting to you, I'd love to hear what you think! Please
feel free to reach out.
