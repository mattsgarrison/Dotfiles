(function() {
  var LintStatusView, LintView, LinterConfig;

  LintView = null;

  LintStatusView = null;

  LinterConfig = null;

  module.exports = {
    activate: function() {
      atom.workspaceView.command('lint:toggle', (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
      this.lintViews = [];
      return this.enable();
    },
    deactivate: function() {
      return this.disable();
    },
    enable: function() {
      this.enabled = true;
      this.editorViewSubscription = atom.workspaceView.eachEditorView((function(_this) {
        return function(editorView) {
          return _this.injectLintViewIntoEditorView(editorView);
        };
      })(this));
      this.injectLintStatusViewIntoStatusBar();
      atom.packages.once('activated', (function(_this) {
        return function() {
          return _this.injectLintStatusViewIntoStatusBar();
        };
      })(this));
      if (LinterConfig == null) {
        LinterConfig = require('./linter-config');
      }
      return this.configSubscription = atom.config.observe(LinterConfig.ROOT_KEY, {
        callNow: false
      }, (function(_this) {
        return function() {
          var lintView, _i, _len, _ref, _results;
          _ref = _this.lintViews;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            lintView = _ref[_i];
            _results.push(lintView.refresh());
          }
          return _results;
        };
      })(this));
    },
    disable: function() {
      var view, _ref, _ref1, _ref2;
      if ((_ref = this.lintStatusView) != null) {
        _ref.remove();
      }
      this.lintStatusView = null;
      if ((_ref1 = this.configSubscription) != null) {
        _ref1.off();
      }
      if ((_ref2 = this.editorViewSubscription) != null) {
        _ref2.off();
      }
      while (view = this.lintViews.shift()) {
        view.remove();
      }
      return this.enabled = false;
    },
    toggle: function() {
      if (this.enabled) {
        return this.disable();
      } else {
        return this.enable();
      }
    },
    injectLintViewIntoEditorView: function(editorView) {
      var lintView;
      if (editorView.getPane() == null) {
        return;
      }
      if (!editorView.attached) {
        return;
      }
      if (editorView.lintView != null) {
        return;
      }
      if (LintView == null) {
        LintView = require('./lint-view');
      }
      lintView = new LintView(editorView);
      return this.lintViews.push(lintView);
    },
    injectLintStatusViewIntoStatusBar: function() {
      var statusBar;
      if (this.lintStatusView != null) {
        return;
      }
      statusBar = atom.workspaceView.statusBar;
      if (statusBar == null) {
        return;
      }
      if (LintStatusView == null) {
        LintStatusView = require('./lint-status-view');
      }
      this.lintStatusView = new LintStatusView(statusBar);
      return statusBar.prependRight(this.lintStatusView);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLHNDQUFBOztBQUFBLEVBQUEsUUFBQSxHQUFXLElBQVgsQ0FBQTs7QUFBQSxFQUNBLGNBQUEsR0FBaUIsSUFEakIsQ0FBQTs7QUFBQSxFQUVBLFlBQUEsR0FBZSxJQUZmLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGFBQTNCLEVBQTBDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE1BQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBMUMsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsU0FBRCxHQUFhLEVBRGIsQ0FBQTthQUVBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFIUTtJQUFBLENBQVY7QUFBQSxJQUtBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsT0FBRCxDQUFBLEVBRFU7SUFBQSxDQUxaO0FBQUEsSUFRQSxNQUFBLEVBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQVgsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLHNCQUFELEdBQTBCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBbkIsQ0FBa0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsVUFBRCxHQUFBO2lCQUMxRCxLQUFDLENBQUEsNEJBQUQsQ0FBOEIsVUFBOUIsRUFEMEQ7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsQyxDQUgxQixDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEsaUNBQUQs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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/atom-lint/lib/atom-lint.coffee