---
layout: post
title: Avoid Empty Deploys with Capistrano
tags: capistrano
---

If you've ever forgotten to push your changes to the remote repository before trying to make a deploy, you will know that it can be really frustrating to think that everything has gone live when actually it has not. This little script will help you avoid this situations.<!-- -**-END-**- -->

{% highlight ruby %}
  namespace :deploy do
    task :check_changes do
      if current_revision == real_revision
        Capistrano::CLI.ui.say("You don't have any changes to deploy")

        agree = Capistrano::CLI.ui.agree("Continue (Yes, [No]) ") do |q|
          q.default = 'n'
        end

        exit unless agree
      else
        # current_revision depends on current_path
        reset!(:current_path)
        reset!(:current_revision)
        reset!(:real_revision)
      end
    end
  end
{% endhighlight %}

What this does is check that we have different revisions deployed between our deployed version and the version in repositories and it will ask for confirmation in case they are the same. Just include the above code in your deploy recipe and then for the environment you want to deploy to just include the following:

{% highlight ruby %}
  before "deploy:update_code", "deploy:check_changes"
{% endhighlight %}

If you're doing any kind of automated deployment, let's say from you continuous integration server to your staging server don't include that code since it will sometimes just wait for an answer that is never going to come.

Hope this helps you and happy deployments!
