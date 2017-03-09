module Jekyll

  class Document
    def preview_content
      delimeter = @site.config['content_delimeter'] || '<!-- -**-END-**- -->'
      self.content.split(delimeter)[0]
    end
  end

  AOP.around(Document, :to_liquid) do |post_instance, args, proceed, abort|
    result = proceed.call
    result['preview'] = post_instance.preview_content
    result
  end
end
