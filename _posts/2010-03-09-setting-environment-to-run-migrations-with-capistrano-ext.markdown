---
title: Setting environment to run migrations with capistrano ext
layout: post
tags: capistrano migrations
---
If you're using capistrano-ext to deploy to a different server, using a custom environment, you've probably noticed that it always tries to run the migrations for the production environment, like this:

{% highlight sh %}
cd path_to_app/deploy/releases/20100309152738; rake RAILS_ENV=production  db:migrate
{% endhighlight %}

Digging through capistrano's source I found the solution is really simple, just set the rails_env variable to the environment you want, in this example staging. So inside config/deploy/staging.rb

{% highlight ruby %}
set :rails_env, "staging"
{% endhighlight %}

Then when migrations get executed they'll have RAILS_ENV=staging.