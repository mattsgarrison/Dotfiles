(function() {
  var ZentabsController, _;

  _ = require('underscore-plus');

  ZentabsController = require('./zentabs-controller');

  module.exports = {
    configDefaults: {
      maximumOpenedTabs: 5,
      manualMode: false,
      showPinnedIcon: true,
      neverCloseUnsaved: false
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9CQUFBOztBQUFBLEVBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUFKLENBQUE7O0FBQUEsRUFDQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsc0JBQVIsQ0FEcEIsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLGNBQUEsRUFDRTtBQUFBLE1BQUEsaUJBQUEsRUFBbUIsQ0FBbkI7QUFBQSxNQUNBLFVBQUEsRUFBWSxLQURaO0FBQUEsTUFFQSxjQUFBLEVBQWdCLElBRmhCO0FBQUEsTUFHQSxpQkFBQSxFQUFtQixLQUhuQjtLQURGO0FBQUEsSUFNQSxRQUFBLEVBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLGdCQUFELEdBQW9CLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBbkIsQ0FBNEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsSUFBRCxHQUFBO0FBQzlDLGNBQUEsK0JBQUE7QUFBQSxVQUFBLGdCQUFBLEdBQXVCLElBQUEsaUJBQUEsQ0FBa0IsSUFBbEIsQ0FBdkIsQ0FBQTs7WUFDQSxLQUFDLENBQUEscUJBQXNCO1dBRHZCO0FBQUEsVUFFQSxLQUFDLENBQUEsa0JBQWtCLENBQUMsSUFBcEIsQ0FBeUIsZ0JBQXpCLENBRkEsQ0FBQTtBQUFBLFVBR0EsYUFBQSxHQUFnQixTQUFDLEtBQUQsRUFBUSxXQUFSLEdBQUE7QUFDZCxZQUFBLElBQWMsSUFBQSxLQUFRLFdBQXRCO0FBQUEsb0JBQUEsQ0FBQTthQUFBO0FBQUEsWUFDQSxDQUFDLENBQUMsTUFBRixDQUFTLEtBQUMsQ0FBQSxrQkFBVixFQUE4QixnQkFBOUIsQ0FEQSxDQUFBO21CQUVBLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBbkIsQ0FBdUIsY0FBdkIsRUFBdUMsYUFBdkMsRUFIYztVQUFBLENBSGhCLENBQUE7QUFBQSxVQU9BLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBbkIsQ0FBc0IsY0FBdEIsRUFBc0MsYUFBdEMsQ0FQQSxDQUFBO2lCQVFBLGlCQVQ4QztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVCLEVBRFo7SUFBQSxDQU5WO0FBQUEsSUFrQkEsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsd0RBQUE7O1lBQWlCLENBQUUsR0FBbkIsQ0FBQTtPQUFBO0FBQ0E7QUFBQTtXQUFBLDRDQUFBO3FDQUFBO0FBQUEsc0JBQUEsZ0JBQWdCLENBQUMsTUFBakIsQ0FBQSxFQUFBLENBQUE7QUFBQTtzQkFGVTtJQUFBLENBbEJaO0dBTEYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/zentabs/lib/zentabs.coffee