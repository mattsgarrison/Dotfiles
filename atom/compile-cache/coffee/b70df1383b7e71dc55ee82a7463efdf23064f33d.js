(function() {
  var Linter, LinterInitializer, LinterView, StatusBarView;

  Linter = require('./linter');

  LinterView = require('./linter-view');

  StatusBarView = require('./statusbar-view');

  LinterInitializer = (function() {
    function LinterInitializer() {}

    LinterInitializer.prototype.configDefaults = {
      lintOnSave: true,
      lintOnChange: true,
      lintOnEditorFocus: true,
      showHightlighting: true,
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9EQUFBOztBQUFBLEVBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxVQUFSLENBQVQsQ0FBQTs7QUFBQSxFQUNBLFVBQUEsR0FBYSxPQUFBLENBQVEsZUFBUixDQURiLENBQUE7O0FBQUEsRUFFQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxrQkFBUixDQUZoQixDQUFBOztBQUFBLEVBS007bUNBR0o7O0FBQUEsZ0NBQUEsY0FBQSxHQUNFO0FBQUEsTUFBQSxVQUFBLEVBQVksSUFBWjtBQUFBLE1BQ0EsWUFBQSxFQUFjLElBRGQ7QUFBQSxNQUVBLGlCQUFBLEVBQW1CLElBRm5CO0FBQUEsTUFHQSxpQkFBQSxFQUFtQixJQUhuQjtBQUFBLE1BSUEsV0FBQSxFQUFhLElBSmI7QUFBQSxNQUtBLG9CQUFBLEVBQXNCLElBTHRCO0FBQUEsTUFNQSxvQkFBQSxFQUFzQixJQU50QjtBQUFBLE1BT0EscUNBQUEsRUFBdUMsS0FQdkM7QUFBQSxNQVFBLFNBQUEsRUFBVyxLQVJYO0tBREYsQ0FBQTs7QUFBQSxnQ0FZQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsVUFBQSxnREFBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxFQUFmLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsRUFEWCxDQUFBO0FBR0E7QUFBQSxXQUFBLDJDQUFBOytCQUFBO0FBQ0UsUUFBQSxJQUFHLFdBQVcsQ0FBQyxRQUFTLENBQUEsZ0JBQUEsQ0FBckIsS0FBMEMsSUFBN0M7QUFDRSxVQUFBLFlBQUEsNkVBQStELFdBQVcsQ0FBQyxJQUEzRSxDQUFBO0FBQUEsVUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxPQUFBLENBQVEsRUFBQSxHQUFFLFdBQVcsQ0FBQyxJQUFkLEdBQW9CLE9BQXBCLEdBQTBCLFlBQWxDLENBQWQsQ0FEQSxDQURGO1NBREY7QUFBQSxPQUhBO0FBQUEsTUFRQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBUlgsQ0FBQTtBQUFBLE1BU0EsSUFBQyxDQUFBLGFBQUQsR0FBcUIsSUFBQSxhQUFBLENBQUEsQ0FUckIsQ0FBQTthQVlBLElBQUMsQ0FBQSxzQkFBRCxHQUEwQixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQW5CLENBQWtDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLFVBQUQsR0FBQTtBQUMxRCxjQUFBLFVBQUE7QUFBQSxVQUFBLFVBQUEsR0FBYSxLQUFDLENBQUEsOEJBQUQsQ0FBZ0MsVUFBaEMsRUFBNEMsS0FBQyxDQUFBLGFBQTdDLENBQWIsQ0FBQTtpQkFDQSxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQWxCLENBQXFCLGlCQUFyQixFQUF3QyxTQUFBLEdBQUE7QUFDdEMsWUFBQSxVQUFVLENBQUMsV0FBWCxDQUF1QixLQUFDLENBQUEsT0FBeEIsQ0FBQSxDQUFBO0FBQUEsWUFDQSxVQUFVLENBQUMsSUFBWCxDQUFBLENBREEsQ0FBQTttQkFFQSxLQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsQ0FBa0IsVUFBbEIsRUFIc0M7VUFBQSxDQUF4QyxFQUYwRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxDLEVBYmxCO0lBQUEsQ0FaVixDQUFBOztBQUFBLGdDQWlDQSw4QkFBQSxHQUFnQyxTQUFDLFVBQUQsRUFBYSxhQUFiLEdBQUE7QUFDOUIsVUFBQSxVQUFBO0FBQUEsTUFBQSxJQUFjLDRCQUFkO0FBQUEsY0FBQSxDQUFBO09BQUE7QUFDQSxNQUFBLElBQUEsQ0FBQSxVQUF3QixDQUFDLFFBQXpCO0FBQUEsY0FBQSxDQUFBO09BREE7QUFFQSxNQUFBLElBQVUsNkJBQVY7QUFBQSxjQUFBLENBQUE7T0FGQTtBQUFBLE1BSUEsVUFBQSxHQUFpQixJQUFBLFVBQUEsQ0FBVyxVQUFYLEVBQXVCLGFBQXZCLEVBQXNDLElBQUMsQ0FBQSxPQUF2QyxDQUpqQixDQUFBO2FBS0EsV0FOOEI7SUFBQSxDQWpDaEMsQ0FBQTs7QUFBQSxnQ0EwQ0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsb0NBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxzQkFBc0IsQ0FBQyxHQUF4QixDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxNQUFmLENBQUEsQ0FEQSxDQUFBO0FBRUE7QUFBQTtXQUFBLDJDQUFBOzhCQUFBO0FBQUEsc0JBQUEsVUFBVSxDQUFDLE1BQVgsQ0FBQSxFQUFBLENBQUE7QUFBQTtzQkFIVTtJQUFBLENBMUNaLENBQUE7OzZCQUFBOztNQVJGLENBQUE7O0FBQUEsRUF1REEsTUFBTSxDQUFDLE9BQVAsR0FBcUIsSUFBQSxpQkFBQSxDQUFBLENBdkRyQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter/lib/init.coffee