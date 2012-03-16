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
plugins=(git git-flow ruby bundle rails3)

source $ZSH/oh-my-zsh.sh
source $HOME/.rake_completion.zsh
# I compiled my own vim into a local directory to get everything I wanted, add that to my path first.
PATH="$HOME/bin:$PATH"
export RACK_ENV="development"
export RAILS_ENV="development"

# ZSH confuses bracket globbing with Rake's parameter passing style
alias rake='noglob rake'

# Tired of typing my ssh key password 20 times an hour.
if [ -f ~/.agent.env ] ; then
    . ~/.agent.env > /dev/null
if ! kill -0 $SSH_AGENT_PID > /dev/null 2>&1; then
    echo "Stale agent file found. Spawning new agent… "
    eval `ssh-agent | tee ~/.agent.env`
    ssh-add
fi 
else
    echo "Starting ssh-agent"
    eval `ssh-agent | tee ~/.agent.env`
    ssh-add
fi

# Customize to your needs...
[[ -s "/usr/local/rvm/scripts/rvm" ]] && . "/usr/local/rvm/scripts/rvm"
# Had an issue with RVM not defaulting or initializing correctly. This forces it to be correct on startup.
rvm use default

PATH=$PATH:$HOME/.rvm/bin # Add RVM to PATH for scripting
