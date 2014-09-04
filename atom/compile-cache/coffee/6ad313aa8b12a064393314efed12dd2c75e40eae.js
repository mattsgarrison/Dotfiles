(function() {
  var $;

  $ = require('atom').$;

  module.exports = {
    activate: function(state) {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBR0E7QUFBQSxNQUFBLENBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxNQUFSLEVBQUwsQ0FBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsRUFBVixDQUFhLFFBQWIsRUFBdUIsSUFBQyxDQUFBLGVBQXhCLENBQUEsQ0FBQTthQUVBLElBQUMsQ0FBQSxlQUFELENBQUEsRUFIUTtJQUFBLENBQVY7QUFBQSxJQUtBLGVBQUEsRUFBaUIsU0FBQSxHQUFBO0FBQ2YsTUFBQSxJQUFHLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQUEsQ0FBQSxHQUFxQixDQUFyQixJQUEwQixNQUFNLENBQUMsTUFBcEM7ZUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQW5CLENBQTRCLHFCQUE1QixFQURGO09BQUEsTUFBQTtlQUdFLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBbkIsQ0FBK0IscUJBQS9CLEVBSEY7T0FEZTtJQUFBLENBTGpCO0dBSEYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/unity-ui/index.coffee