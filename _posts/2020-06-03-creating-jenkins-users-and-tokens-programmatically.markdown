---
title: Creating jenkins users and tokens programatically
layout: post
tags: jenkins
---

At work we manage a jenkins setup and rely on Google for
authentication. One drawback is managing service users that do not
have an email. We use those for interacting with the jenkins API in
scripts.

When you use the Google Login plugin you no longer see the option to
manage users in the UI, fortunately we can leverage the Jenkins
Console and provision those users and generate the API tokens we need.

Let's create some jenkins users and give them a username and password.

<!-- -**-END-**- -->

Go to the jenkins console on `JEKINS_URL/script`.

To create a user you can execute:

{% highlight groovy %}
    import static hudson.security.HudsonPrivateSecurityRealm;
    HudsonPrivateSecurityRealm securityRealm = new HudsonPrivateSecurityRealm(true, false, null);
    securityRealm.createAccount("USERNAME", "PASSWORD")
{% endhighlight %}

To generate an API Token for the user:

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

This last script can be used to (re)generate API tokens for any user.

Remember to use the API token to authenticate instead of the password.

To verify it works, run:


{% highlight sh %}
    curl -u USERNAME:API_TOKEN https://jenkins.example.com
{% endhighlight %}
