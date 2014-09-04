# Test Status Package

Adds the status of your test command to the Atom status bar, when you save a
source file.

![Test Status Usage](https://raw.github.com/tombell/test-status/master/screenshots/atom-test-status.gif)

## Installing

Use the Atom package manager, which can be found in the Settings view or run
`apm install test-status` from the command line.

## Usage

The package will run a test command depending on what files it finds in the root
of your project. For example, if you have a `Rakefile` in your project root, the
command `rake test` will be run or if you have a `Gruntfile` in your project
root then `grunt test` will be run. The priority of which command is executed is
determined by the order the mappings are defined in your configuration.

By default, the [following files](./lib/test-status.coffee#L11) are mapped to
the commands.

When your command is running the Hubot face in the status bar will turn orange.
If the command exits with 0 the Hubot face will turn green. Exiting with a
non-zero code will turn the Hubot face red.

If you would like to view the output of your command you can toggle the output
panel using the default keymapping. On Mac OS X the keymap is `cmd-l` and on
Windows the keymap is `ctrl-l`.

The following _commands_ are available for you to remap and/or run via the
command palette.

  * `test-status:toggle-output` - Toggles the test results output panel
  * `test-status:run-tests` - Runs the configured test command

## Configuring

The file to command mapping is completely configurable so you can add your
preferred test runner. Just add the overriden values to your `config.cson`. You
can now use glob style matches in the file name.

```coffeescript
'test-status':
  'spec/**/*_spec.rb': 'rake spec'
  'Gruntfile.*': 'grunt spec'
  'gulpfile': 'gulp test'
```

## Gotchyas

* Atom uses `PATH` from where it was launched. Use `atom` from the console for
  maximum sanity, as Atom from the icon pulls the PATH from whatever launchctl is
  setup from.
* When manually configuring file matches containing periods, the Settings view
  for the package will appear to be broken. This is due to Atom thinking the
  period is a keypath. You should manually edit the `config.cson` file.

## Support

If you wish to support this package and help further its development, feel free
to tip via Gittip.

[![Gittip](http://img.shields.io/gittip/tombell.png)](https://www.gittip.com/tombell/)
