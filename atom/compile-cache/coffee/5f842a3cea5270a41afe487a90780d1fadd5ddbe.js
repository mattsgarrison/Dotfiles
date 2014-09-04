(function() {
  var exec, path;

  exec = require("child_process").exec;

  path = require('path');

  module.exports = {
    configDefaults: {
      app: 'Terminal.app',
      args: ''
    },
    activate: function() {
      return atom.workspaceView.command("open-terminal-here:open", (function(_this) {
        return function(event) {
          return _this.open();
        };
      })(this));
    },
    open: function() {
      var app, args, dirpath, filepath, _ref, _ref1;
      filepath = (_ref = atom.workspaceView.find('.tree-view .selected')) != null ? (_ref1 = _ref.view()) != null ? typeof _ref1.getPath === "function" ? _ref1.getPath() : void 0 : void 0 : void 0;
      if (filepath) {
        dirpath = path.dirname(filepath);
        app = atom.config.get('open-terminal-here.app');
        args = atom.config.get('open-terminal-here.args');
        if (dirpath != null) {
          return exec("open -a " + app + " " + args + " " + dirpath);
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFVBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLGVBQVIsQ0FBd0IsQ0FBQyxJQUFoQyxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGNBQUEsRUFBZ0I7QUFBQSxNQUNkLEdBQUEsRUFBSyxjQURTO0FBQUEsTUFFZCxJQUFBLEVBQU0sRUFGUTtLQUFoQjtBQUFBLElBSUEsUUFBQSxFQUFVLFNBQUEsR0FBQTthQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIseUJBQTNCLEVBQXNELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEtBQUQsR0FBQTtpQkFDcEQsS0FBQyxDQUFBLElBQUQsQ0FBQSxFQURvRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXRELEVBRFE7SUFBQSxDQUpWO0FBQUEsSUFRQSxJQUFBLEVBQU0sU0FBQSxHQUFBO0FBQ0osVUFBQSx5Q0FBQTtBQUFBLE1BQUEsUUFBQSxpSkFBa0UsQ0FBRSxvQ0FBcEUsQ0FBQTtBQUNBLE1BQUEsSUFBRyxRQUFIO0FBQ0UsUUFBQSxPQUFBLEdBQVUsSUFBSSxDQUFDLE9BQUwsQ0FBYSxRQUFiLENBQVYsQ0FBQTtBQUFBLFFBQ0EsR0FBQSxHQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix3QkFBaEIsQ0FETixDQUFBO0FBQUEsUUFFQSxJQUFBLEdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHlCQUFoQixDQUZQLENBQUE7QUFHQSxRQUFBLElBQTRDLGVBQTVDO2lCQUFBLElBQUEsQ0FBTSxVQUFBLEdBQVMsR0FBVCxHQUFjLEdBQWQsR0FBZ0IsSUFBaEIsR0FBc0IsR0FBdEIsR0FBd0IsT0FBOUIsRUFBQTtTQUpGO09BRkk7SUFBQSxDQVJOO0dBSkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/open-terminal-here/lib/open-terminal-here.coffee