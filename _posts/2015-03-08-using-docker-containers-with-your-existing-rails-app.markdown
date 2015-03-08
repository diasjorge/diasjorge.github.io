---
title: Using docker containers with your existing rails app
layout: post
tags: docker rails
---

This tutorial is an extraction from a talk I recently presented about
docker and rails apps at the Barcelona on Rails user group. I'll
explain how to integrate docker into an existing rails app workflow.<!-- -**-END-**- -->

### Dockerizing our dependencies

The first step to integrate docker into our workflow is to start with
our application dependencies.

As an example I'll use the open source app
[fulcrum](https://github.com/fulcrum-agile/fulcrum). I assume this
application is running locally as would be the case with an existing
rails app. For this example we'll use the postgresql database.

So the first thing is to initialize our database container. For that
we execute the following command.

{% highlight sh %}
docker run -d --name fulcrum-postgres \
-e POSTGRES_USER=fulcrum -e POSTGRES_PASSWORD=fulcrum \
-p 5432:5432 postgres
{% endhighlight %}

So we're creating a container and run it as a daemon (-d), we
setup some environment variables (-e) for the username and password and
make the ports available (-p HOSTPORT:CONTAINERPORT).

Now we need to adjust our config/database.yml, it should look
something like this:

{% highlight yaml %}
development:
  adapter: postgresql
  encoding: unicode
  database: fulcrum_development
  pool: 5
  host: <%= ENV['POSTGRES_HOST'] %>
  username: <%= ENV['POSTGRES_USER'] %>
  password: <%= ENV['POSTGRES_PASSWORD'] %>

test:
  adapter: postgresql
  encoding: unicode
  database: fulcrum_test
  pool: 5
  host: <%= ENV['POSTGRES_HOST'] %>
  username: <%= ENV['POSTGRES_USER'] %>
  password: <%= ENV['POSTGRES_PASSWORD'] %>
{% endhighlight %}

And now we run our rails app

{% highlight sh %}
# Initialize the db
POSTGRES_HOST=`boot2docker ip` \
POSTGRES_USER=fulcrum \
POSTGRES_PASSWORD=fulcrum \
bundle exec rake db:setup

# Run the app
POSTGRES_HOST=`boot2docker ip` \
POSTGRES_USER=fulcrum \
POSTGRES_PASSWORD=fulcrum \
bundle exec rails s
{% endhighlight %}

Please note that for the value for the *POSTGRES_HOST* I'm using
boot2docker, if you're running on linux or against another docker host
replace this accordingly.

Now when we visit localhost:3000 our app will be running against our
database in a docker container.

For a more complicated app, we'd do the same for the rest of our
dependencies. By starting with the dependencies, we are preparing the
road so we can have a more decoupled environment while maintaining our
regular workflow.

### Dockerizing the app

The next step is to run the application itself inside a container. For
this we'll need to create our Dockerfile.

There are many different places to start from. We'll use the official
ruby 2.1.2 container since this is the ruby version our app needs, but
defining our own from scratch is quite easy as well.

Our Dockerfile should look like this

{% highlight dockerfile %}
FROM ruby:2.1.5

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile* /app/

RUN bundle install -j4

ADD . /app

# Let's create a user to run the app that is not root
RUN usr/sbin/useradd --create-home --home-dir /app --shell /bin/bash fulcrum

RUN chown -R fulcrum:fulcrum /app

USER fulcrum

CMD ["rails", "server"]
{% endhighlight %}

We also need to tell docker certain files we don't want as part of our container,
we create a .dockerignore file like this:

{% highlight sh %}
.git
.bundle
vendor/bundle
{% endhighlight %}

After creating the files in the root of our app we execute:

{% highlight sh %}
docker build -t fulcrum-web .
{% endhighlight %}

Once that is finised we can run our app like this:

{% highlight sh %}
docker run --rm -p 3000:3000 --link fulcrum-postgres:postgres \
-e POSTGRES_HOST=postgres \
-e POSTGRES_USERNAME=fulcrum \
-e POSTGRES_PASSWORD=fulcrum \
fulcrum-web
{% endhighlight %}

So what is this doing exactly? We're linking our database container to
our web container (--link), we're exposing the port 3000 (-p) and
we're also setting environment variables (-e) with the values we used
when creating our db container. After executing this we can go visit
our app running on http://DOCKER_HOST:3000

The first thing we can see is that we have to set many duplicate
environment variables from the database when running our container,
fortunately docker allows us to have access to a linked container
environment variables.

We can change now our config/database.yml replacing the username and
password like this:

{% highlight yaml %}
username: <%= ENV['POSTGRES_USER'] || ENV['POSTGRES_ENV_POSTGRES_USER'] %>
password: <%= ENV['POSTGRES_PASSWORD'] || ENV['POSTGRES_ENV_POSTGRES_PASSWORD'] %>
{% endhighlight %}

We rebuild our container again, and now we can start it simply like:

{% highlight sh %}
docker run --rm -p 3000:3000 --link fulcrum-postgres:postgres \
-e POSTGRES_HOST=postgres \
fulcrum-web
{% endhighlight %}

Now, recreating our container every time we make a file change is going
the get very annoying quite soon. For this we can also leverage
another docker facility called volumes. This will allow our container
to have access to our local files. To do this simply we start our
container like this:

{% highlight sh %}
docker run --rm -p 3000:3000 --link fulcrum-postgres:postgres \
-e POSTGRES_HOST=postgres \
-v $PWD:/app \
fulcrum-web
{% endhighlight %}

Note: Please make sure you delete your .bundle/config local file to
avoid issues with bundler inside the container.

### Automating our setup with docker compose

At this point we have our app running successfully inside a docker
container, but having to be typing this commands constantly is not fun.

To finish our setup we'll use [docker compose](https://docs.docker.com/compose/).

So let's create our docker-compose.yml.

{% highlight yaml %}
web:
  build: .
  links:
    - db:postgres
  environment:
    POSTGRES_HOST: postgres
  ports:
    - "3000:3000"
  volumes:
    - .:/app

db:
  image: postgres
  environment:
    POSTGRES_USER: fulcrum
    POSTGRES_PASSWORD: fulcrum
{% endhighlight %}

Now to run our app we simply do:

{% highlight sh %}
docker-compose up
{% endhighlight %}

The first time we access our app it will complain our db is not
created we can simply fix this by running:

{% highlight sh %}
docker-compose run web rake db:setup
{% endhighlight %}

And last but not least if you want to run your tests then you can simply do:

{% highlight sh %}
docker-compose run web rake db:test:prepare spec
{% endhighlight %}

### The end

So that's it, I hope this tutorial helps you get started with docker
with your existing rails applications. If you want more info about
docker compose, check out my article about fig (docker compose's
predecesor) [here](/2014/12/19/faster-docker-containers-development-using-fig.html)