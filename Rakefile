# Adopted from Scott Kyle's Rakefile
# http://github.com/appden/appden.github.com/blob/master/Rakefile

task :default => :server

desc 'Build site with Jekyll'
task :build do
  raise "Install pygments" unless system("which pygmentize")
  sh 'compass compile --force'
  jekyll
end

desc 'Start server with --auto'
task :server do
  sh 'compass compile --force'
  jekyll('--server --auto')
end

desc 'Build and deploy'
task :deploy => :build do
  sh 'compass compile -c prod_config.rb --force'
  sh 'rsync -rctzh --progress --delete _site/* deploy@mrdias.com:/var/www/apps/mrdias/'
end

def jekyll(opts = '')
  sh 'rm -rf _site'
  sh 'ejekyll ' + opts
end
