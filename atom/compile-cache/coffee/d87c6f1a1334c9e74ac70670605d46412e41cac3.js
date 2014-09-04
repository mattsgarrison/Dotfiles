(function() {
  var GutterView, HighlightsView, LinterView, XRegExp, child, exec, fs, temp, _, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('lodash');

  fs = require('fs');

  temp = require('temp');

  _ref = require('child_process'), exec = _ref.exec, child = _ref.child;

  XRegExp = require('xregexp').XRegExp;

  GutterView = require('./gutter-view');

  HighlightsView = require('./highlights-view');

  temp.track();

  LinterView = (function() {
    LinterView.prototype.linters = [];

    LinterView.prototype.totalProcessed = 0;

    LinterView.prototype.tempFile = '';

    LinterView.prototype.messages = [];

    LinterView.prototype.subscriptions = [];

    function LinterView(editorView, statusBarView, linters) {
      this.processMessage = __bind(this.processMessage, this);
      this.handleBufferEvents = __bind(this.handleBufferEvents, this);
      this.editor = editorView.editor;
      this.editorView = editorView;
      this.gutterView = new GutterView(editorView);
      this.HighlightsView = new HighlightsView(editorView);
      this.statusBarView = statusBarView;
      this.initLinters(linters);
      this.subscriptions.push(atom.workspaceView.on('pane:item-removed', (function(_this) {
        return function() {
          return _this.statusBarView.hide();
        };
      })(this)));
      this.subscriptions.push(atom.workspaceView.on('pane:active-item-changed', (function(_this) {
        return function() {
          var _ref1;
          _this.statusBarView.hide();
          if (_this.editor.id === ((_ref1 = atom.workspace.getActiveEditor()) != null ? _ref1.id : void 0)) {
            return _this.displayStatusBar();
          }
        };
      })(this)));
      this.handleBufferEvents();
      this.handleConfigChanges();
      this.subscriptions.push(this.editorView.on('editor:display-updated', (function(_this) {
        return function() {
          return _this.displayGutterMarkers();
        };
      })(this)));
      this.subscriptions.push(this.editorView.on('cursor:moved', (function(_this) {
        return function() {
          return _this.displayStatusBar();
        };
      })(this)));
    }

    LinterView.prototype.initLinters = function(linters) {
      var grammarName, linter, sytaxType, _i, _len, _results;
      this.linters = [];
      grammarName = this.editor.getGrammar().scopeName;
      _results = [];
      for (_i = 0, _len = linters.length; _i < _len; _i++) {
        linter = linters[_i];
        sytaxType = {}.toString.call(linter.syntax);
        if (sytaxType === '[object Array]' && __indexOf.call(linter.syntax, grammarName) >= 0 || sytaxType === '[object String]' && grammarName === linter.syntax) {
          _results.push(this.linters.push(new linter(this.editor)));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    LinterView.prototype.handleConfigChanges = function() {
      this.subscriptions.push(atom.config.observe('linter.lintOnSave', (function(_this) {
        return function(lintOnSave) {
          return _this.lintOnSave = lintOnSave;
        };
      })(this)));
      this.subscriptions.push(atom.config.observe('linter.lintOnChangeInterval', (function(_this) {
        return function(lintOnModifiedDelayMS) {
          var throttleInterval;
          throttleInterval = parseInt(lintOnModifiedDelayMS);
          if (isNaN(throttleInterval)) {
            throttleInterval = 1000;
          }
          return _this.throttledLint = (_.throttle(_this.lint, throttleInterval)).bind(_this);
        };
      })(this)));
      this.subscriptions.push(atom.config.observe('linter.lintOnChange', (function(_this) {
        return function(lintOnModified) {
          return _this.lintOnModified = lintOnModified;
        };
      })(this)));
      this.subscriptions.push(atom.config.observe('linter.lintOnEditorFocus', (function(_this) {
        return function(lintOnEditorFocus) {
          return _this.lintOnEditorFocus = lintOnEditorFocus;
        };
      })(this)));
      this.subscriptions.push(atom.config.observe('linter.showGutters', (function(_this) {
        return function(showGutters) {
          _this.showGutters = showGutters;
          return _this.displayGutterMarkers();
        };
      })(this)));
      this.subscriptions.push(atom.config.observe('linter.showErrorInStatusBar', (function(_this) {
        return function(showMessagesAroundCursor) {
          _this.showMessagesAroundCursor = showMessagesAroundCursor;
          return _this.displayStatusBar();
        };
      })(this)));
      return this.subscriptions.push(atom.config.observe('linter.showHightlighting', (function(_this) {
        return function(showHightlighting) {
          _this.showHightlighting = showHightlighting;
          return _this.displayHighlights();
        };
      })(this)));
    };

    LinterView.prototype.handleBufferEvents = function() {
      var buffer;
      buffer = this.editor.getBuffer();
      this.subscriptions.push(buffer.on('reloaded saved', (function(_this) {
        return function(buffer) {
          if (_this.lintOnSave) {
            return _this.throttledLint();
          }
        };
      })(this)));
      this.subscriptions.push(buffer.on('destroyed', function() {
        buffer.off('reloaded saved');
        return buffer.off('destroyed');
      }));
      this.subscriptions.push(this.editor.on('contents-modified', (function(_this) {
        return function() {
          if (_this.lintOnModified) {
            return _this.throttledLint();
          }
        };
      })(this)));
      return this.subscriptions.push(atom.workspaceView.on('pane:active-item-changed', (function(_this) {
        return function() {
          var _ref1;
          if (_this.editor.id === ((_ref1 = atom.workspace.getActiveEditor()) != null ? _ref1.id : void 0)) {
            if (_this.lintOnEditorFocus) {
              return _this.throttledLint();
            }
          }
        };
      })(this)));
    };

    LinterView.prototype.lint = function() {
      this.totalProcessed = 0;
      this.messages = [];
      this.gutterView.clear();
      this.HighlightsView.removeHighlights();
      if (this.linters.length > 0) {
        return temp.open({
          suffix: this.editor.getGrammar().scopeName
        }, (function(_this) {
          return function(err, info) {
            info.completedLinters = 0;
            return fs.write(info.fd, _this.editor.getText(), function() {
              return fs.close(info.fd, function(err) {
                var linter, _i, _len, _ref1, _results;
                _ref1 = _this.linters;
                _results = [];
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  linter = _ref1[_i];
                  _results.push(linter.lintFile(info.path, function(messages) {
                    return _this.processMessage(messages, info);
                  }));
                }
                return _results;
              });
            });
          };
        })(this));
      }
    };

    LinterView.prototype.processMessage = function(messages, tempFileInfo) {
      tempFileInfo.completedLinters++;
      this.messages = this.messages.concat(messages);
      if (tempFileInfo.completedLinters === this.linters.length) {
        fs.unlink(tempFileInfo.path);
      }
      return this.display();
    };

    LinterView.prototype.display = function() {
      this.displayGutterMarkers();
      this.displayHighlights();
      return this.displayStatusBar();
    };

    LinterView.prototype.displayGutterMarkers = function() {
      if (this.showGutters) {
        return this.gutterView.render(this.messages);
      } else {
        return this.gutterView.render([]);
      }
    };

    LinterView.prototype.displayHighlights = function() {
      if (this.showHightlighting) {
        return this.HighlightsView.setHighlights(this.messages);
      } else {
        return this.HighlightsView.removeHighlights();
      }
    };

    LinterView.prototype.displayStatusBar = function() {
      if (this.showMessagesAroundCursor) {
        return this.statusBarView.render(this.messages, this.editor);
      } else {
        return this.statusBarView.render([], this.editor);
      }
    };

    LinterView.prototype.remove = function() {
      var subscription, _i, _len, _ref1, _results;
      _ref1 = this.subscriptions;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        subscription = _ref1[_i];
        _results.push(subscription.off());
      }
      return _results;
    };

    return LinterView;

  })();

  module.exports = LinterView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtFQUFBO0lBQUE7eUpBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVIsQ0FBSixDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFHQSxPQUFnQixPQUFBLENBQVEsZUFBUixDQUFoQixFQUFDLFlBQUEsSUFBRCxFQUFPLGFBQUEsS0FIUCxDQUFBOztBQUFBLEVBS0MsVUFBVyxPQUFBLENBQVEsU0FBUixFQUFYLE9BTEQsQ0FBQTs7QUFBQSxFQU9BLFVBQUEsR0FBYSxPQUFBLENBQVEsZUFBUixDQVBiLENBQUE7O0FBQUEsRUFRQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSxtQkFBUixDQVJqQixDQUFBOztBQUFBLEVBVUEsSUFBSSxDQUFDLEtBQUwsQ0FBQSxDQVZBLENBQUE7O0FBQUEsRUFhTTtBQUVKLHlCQUFBLE9BQUEsR0FBUyxFQUFULENBQUE7O0FBQUEseUJBQ0EsY0FBQSxHQUFnQixDQURoQixDQUFBOztBQUFBLHlCQUVBLFFBQUEsR0FBVSxFQUZWLENBQUE7O0FBQUEseUJBR0EsUUFBQSxHQUFVLEVBSFYsQ0FBQTs7QUFBQSx5QkFJQSxhQUFBLEdBQWUsRUFKZixDQUFBOztBQVlhLElBQUEsb0JBQUMsVUFBRCxFQUFhLGFBQWIsRUFBNEIsT0FBNUIsR0FBQTtBQUVYLDZEQUFBLENBQUE7QUFBQSxxRUFBQSxDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLFVBQVUsQ0FBQyxNQUFyQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsVUFBRCxHQUFjLFVBRGQsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFVB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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter/lib/linter-view.coffee