# Path to your oh-my-zsh configuration.
export ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
export ZSH_THEME="dieter"
#export ZSH_THEME="eastwood"
#export ZSH_THEME="bira"
#export ZSH_THEME="dst"
#export ZSH_THEME="alanpeabody"
#export ZSH_THEME="random"

# Set to this to use case-sensitive completion
# export CASE_SENSITIVE="true"

# Comment this out to disable weekly auto-update checks
# export DISABLE_AUTO_UPDATE="true"

# Uncomment following line if you want to disable colors in ls
# export DISABLE_LS_COLORS="true"

# Uncomment following line if you want to disable autosetting terminal title.
# export DISABLE_AUTO_TITLE="true"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Example format: plugins=(rails git textmate ruby lighthouse)
plugins=(git ruby heroku gem bundle rails3 rake screen ssh-agent vundle zeus)

source $ZSH/oh-my-zsh.sh
#source $HOME/.rake_completion.zsh
# I compiled my own vim into a local directory to get everything I wanted, add that to my path first.
PATH="/usr/local/sbin:/usr/local/share/npm/bin:$PATH"
PATH="$HOME/bin:/usr/local/bin:$PATH"
# For jruby, this setting almost halves startup time of the JVM by setting it to 32bit client mode.
#export JAVA_OPTS="-d32"
export JRUBY_OPTS="-Xcompile.invokedynamic=true"
#export JAVACMD=drip
#export RACK_ENV="development"
#export RAILS_ENV="development"
export BYOBU_PREFIX=`brew --prefix`
export NODE_PATH="/usr/local/lib/node_modules"
#export PYTHONPATH=$(brew --prefix)/lib/python2.7/site-packages
# RVM config:
#[[ -s "/usr/local/rvm/scripts/rvm" ]] && . "/usr/local/rvm/scripts/rvm"
[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" # Load RVM function
# Had an issue with RVM not defaulting or initializing correctly. This forces it to be correct on startup.
rvm use default
PATH=$PATH:$HOME/.rvm/bin # Add RVM to PATH for scripting
#export PATH="$HOME/.rbenv/bin:$PATH"
#eval "$(rbenv init -)"
#echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile

# Better manual pages (uses -help as fallback if no man page exists)
man () {
/usr/bin/man $@ || (help $@ 2> /dev/null && help $@ | most)
}

# Extract things. Thanks to urukrama, Ubuntuforums.org  
extract () {
     if [ -f $1 ] ; then
         case $1 in
             *.tar.bz2)   tar xjf $1;;
             *.tar.gz)    tar xzf $1;;
             *.bz2)       bunzip2 $1;;
             *.rar)       rar x $1;;
             *.gz)        gunzip $1;;
             *.tar)       tar xf $1;;
             *.tbz2)      tar xjf $1;;
             *.tgz)       tar xzf $1;;
             *.zip)       unzip $1;;
             *.Z)         uncompress $1;;
             *.7z)        7z x $1;;
             *)           echo "'$1' cannot be extracted via extract()" ;;
         esac
     else
         echo "'$1' is not a valid file"
     fi
}

source $HOME/.aliases
