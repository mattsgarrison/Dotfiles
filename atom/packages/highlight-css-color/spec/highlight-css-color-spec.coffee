HighlightCssColor = require '../lib/highlight-css-color'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "HighlightCssColor", ->
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('highlightCssColor')

  describe "when the highlight-css-color:toggle event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.highlight-css-color')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.workspaceView.trigger 'highlight-css-color:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('.highlight-css-color')).toExist()
        atom.workspaceView.trigger 'highlight-css-color:toggle'
        expect(atom.workspaceView.find('.highlight-css-color')).not.toExist()
