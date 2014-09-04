(function() {
  var ZentabsController, _;

  _ = require('underscore-plus');

  ZentabsController = require('./zentabs-controller');

  module.exports = {
    configDefaults: {
      maximumOpenedTabs: 5,
      manualMode: false,
      showPinnedIcon: true
    },
    activate: function() {
      return this.paneSubscription = atom.workspaceView.eachPane((function(_this) {
        return function(pane) {
          var onPaneRemoved, zentabController;
          zentabController = new ZentabsController(pane);
          if (_this.zentabsControllers == null) {
            _this.zentabsControllers = [];
          }
          _this.zentabsControllers.push(zentabController);
          onPaneRemoved = function(event, removedPane) {
            if (pane !== removedPane) {
              return;
            }
            _.remove(_this.zentabsControllers, zentabController);
            return atom.workspaceView.off('pane:removed', onPaneRemoved);
          };
          atom.workspaceView.on('pane:removed', onPaneRemoved);
          return zentabController;
        };
      })(this));
    },
    deactivate: function() {
      var zentabController, _i, _len, _ref, _ref1, _ref2, _results;
      if ((_ref = this.paneSubscription) != null) {
        _ref.off();
      }
      _ref2 = (_ref1 = this.zentabsControllers) != null ? _ref1 : [];
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        zentabController = _ref2[_i];
        _results.push(zentabController.remove());
      }
      return _results;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9CQUFBOztBQUFBLEVBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUFKLENBQUE7O0FBQUEsRUFDQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsc0JBQVIsQ0FEcEIsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLGNBQUEsRUFDRTtBQUFBLE1BQUEsaUJBQUEsRUFBbUIsQ0FBbkI7QUFBQSxNQUNBLFVBQUEsRUFBWSxLQURaO0FBQUEsTUFFQSxjQUFBLEVBQWdCLElBRmhCO0tBREY7QUFBQSxJQUtBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsZ0JBQUQsR0FBb0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFuQixDQUE0QixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxJQUFELEdBQUE7QUFDOUMsY0FBQSwrQkFBQTtBQUFBLFVBQUEsZ0JBQUEsR0FBdUIsSUFBQSxpQkFBQSxDQUFrQixJQUFsQixDQUF2QixDQUFBOztZQUNBLEtBQUMsQ0FBQSxxQkFBc0I7V0FEdkI7QUFBQSxVQUVBLEtBQUMsQ0FBQSxrQkFBa0IsQ0FBQyxJQUFwQixDQUF5QixnQkFBekIsQ0FGQSxDQUFBO0FBQUEsVUFHQSxhQUFBLEdBQWdCLFNBQUMsS0FBRCxFQUFRLFdBQVIsR0FBQTtBQUNkLFlBQUEsSUFBYyxJQUFBLEtBQVEsV0FBdEI7QUFBQSxvQkFBQSxDQUFBO2FBQUE7QUFBQSxZQUNBLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBQyxDQUFBLGtCQUFWLEVBQThCLGdCQUE5QixDQURBLENBQUE7bUJBRUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFuQixDQUF1QixjQUF2QixFQUF1QyxhQUF2QyxFQUhjO1VBQUEsQ0FIaEIsQ0FBQTtBQUFBLFVBT0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFuQixDQUFzQixjQUF0QixFQUFzQyxhQUF0QyxDQVBBLENBQUE7aUJBUUEsaUJBVDhDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBNUIsRUFEWjtJQUFBLENBTFY7QUFBQSxJQWlCQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsVUFBQSx3REFBQTs7WUFBaUIsQ0FBRSxHQUFuQixDQUFBO09BQUE7QUFDQTtBQUFBO1dBQUEsNENBQUE7cUNBQUE7QUFBQSxzQkFBQSxnQkFBZ0IsQ0FBQyxNQUFqQixDQUFBLEVBQUEsQ0FBQTtBQUFBO3NCQUZVO0lBQUEsQ0FqQlo7R0FMRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/zentabs/lib/zentabs.coffee