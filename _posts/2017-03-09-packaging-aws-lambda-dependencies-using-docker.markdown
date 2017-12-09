---
layout: post
title: Packaging AWS Lambda dependencies using docker
tags: aws lambda docker python
---

Recently I've been using AWS Lambda at work for some projects and one
of the limitations that you have is trying to use packages with
compiled dependencies.

Compiling them on your machine won't work and the "recommended" way is
to start an EC2 instance and compile your dependencies there and then
copy those to your machine back.

Fortunately AWS now provides a docker image for amazon linux which
we can leverage to build our depencies. We can avoid launching an
instance and get faster results.<!-- -**-END-**- -->

Below I provide an example to build the dependencies for a python
project but you can probably modify it for other cases.

Just put the following content in a Makefile.

{% highlight basemake %}
compile:
	yum install -y gcc libffi-devel openssl-devel python27-virtualenv
	virtualenv /tmp/venv
	/tmp/venv/bin/pip install --upgrade pip setuptools
	/tmp/venv/bin/pip install -e .
	cp -r /tmp/venv/lib/python2.7/site-packages/. ./aws_lambda_libs
	cp -r /tmp/venv/lib64/python2.7/site-packages/. ./aws_lambda_libs

lambda-deps:
	@echo "--> Compiling lambda dependencies"
	docker run --rm -it -v ${CURDIR}:/src -w /src amazonlinux make compile

.PHONY: lambda-deps compile
{% endhighlight %}

Then you just need to execute:

{% highlight bash %}
make lambda-deps
{% endhighlight %}

When this process finishes you'll have your dependencies compiled in aws_lambda_libs.

Just include those contents at the root of your package.zip and deploy.

Enjoy!
