---
title: Using magit with Github Enterprise
---

I'm a big fan of [magit](https://magit.vc) and I've been using it for
many years and I found some time ago the
[magithub extension](https://github.com/vermiculus/magithub), which is
great and allows you to integrate with github, see your pull requests,
open the browser for the current project, create PRs, etc.<!-- -**-END-**- -->

The main difficulties I had were getting it to work with GHE, I had to
do some hacks to get it working like a year ago but it was good and I
moved on.

Now I recently had to setup a new computer and the newest version of
magithub has changed and my previous configuration didn't work.

After reading the documentation for magithub, ghub and ghub+ I was
still having some problems so after some debugging and reading the
source code I found how to make it work which I'll document here for
future reference.

From the
[magithub FAQ](https://github.com/vermiculus/magithub/blob/master/magithub.org#faq)
the first thing you need is to setup the correct value of
```magithub-github-hosts```. I tried to customize it but there seems
to be a problem and emacs (25.2.1) doesn't let me use a list so in my
.emacs config I added.

```
(setq magithub-github-hosts '("github.com" "ghe.example.com")))
```

Following the
[ghub manual](https://magit.vc/manual/ghub/Getting-Started.html#Getting-Started)
the first thing you need to do is setup your username:

```
git config --global github.user USERNAME

# For GHE
git config --global github.ghe.example.com/api/v3.user EMPLOYEE
```

Then for each corporate repository you should do:
```
cd /path/to/repo
git config github.host ghe.example.com/api/v3
```

Now in my case I added a conditional include in my ```~/.gitconfig```
to set this globally for all the work repos (which I have under the same root folder).

So my ```~/.gitconfig``` would include:

```
[github]
	user = diasjorge

[includeIf "gitdir:~/development/work/"]
        path = ~/.gitconfig.work
```

And in ```~/.gitconfig.work``` I'll have:

```
[user]
        email = jorge.dias@example.com
[github "ghe.example.com/api/v3"] # Magithub uses this to make the API requests
	user = jorge-dias
[github] # Make ghub always use this user and host
	user = jorge-dias
	host = ghe.example.com/api/v3
```

Now with this setup I have seamless integration and I don't have to
remember to configure the ```github.host``` for all my repos.

Then you need to configure your ```~/.authinfo``` file. Following the
[manual](https://magit.vc/manual/ghub/How-Ghub-uses-Auth_002dSource.html#How-Ghub-uses-Auth_002dSource)
I added:

```
machine api.github.com login user^ghub password TOKEN
machine api.github.com login user^magithub password TOKEN

machine ghe.example.com/api/v3 login ghe-user^ghub password GHE_TOKEN
machine ghe.example.com/api/v3 login ghe-user^magithub password GHE_TOKEN
```

Notice I add different entries for ghub and magithub packages. This is
so you can give different packages that use ghub different permissions.

For magithub the variable ```magithub-github-token-scopes```
mentions the required scopes ```'(repo user notifications)```.

It took me a while to figure it all out so I hope you find this
summary useful and you can enjoy working with magit and Github
enterprise using magithub.

Cheers!
