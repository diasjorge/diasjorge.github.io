---
title: Git rebasing without conflicts
layout: post
tags: git
---

Yesterday I was at work with a colleague and we wanted to merge a long-running branch we had. This branch was full of useless commits so we wanted to clean it up. We tried an interactive rebase but we got a lot of conflicts since git doesn't know how to resolve merge conflicts that we had previously fixed. As you probably know this is no fun, so we did what any sane person would do and found a nice solution for this called [git-rerere][1].<!-- -**-END-**- -->

This command allows you to record the way you resolve conflicts and then reuse them when doing automerges in the future. But there's a drawback to it, first you have to enable an option and second you have to record this solutions as you do them. If you didn't know about this command before then you didn't record those solutions and you're at the same point where you started. Don't worry there's a solution it's called [rerere-train][2], it's a contrib script from git which recreates the rerere database from your existing commits, this is exactly what we need...awesome!!

So how do you use it? It's very easy.
First you have to enable git-rerere like:

{% highlight sh %}
git config rerere.enabled true
{% endhighlight %}

Then download the script to somewhere in your $PATH and then do:

{% highlight sh %}
sh rerere-train.sh YOUR-LONG-RUNNING-BRANCH-NAME
{% endhighlight %}

You have to wait some time so it does it's work and it'll depend on how long is the branch. After it finishes you can do the rebase. something like:

{% highlight sh %}
git rebase -i master
{% endhighlight %}

And now git will know how to resolve the conflicts for you. Enjoy!

[1]: http://www.kernel.org/pub/software/scm/git/docs/git-rerere.html
[2]: http://git.kernel.org/?p=git/git.git;a=blob;f=contrib/rerere-train.sh;h=2cfe1b936b0feef1bd40947ce6ab249f62a6ad55;hb=HEAD