if [ -d /etc/profile.d ]; then
  for i in /etc/profile.d/*.sh; do
    if [ -r $i ]; then
      . $i
    fi
  done
  unset i
fi


# Path to your oh-my-zsh configuration.
export ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
#export ZSH_THEME="dst"
#export ZSH_THEME="juanghurtado"
export ZSH_THEME="kolo"
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
plugins=(git git-flow ruby bundle rails3)

source $ZSH/oh-my-zsh.sh

# I compiled my own vim into a local directory to get everything I wanted, add that to my path first.
PATH="$HOME/bin:$PATH"
export RACK_ENV="development"
export RAILS_ENV="development"
export JRUBY_OPTS="--1.9"
# ZSH confuses bracket globbing with Rake's parameter passing style
alias rake='noglob rake'

# Customize to your needs...
#[[ -s "/usr/local/rvm/scripts/rvm" ]] && . "/usr/local/rvm/scripts/rvm"
# Had an issue with RVM not defaulting or initializing correctly. This forces it to be correct on startup.
#rvm use default
