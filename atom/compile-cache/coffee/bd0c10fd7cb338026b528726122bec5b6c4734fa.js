(function() {
  var AutocompleteView, RubyMotionAutocompleteView, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('underscore-plus');

  AutocompleteView = require(atom.packages.resolvePackagePath('autocomplete') + '/lib/autocomplete-view');

  module.exports = RubyMotionAutocompleteView = (function(_super) {
    __extends(RubyMotionAutocompleteView, _super);

    function RubyMotionAutocompleteView() {
      return RubyMotionAutocompleteView.__super__.constructor.apply(this, arguments);
    }

    RubyMotionAutocompleteView.prototype.snippetPrefixes = [];

    RubyMotionAutocompleteView.prototype.initialize = function(editorView) {
      this.editorView = editorView;
      return RubyMotionAutocompleteView.__super__.initialize.apply(this, arguments);
    };

    RubyMotionAutocompleteView.prototype.buildWordList = function() {
      return this.wordList = this.snippetPrefixes;
    };

    RubyMotionAutocompleteView.prototype.handleEvents = function() {
      this.list.on('mousewheel', function(event) {
        return event.stopPropagation();
      });
      this.editorView.on('editor:path-changed', (function(_this) {
        return function() {
          return _this.setCurrentBuffer(_this.editor.getBuffer());
        };
      })(this));
      this.editorView.command('rubymotion-autocomplete:toggle', (function(_this) {
        return function() {
          if (_this.hasParent()) {
            return _this.cancel();
          } else {
            return _this.attach();
          }
        };
      })(this));
      this.editorView.command('rubymotion-autocomplete:next', (function(_this) {
        return function() {
          return _this.selectNextItemView();
        };
      })(this));
      this.editorView.command('rubymotion-autocomplete:previous', (function(_this) {
        return function() {
          return _this.selectPreviousItemView();
        };
      })(this));
      return this.filterEditorView.preempt('textInput', (function(_this) {
        return function(_arg) {
          var originalEvent, text;
          originalEvent = _arg.originalEvent;
          text = originalEvent.data;
          if (!text.match(_this.wordRegex)) {
            _this.confirmSelection();
            _this.editor.insertText(text);
            return false;
          }
        };
      })(this));
    };

    RubyMotionAutocompleteView.prototype.confirmed = function(match) {
      var position;
      this.editor.getSelection().clear();
      this.cancel();
      if (!match) {
        return;
      }
      this.replaceSelectedTextWithMatch(match);
      position = this.editor.getCursorBufferPosition();
      this.editor.setCursorBufferPosition([position.row, position.column + match.suffix.length]);
      return this.editorView.trigger('snippets:expand');
    };

    return RubyMotionAutocompleteView;

  })(AutocompleteView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBQUosQ0FBQTs7QUFBQSxFQUNBLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFkLENBQWlDLGNBQWpDLENBQUEsR0FBbUQsd0JBQTNELENBRG5CLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osaURBQUEsQ0FBQTs7OztLQUFBOztBQUFBLHlDQUFBLGVBQUEsR0FBaUIsRUFBakIsQ0FBQTs7QUFBQSx5Q0FFQSxVQUFBLEdBQVksU0FBRSxVQUFGLEdBQUE7QUFDVixNQURXLElBQUMsQ0FBQSxhQUFBLFVBQ1osQ0FBQTthQUFBLDREQUFBLFNBQUEsRUFEVTtJQUFBLENBRlosQ0FBQTs7QUFBQSx5Q0FLQSxhQUFBLEdBQWUsU0FBQSxHQUFBO2FBQ2IsSUFBQyxDQUFBLFFBQUQsR0FBWSxJQUFDLENBQUEsZ0JBREE7SUFBQSxDQUxmLENBQUE7O0FBQUEseUNBUUEsWUFBQSxHQUFjLFNBQUEsR0FBQTtBQUNaLE1BQUEsSUFBQyxDQUFBLElBQUksQ0FBQyxFQUFOLENBQVMsWUFBVCxFQUF1QixTQUFDLEtBQUQsR0FBQTtlQUFXLEtBQUssQ0FBQyxlQUFOLENBQUEsRUFBWDtNQUFBLENBQXZCLENBQUEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxFQUFaLENBQWUscUJBQWYsRUFBc0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsZ0JBQUQsQ0FBa0IsS0FBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLENBQUEsQ0FBbEIsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENB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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/RubyMotion/lib/rubymotion-autocomplete-view.coffee