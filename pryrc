require 'interactive_editor'
load '~/Dotfiles/irbrc'
warn "Loading custom pryrc"
Pry.config.editor = "vim"

begin
  require 'pry-debugger'
  Pry.commands.alias_command 'c', 'continue'
  Pry.commands.alias_command 's', 'step'
  Pry.commands.alias_command 'n', 'next'
rescue
  warn "=> Unable to load pry-debugger"
end

begin 
  require "awesome_print"
  AwesomePrint.pry!
rescue
  warn "=> Unable to load awesome_print"
end
