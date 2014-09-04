(function() {
  var $, View, ZentabsController, _, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, View = _ref.View;

  _ = require('underscore-plus');

  module.exports = ZentabsController = (function(_super) {
    __extends(ZentabsController, _super);

    function ZentabsController() {
      this.unpinTab = __bind(this.unpinTab, this);
      this.pinTab = __bind(this.pinTab, this);
      return ZentabsController.__super__.constructor.apply(this, arguments);
    }

    ZentabsController.content = function() {
      return this.span('');
    };

    ZentabsController.prototype.initialize = function(pane) {
      var item, _i, _len, _ref1;
      this.pane = pane;
      atom.workspaceView.command('zentabs:cleanup', (function(_this) {
        return function() {
          return _this.closeOverflowingTabs();
        };
      })(this));
      atom.workspaceView.command('zentabs:pintab', this.pinTab);
      atom.workspaceView.command('zentabs:unpintab', this.unpinTab);
      this.items = [];
      this.pinnedItems = [];
      this.subscriptions = [];
      this.paneContainer = this.pane.getContainer();
      _ref1 = this.pane.getItems();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        item = _ref1[_i];
        this.pushItem(item);
      }
      this.subscribe(this.paneContainer, 'pane:removed', (function(_this) {
        return function(pane) {
          if (pane === _this.pane) {
            return _this.unsubscribe();
          }
        };
      })(this));
      this.subscribe(this.pane, 'pane:item-added', (function(_this) {
        return function(e, item, index) {
          _this.pushItem(item);
          if (!atom.config.get('zentabs.manualMode')) {
            _this.closeOverflowingTabs();
          }
          return true;
        };
      })(this));
      this.subscribe(this.pane, 'pane:item-removed', (function(_this) {
        return function(e, item) {
          _.remove(_this.pinnedItems, item);
          _.remove(_this.items, item);
          return true;
        };
      })(this));
      this.subscribe(this.pane, 'pane:active-item-changed', (function(_this) {
        return function() {
          _this.updateActiveTab();
          return true;
        };
      })(this));
      this.updateActiveTab();
      if (!atom.config.get('zentabs.manualMode')) {
        this.closeOverflowingTabs();
      }
      return atom.workspaceView.append(this);
    };

    ZentabsController.prototype.pushItem = function(item) {
      if (!(this.pinnedItems.indexOf(item) > -1)) {
        return this.items.push(item);
      }
    };

    ZentabsController.prototype.updateActiveTab = function() {
      var item;
      item = this.pane.activeItem;
      if (!item) {
        return;
      }
      if (this.pinnedItems.indexOf(item) > -1) {
        return;
      }
      _.remove(this.items, item);
      return this.items.push(item);
    };

    ZentabsController.prototype.closeOverflowingTabs = function() {
      var maxTabs, modified, neverCloseUnsaved, olderTab, _ref1, _results;
      maxTabs = atom.config.getInt('zentabs.maximumOpenedTabs' != null ? 'zentabs.maximumOpenedTabs' : Infinity);
      neverCloseUnsaved = atom.config.get('zentabs.neverCloseUnsaved');
      _results = [];
      while (this.items.length > 0 && this.items.length > maxTabs) {
        olderTab = this.items.shift();
        modified = (_ref1 = olderTab.buffer) != null ? _ref1.isModified() : void 0;
        if (!(neverCloseUnsaved && modified)) {
          _results.push(this.pane.destroyItem(olderTab));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    ZentabsController.prototype.pinTab = function() {
      var item, tab;
      tab = $('.tab.right-clicked').view();
      if (!tab) {
        return;
      }
      window.tab = tab;
      item = tab.item;
      _.remove(this.items, item);
      if (!(this.pinnedItems.indexOf(item) > -1)) {
        this.pinnedItems.push(item);
      }
      tab.addClass('pinned');
      if (atom.config.get('zentabs.showPinnedIcon')) {
        return tab.find('.title').addClass('icon icon-lock');
      }
    };

    ZentabsController.prototype.unpinTab = function() {
      var item, tab;
      tab = $('.tab.right-clicked').view();
      if (!tab) {
        return;
      }
      item = tab.item;
      _.remove(this.pinnedItems, item);
      this.pushItem(item);
      tab.removeClass('pinned');
      tab.find('.title').removeClass('icon icon-lock');
      return this.closeOverflowingTabs();
    };

    return ZentabsController;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1DQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBWSxPQUFBLENBQVEsTUFBUixDQUFaLEVBQUMsU0FBQSxDQUFELEVBQUksWUFBQSxJQUFKLENBQUE7O0FBQUEsRUFDQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBREosQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSix3Q0FBQSxDQUFBOzs7Ozs7S0FBQTs7QUFBQSxJQUFBLGlCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLGdDQUdBLFVBQUEsR0FBWSxTQUFFLElBQUYsR0FBQTtBQUVWLFVBQUEscUJBQUE7QUFBQSxNQUZXLElBQUMsQ0FBQSxPQUFBLElBRVosQ0FBQTtBQUFBLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixpQkFBM0IsRUFBOEMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsb0JBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBOUMsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGdCQUEzQixFQUE2QyxJQUFDLENBQUEsTUFBOUMsQ0FEQSxDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGtCQUEzQixFQUErQyxJQUFDLENBQUEsUUFBaEQsQ0FGQSxDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUEsS0FBRCxHQUFTLEVBSlQsQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFBLFdBQUQsR0FB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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/zentabs/lib/zentabs-controller.coffee