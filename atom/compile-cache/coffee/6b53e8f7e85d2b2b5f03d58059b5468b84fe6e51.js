(function() {
  var $, child_process, shell;

  $ = require('atom').$;

  shell = require('shell');

  child_process = require('child_process');

  module.exports = {
    configDefaults: {
      app: 'Terminal.app',
      args: ''
    },
    activate: function() {
      atom.workspaceView.command('show-in-system:show', (function(_this) {
        return function(event) {
          return _this.show(_this.getView(event.target));
        };
      })(this));
      atom.workspaceView.command('show-in-system:open', (function(_this) {
        return function(event) {
          return _this.open(_this.getView(event.target));
        };
      })(this));
      return atom.workspaceView.command('show-in-system:terminal', (function(_this) {
        return function(event) {
          return _this.terminal(_this.getView(event.target));
        };
      })(this));
    },
    deactivate: function() {
      atom.workspaceView.off('show-in-system:show');
      atom.workspaceView.off('show-in-system:open');
      return atom.workspaceView.off('show-in-system:terminal');
    },
    show: function(view) {
      var path;
      path = this.getPath(view);
      if (!path) {
        console.warn('Show in system: Path not found. File not saved?');
      }
      if (path) {
        return shell.showItemInFolder(path);
      }
    },
    open: function(view) {
      var path;
      path = this.getPath(view);
      if (!path) {
        console.warn('Show in system: Path not found. File not saved?');
      }
      if (path) {
        return shell.openItem(path);
      }
    },
    terminal: function(view) {
      var app, args, path;
      path = this.getPath(view);
      if (!path) {
        console.warn('Show in system: Path not found. File not saved?');
      }
      app = atom.config.get('show-in-system.app');
      args = atom.config.get('show-in-system.args');
      if (path) {
        return child_process.exec("open -a " + app + " " + args + " " + path);
      }
    },
    getView: function(node) {
      return $(node).parents('.file, .directory, .tab').view();
    },
    getPath: function(view) {
      if (!view || !view.length) {
        return console.error('Show in system: View not found!');
      } else if (view.is('.file') || view.is('.directory')) {
        return view.getPath();
      } else if (view.is('.tab')) {
        return view.item.getPath();
      } else {
        return console.error('Show in system: Unexpected view type!');
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVCQUFBOztBQUFBLEVBQUMsSUFBSyxPQUFBLENBQVEsTUFBUixFQUFMLENBQUQsQ0FBQTs7QUFBQSxFQUNBLEtBQUEsR0FBUSxPQUFBLENBQVEsT0FBUixDQURSLENBQUE7O0FBQUEsRUFFQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxlQUFSLENBRmhCLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxjQUFBLEVBQWdCO0FBQUEsTUFDZCxHQUFBLEVBQUssY0FEUztBQUFBLE1BRWQsSUFBQSxFQUFNLEVBRlE7S0FBaEI7QUFBQSxJQU1BLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIscUJBQTNCLEVBQWtELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEtBQUQsR0FBQTtpQkFDaEQsS0FBQyxDQUFBLElBQUQsQ0FBTSxLQUFDLENBQUEsT0FBRCxDQUFTLEtBQUssQ0FBQyxNQUFmLENBQU4sRUFEZ0Q7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsRCxDQUFBLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIscUJBQTNCLEVBQWtELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEtBQUQsR0FBQTtpQkFDaEQsS0FBQyxDQUFBLElBQUQsQ0FBTSxLQUFDLENBQUEsT0FBRCxDQUFTLEtBQUssQ0FBQyxNQUFmLENBQU4sRUFEZ0Q7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsRCxDQUZBLENBQUE7YUFJQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLHlCQUEzQixFQUFzRCxDQUFB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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/show-in-system/lib/show-in-system.coffee