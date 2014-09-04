(function() {
  var $, ResizeHandle,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = require('atom').$;

  module.exports = ResizeHandle = (function() {
    function ResizeHandle(view) {
      this.resizeStopped = __bind(this.resizeStopped, this);
      this.resizeStarted = __bind(this.resizeStarted, this);
      this.resizeTreeView = __bind(this.resizeTreeView, this);
      this.resizeToFitContent = __bind(this.resizeToFitContent, this);
      this.view = view;
      this.view.on('dblclick', '.ruby-test-resize-handle', this.resizeToFitContent);
      this.view.on('mousedown', '.ruby-test-resize-handle', this.resizeStarted);
      this.panelBody = this.view.find('.panel-body');
      this.resultsEl = this.view.results;
    }

    ResizeHandle.prototype.resizeToFitContent = function() {
      this.panelBody.height(1);
      return this.panelBody.height(Math.max(this.resultsEl.outerHeight(), 40));
    };

    ResizeHandle.prototype.resizeTreeView = function(_arg) {
      var statusBarHeight, testBarHeight, workspaceHeight;
      workspaceHeight = $('.workspace').outerHeight();
      statusBarHeight = $('.status-bar').outerHeight();
      testBarHeight = $('.ruby-test .panel-heading').outerHeight();
      return this.panelBody.height(workspaceHeight - _arg.pageY - statusBarHeight - testBarHeight - 28);
    };

    ResizeHandle.prototype.resizeStarted = function() {
      $(document.body).on('mousemove', this.resizeTreeView);
      return $(document.body).on('mouseup', this.resizeStopped);
    };

    ResizeHandle.prototype.resizeStopped = function() {
      $(document.body).off('mousemove', this.resizeTreeView);
      return $(document.body).off('mouseup', this.resizeStopped);
    };

    return ResizeHandle;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGVBQUE7SUFBQSxrRkFBQTs7QUFBQSxFQUFDLElBQUssT0FBQSxDQUFRLE1BQVIsRUFBTCxDQUFELENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNRO0FBQ1MsSUFBQSxzQkFBQyxJQUFELEdBQUE7QUFDWCwyREFBQSxDQUFBO0FBQUEsMkRBQUEsQ0FBQTtBQUFBLDZEQUFBLENBQUE7QUFBQSxxRUFBQSxDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsSUFBRCxHQUFRLElBQVIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxFQUFOLENBQVMsVUFBVCxFQUFxQiwwQkFBckIsRUFBaUQsSUFBQyxDQUFBLGtCQUFsRCxDQURBLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxJQUFJLENBQUMsRUFBTixDQUFTLFdBQVQsRUFBc0IsMEJBQXRCLEVBQWtELElBQUMsQ0FBQSxhQUFuRCxDQUZBLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxTQUFELEdBQWEsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFOLENBQVcsYUFBWCxDQUhiLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxTQUFELEdBQWEsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUpuQixDQURXO0lBQUEsQ0FBYjs7QUFBQSwyQkFPQSxrQkFBQSxHQUFvQixTQUFBLEdBQUE7QUFDbEIsTUFBQSxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQVgsQ0FBa0IsQ0FBbEIsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLENBQWtCLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBQyxDQUFBLFNBQVMsQ0FBQyxXQUFYLENBQUEsQ0FBVCxFQUFtQyxFQUFuQyxDQUFsQixFQUZrQjtJQUFBLENBUHBCLENBQUE7O0FBQUEsMkJBV0EsY0FBQSxHQUFnQixTQUFDLElBQUQsR0FBQTtBQUNkLFVBQUEsK0NBQUE7QUFBQSxNQUFBLGVBQUEsR0FBa0IsQ0FBQSxDQUFFLFlBQUYsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBbEIsQ0FBQTtBQUFBLE1BQ0EsZUFBQSxHQUFrQixDQUFBLENBQUUsYUFBRixDQUFnQixDQUFDLFdBQWpCLENBQUEsQ0FEbEIsQ0FBQTtBQUFBLE1BRUEsYUFBQSxHQUFnQixDQUFBLENBQUUsMkJBQUYsQ0FBOEIsQ0FBQyxXQUEvQixDQUFBLENBRmhCLENBQUE7YUFHQSxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQVgsQ0FBa0IsZUFBQSxHQUFrQixJQUFJLENBQUMsS0FBdkIsR0FBK0IsZUFBL0IsR0FBaUQsYUFBakQsR0FBaUUsRUFBbkYsRUFKYztJQUFBLENBWGhCLENBQUE7O0FBQUEsMkJBaUJBLGFBQUEsR0FBZSxTQUFBLEdBQUE7QUFDYixNQUFBLENBQUEsQ0FBRSxRQUFRLENBQUMsSUFBWCxDQUFnQixDQUFDLEVBQWpCLENBQW9CLFdBQXBCLEVBQWlDLElBQUMsQ0FBQSxjQUFsQyxDQUFBLENBQUE7YUFDQSxDQUFBLENBQUUsUUFBUSxDQUFDLElBQVgsQ0FBZ0IsQ0FBQyxFQUFqQixDQUFvQixTQUFwQixFQUErQixJQUFDLENBQUEsYUFBaEMsRUFGYTtJQUFBLENBakJmLENBQUE7O0FBQUEsMkJBcUJBLGFBQUEsR0FBZSxTQUFBLEdBQUE7QUFDYixNQUFBLENBQUEsQ0FBRSxRQUFRLENBQUMsSUFBWCxDQUFnQixDQUFDLEdBQWpCLENBQXFCLFdBQXJCLEVBQWtDLElBQUMsQ0FBQSxjQUFuQyxDQUFBLENBQUE7YUFDQSxDQUFBLENBQUUsUUFBUSxDQUFDLElBQVgsQ0FBZ0IsQ0FBQyxHQUFqQixDQUFxQixTQUFyQixFQUFnQyxJQUFDLENBQUEsYUFBakMsRUFGYTtJQUFBLENBckJmLENBQUE7O3dCQUFBOztNQUpKLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/ruby-test/lib/resize-handle.coffee