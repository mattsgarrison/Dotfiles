
/*
 * This file is the entry point of your package. It will be loaded once as a
 * singleton.
 *
 * For more information:
 * https://atom.io/docs/latest/creating-a-package#source-code
 */

(function() {
  var CoffeePreviewView, url;

  url = require('url');

  CoffeePreviewView = require('./coffeescript-preview-view');

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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQTs7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxzQkFBQTs7QUFBQSxFQVFBLEdBQUEsR0FBTSxPQUFBLENBQVEsS0FBUixDQVJOLENBQUE7O0FBQUEsRUFTQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsNkJBQVIsQ0FUcEIsQ0FBQTs7QUFBQSxFQVdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGNBQUEsRUFDRTtBQUFBLE1BQUEsaUJBQUEsRUFBbUIsSUFBbkI7QUFBQSxNQUNBLHFCQUFBLEVBQXVCLEdBRHZCO0tBREY7QUFBQSxJQUlBLGlCQUFBLEVBQW1CLElBSm5CO0FBTUE7QUFBQTs7Ozs7T0FOQTtBQUFBLElBWUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBR1IsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLDZCQUEzQixFQUEwRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUN4RCxLQUFDLENBQUEsTUFBRCxDQUFBLEVBRHdEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBMUQsQ0FBQSxDQUFBO2FBR0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFmLENBQThCLFNBQUMsU0FBRCxHQUFBO0FBQzVCLFlBQUEscUNBQUE7QUFBQTtBQUNFLFVBQUEsT0FBNkIsR0FBRyxDQUFDLEtBQUosQ0FBVSxTQUFWLENBQTdCLEVBQUMsZ0JBQUEsUUFBRCxFQUFXLFlBQUEsSUFBWCxFQUFpQixnQkFBQSxRQUFqQixDQURGO1NBQUEsY0FBQTtBQUdFLFVBREksY0FDSixDQUFBO0FBQUEsZ0JBQUEsQ0FIRjtTQUFBO0FBSUEsUUFBQSxJQUFjLFFBQUEsS0FBWSx1QkFBMUI7QUFBQSxnQkFBQSxDQUFBO1NBSkE7QUFLQTtBQUNFLFVBQUEsSUFBa0MsUUFBbEM7QUFBQSxZQUFBLFFBQUEsR0FBVyxTQUFBLENBQVUsUUFBVixDQUFYLENBQUE7V0FERjtTQUFBLGNBQUE7QUFHRSxVQURJLGNBQ0osQ0FBQTtBQUFBLGdCQUFBLENBSEY7U0FMQTtlQVVJLElBQUEsaUJBQUEsQ0FBQSxFQVh3QjtNQUFBLENBQTlCLEVBTlE7SUFBQSxDQVpWO0FBK0JBO0FBQUE7Ozs7O09BL0JBO0FBQUEsSUFxQ0EsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNULE9BQU8sQ0FBQyxHQUFSLENBQVksYUFBWixFQURTO0lBQUEsQ0FyQ1g7QUF3Q0E7QUFBQTs7Ozs7T0F4Q0E7QUFBQSxJQThDQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsT0FBTyxDQUFDLEdBQVIsQ0FBWSxjQUFaLEVBRFU7SUFBQSxDQTlDWjtBQUFBLElBaURBLE1BQUEsRUFBUSxTQUFBLEdBQUE7QUFDTixVQUFBLDRDQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFmLENBQUEsQ0FBVCxDQUFBO0FBQ0EsTUFBQSxJQUFjLGNBQWQ7QUFBQSxjQUFBLENBQUE7T0FEQTtBQUFBLE1BRUEsR0FBQSxHQUFNLCtCQUZOLENBQUE7QUFBQSxNQUdBLFdBQUEsR0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQWYsQ0FBMEIsR0FBMUIsQ0FIZCxDQUFBO0FBSUEsTUFBQSxJQUFHLFdBQUg7QUFDRSxRQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLFdBQVcsQ0FBQyxVQUFaLENBQXVCLEdBQXZCLENBQXhCLENBQUEsQ0FBQTtBQUNBLGNBQUEsQ0FGRjtPQUpBO0FBQUEsTUFPQSxrQkFBQSxHQUFxQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBQSxDQVByQixDQUFBO2FBUUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLEdBQXBCLEVBQXlCO0FBQUEsUUFBQSxLQUFBLEVBQU8sT0FBUDtBQUFBLFFBQWdCLGNBQUEsRUFBZ0IsSUFBaEM7T0FBekIsQ0FDQSxDQUFDLElBREQsQ0FDTSxTQUFDLGlCQUFELEdBQUE7QUFDSixRQUFBLElBQUcsaUJBQUEsWUFBNkIsaUJBQWhDO0FBQ0UsVUFBQSxpQkFBaUIsQ0FBQyxVQUFsQixDQUFBLENBQUEsQ0FBQTtpQkFDQSxrQkFBa0IsQ0FBQyxRQUFuQixDQUFBLEVBRkY7U0FESTtNQUFBLENBRE4sRUFUTTtJQUFBLENBakRSO0dBWkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/coffeescript-preview/lib/coffeescript-preview.coffee