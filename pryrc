load '~/Dotfiles/irbrc'
warn "Loading custom pryrc"
Pry.config.editor = "vim"
begin
  require 'interactive_editor'
rescue
  warn "=> Unable to load interative_editor"
end

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
begin
  require 'hirb'
  #Hirb.enable
  #old_print = Pry.config.print
  #Pry.config.print = proc do |output, value|
  #  Hirb::View.view_or_page_output(value) || old_print.call(output, value)
  #end
rescue
  warn "=> Unable to load hirb"
end

