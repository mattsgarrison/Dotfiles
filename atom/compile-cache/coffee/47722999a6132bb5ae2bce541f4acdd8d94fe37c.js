(function() {
  var $, $$$, CoffeePreviewView, EditorView, ScrollView, coffeescript, path, _, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  path = require('path');

  _ref = require('atom'), $ = _ref.$, $$$ = _ref.$$$, ScrollView = _ref.ScrollView, EditorView = _ref.EditorView;

  coffeescript = require('coffee-script');

  _ = require('underscore-plus');

  module.exports = CoffeePreviewView = (function(_super) {
    __extends(CoffeePreviewView, _super);

    atom.deserializers.add(CoffeePreviewView);

    CoffeePreviewView.deserialize = function(state) {
      return new CoffeePreviewView(state);
    };

    CoffeePreviewView.content = function() {
      return this.div({
        "class": 'coffeescript-preview native-key-bindings editor editor-colors',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.div({
            outlet: 'codeBlock'
          });
          return _this.div({
            outlet: 'message'
          });
        };
      })(this));
    };

    function CoffeePreviewView() {
      this.renderHTMLCode = __bind(this.renderHTMLCode, this);
      this.changeHandler = __bind(this.changeHandler, this);
      this.handleTabChanges = __bind(this.handleTabChanges, this);
      CoffeePreviewView.__super__.constructor.apply(this, arguments);
      atom.workspaceView.on('pane-container:active-pane-item-changed', this.handleTabChanges);
      atom.config.observe('editor.fontSize', (function(_this) {
        return function() {
          return _this.changeHandler();
        };
      })(this));
      atom.config.observe('coffeescript-preview.refreshDebouncePeriod', (function(_this) {
        return function(wait) {
          return _this.debouncedRenderHTMLCode = _.debounce(_this.renderHTMLCode.bind(_this), wait);
        };
      })(this));
    }

    CoffeePreviewView.prototype.serialize = function() {
      return {
        deserializer: 'CoffeePreviewView',
        filePath: this.getPath(),
        editorId: this.editorId
      };
    };

    CoffeePreviewView.prototype.destroy = function() {
      this.unsubscribe();
      return atom.workspaceView.off('pane-container:active-pane-item-changed', this.handleTabChanges);
    };

    CoffeePreviewView.prototype.subscribeToFilePath = function(filePath) {
      this.trigger('title-changed');
      this.handleEvents();
      return this.renderHTML();
    };

    CoffeePreviewView.prototype.resolveEditor = function(editorId) {
      var resolve;
      resolve = (function(_this) {
        return function() {
          var _ref1;
          _this.editor = _this.editorForId(editorId);
          if (_this.editor != null) {
            if (_this.editor != null) {
              _this.trigger('title-changed');
            }
            return _this.handleEvents();
          } else {
            return (_ref1 = _this.parents('.pane').view()) != null ? _ref1.destroyItem(_this) : void 0;
          }
        };
      })(this);
      if (atom.workspace != null) {
        return resolve();
      } else {
        return this.subscribe(atom.packages.once('activated', (function(_this) {
          return function() {
            resolve();
            return _this.renderHTML();
          };
        })(this)));
      }
    };

    CoffeePreviewView.prototype.editorForId = function(editorId) {
      var editor, _i, _len, _ref1, _ref2;
      _ref1 = atom.workspace.getEditors();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        editor = _ref1[_i];
        if (((_ref2 = editor.id) != null ? _ref2.toString() : void 0) === editorId.toString()) {
          return editor;
        }
      }
      return null;
    };

    CoffeePreviewView.prototype.handleTabChanges = function() {
      var currEditor, grammar, updateOnTabChange;
      updateOnTabChange = atom.config.get('coffeescript-preview.updateOnTabChange');
      if (updateOnTabChange) {
        currEditor = atom.workspace.getActiveEditor();
        if (currEditor != null) {
          grammar = currEditor.getGrammar().name;
          if (grammar === "CoffeeScript" || grammar === "CofffeeScript (Literate)") {
            this.unsubscribe();
            this.editor = currEditor;
            this.editorId = this.editor.id;
            this.handleEvents();
            return this.changeHandler();
          }
        }
      }
    };

    CoffeePreviewView.prototype.handleEvents = function() {
      if (this.editor != null) {
        this.subscribe(this.editor.getBuffer(), 'contents-modified', this.changeHandler);
        return this.subscribe(this.editor, 'path-changed', (function(_this) {
          return function() {
            return _this.trigger('title-changed');
          };
        })(this));
      }
    };

    CoffeePreviewView.prototype.changeHandler = function() {
      var pane;
      this.renderHTML();
      pane = atom.workspace.paneForUri(this.getUri());
      if ((pane != null) && pane !== atom.workspace.getActivePane()) {
        return pane.activateItem(this);
      }
    };

    CoffeePreviewView.prototype.renderHTML = function() {
      if (this.editor != null) {
        if (this.text() === "") {
          return this.forceRenderHTML();
        } else {
          return this.debouncedRenderHTMLCode();
        }
      }
    };

    CoffeePreviewView.prototype.forceRenderHTML = function() {
      if (this.editor != null) {
        return this.renderHTMLCode();
      }
    };

    CoffeePreviewView.prototype.renderHTMLCode = function() {
      var codeBlock, coffeeText, e, fontSize, grammar, htmlEolInvisibles, lineText, text, tokens, _i, _len, _ref1;
      this.showLoading();
      this.trigger('title-changed');
      coffeeText = this.editor.getText();
      try {
        text = coffeescript.compile(coffeeText);
      } catch (_error) {
        e = _error;
        return this.showError(e);
      }
      grammar = atom.syntax.selectGrammar("source.js", text);
      codeBlock = this.codeBlock.find('pre');
      if (codeBlock.length === 0) {
        codeBlock = $('<pre/>');
        this.codeBlock.append(codeBlock);
      }
      codeBlock.empty();
      codeBlock.addClass('editor-colors');
      htmlEolInvisibles = '';
      _ref1 = grammar.tokenizeLines(text).slice(0, -1);
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        tokens = _ref1[_i];
        lineText = _.pluck(tokens, 'value').join('');
        codeBlock.append(EditorView.buildLineHtml({
          tokens: tokens,
          text: lineText,
          htmlEolInvisibles: htmlEolInvisibles
        }));
      }
      this.message.empty();
      this.trigger('coffeescript-preview:html-changed');
      fontSize = atom.config.get('editor.fontSize');
      if (fontSize != null) {
        return codeBlock.css('font-size', fontSize);
      }
    };

    CoffeePreviewView.prototype.syncScroll = function() {
      var editorView, height, scrollView, y;
      console.log('Sync scroll');
      editorView = atom.workspaceView.getActiveView();
      if ((typeof editorView.getEditor === "function" ? editorView.getEditor() : void 0) === this.editor) {
        scrollView = editorView.scrollView;
        height = scrollView[0].scrollHeight;
        return y = scrollView.scrollTop();
      }
    };

    CoffeePreviewView.prototype.getTitle = function() {
      if (this.editor != null) {
        return "" + (this.editor.getTitle()) + " Preview";
      } else {
        return "CoffeeScript Preview";
      }
    };

    CoffeePreviewView.prototype.getUri = function() {
      return "coffeescript-preview://editor";
    };

    CoffeePreviewView.prototype.getPath = function() {
      if (this.editor != null) {
        return this.editor.getPath();
      }
    };

    CoffeePreviewView.prototype.showError = function(result) {
      var failureMessage;
      failureMessage = result != null ? result.message : void 0;
      this.codeBlock.empty();
      return this.message.html($$$(function() {
        return this.div({
          "class": 'coffee-preview-spinner',
          style: 'text-align: center'
        }, (function(_this) {
          return function() {
            _this.span({
              "class": 'loading loading-spinner-large inline-block'
            });
            _this.div({
              "class": 'text-highlight'
            }, 'Previewing CoffeeScript Failed\u2026', function() {
              return _this.div({
                "class": 'text-error'
              }, failureMessage != null ? failureMessage : void 0);
            });
            return _this.div({
              "class": 'text-warning'
            }, result != null ? result.stack : void 0);
          };
        })(this));
      }));
    };

    CoffeePreviewView.prototype.showLoading = function() {
      this.codeBlock.empty();
      return this.message.html($$$(function() {
        return this.div({
          "class": 'coffee-preview-spinner',
          style: 'text-align: center'
        }, (function(_this) {
          return function() {
            _this.span({
              "class": 'loading loading-spinner-large inline-block'
            });
            return _this.div({
              "class": 'text-highlight'
            }, 'Loading HTML Preview\u2026');
          };
        })(this));
      }));
    };

    return CoffeePreviewView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhFQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLE9BQW1DLE9BQUEsQ0FBUSxNQUFSLENBQW5DLEVBQUMsU0FBQSxDQUFELEVBQUksV0FBQSxHQUFKLEVBQVMsa0JBQUEsVUFBVCxFQUFxQixrQkFBQSxVQURyQixDQUFBOztBQUFBLEVBRUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxlQUFSLENBRmYsQ0FBQTs7QUFBQSxFQUdBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FISixDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHdDQUFBLENBQUE7O0FBQUEsSUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQW5CLENBQXVCLGlCQUF2QixDQUFBLENBQUE7O0FBQUEsSUFFQSxpQkFBQyxDQUFBLFdBQUQsR0FBYyxTQUFDLEtBQUQsR0FBQTthQUNSLElBQUEsaUJBQUEsQ0FBa0IsS0FBbEIsRUFEUTtJQUFBLENBRmQsQ0FBQTs7QUFBQSxJQUtBLGlCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQ0U7QUFBQSxRQUFBLE9BQUEsRUFBTywrREFBUDtBQUFBLFFBQ0EsUUFBQSxFQUFVLENBQUEsQ0FEVjtPQURGLEVBR0UsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNFLFVBQUEsS0FBQyxDQUFBLEdBQUQsQ0FDRTtBQUFBLFlBQUEsTUFBQSxFQUFRLFdBQVI7V0FERixDQUFBLENBQUE7aUJBRUEsS0FBQyxDQUFBLEdBQUQsQ0FDRTtBQUFBLFlBQUEsTUFBQSxFQUFRLFNBQVI7V0FERixFQUhGO1FBQUEsRUFBQTtN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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/coffeescript-preview/lib/coffeescript-preview-view.coffee