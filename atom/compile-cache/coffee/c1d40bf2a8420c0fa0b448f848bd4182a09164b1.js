(function() {
  var LinterView, fs, log, temp, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('lodash');

  fs = require('fs');

  temp = require('temp');

  log = require('./utils').log;

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
      this.statusBarView = statusBarView;
      this.markers = null;
      this.guttersShowing = false;
      this.initLinters(linters);
      this.subscriptions.push(atom.workspaceView.on('pane:item-removed', (function(_this) {
        return function() {
          return _this.statusBarView.hide();
        };
      })(this)));
      this.subscriptions.push(atom.workspaceView.on('pane:active-item-changed', (function(_this) {
        return function() {
          var _ref;
          _this.statusBarView.hide();
          if (_this.editor.id === ((_ref = atom.workspace.getActiveEditor()) != null ? _ref.id : void 0)) {
            return _this.displayStatusBar();
          }
        };
      })(this)));
      this.handleBufferEvents();
      this.handleConfigChanges();
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
          return _this.display();
        };
      })(this)));
      this.subscriptions.push(atom.config.observe('linter.showErrorInStatusBar', (function(_this) {
        return function(showMessagesAroundCursor) {
          _this.showMessagesAroundCursor = showMessagesAroundCursor;
          return _this.displayStatusBar();
        };
      })(this)));
      return this.subscriptions.push(atom.config.observe('linter.showHighlighting', (function(_this) {
        return function(showHighlighting) {
          _this.showHighlighting = showHighlighting;
          return _this.display();
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
      this.subscriptions.push(atom.workspaceView.on('pane:active-item-changed', (function(_this) {
        return function() {
          var _ref;
          if (_this.editor.id === ((_ref = atom.workspace.getActiveEditor()) != null ? _ref.id : void 0)) {
            if (_this.lintOnEditorFocus) {
              return _this.throttledLint();
            }
          }
        };
      })(this)));
      return atom.workspaceView.command("linter:lint", (function(_this) {
        return function() {
          return _this.lint();
        };
      })(this));
    };

    LinterView.prototype.lint = function() {
      this.totalProcessed = 0;
      this.messages = [];
      this.destroyMarkers();
      if (this.linters.length > 0) {
        return temp.open({
          suffix: this.editor.getGrammar().scopeName
        }, (function(_this) {
          return function(err, info) {
            info.completedLinters = 0;
            return fs.write(info.fd, _this.editor.getText(), function() {
              return fs.close(info.fd, function(err) {
                var linter, _i, _len, _ref, _results;
                _ref = _this.linters;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  linter = _ref[_i];
                  _results.push(linter.lintFile(info.path, function(messages) {
                    return _this.processMessage(messages, info, linter);
                  }));
                }
                return _results;
              });
            });
          };
        })(this));
      }
    };

    LinterView.prototype.processMessage = function(messages, tempFileInfo, linter) {
      log("linter returned", linter, messages);
      tempFileInfo.completedLinters++;
      if (tempFileInfo.completedLinters === this.linters.length) {
        fs.unlink(tempFileInfo.path);
      }
      this.messages = this.messages.concat(messages);
      return this.display();
    };

    LinterView.prototype.destroyMarkers = function() {
      var m, _i, _len, _ref;
      if (this.markers == null) {
        return;
      }
      _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        m.destroy();
      }
      return this.markers = null;
    };

    LinterView.prototype.display = function() {
      var klass, marker, message, _i, _len, _ref;
      this.destroyMarkers();
      if (this.showGutters && !this.guttersShowing) {
        this.guttersShowing = true;
        this.editorView.gutter.addClass("linter-gutter-enabled");
      } else if (!this.showGutters && this.guttersShowing) {
        this.guttersShowing = false;
        this.editorView.gutter.removeClass("linter-gutter-enabled");
      }
      if (this.markers == null) {
        this.markers = [];
      }
      _ref = this.messages;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        message = _ref[_i];
        klass = message.level === 'error' ? 'linter-error' : message.level === 'warning' ? 'linter-warning' : void 0;
        if (klass == null) {
          continue;
        }
        marker = this.editor.markBufferRange(message.range, {
          invalidate: 'never'
        });
        this.markers.push(marker);
        if (this.showGutters) {
          this.editor.decorateMarker(marker, {
            type: 'gutter',
            "class": klass
          });
        }
        if (this.showHighlighting) {
          this.editor.decorateMarker(marker, {
            type: 'highlight',
            "class": klass
          });
        }
      }
      return this.displayStatusBar();
    };

    LinterView.prototype.displayStatusBar = function() {
      if (this.showMessagesAroundCursor) {
        return this.statusBarView.render(this.messages, this.editor);
      } else {
        return this.statusBarView.render([], this.editor);
      }
    };

    LinterView.prototype.remove = function() {
      var subscription, _i, _len, _ref, _results;
      _ref = this.subscriptions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        subscription = _ref[_i];
        _results.push(subscription.off());
      }
      return _results;
    };

    return LinterView;

  })();

  module.exports = LinterView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBO0lBQUE7eUpBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVIsQ0FBSixDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFHQyxNQUFPLE9BQUEsQ0FBUSxTQUFSLEVBQVAsR0FIRCxDQUFBOztBQUFBLEVBTUEsSUFBSSxDQUFDLEtBQUwsQ0FBQSxDQU5BLENBQUE7O0FBQUEsRUFTTTtBQUVKLHlCQUFBLE9BQUEsR0FBUyxFQUFULENBQUE7O0FBQUEseUJBQ0EsY0FBQSxHQUFnQixDQURoQixDQUFBOztBQUFBLHlCQUVBLFFBQUEsR0FBVSxFQUZWLENBQUE7O0FBQUEseUJBR0EsUUFBQSxHQUFVLEVBSFYsQ0FBQTs7QUFBQSx5QkFJQSxhQUFBLEdBQWUsRUFKZixDQUFBOztBQVlhLElBQUEsb0JBQUMsVUFBRCxFQUFhLGFBQWIsRUFBNEIsT0FBNUIsR0FBQTtBQUVYLDZEQUFBLENBQUE7QUFBQSxxRUFBQSxDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLFVBQVUsQ0FBQyxNQUFyQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsVUFBRCxHQUFjLFVBRGQsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsYUFGakIsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUhYLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxjQUFELEdBQWtCLEtBSmxCLENBQUE7QUFBQSxNQU1BLElBQUMsQ0FBQSxXQUFELENBQWEsT0FBYixDQU5BLENBQUE7QUFBQSxNQVFBLElBQUMsQ0FBQSxh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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter/lib/linter-view.coffee