# Adopted from Scott Kyle's Rakefile
# http://github.com/appden/appden.github.com/blob/master/Rakefile

task default: :server

desc 'Build site with Jekyll'
task :build do
  raise "Install pygments" unless system("which pygmentize")
  sh 'sass --update _sass:stylesheets --style compressed --force --sourcemap=none'
  jekyll('build')
end

desc 'run server'
task :server do
  sh 'foreman start'
end

desc 'run server'
task serve: :server

desc 'Build and deploy'
task deploy: :build do
  sh 'ghp-import -c mrdias.com -m "Deploy" -b master -p _site/'
end

task release: :deploy

def jekyll(opts = '')
  sh 'rm -rf _site'
  sh 'ejekyll ' + opts
end
