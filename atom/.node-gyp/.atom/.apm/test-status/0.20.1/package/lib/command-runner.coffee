path    = require 'path'
{spawn} = require 'child_process'

glob    = require 'glob'

module.exports =
# Internal: Finds the correct test command to run based on what "file" it can
# find in the project root.
class CommandRunner

  # Internal: Initialize the command runner with the views for rendering the
  # output.
  #
  # @testStatus - A space-pen outlet for the test status icon element.
  # @testStatusView - A space-pen view for the test status output element.
  constructor: (@testStatus, @testStatusView) ->

  # Internal: Run the test command based on configuration priority.
  #
  # Returns nothing.
  run: ->
    return unless atom.project.path?

    cfg = atom.config.get('test-status')
    cmd = null

    for file in Object.keys(cfg)
      pattern = path.join(atom.project.path, file)
      matches = glob.sync(pattern)

      if matches.length > 0
        cmd = cfg[file]
        break

    return unless cmd
    @execute(cmd)

  # Internal: Execute the command and render the output.
  #
  # cmd - A string of the command to run, including arguments.
  #
  # Returns nothing.
  execute: (cmd) ->
    @testStatus.removeClass('success fail').addClass('pending')

    cmd = cmd.split(' ')

    try
      proc = spawn(cmd.shift(), cmd, cwd: atom.project.path)
      output = ''

      proc.stdout.on 'data', (data) ->
        output += data.toString()

      proc.stderr.on 'data', (data) ->
        output += data.toString()

      proc.on 'close', (code) =>
        @testStatusView.update(output)

        if code is 0
          atom.emit 'test-status:success'
          @testStatus.removeClass('pending fail').addClass('success')
        else
          atom.emit 'test-status:fail'
          @testStatus.removeClass('pending success').addClass('fail')
    catch err
      @testStatus.removeClass('pending success').addClass('fail')
      @testStatusView.update('An error occured while attempting to run the test command')
