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
        "class": 'coffeescript-preview native-key-bindings',
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

    function CoffeePreviewView(_arg) {
      var filePath;
      this.editorId = _arg.editorId, filePath = _arg.filePath;
      this.renderHTMLCode = __bind(this.renderHTMLCode, this);
      this.changeHandler = __bind(this.changeHandler, this);
      CoffeePreviewView.__super__.constructor.apply(this, arguments);
      if (this.editorId != null) {
        this.resolveEditor(this.editorId);
      } else {
        if (atom.workspace != null) {
          this.subscribeToFilePath(filePath);
        } else {
          this.subscribe(atom.packages.once('activated', (function(_this) {
            return function() {
              return _this.subscribeToFilePath(filePath);
            };
          })(this)));
        }
      }
      atom.workspaceView.on('pane-container:active-pane-item-changed', (function(_this) {
        return function() {
          var currEditor, grammar, updateOnTabChange;
          updateOnTabChange = atom.config.get('coffeescript-preview.updateOnTabChange');
          if (updateOnTabChange) {
            currEditor = atom.workspace.getActiveEditor();
            if (currEditor != null) {
              grammar = currEditor.getGrammar().name;
              if (grammar === "CoffeeScript" || grammar === "CofffeeScript (Literate)") {
                _this.unsubscribe();
                _this.editor = currEditor;
                _this.editorId = _this.editor.id;
                _this.handleEvents();
                _this.trigger('title-changed');
                return _this.changeHandler();
              }
            }
          }
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
      return this.unsubscribe();
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
      this.showLoading();
      if (this.editor != null) {
        return this.renderHTMLCode(this.editor.getText());
      }
    };

    CoffeePreviewView.prototype.renderHTMLCode = function(coffeeText) {
      var codeBlock, e, fontSize, grammar, htmlEolInvisibles, lineText, text, tokens, v, vs, _i, _len, _ref1;
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
      vs = atom.workspaceView.getActiveView();
      v = vs.length >= 0 ? vs[0] : null;
      if (vs === null) {
        return;
      }
      fontSize = v.style['font-size'];
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
      return "coffee-preview://editor/" + this.editorId;
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhFQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLE9BQW1DLE9BQUEsQ0FBUSxNQUFSLENBQW5DLEVBQUMsU0FBQSxDQUFELEVBQUksV0FBQSxHQUFKLEVBQVMsa0JBQUEsVUFBVCxFQUFxQixrQkFBQSxVQURyQixDQUFBOztBQUFBLEVBRUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxlQUFSLENBRmYsQ0FBQTs7QUFBQSxFQUdBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FISixDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHdDQUFBLENBQUE7O0FBQUEsSUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQW5CLENBQXVCLGlCQUF2QixDQUFBLENBQUE7O0FBQUEsSUFFQSxpQkFBQyxDQUFBLFdBQUQsR0FBYyxTQUFDLEtBQUQsR0FBQTthQUNSLElBQUEsaUJBQUEsQ0FBa0IsS0FBbEIsRUFEUTtJQUFBLENBRmQsQ0FBQTs7QUFBQSxJQUtBLGlCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQ0U7QUFBQSxRQUFBLE9BQUEsRUFBTywwQ0FBUDtBQUFBLFFBQ0EsUUFBQSxFQUFVLENBQUEsQ0FEVjtPQURGLEVBR0UsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNFLFVBQUEsS0FBQyxDQUFBLEdBQUQsQ0FDRTtBQUFBLFlBQUEsTUFBQSxFQUFRLFdBQVI7V0FERixDQUFBLENBQUE7aUJBRUEsS0FBQyxDQUFBLEdBQUQsQ0FDRTtBQUFBLFlBQUEsTUFBQSxFQUFRLFNBQVI7V0FERixFQUhGO1FBQUEsRUFBQTtN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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/coffeescript-preview/lib/coffeescript-preview-view.coffee