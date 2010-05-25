--- 
title: Ruby Enterprise, Passenger and Encoding hell
tags: passenger ruby encodings
---

Today I spent several hours with my friend [Gleb]("http://es.linkedin.com/in/glebm") trying to find a weird bug we we're having importing some rss feeds. 

We have a rake task that will grab an xml feed and import it to our system. When we call this rake task from the command line it would run fine, but if we run it from inside our application, we would get some wrong characters (you know, the usual ???) in the imported items. 

After trying a million ways to get this to work, we found that the problem is that Passenger doesn't pass the environment variables to the application processes, so our import task wouldn't know about our LANG variable. We have this set to LANG=en_us.UTF8 but our process would not see it, which would cause ruby to not use utf8 for the strings.

The solution was pretty straight forward, just pass the LANG variable when calling the rake task, finding the solution not so straight forward and definitely not fun. The sad part is that this is a known issue with passenger since 2008 and this is the second time it gets me (If you've tried to use an oracle db you know what I'm talking about). If you need more information about this you can check it [here]("http://blog.phusion.nl/2008/12/16/passing-environment-variables-to-ruby-from-phusion-passenger/").