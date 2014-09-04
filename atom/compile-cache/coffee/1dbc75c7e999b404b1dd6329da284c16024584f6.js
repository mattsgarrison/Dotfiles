(function() {
  var $, $$$, EditorView, File, ScrollView, SvgPreviewView, path, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  path = require('path');

  _ref = require('atom'), $ = _ref.$, $$$ = _ref.$$$, EditorView = _ref.EditorView, ScrollView = _ref.ScrollView;

  _ = require('underscore-plus');

  File = require('pathwatcher').File;

  module.exports = SvgPreviewView = (function(_super) {
    __extends(SvgPreviewView, _super);

    atom.deserializers.add(SvgPreviewView);

    SvgPreviewView.deserialize = function(state) {
      return new SvgPreviewView(state);
    };

    SvgPreviewView.content = function() {
      return this.div({
        "class": 'svg-preview native-key-bindings',
        tabindex: -1
      });
    };

    function SvgPreviewView(_arg) {
      var filePath;
      this.editorId = _arg.editorId, filePath = _arg.filePath;
      SvgPreviewView.__super__.constructor.apply(this, arguments);
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
    }

    SvgPreviewView.prototype.serialize = function() {
      return {
        deserializer: 'SvgPreviewView',
        filePath: this.getPath(),
        editorId: this.editorId
      };
    };

    SvgPreviewView.prototype.destroy = function() {
      return this.unsubscribe();
    };

    SvgPreviewView.prototype.subscribeToFilePath = function(filePath) {
      this.file = new File(filePath);
      this.trigger('title-changed');
      this.handleEvents();
      return this.renderSvg();
    };

    SvgPreviewView.prototype.resolveEditor = function(editorId) {
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
            return _this.renderSvg();
          };
        })(this)));
      }
    };

    SvgPreviewView.prototype.editorForId = function(editorId) {
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

    SvgPreviewView.prototype.handleEvents = function() {
      var changeHandler;
      this.subscribe(atom.syntax, 'grammar-added grammar-updated', _.debounce(((function(_this) {
        return function() {
          return _this.renderSvg();
        };
      })(this)), 250));
      this.subscribe(this, 'core:move-up', (function(_this) {
        return function() {
          return _this.scrollUp();
        };
      })(this));
      this.subscribe(this, 'core:move-down', (function(_this) {
        return function() {
          return _this.scrollDown();
        };
      })(this));
      this.subscribeToCommand(atom.workspaceView, 'svg-preview:zoom-in', (function(_this) {
        return function() {
          var zoomLevel;
          zoomLevel = parseFloat(_this.css('zoom')) || 1;
          return _this.css('zoom', zoomLevel + .1);
        };
      })(this));
      this.subscribeToCommand(atom.workspaceView, 'svg-preview:zoom-out', (function(_this) {
        return function() {
          var zoomLevel;
          zoomLevel = parseFloat(_this.css('zoom')) || 1;
          return _this.css('zoom', zoomLevel - .1);
        };
      })(this));
      this.subscribeToCommand(atom.workspaceView, 'svg-preview:reset-zoom', (function(_this) {
        return function() {
          return _this.css('zoom', 1);
        };
      })(this));
      changeHandler = (function(_this) {
        return function() {
          var pane;
          _this.renderSvg();
          pane = atom.workspace.paneForUri(_this.getUri());
          if ((pane != null) && pane !== atom.workspace.getActivePane()) {
            return pane.activateItem(_this);
          }
        };
      })(this);
      if (this.file != null) {
        return this.subscribe(this.file, 'contents-changed', changeHandler);
      } else if (this.editor != null) {
        this.subscribe(this.editor.getBuffer(), 'contents-modified', changeHandler);
        return this.subscribe(this.editor, 'path-changed', (function(_this) {
          return function() {
            return _this.trigger('title-changed');
          };
        })(this));
      }
    };

    SvgPreviewView.prototype.renderSvg = function() {
      this.showLoading();
      if (this.file != null) {
        return this.file.read().then((function(_this) {
          return function(contents) {
            return _this.renderSvgText(contents);
          };
        })(this));
      } else if (this.editor != null) {
        return this.renderSvgText(this.editor.getText());
      }
    };

    SvgPreviewView.prototype.renderSvgText = function(text) {
      this.html(text);
      return this.trigger('svg-preview:svg-changed');
    };

    SvgPreviewView.prototype.getTitle = function() {
      if (this.file != null) {
        return "" + (path.basename(this.getPath())) + " Preview";
      } else if (this.editor != null) {
        return "" + (this.editor.getTitle()) + " Preview";
      } else {
        return "SVG Preview";
      }
    };

    SvgPreviewView.prototype.getUri = function() {
      if (this.file != null) {
        return "svg-preview://" + (this.getPath());
      } else {
        return "svg-preview://editor/" + this.editorId;
      }
    };

    SvgPreviewView.prototype.getPath = function() {
      if (this.file != null) {
        return this.file.getPath();
      } else if (this.editor != null) {
        return this.editor.getPath();
      }
    };

    SvgPreviewView.prototype.showError = function(result) {
      var failureMessage;
      failureMessage = result != null ? result.message : void 0;
      return this.html($$$(function() {
        this.h2('Previewing SVG Failed');
        if (failureMessage != null) {
          return this.h3(failureMessage);
        }
      }));
    };

    SvgPreviewView.prototype.showLoading = function() {
      return this.html($$$(function() {
        return this.div({
          "class": 'svg-spinner'
        }, 'Loading SVG\u2026');
      }));
    };

    return SvgPreviewView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1FQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsT0FBbUMsT0FBQSxDQUFRLE1BQVIsQ0FBbkMsRUFBQyxTQUFBLENBQUQsRUFBSSxXQUFBLEdBQUosRUFBUyxrQkFBQSxVQUFULEVBQXFCLGtCQUFBLFVBRHJCLENBQUE7O0FBQUEsRUFFQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBRkosQ0FBQTs7QUFBQSxFQUdDLE9BQVEsT0FBQSxDQUFRLGFBQVIsRUFBUixJQUhELENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0oscUNBQUEsQ0FBQTs7QUFBQSxJQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBbkIsQ0FBdUIsY0FBdkIsQ0FBQSxDQUFBOztBQUFBLElBRUEsY0FBQyxDQUFBLFdBQUQsR0FBYyxTQUFDLEtBQUQsR0FBQTthQUNSLElBQUEsY0FBQSxDQUFlLEtBQWYsRUFEUTtJQUFBLENBRmQsQ0FBQTs7QUFBQSxJQUtBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLGlDQUFQO0FBQUEsUUFBMEMsUUFBQSxFQUFVLENBQUEsQ0FBcEQ7T0FBTCxFQURRO0lBQUEsQ0FMVixDQUFBOztBQVFhLElBQUEsd0JBQUMsSUFBRCxHQUFBO0FBQ1gsVUFBQSxRQUFBO0FBQUEsTUFEYSxJQUFDLENBQUEsZ0JBQUEsVUFBVSxnQkFBQSxRQUN4QixDQUFBO0FBQUEsTUFBQSxpREFBQSxTQUFBLENBQUEsQ0FBQTtBQUVBLE1BQUEsSUFBRyxxQkFBSDtBQUNFLFFBQUEsSUFBQyxDQUFBLGFBQUQsQ0FBZSxJQUFDLENBQUEsUUFBaEIsQ0FBQSxDQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsSUFBRyxzQkFBSDtBQUNFLFVBQUEsSUFBQyxDQUFBLG1CQUFELENBQXFCLFFBQXJCLENBQUEsQ0FERjtTQUFBLE1BQUE7QUFHRSxVQUFBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFkLENBQW1CLFdBQW5CLEVBQWdDLENBQUEsU0FBQSxLQUFBLEdBQUE7bUJBQUEsU0FBQSxHQUFBO3FCQUN6QyxLQUFDLENBQUEsbUJBQUQsQ0FBcUIsUUFBckIsRUFEeUM7WUFBQSxFQUFBO1VBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQyxDQUFYLENBQUEsQ0FIRjtTQUhGO09BSFc7SUFBQSxDQVJiOztBQUFBLDZCQW9CQSxTQUFBLEdBQVcsU0FBQSxHQUFBO2FBQ1Q7QUFBQSxRQUFBLFlBQUEsRUFBYyxnQkFBZDtBQUFBLFFBQ0EsUUFBQSxFQUFVLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FEVjtBQUFBLFFBRUEsUUFBQSxFQUFVLElBQUMsQ0FBQSxRQUZYO1FBRFM7SUFBQSxDQXBCWCxDQUFBOztBQUFBLDZCQXlCQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLFdBQUQsQ0FBQSxFQURPO0lBQUEsQ0F6QlQsQ0FBQTs7QUFBQSw2QkE0QkEsbUJBQUEsR0FBcUIsU0FBQyxRQUFELEdBQUE7QUFDbkIsTUFBQSxJQUFDLENBQUEsSUFBRCxHQUFZLElBQUEsSUFBQSxDQUFLLFFBQUwsQ0FBWixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsT0FBRCxDQUFTLGVBQVQsQ0FEQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsWUFBRCxDQUFBLENBRkEsQ0FBQTthQUdBLElBQUMsQ0FBQSxTQUFELENBQUEsRUFKbUI7SUFBQSxDQTVCckIsQ0FBQTs7QUFBQSw2QkFrQ0EsYUFBQSxHQUFlLFNBQUMsUUFBRCxHQUFBO0FBQ2IsVUFBQSxPQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNSLGNBQUEsS0FBQTtBQUFBLFVBQUEsS0FBQyxDQUFBLE1BQUQsR0FBVSxLQUFDLENBQUEsV0FBRCxDQUFhLFFBQWIsQ0FBVixDQUFBO0FBRUEsVUFBQSxJQUFHLG9CQUFIO0FBQ0UsWUFBQSxJQUE0QixvQkFBNUI7QUFBQSxjQUFBLEtBQUMsQ0FBQSxPQUFELENBQVMsZUFBVCxDQUFBLENBQUE7YUFBQTttQkFDQSxLQUFDLENBQUEsWUFBRCxDQUFBLEVBRkY7V0FBQSxNQUFBOzBFQU0wQixDQUFFLFdBQTFCLENBQXNDLEtBQXRDLFdBTkY7V0FIUTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVYsQ0FBQTtBQVdBLE1BQUEsSUFBRyxzQkFBSDtlQUNFLE9BQUEsQ0FBQSxFQURGO09BQUEsTUFBQTtlQUdFLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFkLENBQW1CLFdBQW5CLEVBQWdDLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQ3pDLFlBQUEsT0FBQSxDQUFBLENBQUEsQ0FBQTttQkFDQSxLQUFDLENBQUEsU0FBRCxDQUFBLEVBRnlDO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEMsQ0FBWCxFQUhGO09BWmE7SUFBQSxDQWxDZixDQUFBOztBQUFBLDZCQXFEQSxXQUFBLEdBQWEsU0FBQyxRQUFELEdBQUE7QUFDWCxVQUFBLDhCQUFBO0FBQUE7QUFBQSxXQUFBLDRDQUFBOzJCQUFBO0FBQ0UsUUFBQSx3Q0FBMEIsQ0FBRSxRQUFYLENBQUEsV0FBQSxLQUF5QixRQUFRLENBQUMsUUFBVCxDQUFBLENBQTFDO0FBQUEsaUJBQU8sTUFBUCxDQUFBO1NBREY7QUFBQSxPQUFBO2FBRUEsS0FIVztJQUFBLENBckRiLENBQUE7O0FBQUEsNkJBMERBLFlBQUEsR0FBYyxTQUFBLEdBQUE7QUFDWixVQUFBLGFBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBSSxDQUFDLE1BQWhCLEVBQXdCLCtCQUF4QixFQUF5RCxDQUFDLENBQUMsUUFBRixDQUFXLENBQUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsU0FBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFELENBQVgsRUFBOEIsR0FBOUIsQ0FBekQsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsU0FBRCxDQUFXLElBQVgsRUFBaUIsY0FBakIsRUFBaUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsUUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFqQyxDQURBLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBWCxFQUFpQixnQkFBakIsRUFBbUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsVUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQyxDQUZBLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxrQkFBRCxDQUFvQixJQUFJLENBQUMsYUFBekIsRUFBd0MscUJBQXhDLEVBQStELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDN0QsY0FBQSxTQUFBO0FBQUEsVUFBQSxTQUFBLEdBQVksVUFBQSxDQUFXLEtBQUMsQ0FBQSxHQUFELENBQUssTUFBTCxDQUFYLENBQUEsSUFBNEIsQ0FBeEMsQ0FBQTtpQkFDQSxLQUFDLENBQUEsR0FBRCxDQUFLLE1BQUwsRUFBYSxTQUFBLEdBQVksRUFBekIsRUFGNkQ7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEvRCxDQUpBLENBQUE7QUFBQSxNQVFBLElBQUMsQ0FBQSxrQkFBRCxDQUFvQixJQUFJLENBQUMsYUFBekIsRUFBd0Msc0JBQXhDLEVBQWdFLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDOUQsY0FBQSxTQUFBO0FBQUEsVUFBQSxTQUFBLEdBQVksVUFBQSxDQUFXLEtBQUMsQ0FBQSxHQUFELENBQUssTUFBTCxDQUFYLENBQUEsSUFBNEIsQ0FBeEMsQ0FBQTtpQkFDQSxLQUFDLENBQUEsR0FBRCxDQUFLLE1BQUwsRUFBYSxTQUFBLEdBQVksRUFBekIsRUFGOEQ7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoRSxDQVJBLENBQUE7QUFBQSxNQVlBLElBQUMsQ0FBQSxrQkFBRCxDQUFvQixJQUFJLENBQUMsYUFBekIsRUFBd0Msd0JBQXhDLEVBQWtFLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ2hFLEtBQUMsQ0FBQSxHQUFELENBQUssTUFBTCxFQUFhLENBQWIsRUFEZ0U7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsRSxDQVpBLENBQUE7QUFBQSxNQWVBLGFBQUEsR0FBZ0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNkLGNBQUEsSUFBQTtBQUFBLFVBQUEsS0FBQyxDQUFBLFNBQUQsQ0FBQSxDQUFBLENBQUE7QUFBQSxVQUNBLElBQUEsR0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQWYsQ0FBMEIsS0FBQyxDQUFBLE1BQUQsQ0FBQSxDQUExQixDQURQLENBQUE7QUFFQSxVQUFBLElBQUcsY0FBQSxJQUFVLElBQUEsS0FBVSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBQSxDQUF2QjttQkFDRSxJQUFJLENBQUMsWUFBTCxDQUFrQixLQUFsQixFQURGO1dBSGM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQWZoQixDQUFBO0FBcUJBLE1BQUEsSUFBRyxpQkFBSDtlQUNFLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBQyxDQUFBLElBQVosRUFBa0Isa0JBQWxCLEVBQXNDLGFBQXRDLEVBREY7T0FBQSxNQUVLLElBQUcsbUJBQUg7QUFDSCxRQUFBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLENBQUEsQ0FBWCxFQUFnQyxtQkFBaEMsRUFBcUQsYUFBckQsQ0FBQSxDQUFBO2VBQ0EsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFDLENBQUEsTUFBWixFQUFvQixjQUFwQixFQUFvQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsT0FBRCxDQUFTLGVBQVQsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXBDLEVBRkc7T0F4Qk87SUFBQSxDQTFEZCxDQUFBOztBQUFBLDZCQXNGQSxTQUFBLEdBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxJQUFDLENBQUEsV0FBRCxDQUFBLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBRyxpQkFBSDtlQUNFLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFBLENBQVksQ0FBQyxJQUFiLENBQWtCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxRQUFELEdBQUE7bUJBQWMsS0FBQyxDQUFBLGFBQUQsQ0FBZSxRQUFmLEVBQWQ7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsQixFQURGO09BQUEsTUFFSyxJQUFHLG1CQUFIO2VBQ0gsSUFBQyxDQUFBLGFBQUQsQ0FBZSxJQUFDLENBQUEsTUFBTSxDQUFDLE9BQVIsQ0FBQSxDQUFmLEVBREc7T0FKSTtJQUFBLENBdEZYLENBQUE7O0FBQUEsNkJBNkZBLGFBQUEsR0FBZSxTQUFDLElBQUQsR0FBQTtBQUNiLE1BQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxJQUFOLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxPQUFELENBQVMseUJBQVQsRUFGYTtJQUFBLENBN0ZmLENBQUE7O0FBQUEsNkJBaUdBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUcsaUJBQUg7ZUFDRSxFQUFBLEdBQUUsQ0FBQSxJQUFJLENBQUMsUUFBTCxDQUFjLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FBZCxDQUFBLENBQUYsR0FBNkIsV0FEL0I7T0FBQSxNQUVLLElBQUcsbUJBQUg7ZUFDSCxFQUFBLEdBQUUsQ0FBQSxJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBQSxDQUFBLENBQUYsR0FBc0IsV0FEbkI7T0FBQSxNQUFBO2VBR0gsY0FIRztPQUhHO0lBQUEsQ0FqR1YsQ0FBQTs7QUFBQSw2QkF5R0EsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsSUFBRyxpQkFBSDtlQUNHLGdCQUFBLEdBQWUsQ0FBQSxJQUFDLENBQUEsT0FBRCxDQUFBLENBQUEsRUFEbEI7T0FBQSxNQUFBO2VBR0csdUJBQUEsR0FBc0IsSUFBQyxDQUFBLFNBSDFCO09BRE07SUFBQSxDQXpHUixDQUFBOztBQUFBLDZCQStHQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsTUFBQSxJQUFHLGlCQUFIO2VBQ0UsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQUEsRUFERjtPQUFBLE1BRUssSUFBRyxtQkFBSDtlQUNILElBQUMsQ0FBQSxNQUFNLENBQUMsT0FBUixDQUFBLEVBREc7T0FIRTtJQUFBLENBL0dULENBQUE7O0FBQUEsNkJBcUhBLFNBQUEsR0FBVyxTQUFDLE1BQUQsR0FBQTtBQUNULFVBQUEsY0FBQTtBQUFBLE1BQUEsY0FBQSxvQkFBaUIsTUFBTSxDQUFFLGdCQUF6QixDQUFBO2FBRUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxHQUFBLENBQUksU0FBQSxHQUFBO0FBQ1IsUUFBQSxJQUFDLENBQUEsRUFBRCxDQUFJLHVCQUFKLENBQUEsQ0FBQTtBQUNBLFFBQUEsSUFBc0Isc0JBQXRCO2lCQUFBLElBQUMsQ0FBQSxFQUFELENBQUksY0FBSixFQUFBO1NBRlE7TUFBQSxDQUFKLENBQU4sRUFIUztJQUFBLENBckhYLENBQUE7O0FBQUEsNkJBNEhBLFdBQUEsR0FBYSxTQUFBLEdBQUE7YUFDWCxJQUFDLENBQUEsSUFBRCxDQUFNLEdBQUEsQ0FBSSxTQUFBLEdBQUE7ZUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsVUFBQSxPQUFBLEVBQU8sYUFBUDtTQUFMLEVBQTJCLG1CQUEzQixFQURRO01BQUEsQ0FBSixDQUFOLEVBRFc7SUFBQSxDQTVIYixDQUFBOzswQkFBQTs7S0FEMkIsV0FON0IsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/svg-preview/lib/svg-preview-view.coffee