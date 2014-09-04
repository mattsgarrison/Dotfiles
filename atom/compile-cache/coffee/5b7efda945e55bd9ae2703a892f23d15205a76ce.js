(function() {
  var $;

  $ = require('atom').$;

  module.exports = {
    configDefaults: {
      allowTreeViewToScrollHorizontally: false
    },
    activate: function(state) {
      atom.config.observe('unity-ui.allowTreeViewToScrollHorizontally', function() {
        if (atom.config.get('unity-ui.allowTreeViewToScrollHorizontally')) {
          return $('.tree-view-scroller').addClass('tree-view-scrolls-horizontally');
        } else {
          return $('.tree-view-scroller').removeClass('tree-view-scrolls-horizontally');
        }
      });
      $(window).on('resize', this.checkFullscreen);
      return this.checkFullscreen();
    },
    checkFullscreen: function() {
      if ($(window).height() + 1 >= screen.height) {
        return atom.workspaceView.addClass('unity-ui-fullscreen');
      } else {
        return atom.workspaceView.removeClass('unity-ui-fullscreen');
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLENBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxNQUFSLEVBQUwsQ0FBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsY0FBQSxFQUNFO0FBQUEsTUFBQSxpQ0FBQSxFQUFtQyxLQUFuQztLQURGO0FBQUEsSUFHQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDTixNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQiw0Q0FBcEIsRUFBa0UsU0FBQSxHQUFBO0FBQ2hFLFFBQUEsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsNENBQWhCLENBQUg7aUJBQ0UsQ0FBQSxDQUFFLHFCQUFGLENBQXdCLENBQUMsUUFBekIsQ0FBa0MsZ0NBQWxDLEVBREY7U0FBQSxNQUFBO2lCQUdFLENBQUEsQ0FBRSxxQkFBRixDQUF3QixDQUFDLFdBQXpCLENBQXFDLGdDQUFyQyxFQUhGO1NBRGdFO01BQUEsQ0FBbEUsQ0FBQSxDQUFBO0FBQUEsTUFNQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsRUFBVixDQUFhLFFBQWIsRUFBdUIsSUFBQyxDQUFBLGVBQXhCLENBTkEsQ0FBQTthQVFBLElBQUMsQ0FBQSxlQUFELENBQUEsRUFUTTtJQUFBLENBSFY7QUFBQSxJQWNBLGVBQUEsRUFBaUIsU0FBQSxHQUFBO0FBQ2YsTUFBQSxJQUFHLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQUEsQ0FBQSxHQUFxQixDQUFyQixJQUEwQixNQUFNLENBQUMsTUFBcEM7ZUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQW5CLENBQTRCLHFCQUE1QixFQURGO09BQUEsTUFBQTtlQUdFLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBbkIsQ0FBK0IscUJBQS9CLEVBSEY7T0FEZTtJQUFBLENBZGpCO0dBSEYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/unity-ui/lib/unity-ui.coffee