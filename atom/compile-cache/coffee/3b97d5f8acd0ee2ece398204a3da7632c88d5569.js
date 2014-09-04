
/*
 * This file is the entry point of your package. It will be loaded once as a
 * singleton.
 *
 * For more information:
 * https://atom.io/docs/latest/creating-a-package#source-code
 */

(function() {
  var CoffeePreviewView, DeprecationView, url;

  url = require('url');

  CoffeePreviewView = require('./coffeescript-preview-view');

  DeprecationView = require('./deprecation-view.coffee');

  module.exports = {
    configDefaults: {
      updateOnTabChange: true,
      refreshDebouncePeriod: 100
    },
    coffeePreviewView: null,

    /*
     * This required method is called when your package is activated. It is passed
     * the state data from the last time the window was serialized if your module
     * implements the serialize() method. Use this to do initialization work when
     * your package is started (like setting up DOM elements or binding events).
     */
    activate: function(state) {
      atom.workspaceView.command('coffeescript-preview:toggle', (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
      this.deprecationView = new DeprecationView();
      atom.workspaceView.appendToTop(this.deprecationView);
      console.log(this.deprecationView);
      return atom.workspace.registerOpener(function(uriToOpen) {
        var error, host, pathname, protocol, _ref;
        try {
          _ref = url.parse(uriToOpen), protocol = _ref.protocol, host = _ref.host, pathname = _ref.pathname;
        } catch (_error) {
          error = _error;
          return;
        }
        if (protocol !== 'coffeescript-preview:') {
          return;
        }
        try {
          if (pathname) {
            pathname = decodeURI(pathname);
          }
        } catch (_error) {
          error = _error;
          return;
        }
        return new CoffeePreviewView();
      });
    },

    /*
     * This optional method is called when the window is shutting down, allowing
     * you to return JSON to represent the state of your component. When the
     * window is later restored, the data you returned is passed to your module's
     * activate method so you can restore your view to where the user left off.
     */
    serialize: function() {
      return console.log('serialize()');
    },

    /*
     * This optional method is called when the window is shutting down. If your
     * package is watching any files or holding external resources in any other
     * way, release them here. If you're just subscribing to things on window, you
     * don't need to worry because that's getting torn down anyway.
     */
    deactivate: function() {
      return console.log('deactivate()');
    },
    toggle: function() {
      var editor, previewPane, previousActivePane, uri;
      editor = atom.workspace.getActiveEditor();
      if (editor == null) {
        return;
      }
      uri = "coffeescript-preview://editor";
      previewPane = atom.workspace.paneForUri(uri);
      if (previewPane) {
        previewPane.destroyItem(previewPane.itemForUri(uri));
        return;
      }
      previousActivePane = atom.workspace.getActivePane();
      return atom.workspace.open(uri, {
        split: 'right',
        searchAllPanes: true
      }).done(function(coffeePreviewView) {
        if (coffeePreviewView instanceof CoffeePreviewView) {
          coffeePreviewView.renderHTML();
          return previousActivePane.activate();
        }
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQTs7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSx1Q0FBQTs7QUFBQSxFQVFBLEdBQUEsR0FBTSxPQUFBLENBQVEsS0FBUixDQVJOLENBQUE7O0FBQUEsRUFTQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsNkJBQVIsQ0FUcEIsQ0FBQTs7QUFBQSxFQVVBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLDJCQUFSLENBVmxCLENBQUE7O0FBQUEsRUFZQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxjQUFBLEVBQ0U7QUFBQSxNQUFBLGlCQUFBLEVBQW1CLElBQW5CO0FBQUEsTUFDQSxxQkFBQSxFQUF1QixHQUR2QjtLQURGO0FBQUEsSUFJQSxpQkFBQSxFQUFtQixJQUpuQjtBQU1BO0FBQUE7Ozs7O09BTkE7QUFBQSxJQVlBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUdSLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQiw2QkFBM0IsRUFBMEQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDeEQsS0FBQyxDQUFBLE1BQUQsQ0FBQSxFQUR3RDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTFELENBQUEsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLGVBQUQsR0FBdUIsSUFBQSxlQUFBLENBQUEsQ0FKdkIsQ0FBQTtBQUFBLE1BS0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFuQixDQUErQixJQUFDLENBQUEsZUFBaEMsQ0FMQSxDQUFBO0FBQUEsTUFNQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQUMsQ0FBQSxlQUFiLENBTkEsQ0FBQTthQVFBLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBZixDQUE4QixTQUFDLFNBQUQsR0FBQTtBQUM1QixZQUFBLHFDQUFBO0FBQUE7QUFDRSxVQUFBLE9BQTZCLEdBQUcsQ0FBQyxLQUFKLENBQVUsU0FBVixDQUE3QixFQUFDLGdCQUFBLFFBQUQsRUFBVyxZQUFBLElBQVgsRUFBaUIsZ0JBQUEsUUFBakIsQ0FERjtTQUFBLGNBQUE7QUFHRSxVQURJLGNBQ0osQ0FBQTtBQUFBLGdCQUFBLENBSEY7U0FBQTtBQUlBLFFBQUEsSUFBYyxRQUFBLEtBQVksdUJBQTFCO0FBQUEsZ0JBQUEsQ0FBQTtTQUpBO0FBS0E7QUFDRSxVQUFBLElBQWtDLFFBQWxDO0FBQUEsWUFBQSxRQUFBLEdBQVcsU0FBQSxDQUFVLFFBQVYsQ0FBWCxDQUFBO1dBREY7U0FBQSxjQUFBO0FBR0UsVUFESSxjQUNKLENBQUE7QUFBQSxnQkFBQSxDQUhGO1NBTEE7ZUFVSSxJQUFBLGlCQUFBLENBQUEsRUFYd0I7TUFBQSxDQUE5QixFQVhRO0lBQUEsQ0FaVjtBQW9DQTtBQUFBOzs7OztPQXBDQTtBQUFBLElBMENBLFNBQUEsRUFBVyxTQUFBLEdBQUE7YUFDVCxPQUFPLENBQUMsR0FBUixDQUFZLGFBQVosRUFEUztJQUFBLENBMUNYO0FBNkNBO0FBQUE7Ozs7O09BN0NBO0FBQUEsSUFtREEsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLE9BQU8sQ0FBQyxHQUFSLENBQVksY0FBWixFQURVO0lBQUEsQ0FuRFo7QUFBQSxJQXNEQSxNQUFBLEVBQVEsU0FBQSxHQUFBO0FBQ04sVUFBQSw0Q0FBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZixDQUFBLENBQVQsQ0FBQTtBQUNBLE1BQUEsSUFBYyxjQUFkO0FBQUEsY0FBQSxDQUFBO09BREE7QUFBQSxNQUVBLEdBQUEsR0FBTSwrQkFGTixDQUFBO0FBQUEsTUFHQSxXQUFBLEdBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFmLENBQTBCLEdBQTFCLENBSGQsQ0FBQTtBQUlBLE1BQUEsSUFBRyxXQUFIO0FBQ0UsUUFBQSxXQUFXLENBQUMsV0FBWixDQUF3QixXQUFXLENBQUMsVUFBWixDQUF1QixHQUF2QixDQUF4QixDQUFBLENBQUE7QUFDQSxjQUFBLENBRkY7T0FKQTtBQUFBLE1BT0Esa0JBQUEsR0FBcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQUEsQ0FQckIsQ0FBQTthQVFBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixHQUFwQixFQUF5QjtBQUFBLFFBQUEsS0FBQSxFQUFPLE9BQVA7QUFBQSxRQUFnQixjQUFBLEVBQWdCLElBQWhDO09BQXpCLENBQ0EsQ0FBQyxJQURELENBQ00sU0FBQyxpQkFBRCxHQUFBO0FBQ0osUUFBQSxJQUFHLGlCQUFBLFlBQTZCLGlCQUFoQztBQUNFLFVBQUEsaUJBQWlCLENBQUMsVUFBbEIsQ0FBQSxDQUFBLENBQUE7aUJBQ0Esa0JBQWtCLENBQUMsUUFBbkIsQ0FBQSxFQUZGO1NBREk7TUFBQSxDQUROLEVBVE07SUFBQSxDQXREUjtHQWJGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/coffeescript-preview/lib/coffeescript-preview.coffee