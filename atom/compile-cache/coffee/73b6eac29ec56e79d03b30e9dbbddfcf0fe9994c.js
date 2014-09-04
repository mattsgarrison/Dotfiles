(function() {
  var StatusBarView, View, copyPaste,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  copyPaste = require('copy-paste').noConflict().silent();

  StatusBarView = (function(_super) {
    __extends(StatusBarView, _super);

    function StatusBarView() {
      return StatusBarView.__super__.constructor.apply(this, arguments);
    }

    StatusBarView.content = function() {
      return this.div({
        "class": 'tool-panel panel-bottom padded text-smaller'
      }, (function(_this) {
        return function() {
          return _this.dl({
            "class": 'linter-statusbar text-smaller',
            outlet: 'violations'
          });
        };
      })(this));
    };

    StatusBarView.prototype.show = function() {
      StatusBarView.__super__.show.apply(this, arguments);
      return this.find('.error-message').on('click', function() {
        return copyPaste.copy(this.innerText);
      });
    };

    StatusBarView.prototype.hide = function() {
      this.find('.error-message').off();
      return StatusBarView.__super__.hide.apply(this, arguments);
    };

    StatusBarView.prototype.computeMessages = function(messages, position, currentLine, limitOnErrorRange) {
      var index, item, pos, showInRange, showOnline, violation, _i, _len, _ref, _ref1, _results;
      this.violations.empty();
      _results = [];
      for (index = _i = 0, _len = messages.length; _i < _len; index = ++_i) {
        item = messages[index];
        showInRange = ((_ref = item.range) != null ? _ref.containsPoint(position) : void 0) && index <= 10 && limitOnErrorRange;
        showOnline = (((_ref1 = item.range) != null ? _ref1.start.row : void 0) + 1) === currentLine && !limitOnErrorRange;
        if (showInRange || showOnline) {
          pos = "line: " + item.line;
          if (item.col != null) {
            pos = "" + pos + " / col: " + item.col;
          }
          violation = "<dt>\n  <span class='highlight-" + item.level + "'>" + item.linter + "</span>\n</dt>\n<dd>\n  <span class='error-message'>" + item.message + "</span>\n  <span class='pos'>" + pos + "</span>\n</dd>";
          this.violations.append(violation);
          _results.push(this.show());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    StatusBarView.prototype.render = function(messages, paneItem) {
      var currentLine, e, error, limitOnErrorRange, position;
      atom.workspaceView.prependToBottom(this);
      limitOnErrorRange = atom.config.get('linter.showStatusBarWhenCursorIsInErrorRange');
      this.hide();
      if (!(messages.length > 0)) {
        return;
      }
      try {
        if (!paneItem) {
          paneItem = atom.workspaceView.getActivePaneItem();
        }
        currentLine = void 0;
        if (position = paneItem != null ? typeof paneItem.getCursorBufferPosition === "function" ? paneItem.getCursorBufferPosition() : void 0 : void 0) {
          currentLine = position.row + 1;
        }
      } catch (_error) {
        e = _error;
        error = e;
      }
      if (!error) {
        return this.computeMessages(messages, position, currentLine, limitOnErrorRange);
      }
    };

    return StatusBarView;

  })(View);

  module.exports = StatusBarView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxZQUFSLENBQ1YsQ0FBQyxVQURTLENBQUEsQ0FFVixDQUFDLE1BRlMsQ0FBQSxDQUZaLENBQUE7O0FBQUEsRUFPTTtBQUVKLG9DQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGFBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLDZDQUFQO09BQUwsRUFBMkQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDekQsS0FBQyxDQUFBLEVBQUQsQ0FBSTtBQUFBLFlBQUEsT0FBQSxFQUFPLCtCQUFQO0FBQUEsWUFBd0MsTUFBQSxFQUFRLFlBQWhEO1dBQUosRUFEeUQ7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEzRCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDRCQUlBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDSixNQUFBLHlDQUFBLFNBQUEsQ0FBQSxDQUFBO2FBRUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxnQkFBTixDQUF1QixDQUFDLEVBQXhCLENBQTJCLE9BQTNCLEVBQW9DLFNBQUEsR0FBQTtlQUNsQyxTQUFTLENBQUMsSUFBVixDQUFlLElBQUMsQ0FBQSxTQUFoQixFQURrQztNQUFBLENBQXBDLEVBSEk7SUFBQSxDQUpOLENBQUE7O0FBQUEsNEJBVUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUdKLE1BQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxnQkFBTixDQUF1QixDQUFDLEdBQXhC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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter/lib/statusbar-view.coffee