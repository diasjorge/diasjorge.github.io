# Adopted from Scott Kyle's Rakefile
# http://github.com/appden/appden.github.com/blob/master/Rakefile

task :default => :server

desc 'Build site with Jekyll'
task :build do
  raise "Install pygments" unless system("which pygmentize")
  sh 'sass --update _sass:stylesheets --style compressed --force'
  jekyll
end

desc 'run server'
task :server do
  sh 'foreman start'
end

desc 'Build and deploy'
task :deploy => :build do
  sh 'rsync -rctzh --progress --delete _site/* deploy@mrdias.com:/var/www/apps/mrdias/'
end

def jekyll(opts = '')
  sh 'rm -rf _site'
  sh 'ejekyll ' + opts
end
