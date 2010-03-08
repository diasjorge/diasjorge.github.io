---
layout: post
title: Monthly archives for Jekyll
---

Recently I moved my blog to [Jekyll](http://jekyllrb.com/), while being able to write stuff directly in my favorite editor EMACS, there was some functionality that I was missing from my previous custom blog engine, such as archives. Looking at how I could achieve this, I found [Raoul Felix](http://rfelix.com) approach to the problem. Instead of patching jekyll, he wrote a small library that wraps around it, called [jekyll_ext](http://github.com/rfelix/jekyll_ext). Using it was really easy, and based on some of the extensions he created, I was able to provide this functionality in my site.

Although I had archives generated for me, I was still missing a way to display this information on my site, so I decided to create my own extension.<!-- -**-END-**- -->

I added the following code inside _extensions/archive_iterator.rb, which will provide me with an array of all the months when I've written posts:

{% highlight ruby %}
module Jekyll
  AOP.around(Site, :site_payload) do |site_instance, args, proceed, abort|
    monthly_archives = []

    site_instance.collated.each do |year, hash|
      hash.each do |month, days|
        monthly_archives << {
          'name'  => "#{Date::MONTHNAMES[month]} #{year}",
          'url'   => "#{year}/#{month}",
          'posts' => days.values.flatten
        }
      end
    end

    result = proceed.call
    result['site']['monthly_archives'] = monthly_archives
    result
  end
end
{% endhighlight %}

The information for the archive was gathered from the archive_gen extension, although I had to slightly modify. Instead of processing the information after render, I had to do it before rendering, so the information would be available when the pages are created, like this:

{% highlight ruby %}
AOP.before(Site, :render) do |site_instance, result, args|
  site_instance.posts.reverse.each do |post|
    y, m, d = post.date.year, post.date.month, post.date.day
    unless site_instance.collated.key? y
      site_instance.collated[ y ] = {}
    end
    unless site_instance.collated[y].key? m
      site_instance.collated[ y ][ m ] = {}
    end
    unless site_instance.collated[ y ][ m ].key? d
      site_instance.collated[ y ][ m ][ d ] = []
    end
    site_instance.collated[ y ][ m ][ d ] += [ post ]
  end
end
{% endhighlight %}

Then inside my layout I was able to easily display this information like this:

{% highlight html %}
<ul>
  { % for monthly_archive in site.monthly_archives reversed % }
  <li>
    <a href="{{ site.baseurl }}/{{ monthly_archive.url }}">{{ monthly_archive.name }}</a> ({{ monthly_archive.posts | size }} posts)
  </li>
  { % endfor % }
</ul>
{% endhighlight %}

Note the extra space between '{' and '%', this is to avoid liquid interpreting the code inside the tags. You can view all the source code [here](http://gist.github.com/324737).