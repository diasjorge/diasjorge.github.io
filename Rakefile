# Adopted from Scott Kyle's Rakefile
# http://github.com/appden/appden.github.com/blob/master/Rakefile
 
task :default => :server
 
desc 'Build site with Jekyll'
task :build do
  jekyll
end
 
desc 'Start server with --auto'
task :server do
  jekyll('--server --auto')
end
 
desc 'Build and deploy'
task :deploy => :build do
  sh 'rsync -rctzh --progress --delete _site/* mrdias.com:/home/sites/mrdias'
end
 
def jekyll(opts = '')
  sh 'rm -rf _site'
  sh 'jekyll ' + opts
end
