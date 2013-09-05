require 'pathname'
require 'fileutils'
namespace :btmm do
  desc "Find all BTMM computers"
  task :list do
    system 'dns-sd -B _ssh 1031349116.members.btmm.icloud.com'
  end
end
namespace :monitor do
  desc "Visual Monitor of Network Traffic"
  task :slurm do
    # sudo apt-get install slurm
    system 'slurm -i eth0'
  end

  desc "Monitor system CPU, IO, and Network load"
  task :dstat do
    system 'dstat'
  end

  desc "Launch Nethogs to watch process network usage"
  task :nethogs do
    # sudo apt-get install nethogs
    system 'sudo nethogs'
  end

  desc "Launch iptraf to monitor network interface in detail"
  task :iptraf do
    # sudo apt-get install iptraf
    system 'sudo iptraf'
  end

  desc "Launch goaccess Apache log analyzer"
  task :goaccess do
    system 'goaccess'
  end

end

namespace :utils do
  #TODO: parameterize this
  desc "Find large files on a linux system"
  task :find_large_files do
    system 'find . -size +20000k -exec du -h {} \;'
  end

  desc "Save all apt packages installed on a system"
  task :aptsave do
    system %W[aptitude search '!~M ~i' | awk -F " " '{ print "apt-get -y install " $2 }' > aptshell.sh]
  end

  desc "Gifify a Movie"
  task :gifify do
    #brew install ffmpeg
    #brew install gifsicle
    #ffmpeg -i in.mov -pix_fmt rgb24 -f gif - | gifsicle -O3 -d3 > out.gif
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

end

namespace :vim do
  desc "Install vundle"
  task :install_vundle do
    #should make it check for this directory first, or maybe prompt for it
    system 'git clone git://github.com/Shougo/neobundle.vim ~/.vim/bundle/neobundle.vim'
  end
end
