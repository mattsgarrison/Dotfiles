(function() {
  var DeprecationView, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require("atom").View;

  module.exports = DeprecationView = (function(_super) {
    __extends(DeprecationView, _super);

    function DeprecationView() {
      this.close = __bind(this.close, this);
      return DeprecationView.__super__.constructor.apply(this, arguments);
    }

    DeprecationView.content = function() {
      return this.div({
        "class": 'coffeescript-preview deprecation-notice'
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": 'overlay from-top'
          }, function() {
            return _this.div({
              "class": "tool-panel panel-bottom"
            }, function() {
              return _this.div({
                "class": "inset-panel"
              }, function() {
                _this.div({
                  "class": "panel-heading"
                }, function() {
                  _this.div({
                    "class": 'btn-toolbar pull-right'
                  }, function() {
                    return _this.button({
                      "class": 'btn',
                      click: 'close'
                    }, 'Close');
                  });
                  return _this.span({
                    "class": 'text-error'
                  }, 'IMPORTANT: CoffeeScript Preview has been Deprecated!');
                });
                return _this.div({
                  "class": "panel-body padded"
                }, function() {
                  _this.span({
                    "class": 'text-warning'
                  }, 'CoffeeScript Preview has been deprecated. Please migrate to the Preview package for Atom. ');
                  return _this.a({
                    href: 'https://github.com/Glavin001/atom-preview'
                  }, "Click here to see the Preview package for Atom");
                });
              });
            });
          });
        };
      })(this));
    };

    DeprecationView.prototype.close = function(event, element) {
      return this.detach();
    };

    return DeprecationView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFCQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsTUFBUixFQUFSLElBQUQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixzQ0FBQSxDQUFBOzs7OztLQUFBOztBQUFBLElBQUEsZUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUNFO0FBQUEsUUFBQSxPQUFBLEVBQU8seUNBQVA7T0FERixFQUNvRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNoRCxLQUFDLENBQUEsR0FBRCxDQUNFO0FBQUEsWUFBQSxPQUFBLEVBQU8sa0JBQVA7V0FERixFQUM2QixTQUFBLEdBQUE7bUJBQ3pCLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyx5QkFBUDthQUFMLEVBQXVDLFNBQUEsR0FBQTtxQkFDckMsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGdCQUFBLE9BQUEsRUFBTyxhQUFQO2VBQUwsRUFBMkIsU0FBQSxHQUFBO0FBQ3pCLGdCQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxrQkFBQSxPQUFBLEVBQU8sZUFBUDtpQkFBTCxFQUE2QixTQUFBLEdBQUE7QUFDM0Isa0JBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLG9CQUFBLE9BQUEsRUFBTyx3QkFBUDttQkFBTCxFQUFzQyxTQUFBLEdBQUE7MkJBQ3BDLEtBQUMsQ0FBQSxNQUFELENBQ0U7QUFBQSxzQkFBQSxPQUFBLEVBQU8sS0FBUDtBQUFBLHNCQUNBLEtBQUEsRUFBTyxPQURQO3FCQURGLEVBR0UsT0FIRixFQURvQztrQkFBQSxDQUF0QyxDQUFBLENBQUE7eUJBS0EsS0FBQyxDQUFBLElBQUQsQ0FDRTtBQUFBLG9CQUFBLE9BQUEsRUFBTyxZQUFQO21CQURGLEVBRUUsc0RBRkYsRUFOMkI7Z0JBQUEsQ0FBN0IsQ0FBQSxDQUFBO3VCQVNBLEtBQUMsQ0FBQSxHQUFELENBQ0U7QUFBQSxrQkFBQSxPQUFBLEVBQU8sbUJBQVA7aUJBREYsRUFFRSxTQUFBLEdBQUE7QUFDRSxrQkFBQSxLQUFDLENBQUEsSUFBRCxDQUNFO0FBQUEsb0JBQUEsT0FBQSxFQUFPLGNBQVA7bUJBREYsRUFFRSw0RkFGRixDQUFBLENBQUE7eUJBR0EsS0FBQyxDQUFBLENBQUQsQ0FDRTtBQUFBLG9CQUFBLElBQUEsRUFBTSwyQ0FBTjttQkFERixFQUVFLGdEQUZGLEVBSkY7Z0JBQUEsQ0FGRixFQVZ5QjtjQUFBLENBQTNCLEVBRHFDO1lBQUEsQ0FBdkMsRUFEeUI7VUFBQSxDQUQ3QixFQURnRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRHBELEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsOEJBeUJBLEtBQUEsR0FBTyxTQUFDLEtBQUQsRUFBUSxPQUFSLEdBQUE7YUFDTCxJQUFDLENBQUEsTUFBRCxDQUFBLEVBREs7SUFBQSxDQXpCUCxDQUFBOzsyQkFBQTs7S0FENEIsS0FIOUIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/coffeescript-preview/lib/deprecation-view.coffee