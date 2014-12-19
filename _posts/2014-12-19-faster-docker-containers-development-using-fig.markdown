---
layout: post
title: Faster docker containers development using fig
tags: docker fig automation
---

Yesterday I had the opportunity to present a lightning talk on the
[Barcelona Docker Group](http://www.meetup.com/docker-barcelona-spain/)
about working with [fig](http://www.fig.sh/).

During the talk I presented a tool that is helping me focus on
developing the different containers and make the changes to the
Dockerfile and the apps themselves and leave out the details
of using fig.

The tool is called
[guard-fig](https://github.com/diasjorge/guard-fig).<!-- -**-END-**- -->
It builds on top of guard to detect changes to your fig projects and
will stop and rebuild the corresponding containers as well as
restarting the linked containers to keep everything working
smoothly. It also offers configurable integration with boot2docker and
building your whole project on start.

If you're working with fig, give it a try and report any issues.

You can find the slides for my talk
[here](https://github.com/diasjorge/docker-meetup-fig-lightning-talk/raw/master/slides.pdf)

Enjoy!
