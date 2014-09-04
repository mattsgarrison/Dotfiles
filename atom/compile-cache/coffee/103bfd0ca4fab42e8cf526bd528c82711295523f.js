(function() {
  var $;

  $ = require('jquery');

  module.exports = {
    activate: function(state) {
      atom.workspaceView.command("resize-panes:enlarge-active-pane", (function(_this) {
        return function() {
          return _this.enlarge();
        };
      })(this));
      return atom.workspaceView.command("resize-panes:shrink-active-pane", (function(_this) {
        return function() {
          return _this.shrink();
        };
      })(this));
    },
    enlarge: function() {
      var flex;
      flex = this.getFlex();
      flex.grow *= 1.1;
      flex.shrink *= 1.1;
      return this.setFlex(flex);
    },
    shrink: function() {
      var flex;
      flex = this.getFlex();
      flex.shrink /= 1.1;
      flex.grow /= 1.1;
      return this.setFlex(flex);
    },
    getFlex: function() {
      var basis, grow, shrink, _ref;
      _ref = $('.pane.active').css('-webkit-flex').split(' '), grow = _ref[0], shrink = _ref[1], basis = _ref[2];
      return {
        grow: grow,
        shrink: shrink,
        basis: basis
      };
    },
    setFlex: function(_arg) {
      var basis, flex, grow, shrink;
      grow = _arg.grow, shrink = _arg.shrink, basis = _arg.basis;
      flex = [grow, shrink, basis].join(' ');
      return $('.pane.active').css('-webkit-flex', flex);
    },
    deactivate: function() {},
    serialize: function() {}
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLENBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVIsQ0FBSixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FFRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGtDQUEzQixFQUErRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxPQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQS9ELENBQUEsQ0FBQTthQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsaUNBQTNCLEVBQThELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE1BQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBOUQsRUFGUTtJQUFBLENBQVY7QUFBQSxJQUlBLE9BQUEsRUFBUyxTQUFBLEdBQUE7QUFDUCxVQUFBLElBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxJQUFDLENBQUEsT0FBRCxDQUFBLENBQVAsQ0FBQTtBQUFBLE1BQ0EsSUFBSSxDQUFDLElBQUwsSUFBYSxHQURiLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxNQUFMLElBQWUsR0FGZixDQUFBO2FBR0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxJQUFULEVBSk87SUFBQSxDQUpUO0FBQUEsSUFVQSxNQUFBLEVBQVEsU0FBQSxHQUFBO0FBQ04sVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQUFQLENBQUE7QUFBQSxNQUNBLElBQUksQ0FBQyxNQUFMLElBQWUsR0FEZixDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsSUFBTCxJQUFhLEdBRmIsQ0FBQTthQUdBLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBVCxFQUpNO0lBQUEsQ0FWUjtBQUFBLElBZ0JBLE9BQUEsRUFBUyxTQUFBLEdBQUE7QUFDUCxVQUFBLHlCQUFBO0FBQUEsTUFBQSxPQUFzQixDQUFBLENBQUUsY0FBRixDQUFpQixDQUFDLEdBQWxCLENBQXNCLGNBQXRCLENBQXFDLENBQUMsS0FBdEMsQ0FBNEMsR0FBNUMsQ0FBdEIsRUFBQyxjQUFELEVBQU0sZ0JBQU4sRUFBYSxlQUFiLENBQUE7QUFDQSxhQUFPO0FBQUEsUUFBQyxNQUFBLElBQUQ7QUFBQSxRQUFNLFFBQUEsTUFBTjtBQUFBLFFBQWEsT0FBQSxLQUFiO09BQVAsQ0FGTztJQUFBLENBaEJUO0FBQUEsSUFvQkEsT0FBQSxFQUFTLFNBQUMsSUFBRCxHQUFBO0FBQ1AsVUFBQSx5QkFBQTtBQUFBLE1BRFMsWUFBQSxNQUFLLGNBQUEsUUFBTyxhQUFBLEtBQ3JCLENBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxDQUFDLElBQUQsRUFBTSxNQUFOLEVBQWEsS0FBYixDQUFtQixDQUFDLElBQXBCLENBQXlCLEdBQXpCLENBQVAsQ0FBQTthQUNBLENBQUEsQ0FBRSxjQUFGLENBQWlCLENBQUMsR0FBbEIsQ0FBc0IsY0FBdEIsRUFBc0MsSUFBdEMsRUFGTztJQUFBLENBcEJUO0FBQUEsSUF3QkEsVUFBQSxFQUFZLFNBQUEsR0FBQSxDQXhCWjtBQUFBLElBMEJBLFNBQUEsRUFBVyxTQUFBLEdBQUEsQ0ExQlg7R0FKRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/resize-panes/lib/resize-panes.coffee