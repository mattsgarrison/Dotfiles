(function() {
  var CommandRunner, TestStatusStatusBarView, TestStatusView, View, spawn,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  spawn = require('child_process').spawn;

  View = require('atom').View;

  TestStatusView = require('./test-status-view');

  CommandRunner = require('./command-runner');

  module.exports = TestStatusStatusBarView = (function(_super) {
    __extends(TestStatusStatusBarView, _super);

    function TestStatusStatusBarView() {
      return TestStatusStatusBarView.__super__.constructor.apply(this, arguments);
    }

    TestStatusStatusBarView.content = function() {
      return this.div({
        "class": 'inline-block'
      }, (function(_this) {
        return function() {
          return _this.span({
            outlet: 'testStatus',
            "class": 'test-status icon icon-hubot',
            tabindex: -1
          }, '');
        };
      })(this));
    };

    TestStatusStatusBarView.prototype.initialize = function() {
      this.testStatusView = new TestStatusView;
      this.commandRunner = new CommandRunner(this.testStatus, this.testStatusView);
      this.attach();
      atom.workspace.eachEditor((function(_this) {
        return function(editor) {
          return _this.subscribeBufferEvents(editor);
        };
      })(this));
      this.subscribe(this, 'click', (function(_this) {
        return function() {
          return _this.testStatusView.toggle();
        };
      })(this));
      return atom.workspaceView.command("test-status:run-tests", (function(_this) {
        return function() {
          return _this.commandRunner.run();
        };
      })(this));
    };

    TestStatusStatusBarView.prototype.attach = function() {
      return atom.workspaceView.statusBar.appendLeft(this);
    };

    TestStatusStatusBarView.prototype.destroy = function() {
      atom.workspace.eachEditor((function(_this) {
        return function(editor) {
          return _this.unsubscribeBufferEvents(editor);
        };
      })(this));
      this.testStatusView.destroy();
      this.testStatusView = null;
      return this.detach();
    };

    TestStatusStatusBarView.prototype.subscribeBufferEvents = function(editor) {
      var buffer;
      buffer = editor.getBuffer();
      this.subscribe(buffer.on('saved', (function(_this) {
        return function() {
          return _this.commandRunner.run();
        };
      })(this)));
      return this.subscribe(buffer.on('destroyed', (function(_this) {
        return function() {
          return _this.unsubscribe(buffer);
        };
      })(this)));
    };

    TestStatusStatusBarView.prototype.unsubscribeBufferEvents = function(editor) {
      var buffer;
      buffer = editor.getBuffer();
      return this.unsubscribe(buffer);
    };

    return TestStatusStatusBarView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1FQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxRQUFTLE9BQUEsQ0FBUSxlQUFSLEVBQVQsS0FBRCxDQUFBOztBQUFBLEVBRUMsT0FBUSxPQUFBLENBQVEsTUFBUixFQUFSLElBRkQsQ0FBQTs7QUFBQSxFQUlBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG9CQUFSLENBSmpCLENBQUE7O0FBQUEsRUFLQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxrQkFBUixDQUxoQixDQUFBOztBQUFBLEVBT0EsTUFBTSxDQUFDLE9BQVAsR0FFTTtBQUdKLDhDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLHVCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxjQUFQO09BQUwsRUFBNEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDMUIsS0FBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLFlBQUEsTUFBQSxFQUFTLFlBQVQ7QUFBQSxZQUF1QixPQUFBLEVBQU8sNkJBQTlCO0FBQUEsWUFBNkQsUUFBQSxFQUFVLENBQUEsQ0FBdkU7V0FBTixFQUFpRixFQUFqRixFQUQwQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVCLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsc0NBS0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLGNBQUQsR0FBa0IsR0FBQSxDQUFBLGNBQWxCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxhQUFELEdBQXFCLElBQUEsYUFBQSxDQUFjLElBQUMsQ0FBQSxVQUFmLEVBQTJCLElBQUMsQ0FBQSxjQUE1QixDQURyQixDQUFBO0FB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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/test-status/lib/test-status-status-bar-view.coffee