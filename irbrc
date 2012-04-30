require 'rubygems'
require 'irb/completion'
require 'irb/ext/save-history'


begin
  require "pry"
  Pry.start
  exit
rescue LoadError => e
  warn "=> Unable to load pry"
end

begin
  require 'interactive_editor'
rescue
  warn "=> Unable to load interactive_editor"
end
require 'hirb'
require 'wirble'
require 'awesome_print'

Wirble.init
Wirble.colorize

colors = Wirble::Colorize.colors.merge({
  :object_class => :purple,
  :symbol => :purple,
  :symbol_prefix => :purple
})
Wirble::Colorize.colors = colors


Hirb.enable



class Object
  # Return only the methods not present on basic objects
  def interesting_methods
    (self.methods - Object.new.methods).sort
  end

end

module DatabaseHelpers
  extend self

  def tables
    Hirb::Console.render_output ActiveRecord::Base.connection.tables.map{|e|[e]},{
      :class   => Hirb::Helpers::AutoTable,
      :headers => %w<tables>,
    }
    true
  end

  def table(which)
    Hirb::Console.render_output ActiveRecord::Base.connection.columns(which).map{ |e|
      [e.name, e.type, e.sql_type, e.limit, e.default, e.scale, e.precision, e.primary, e.null]
    },{
      :class   => Hirb::Helpers::AutoTable,
      :headers => %w<name type sql_type limit default scale precision primary null>,
    }
    true
  end

  def counts
    Hirb::Console.render_output ActiveRecord::Base.connection.tables.map{|e|
      [e, ActiveRecord::Base.connection.select_value("SELECT COUNT(*) FROM #{e}")]
    },{
      :class   => Hirb::Helpers::AutoTable,
      :headers => %w<table count>,
    }
    true
  end

  # ...
end
def db
  DatabaseHelpers
end

def sql(query)
    ActiveRecord::Base.connection.select_all(query)
end

#MaybeYouMeant::Config.call_nearby = false
