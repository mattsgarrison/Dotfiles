RubyTestView = require './ruby-test-view'

module.exports =
  configDefaults:
    testAllCommand: "bundle exec ruby -I test test"
    testFileCommand: "bundle exec ruby -I test {relative_path}"
    testSingleCommand: "bundle exec ruby -I test {relative_path}:{line_number}"
    rspecAllCommand: "bundle exec rspec --tty spec"
    rspecFileCommand: "bundle exec rspec --tty {relative_path}"
    rspecSingleCommand: "bundle exec rspec --tty {relative_path}:{line_number}"
    cucumberAllCommand: "bundle exec cucumber features"
    cucumberFileCommand: "bundle exec cucumber {relative_path}"
    cucumberSingleCommand: "bundle exec cucumber {relative_path}:{line_number}"

  rubyTestView: null

  activate: (state) ->
    atom.config.setDefaults "ruby-test", @configDefaults
    @rubyTestView = new RubyTestView(state.rubyTestViewState)

  deactivate: ->
    @rubyTestView.destroy()

  serialize: ->
    rubyTestViewState: @rubyTestView.serialize()
