# Adopted from Scott Kyle's Rakefile
# http://github.com/appden/appden.github.com/blob/master/Rakefile

task default: :server

desc 'Build site with Jekyll'
task :build do
  raise 'Install pygments' unless system('which pygmentize')
  jekyll('build -c _config.yml,_config.deploy.yml')
end

desc 'run server'
task :server do
  jekyll('serve --watch')
end

desc 'drafts'
task :drafts do
  jekyll('serve --watch --drafts')
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
  sh 'jekyll ' + opts
end
