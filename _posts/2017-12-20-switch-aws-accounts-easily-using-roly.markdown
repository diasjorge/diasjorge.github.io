---
layout: post
title: Switch AWS accounts easily using roly
tags: AWS IAM roly
---

Many companies keep their AWS accounts separated per environment, per
team, etc and you can find yourself in a situation where you have
users and credentials on many different accounts. From a security
perspective this is not ideal as managing this can be very hard,
people will change teams, leave the company, etc and cleaning up their
access on all accounts can be very tedious and time consuming.

A way to deal with this is by having a user in one account and then
assume role in another account so there's only one place to manage
your users and credentials.

I'm going to assume you already have knowledge about how to create a
role in the target account and configure your ```~/.aws/credentials```
file. If not AWS has a good basic introduction
[here](https://aws.amazon.com/blogs/security/how-to-use-a-single-iam-user-to-easily-access-all-your-accounts-by-using-the-aws-cli/).

This has some advantages for security but if you are using MFA it can
be a bit more tedious to have to constantly type the tokens. The AWS
CLI when you give it the ```--profile``` flag will perform an
```STS:AssumeRole``` call for you an cache the results for one hour.

This can be sufficient for your needs but if you're working with some
of the SDKs like boto you may encounter some problems. If you're using
ansible it uses boto2 underneath which doesn't support profiles to
assume role with MFA. Boto3 works correctly but you need to provide
the MFA token on every invocation since it won't cache sessions for
you.

To make my life easier and some colleagues while migrating from boto2
to boto3 I created a very small tool called **[roly](https://github.com/diasjorge/roly)**.

The AWS SDKs will respect the ```AWS_*``` environment variables you
have set and roly just leverages this fact.

You can use roly in two ways:

```
$ roly export target-profile
Assume Role MFA token code: XXXX
export AWS_ACCESS_KEY_ID='XXXXXXXXXXXXXXXX'
export AWS_SECRET_ACCESS_KEY='XXXXXXXXXXXXXXXX'
export AWS_SESSION_TOKEN='XXXXXXXXXXXXXXXX'
```

If needed will prompt for your MFA token and then it will print the
commands needed to set your environment variables. The session will
last for an hour. Copy and paste them and you're set.

Or you can set the credentials and call a command just once.

```
$ roly exec target-profile command
```

You can find the source and binaries at the
[github repository](https://github.com/diasjorge/roly).

I hope you find it useful.
