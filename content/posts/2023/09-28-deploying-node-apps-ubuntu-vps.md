---
title: Deploying Node apps on an Ubuntu VPS server
customPermalink: /deploying-node-ubuntu-vps/
date: 2023-09-28
tags:
  - programming
  - ubuntu
disclaimer:
  text: This is a stub of a blog post.
---

- In the last few years I've experimented with different ways of deploying web
  apps - e.g. serverless deployments with Netlify and Vercel, containerised
  deployments with Docker.
- For little web apps without many users, a cost effective option is to set up a
  fairly cheap VPS server with a provider like DigitalOcean for approx ~$10-$20
  per month and it will be powerful enough to host a few apps.
- It's worth noting that if you just want to host static websites that have a
  build step, a provider like Netlify is hard to beat. Netlify makes hosting
  static websites an absolute breeze. What I'm describing below is for web apps
  that need to do something for each request, like read from a database, work with
  file input and output, etc.
- I like this option because it keeps things fairly simple. While other
  deployment options are a bit fancier, there are layers of abstraction between
  the source code that you write and the final result that gets deployed.
- As I'm still a bit of a novice when it comes to deploying web apps, I want to
  keep things simple and learn the fundamentals. So this option works well for
  me at the moment. As I gain more experience and require extra features, I might
  change my opinion.

## The setup I've been using

- Here's the setup I've been using for deploying Node web apps on my Ubuntu VPS
  - DigitalOcean 'droplet' VPS server running Ubuntu 22.04 LTS
  - One 'deploy' user with nvm installed for managing the Node version
  - The 'deploy' user has an SSH key which is added to my GitHub account so it
    server:
    can pull source code changes
  - App source code lives in `/var/www/<app-name>` directories. The app
    source code folder is owned by `deploy:www-data`.
  - Running the Node app is managed by `pm2` process manager, running as the
    `deploy` user. The `pm2` process is configured to run as a service so it can be started automatically on boot.
  - The Node app runs on a port like 3000, and is proxied by nginx on port 80. Nginx sends the traffic through to the app if the server name matches.
  - I use `certbot` to get a HTTPS certificate, and it updates the nginx
    config to automatically redirect http to https.
  - When I make source code changes, I push them to GitHub and then SSH into
    the server, log in as `deploy` and `git pull` the changes. I run `npm run
build` then `pm2 restart all` to restart the Node process. I would like to
    look into setting up a webhook that automatically pulls the changes and
    rebuilds when I push changes to GitHub, but I'm keeping it simple for now.

## Documenting and streamlining the process

- I've been experimenting with writing Bash scripts to help automate the process
  - e.g. install dependencies when you first set up the server, and then setting
    up a Node app based on a GitHub repository. These are in a GitHub repository
    here but I'm not entirely happy with them. If one of the steps go wrong,
    it's hard to re-run the script if the script expects none of the steps to be
    completed. So I need to make these scripts a bit more robust. While tools like
    ChatGPT and Copilot make it seem easy to write Bash scripts, there's
    definitely an art to it!
- When I set up a new VPS server and deploy apps on it, there are always a few
  hurdles that I run into. I want to practice this more and document every step so
  the process is more consistent. I'd also like to record a video of myself doing
  everything from scratch.
- This is actually aligning with my work at the Information Access Group now as
  I need to train up other team members on how to set up a VPS server and manage
  web apps, so it's a good time to document this more.
