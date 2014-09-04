(function() {
  var TestStatusStatusBarView, fs, path;

  fs = require('fs');

  path = require('path');

  TestStatusStatusBarView = require('./test-status-status-bar-view');

  module.exports = {
    activate: function() {
      var createStatusEntry;
      atom.config.setDefaults('test-status', {
        'Makefile': 'make test',
        'script/test': 'script/test',
        'script/cibuild': 'script/cibuild',
        'test/**/*_test.rb': 'rake test',
        'spec/**/*_spec.rb': 'rake spec',
        'Gruntfile.*': 'grunt test',
        'gulpfile.*': 'gulp test',
        'test/mocha.opts': 'mocha',
        'deft-package.json': 'deft test',
        '*_test.go': 'go test -v .',
        'phpunit.xml': 'phpunit',
        'setup.py': 'python setup.py test'
      });
      createStatusEntry = (function(_this) {
        return function() {
          return _this.testStatusStatusBar = new TestStatusStatusBarView;
        };
      })(this);
      if (atom.workspaceView.statusBar) {
        return createStatusEntry();
      } else {
        return atom.packages.once('activated', function() {
          return createStatusEntry();
        });
      }
    },
    deactivate: function() {
      var _ref;
      if ((_ref = this.testStatusStatusBar) != null) {
        _ref.destroy();
      }
      return this.testStatusStatusBar = null;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlDQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFPLE9BQUEsQ0FBUSxJQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFHQSx1QkFBQSxHQUEwQixPQUFBLENBQVEsK0JBQVIsQ0FIMUIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBSUU7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixVQUFBLGlCQUFBO0FBQUEsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0IsYUFBeEIsRUFBdUM7QUFBQSxRQUNyQyxVQUFBLEVBQXFCLFdBRGdCO0FBQUEsUUFFckMsYUFBQSxFQUFxQixhQUZnQjtBQUFBLFFBR3JDLGdCQUFBLEVBQXFCLGdCQUhnQjtBQUFBLFFBS3JDLG1CQUFBLEVBQXFCLFdBTGdCO0FBQUEsUUFNckMsbUJBQUEsRUFBcUIsV0FOZ0I7QUFBQSxRQVFyQyxhQUFBLEVBQXFCLFlBUmdCO0FBQUEsUUFTckMsWUFBQSxFQUFxQixXQVRnQjtBQUFBLFFBVXJDLGlCQUFBLEVBQXFCLE9BVmdCO0FBQUEsUUFZckMsbUJBQUEsRUFBcUIsV0FaZ0I7QUFBQSxRQWNyQyxXQUFBLEVBQXFCLGNBZGdCO0FBQUEsUUFnQnJDLGFBQUEsRUFBcUIsU0FoQmdCO0FBQUEsUUFrQnJDLFVBQUEsRUFBcUIsc0JBbEJnQjtPQUF2QyxDQUFBLENBQUE7QUFBQSxNQXFCQSxpQkFBQSxHQUFvQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNsQixLQUFDLENBQUEsbUJBQUQsR0FBdUIsR0FBQSxDQUFBLHdCQURMO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FyQnBCLENBQUE7QUF3QkEsTUFBQSxJQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBdEI7ZUFDRSxpQkFBQSxDQUFBLEVBREY7T0FBQSxNQUFBO2VBR0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFkLENBQW1CLFdBQW5CLEVBQWdDLFNBQUEsR0FBQTtpQkFDOUIsaUJBQUEsQ0FBQSxFQUQ4QjtRQUFBLENBQWhDLEVBSEY7T0F6QlE7SUFBQSxDQUFWO0FBQUEsSUFrQ0EsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsSUFBQTs7WUFBb0IsQ0FBRSxPQUF0QixDQUFBO09BQUE7YUFDQSxJQUFDLENBQUEsbUJBQUQsR0FBdUIsS0FGYjtJQUFBLENBbENaO0dBVEYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/test-status/lib/test-status.coffee