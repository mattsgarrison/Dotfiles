(function() {
  var LinterInitializer, LinterView, StatusBarView;

  LinterView = require('./linter-view');

  StatusBarView = require('./statusbar-view');

  LinterInitializer = (function() {
    function LinterInitializer() {}

    LinterInitializer.prototype.configDefaults = {
      lintOnSave: true,
      lintOnChange: true,
      lintOnEditorFocus: true,
      showHighlighting: true,
      showGutters: true,
      showErrorInStatusBar: true,
      lintOnChangeInterval: 1000,
      showStatusBarWhenCursorIsInErrorRange: false,
      lintDebug: false
    };

    LinterInitializer.prototype.activate = function() {
      var atomPackage, implemention, _i, _len, _ref, _ref1;
      this.linterViews = [];
      this.linters = [];
      _ref = atom.packages.getLoadedPackages();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        atomPackage = _ref[_i];
        if (atomPackage.metadata['linter-package'] === true) {
          implemention = (_ref1 = atomPackage.metadata['linter-implementation']) != null ? _ref1 : atomPackage.name;
          this.linters.push(require("" + atomPackage.path + "/lib/" + implemention));
        }
      }
      this.enabled = true;
      this.statusBarView = new StatusBarView();
      return this.editorViewSubscription = atom.workspaceView.eachEditorView((function(_this) {
        return function(editorView) {
          var linterView;
          linterView = _this.injectLinterViewIntoEditorView(editorView, _this.statusBarView);
          return editorView.editor.on('grammar-changed', function() {
            linterView.initLinters(_this.linters);
            linterView.lint();
            return _this.linterViews.push(linterView);
          });
        };
      })(this));
    };

    LinterInitializer.prototype.injectLinterViewIntoEditorView = function(editorView, statusBarView) {
      var linterView;
      if (editorView.getPane() == null) {
        return;
      }
      if (!editorView.attached) {
        return;
      }
      if (editorView.linterView != null) {
        return;
      }
      linterView = new LinterView(editorView, statusBarView, this.linters);
      return linterView;
    };

    LinterInitializer.prototype.deactivate = function() {
      var linterView, _i, _len, _ref, _results;
      this.editorViewSubscription.off();
      this.statusBarView.remove();
      _ref = this.linterViews;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        linterView = _ref[_i];
        _results.push(linterView.remove());
      }
      return _results;
    };

    return LinterInitializer;

  })();

  module.exports = new LinterInitializer();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRDQUFBOztBQUFBLEVBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBQWIsQ0FBQTs7QUFBQSxFQUNBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLGtCQUFSLENBRGhCLENBQUE7O0FBQUEsRUFJTTttQ0FHSjs7QUFBQSxnQ0FBQSxjQUFBLEdBQ0U7QUFBQSxNQUFBLFVBQUEsRUFBWSxJQUFaO0FBQUEsTUFDQSxZQUFBLEVBQWMsSUFEZDtBQUFBLE1BRUEsaUJBQUEsRUFBbUIsSUFGbkI7QUFBQSxNQUdBLGdCQUFBLEVBQWtCLElBSGxCO0FBQUEsTUFJQSxXQUFBLEVBQWEsSUFKYjtBQUFBLE1BS0Esb0JBQUEsRUFBc0IsSUFMdEI7QUFBQSxNQU1BLG9CQUFBLEVBQXNCLElBTnRCO0FBQUEsTUFPQSxxQ0FBQSxFQUF1QyxLQVB2QztBQUFBLE1BUUEsU0FBQSxFQUFXLEtBUlg7S0FERixDQUFBOztBQUFBLGdDQVlBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixVQUFBLGdEQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsV0FBRCxHQUFlLEVBQWYsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxFQURYLENBQUE7QUFHQTtBQUFBLFdBQUEsMkNBQUE7K0JBQUE7QUFDRSxRQUFBLElBQUcsV0FBVyxDQUFDLFFBQVMsQ0FBQSxnQkFBQSxDQUFyQixLQUEwQyxJQUE3QztBQUNFLFVBQUEsWUFBQSw2RUFBK0QsV0FBVyxDQUFDLElBQTNFLENBQUE7QUFBQSxVQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLE9BQUEsQ0FBUSxFQUFBLEdBQUUsV0FBVyxDQUFDLElBQWQsR0FBb0IsT0FBcEIsR0FBMEIsWUFBbEMsQ0FBZCxDQURBLENBREY7U0FERjtBQUFBLE9BSEE7QUFBQSxNQVFBLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFSWCxDQUFBO0FBQUEsTUFTQSxJQUFDLENBQUEsYUFBRCxHQUFxQixJQUFBLGFBQUEsQ0FBQSxDQVRyQixDQUFBO2FBWUEsSUFBQyxDQUFBLHNCQUFELEdBQTBCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBbkIsQ0FBa0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsVUFBRCxHQUFBO0FBQzFELGNBQUEsVUFBQTtBQUFBLFVBQUEsVUFBQSxHQUFhLEtBQUMsQ0FBQSw4QkFBRCxDQUFnQyxVQUFoQyxFQUE0QyxLQUFDLENBQUEsYUFBN0MsQ0FBYixDQUFBO2lCQUNBLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBbEIsQ0FBcUIsaUJBQXJCLEVBQXdDLFNBQUEsR0FBQTtBQUN0QyxZQUFBLFVBQVUsQ0FBQyxXQUFYLENBQXVCLEtBQUMsQ0FBQSxPQUF4QixDQUFBLENBQUE7QUFBQSxZQUNBLFVBQVUsQ0FBQyxJQUFYLENBQUEsQ0FEQSxDQUFBO21CQUVBLEtBQUMsQ0FBQSxXQUFXLENBQUMsSUFBYixDQUFrQixVQUFsQixFQUhzQztVQUFBLENBQXhDLEVBRjBEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEMsRUFibEI7SUFBQSxDQVpWLENBQUE7O0FBQUEsZ0NBaUNBLDhCQUFBLEdBQWdDLFNBQUMsVUFBRCxFQUFhLGFBQWIsR0FBQTtBQUM5QixVQUFBLFVBQUE7QUFBQSxNQUFBLElBQWMsNEJBQWQ7QUFBQSxjQUFBLENBQUE7T0FBQTtBQUNBLE1BQUEsSUFBQSxDQUFBLFVBQXdCLENBQUMsUUFBekI7QUFBQSxjQUFBLENBQUE7T0FEQTtBQUVBLE1BQUEsSUFBVSw2QkFBVjtBQUFBLGNBQUEsQ0FBQTtPQUZBO0FBQUEsTUFJQSxVQUFBLEdBQWlCLElBQUEsVUFBQSxDQUFXLFVBQVgsRUFBdUIsYUFBdkIsRUFBc0MsSUFBQyxDQUFBLE9BQXZDLENBSmpCLENBQUE7YUFLQSxXQU44QjtJQUFBLENBakNoQyxDQUFBOztBQUFBLGdDQTBDQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1YsVUFBQSxvQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLHNCQUFzQixDQUFDLEdBQXhCLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBYSxDQUFDLE1BQWYsQ0FBQSxDQURBLENBQUE7QUFFQTtBQUFBO1dBQUEsMkNBQUE7OEJBQUE7QUFBQSxzQkFBQSxVQUFVLENBQUMsTUFBWCxDQUFBLEVBQUEsQ0FBQTtBQUFBO3NCQUhVO0lBQUEsQ0ExQ1osQ0FBQTs7NkJBQUE7O01BUEYsQ0FBQTs7QUFBQSxFQXNEQSxNQUFNLENBQUMsT0FBUCxHQUFxQixJQUFBLGlCQUFBLENBQUEsQ0F0RHJCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter/lib/init.coffee