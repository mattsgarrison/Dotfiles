# Path to your oh-my-zsh configuration.
export ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
export ZSH_THEME="crunch"
#export ZSH_THEME="eastwood"
#export ZSH_THEME="bira"
#export ZSH_THEME="dst"
#export ZSH_THEME="alanpeabody"
#export ZSH_THEME="random"

# oh-my-zsh plugins
plugins=(git ruby heroku gem rbenv bundler rails3 screen sublime ssh-agent vundle zeus)

source $ZSH/oh-my-zsh.sh
export PATH="$HOME/.rbenv/bin:$HOME/bin:/usr/local/bin:/usr/local/go/bin:/usr/local/sbin:/usr/local/share/npm/bin:$PATH"
export JRUBY_OPTS="-J-XX:+TieredCompilation -J-XX:TieredStopAtLevel=1 -J-noverify -Xcompile.invokedynamic=true"
export JAVACMD=$(which drip)
export DRIP_INIT_CLASS=org.jruby.main.DripMain
if which brew > /dev/null; then eval "export BYOBU_PREFIX=`brew --prefix`"; fi
export NODE_PATH="/usr/local/lib/node_modules"
export GOROOT="/usr/local/go/"
export GOPATH="$HOME/.go/"
export PATH=$PATH:$GOROOT/bin
export VAGRANT_DEFAULT_PROVIDER='vmware_fusion'
if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi
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
