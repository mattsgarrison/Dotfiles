(function() {
  var Convert, TestStatusView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  Convert = require('ansi-to-html');

  module.exports = TestStatusView = (function(_super) {
    __extends(TestStatusView, _super);

    function TestStatusView() {
      return TestStatusView.__super__.constructor.apply(this, arguments);
    }

    TestStatusView.content = function() {
      return this.div({
        tabIndex: -1,
        "class": 'test-status-output tool-panel panel-bottom padded native-key-bindings'
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": 'block'
          }, function() {
            return _this.div({
              "class": 'message',
              outlet: 'testStatusOutput'
            });
          });
        };
      })(this));
    };

    TestStatusView.prototype.initialize = function() {
      this.output = "<strong>No output</strong>";
      this.testStatusOutput.html(this.output).css('font-size', "" + (atom.config.getInt('editor.fontSize')) + "px");
      return atom.workspaceView.command("test-status:toggle-output", (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
    };

    TestStatusView.prototype.update = function(output) {
      if (this.convert == null) {
        this.convert = new Convert;
      }
      this.output = this.convert.toHtml(output.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
      return this.testStatusOutput.html("<pre>" + (this.output.trim()) + "</pre>");
    };

    TestStatusView.prototype.destroy = function() {
      return this.detach();
    };

    TestStatusView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.detach();
      } else {
        if (!this.hasParent()) {
          return atom.workspaceView.prependToBottom(this);
        }
      }
    };

    return TestStatusView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFTLE9BQUEsQ0FBUSxNQUFSLEVBQVQsSUFBRCxDQUFBOztBQUFBLEVBRUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxjQUFSLENBRlYsQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBRU07QUFHSixxQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxjQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLFFBQUEsRUFBVSxDQUFBLENBQVY7QUFBQSxRQUFjLE9BQUEsRUFBTyx1RUFBckI7T0FBTCxFQUFtRyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNqRyxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sT0FBUDtXQUFMLEVBQXFCLFNBQUEsR0FBQTttQkFDbkIsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGNBQUEsT0FBQSxFQUFPLFNBQVA7QUFBQSxjQUFrQixNQUFBLEVBQVEsa0JBQTFCO2FBQUwsRUFEbUI7VUFBQSxDQUFyQixFQURpRztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5HLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsNkJBTUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLE1BQUQsR0FBVSw0QkFBVixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsZ0JBQWdCLENBQUMsSUFBbEIsQ0FBdUIsSUFBQyxDQUFBLE1BQXhCLENBQStCLENBQUMsR0FBaEMsQ0FBb0MsV0FBcEMsRUFBaUQsRUFBQSxHQUFFLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFaLENBQW1CLGlCQUFuQixDQUFBLENBQUYsR0FBeUMsSUFBMUYsQ0FEQSxDQUFBO2FBR0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQiwyQkFBM0IsRUFBd0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDdEQsS0FBQyxDQUFBLE1BQUQsQ0FBQSxFQURzRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXhELEVBSlU7SUFBQSxDQU5aLENBQUE7O0FBQUEsNkJBa0JBLE1BQUEsR0FBUSxTQUFDLE1BQUQsR0FBQTs7UUFDTixJQUFDLENBQUEsVUFBVyxHQUFBLENBQUE7T0FBWjtBQUFBLE1BQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsQ0FDUixNQUFNLENBQUMsT0FBUCxDQUFlLElBQWYsRUFBcUIsT0FBckIsQ0FDRSxDQUFDLE9BREgsQ0FDVyxJQURYLEVBQ2lCLFFBRGpCLENBRUUsQ0FBQyxPQUZILENBRVcsSUFGWCxFQUVpQixNQUZqQixDQUdFLENBQUMsT0FISCxDQUdXLElBSFgsRUFHaUIsTUFIakIsQ0FEUSxDQURWLENBQUE7YUFPQSxJQUFDLENBQUEsZ0JBQWdCLENBQUMsSUFBbEIsQ0FBd0IsT0FBQSxHQUFNLENBQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQUEsQ0FBQSxDQUFOLEdBQXNCLFFBQTlDLEVBUk07SUFBQSxDQWxCUixDQUFBOztBQUFBLDZCQStCQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURPO0lBQUEsQ0EvQlQsQ0FBQTs7QUFBQSw2QkFxQ0EsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsSUFBRyxJQUFDLENBQUEsU0FBRCxDQUFBLENBQUg7ZUFDRSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxJQUFBLENBQUEsSUFBaUQsQ0FBQSxTQUFELENBQUEsQ0FBaEQ7aUJBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFuQixDQUFtQyxJQUFuQyxFQUFBO1NBSEY7T0FETTtJQUFBLENBckNSLENBQUE7OzBCQUFBOztLQUgyQixLQU43QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/test-status/lib/test-status-view.coffee