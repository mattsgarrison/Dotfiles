HighlightCssColorView = require './highlight-css-color-view'

module.exports =
  highlightCssColorView: null

  activate: (state) ->
    @highlightCssColorView = new HighlightCssColorView(state.highlightCssColorViewState)

  deactivate: ->
    @highlightCssColorView.destroy()

  serialize: ->
    highlightCssColorViewState: @highlightCssColorView.serialize()
