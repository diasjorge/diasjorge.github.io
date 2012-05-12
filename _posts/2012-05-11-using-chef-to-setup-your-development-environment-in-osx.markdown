---
title: Using chef to setup your OSX environment
layout: post
tags: chef osx development
---

Recently I had to reinstall my computer at work since I had to update to Lion and I could only do a fresh install, so I decided to try to automate the installation process since some of my colleagues are going through the same and it seems like every time we have to waste many hours or days to solve the same issues over and over.<!-- -**-END-**- -->

A few days before I had stumbled upon this [article](http://jtimberman.housepub.org/blog/2012/01/28/iterm2-with-tmux/) just by coincidence and it gave me some light into what could be done. This article led to a [previous one](http://jtimberman.housepub.org/blog/2011/04/03/managing-my-workstations-with-chef/) by the same author about using chef to manage his workstations I knew what had to be done.

So when I finally decided to tackle the problem I found a nice addition to the whole package which is a gem called [soloist](https://github.com/mkocher/soloist).

Soloist makes it __very__ easy to setup your environment and hides lots of the complexity of using chef-solo. Basically it just needs a very simple file structure to know about your cookbooks and a configuration file where you specify the recipes that you need.

I started to use it, but then I got into a few problems. The first one is that chef 0.10.8 had some problems with your USERID if your account is created by Active Directory (which of course was my case), so I had to install chef 0.10.10.rc.3. This made it work. <strike>I also found that the soloist version from rubygems at the moment (0.9.4) did not allow to pass node attributes so I had to build the gem from the latest HEAD on the git repository.</strike> UPDATE: a new version of soloist was released that fixes that issue.

After reading many of the recipes from [pivotal_workstation](https://github.com/pivotal/pivotal_workstation) I chose the ones I liked the most and in the end things worked as you could expect, I did make some changes to some of the recipes to suit them better to my needs and to deal with a bug in chef with symlinks, although if you're using a stable chef version perhaps you should be fine. I found other useful cookbooks as well and incorporated them to my soloist project and I even wrote some of my own recipes (which I have to say was very easy).

So in conclusion I'm hooked, I know all my macs (and maybe pc's as well) will have to be installed like this in the future. This was as well my first experience working with chef and it was a very pleasant one even though I had some problems, but that's the price to pay for being on the "bleeding" edge.
