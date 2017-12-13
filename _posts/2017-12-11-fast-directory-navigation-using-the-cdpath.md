---
layout: post
title:  Fast directory navigation using the CDPATH
date:   2017-12-11 22:42:23 +0100
---

For a long time I've used my own command alias to navigate through my
work related projects and jump to them using the ```cx```

Originally the x comes from Xing where I worked at the time. It also
happens that the letter x is located next to the c which makes it very
convenient like ```cd```.

Anyway imagine you're in any directory on your system and you want to
change to ```~/development/work/boring-project``` normally you'd do
something like:

```
cd ~/development/work/boring-project # or
cd ../../boring-project
```

Now this can get very tiresome depending where you are and having to
get right how many directories levels to go up, etc. Fortunately for
us we have the *CDPATH* environment variable.

We could set in our bash_profile
```
export CDPATH=~/development/work
```
and then in our previous example we could have just done ```cd boring-project```.

If we had a directory ```foo``` in our current path and a project
named ```foo``` in our CDPATH in that case you'd be taken to project
foo which may not be what you want. So some people recommend to set
the CDPATH like:

```
CDPATH=.:~/development/work
```

Now in my case I don't want to change the default behaviour of the cd
command so that's were my ```cx``` command comes in.

You can copy this into your bash_profile.

```
# Change to match your needs
export CXPATH=$HOME/development/work

cx() {
    CDPATH=$CXPATH cd $@
}

_cx() {
    CDPATH=$CXPATH _cd
}

complete -o nospace -F_cx cx
```

With this when you type ```cx``` you'll get autocompletion too for the
projects in your CXPATH regardless from where you are.

Enjoy!
