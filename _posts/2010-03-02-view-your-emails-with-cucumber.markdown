---
layout: post
title: View your emails with cucumber
tags: cucumber emails
---

I've been developing some new mailers at work, and I've found it really helpful to be able to view the emails as they are sent to the users. So I've implemented a cucumber step to help me achieve that, inspired on a similar webrat step for web pages.<!-- -**-END-**- -->

Inside a support file for cucumber, like features/support/open_email.rb, insert the following code:

{% highlight ruby %}
module SaveAndOpenEmail
  include Webrat::SaveAndOpenPage
  def save_and_open_email(email)
    return unless File.exist?(saved_page_dir)
 
    filename = "#{saved_page_dir}/email-#{Time.now.to_i}.html"
 
    File.open(filename, "w") do |f|
      f.write email.to_s
    end
 
    open_in_browser(filename)
  end 
end
 
World(SaveAndOpenEmail)
{% endhighlight %}

Then in your step definitions, you can implement a step like this

{% highlight ruby %}
Then(/^show me the emails?$/) do
  save_and_open_email(current_email)
end
{% endhighlight %}

**UPDATE**: As of version 0.2.2 of pickle, they already include this functionality, although it has a bug which has not been fixed. If you try to call that step, you will see:

{% highlight ruby %}
undefined method `open_in_browser' for #<Cucumber::Rails::World:0x..fdb4951fa> (NoMethodError)
{% endhighlight %}

To fix it, as a workaround do this in features/support/email.rb
{% highlight ruby %}
require 'pickle/email'

Pickle::Email.module_eval do
  include Webrat::SaveAndOpenPage
end
{% endhighlight %}
