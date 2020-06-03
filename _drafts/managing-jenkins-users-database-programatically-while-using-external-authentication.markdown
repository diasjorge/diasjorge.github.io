---
title: Managing jenkins users database programatically while using external authentication
layout: post
tags: jenkins
---

At work we manage a jenkins setup and rely on Google for
authentication. One drawback is managing service users that do not
have an email. We use those for interacting with the jenkins API in
scripts.

Fortunately we can leverage the Jenkins Console and provision those
users and generate the API tokens we need.

Go to the jenkins console on `JEKINS_URL/script`.

Then you can add the following scripts:

- To create a user you can do:

    {% highlight groovy %}
    import static hudson.security.HudsonPrivateSecurityRealm;
    HudsonPrivateSecurityRealm securityRealm = new HudsonPrivateSecurityRealm(true, false, null);
    securityRealm.createAccount("USERNAME", "PASSWORD")
    {% endhighlight %}

- To generate the API Token:

    {% highlight groovy %}
    import hudson.model.*
    import jenkins.model.*
    import jenkins.security.*
    import jenkins.security.apitoken.*

    // script parameters
    def userName = 'USERNAME'
    def tokenName = 'kb-token'

    def user = User.get(userName, false)
    def apiTokenProperty = user.getProperty(ApiTokenProperty.class)
    def result = apiTokenProperty.tokenStore.generateNewToken(tokenName)
    user.save()

    return result.plainValue
    {% endhighlight %}

    This last script can be used to (re)generate API tokens for any user
