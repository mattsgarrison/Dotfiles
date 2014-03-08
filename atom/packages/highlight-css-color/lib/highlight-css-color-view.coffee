{$,View} = require 'atom'

module.exports =
class HighlightCssColorView extends View
  @content: -> @div ""

  initialize: (serializeState) ->
    atom.workspaceView.command "highlight-css-color:toggle", => @toggle()
    atom.workspaceView.eachEditorView (e) =>
      @registerChangeHandler(e.getEditor())
    @updateUnderlayers()

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @detach()

  toggle: ->
    console.log "HighlightCssColorView was toggled!"
    if @hasParent()
      @detach()
    else
      atom.workspaceView.append(this)

  updateUnderlayers: => 
    atom.workspaceView.find('.underlayer .css-color-background').remove();
    backgrounds = []
    atom.workspaceView.find('.css.color').each ->
      position = $(this).position();
      value = $(this).text()
      background = $('<div class="css-color-background"/>').css({top: position.top, left: position.left});
      colorfunc = $(this).prevAll('.support.function')
      color = if colorfunc.text() then "#{colorfunc.text()}(#{$(this).text()})" else $(this).text()
      background.css('background-color', color)
      background.width($(this).width()).height($(this).height())
      backgrounds.push(background)
    atom.workspaceView.find('.underlayer').append(backgrounds)

  registerChangeHandler: (editor) ->
    editor.on 'contents-modified', =>
      @updateUnderlayers()
        
