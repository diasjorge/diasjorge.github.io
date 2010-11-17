---
title: Passenger, RVM gemsets and Bundler
layout: post
tags: rvm passenger
---

When using passenger with rvm I've had some issues with project specific gemsets, where bundler was unable to find the gems.
After searching a lot I found out about using the "config/setup\_load\_paths.rb" file to tell passenger where to locate your gems, but then I had a new issue with rvm trying to use the system ruby instead of the ruby version of my .rvmrc file.

After going to the irc channel, I got some help that help me fixed my problem. The culprit was my rvmrc file.<!-- -**-END-**- -->

As I've seen on many blog posts the file looked something like this:

{% highlight sh %}
rvm use --create ree@rails235
{% endhighlight %}

The solution was to generate the rvmrc file using rvm itself like this:

{% highlight sh %}
rvm --create --rvmrc use ree@rails235
{% endhighlight %}

The file contents now look like this:

{% highlight sh %}
if [[ -d "${rvm_path:-$HOME/.rvm}/environments" \
  && -s "${rvm_path:-$HOME/.rvm}/environments/ree-1.8.7-2010.02@rails235" ]] ; then
  \. "${rvm_path:-$HOME/.rvm}/environments/ree-1.8.7-2010.02@rails235"
else
  rvm --create use  "ree-1.8.7-2010.02@rails235"
fi
{% endhighlight %}

And passenger is able to find my gems without any problems.

Hope this helps you as I spent way too much time with this issue.
