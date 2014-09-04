(function() {
  var $, shell;

  $ = require('atom').$;

  shell = require('shell');

  module.exports = {
    activate: function() {
      atom.workspaceView.command('show-in-system:show', (function(_this) {
        return function(event) {
          return _this.show(_this.getView(event.target));
        };
      })(this));
      return atom.workspaceView.command('show-in-system:open', (function(_this) {
        return function(event) {
          return _this.open(_this.getView(event.target));
        };
      })(this));
    },
    deactivate: function() {
      atom.workspaceView.off('show-in-system:show');
      return atom.workspaceView.off('show-in-system:open');
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFFBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxNQUFSLEVBQUwsQ0FBRCxDQUFBOztBQUFBLEVBQ0EsS0FBQSxHQUFRLE9BQUEsQ0FBUSxPQUFSLENBRFIsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIscUJBQTNCLEVBQWtELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEtBQUQsR0FBQTtpQkFDaEQsS0FBQyxDQUFBLElBQUQsQ0FBTSxLQUFDLENBQUEsT0FBRCxDQUFTLEtBQUssQ0FBQyxNQUFmLENBQU4sRUFEZ0Q7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsRCxDQUFBLENBQUE7YUFFQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLHFCQUEzQixFQUFrRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxLQUFELEdBQUE7aUJBQ2hELEtBQUMsQ0FBQSxJQUFELENBQU0sS0FBQyxDQUFBLE9BQUQsQ0FBUyxLQUFLLENBQUMsTUFBZixDQUFOLEVBRGdEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEQsRUFIUTtJQUFBLENBQVY7QUFBQSxJQU9BLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixNQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBbkIsQ0FBdUIscUJBQXZCLENBQUEsQ0FBQTthQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBbkIsQ0FBdUIscUJBQXZCLEVBRlU7SUFBQSxDQVBaO0FBQUEsSUFZQSxJQUFBLEVBQU0sU0FBQyxJQUFELEdBQUE7QUFDSixVQUFBLElBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxJQUFDLENBQUEsT0FBRCxDQUFTLElBQVQsQ0FBUCxDQUFBO0FBQ0EsTUFBQSxJQUFHLENBQUEsSUFBSDtBQUNFLFFBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxpREFBYixDQUFBLENBREY7T0FEQTtBQUdBLE1BQUEsSUFBZ0MsSUFBaEM7ZUFBQSxLQUFLLENBQUMsZ0JBQU4sQ0FBdUIsSUFBdkIsRUFBQTtPQUpJO0lBQUEsQ0FaTjtBQUFBLElBbUJBLElBQUEsRUFBTSxTQUFDLElBQUQsR0FBQTtBQUNKLFVBQUEsSUFBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBVCxDQUFQLENBQUE7QUFDQSxNQUFBLElBQUcsQ0FBQSxJQUFIO0FBQ0UsUUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLGlEQUFiLENBQUEsQ0FERjtPQURBO0FBR0EsTUFBQSxJQUF3QixJQUF4QjtlQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBZixFQUFBO09BSkk7SUFBQSxDQW5CTjtBQUFBLElBMkJBLE9BQUEsRUFBUyxTQUFDLElBQUQsR0FBQTtBQUNQLGFBQU8sQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLE9BQVIsQ0FBZ0IseUJBQWhCLENBQTBDLENBQUMsSUFBM0MsQ0FBQSxDQUFQLENBRE87SUFBQSxDQTNCVDtBQUFBLElBZ0NBLE9BQUEsRUFBUyxTQUFDLElBQUQsR0FBQTtBQUNQLE1BQUEsSUFBRyxDQUFBLElBQUEsSUFBUyxDQUFBLElBQUssQ0FBQyxNQUFsQjtlQUNFLE9BQU8sQ0FBQyxLQUFSLENBQWMsaUNBQWQsRUFERjtPQUFBLE1BRUssSUFBRyxJQUFJLENBQUMsRUFBTCxDQUFRLE9BQVIsQ0FBQSxJQUFvQixJQUFJLENBQUMsRUFBTCxDQUFRLFlBQVIsQ0FBdkI7QUFDSCxlQUFPLElBQUksQ0FBQyxPQUFMLENBQUEsQ0FBUCxDQURHO09BQUEsTUFFQSxJQUFHLElBQUksQ0FBQyxFQUFMLENBQVEsTUFBUixDQUFIO0FBQ0gsZUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBQSxDQUFQLENBREc7T0FBQSxNQUFBO2VBR0gsT0FBTyxDQUFDLEtBQVIsQ0FBYyx1Q0FBZCxFQUhHO09BTEU7SUFBQSxDQWhDVDtHQUxGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/show-in-system/lib/show-in-system.coffee