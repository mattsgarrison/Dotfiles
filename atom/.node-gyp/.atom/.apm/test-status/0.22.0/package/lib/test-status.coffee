fs   = require 'fs'
path = require 'path'

TestStatusStatusBarView = require './test-status-status-bar-view'

module.exports =
  # Public: Active the package and initialize the test-status views.
  #
  # Returns nothing.
  activate: ->
    atom.config.setDefaults('test-status', {
      'Makefile':          'make test'
      'script/test':       'script/test'
      'script/cibuild':    'script/cibuild'

      'test/**/*_test.rb': 'rake test',
      'spec/**/*_spec.rb': 'rake spec',

      'Gruntfile.*':       'grunt test'
      'gulpfile.*':        'gulp test'
      'test/mocha.opts':   'mocha'

      'deft-package.json': 'deft test'

      '*_test.go':         'go test -v .'

      'phpunit.xml':       'phpunit'

      'setup.py':          'python setup.py test'
    })

    createStatusEntry = =>
      @testStatusStatusBar = new TestStatusStatusBarView

    if atom.workspaceView.statusBar
      createStatusEntry()
    else
      atom.packages.once 'activated', ->
        createStatusEntry()

  # Public: Deactivate the package and destroy the test-status views.
  #
  # Returns nothing.
  deactivate: ->
    @testStatusStatusBar?.destroy()
    @testStatusStatusBar = null
