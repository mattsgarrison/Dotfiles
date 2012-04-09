require 'pathname'
require 'fileutils'
namespace :monitor do
  desc "Visual Monitor of Network Traffic"
  task :slurm do
    system 'slurm -i eth0'
  end

  desc "Monitor system CPU, IO, and Network load"
  task :dstat do
    system 'dstat'
  end
end

namespace :utils do
  #TODO: parameterize this
  desc "Find large files on a linux system"
  task :find_large_files do
    system 'find . -size +20000k -exec du -h {} \;'
  end
end

#This assumes this script is your home directory level Rakefile
namespace :dotfiles do
  desc "Link ALL the dotfiles!"
  task :link do
    path = Pathname.new("#{__FILE__}").dirname
    Dir.glob "#{path}/Dotfiles/*" do |f|
      new_file = "#{ENV['HOME']}/.#{File.basename(f)}"
      if FileTest.exists?("#{new_file}")
        FileUtils.mv new_file, "#{new_file}.#{Time.now.to_i}.old"
      end
      system "ln -s #{f} #{new_file}"
    end
  end

  desc "Install the Dotfiles repo"
  task :install do
    Dir.chdir(Pathname.new(__FILE__).dirname)
    system 'git clone git@github.com:mattsgarrison/Dotfiles.git'
  end
end

namespace :vim do
  desc "Install vundle"
  task :install_vundle do
    #should make it check for this directory first, or maybe prompt for it
    system 'git clone http://github.com/gmarik/vundle.git ~/.vim/bundle/vundle'
  end
end
