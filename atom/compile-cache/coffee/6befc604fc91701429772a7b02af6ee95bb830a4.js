(function() {
  var HighlightCssColorView;

  HighlightCssColorView = require('./highlight-css-color-view');

  module.exports = {
    highlightCssColorView: null,
    activate: function(state) {
      return this.highlightCssColorView = new HighlightCssColorView(state.highlightCssColorViewState);
    },
    deactivate: function() {
      return this.highlightCssColorView.destroy();
    },
    serialize: function() {
      return {
        highlightCssColorViewState: this.highlightCssColorView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFCQUFBOztBQUFBLEVBQUEscUJBQUEsR0FBd0IsT0FBQSxDQUFRLDRCQUFSLENBQXhCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxxQkFBQSxFQUF1QixJQUF2QjtBQUFBLElBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLHFCQUFELEdBQTZCLElBQUEscUJBQUEsQ0FBc0IsS0FBSyxDQUFDLDBCQUE1QixFQURyQjtJQUFBLENBRlY7QUFBQSxJQUtBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEscUJBQXFCLENBQUMsT0FBdkIsQ0FBQSxFQURVO0lBQUEsQ0FMWjtBQUFBLElBUUEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSwwQkFBQSxFQUE0QixJQUFDLENBQUEscUJBQXFCLENBQUMsU0FBdkIsQ0FBQSxDQUE1QjtRQURTO0lBQUEsQ0FSWDtHQUhGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/highlight-css-color/lib/highlight-css-color.coffee