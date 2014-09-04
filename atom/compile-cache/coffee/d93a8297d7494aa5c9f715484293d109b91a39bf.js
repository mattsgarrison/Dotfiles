(function() {
  var $, HighlightCssColorView, View, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, View = _ref.View;

  module.exports = HighlightCssColorView = (function(_super) {
    __extends(HighlightCssColorView, _super);

    function HighlightCssColorView() {
      this.updateUnderlayers = __bind(this.updateUnderlayers, this);
      return HighlightCssColorView.__super__.constructor.apply(this, arguments);
    }

    HighlightCssColorView.content = function() {
      return this.div("");
    };

    HighlightCssColorView.prototype.initialize = function(serializeState) {
      atom.workspaceView.command("highlight-css-color:toggle", (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
      atom.workspaceView.eachEditorView((function(_this) {
        return function(e) {
          return _this.registerChangeHandler(e.getEditor());
        };
      })(this));
      return this.updateUnderlayers();
    };

    HighlightCssColorView.prototype.serialize = function() {};

    HighlightCssColorView.prototype.destroy = function() {
      return this.detach();
    };

    HighlightCssColorView.prototype.toggle = function() {
      console.log("HighlightCssColorView was toggled!");
      if (this.hasParent()) {
        return this.detach();
      } else {
        return atom.workspaceView.append(this);
      }
    };

    HighlightCssColorView.prototype.updateUnderlayers = function() {
      var backgrounds;
      atom.workspaceView.find('.underlayer .css-color-background').remove();
      backgrounds = [];
      atom.workspaceView.find('.css.color').each(function() {
        var background, color, colorfunc, position, value;
        position = $(this).position();
        value = $(this).text();
        background = $('<div class="css-color-background"/>').css({
          top: position.top,
          left: position.left
        });
        colorfunc = $(this).prevAll('.support.function');
        color = colorfunc.text() ? "" + (colorfunc.text()) + "(" + ($(this).text()) + ")" : $(this).text();
        background.css('background-color', color);
        background.width($(this).width()).height($(this).height());
        return backgrounds.push(background);
      });
      return atom.workspaceView.find('.underlayer').append(backgrounds);
    };

    HighlightCssColorView.prototype.registerChangeHandler = function(editor) {
      return editor.on('contents-modified', (function(_this) {
        return function() {
          return _this.updateUnderlayers();
        };
      })(this));
    };

    return HighlightCssColorView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9DQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBVyxPQUFBLENBQVEsTUFBUixDQUFYLEVBQUMsU0FBQSxDQUFELEVBQUcsWUFBQSxJQUFILENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osNENBQUEsQ0FBQTs7Ozs7S0FBQTs7QUFBQSxJQUFBLHFCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxHQUFELENBQUssRUFBTCxFQUFIO0lBQUEsQ0FBVixDQUFBOztBQUFBLG9DQUVBLFVBQUEsR0FBWSxTQUFDLGNBQUQsR0FBQTtBQUNWLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQiw0QkFBM0IsRUFBeUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsTUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6RCxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBbkIsQ0FBa0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsQ0FBRCxHQUFBO2lCQUNoQyxLQUFDLENBQUEscUJBQUQsQ0FBdUIsQ0FBQyxDQUFDLFNBQUYsQ0FBQSxDQUF2QixFQURnQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxDLENBREEsQ0FBQTthQUdBLElBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBSlU7SUFBQSxDQUZaLENBQUE7O0FBQUEsb0NBU0EsU0FBQSxHQUFXLFNBQUEsR0FBQSxDQVRYLENBQUE7O0FBQUEsb0NBWUEsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUNQLElBQUMsQ0FBQSxNQUFELENBQUEsRUFETztJQUFBLENBWlQsQ0FBQTs7QUFBQSxvQ0FlQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLG9DQUFaLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBRyxJQUFDLENBQUEsU0FBRCxDQUFBLENBQUg7ZUFDRSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBREY7T0FBQSxNQUFBO2VBR0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFuQixDQUEwQixJQUExQixFQUhGO09BRk07SUFBQSxDQWZSLENBQUE7O0FBQUEsb0NBc0JBLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTtBQUNqQixVQUFBLFdBQUE7QUFBQSxNQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBbkIsQ0FBd0IsbUNBQXhCLENBQTRELENBQUMsTUFBN0QsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLFdBQUEsR0FBYyxFQURkLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBbkIsQ0FBd0IsWUFBeEIsQ0FBcUMsQ0FBQyxJQUF0QyxDQUEyQyxTQUFBLEdBQUE7QUFDekMsWUFBQSw2Q0FBQTtBQUFBLFFBQUEsUUFBQSxHQUFXLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxRQUFSLENBQUEsQ0FBWCxDQUFBO0FBQUEsUUFDQSxLQUFBLEdBQVEsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBQSxDQURSLENBQUE7QUFBQSxRQUVBLFVBQUEsR0FBYSxDQUFBLENBQUUscUNBQUYsQ0FBd0MsQ0FBQyxHQUF6QyxDQUE2QztBQUFBLFVBQUMsR0FBQSxFQUFLLFFBQVEsQ0FBQyxHQUFmO0FBQUEsVUFBb0IsSUFBQSxFQUFNLFFBQVEsQ0FBQyxJQUFuQztTQUE3QyxDQUZiLENBQUE7QUFBQSxRQUdBLFNBQUEsR0FBWSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsT0FBUixDQUFnQixtQkFBaEIsQ0FIWixDQUFBO0FBQUEsUUFJQSxLQUFBLEdBQVcsU0FBUyxDQUFDLElBQVYsQ0FBQSxDQUFILEdBQXlCLEVBQUEsR0FBRSxDQUFBLFNBQVMsQ0FBQyxJQUFWLENBQUEsQ0FBQSxDQUFGLEdBQW9CLEdBQXBCLEdBQXNCLENBQUEsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBQSxDQUFBLENBQXRCLEdBQXNDLEdBQS9ELEdBQXVFLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQUEsQ0FKL0UsQ0FBQTtBQUFBLFFBS0EsVUFBVSxDQUFDLEdBQVgsQ0FBZSxrQkFBZixFQUFtQyxLQUFuQyxDQUxBLENBQUE7QUFBQSxRQU1BLFVBQVUsQ0FBQyxLQUFYLENBQWlCLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxLQUFSLENBQUEsQ0FBakIsQ0FBaUMsQ0FBQyxNQUFsQyxDQUF5QyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsTUFBUixDQUFBLENBQXpDLENBTkEsQ0FBQTtlQU9BLFdBQVcsQ0FBQyxJQUFaLENBQWlCLFVBQWpCLEVBUnlDO01BQUEsQ0FBM0MsQ0FGQSxDQUFBO2FBV0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFuQixDQUF3QixhQUF4QixDQUFzQyxDQUFDLE1BQXZDLENBQThDLFdBQTlDLEVBWmlCO0lBQUEsQ0F0Qm5CLENBQUE7O0FBQUEsb0NBb0NBLHFCQUFBLEdBQXVCLFNBQUMsTUFBRCxHQUFBO2FBQ3JCLE1BQU0sQ0FBQyxFQUFQLENBQVUsbUJBQVYsRUFBK0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDN0IsS0FBQyxDQUFBLGlCQUFELENBQUEsRUFENkI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEvQixFQURxQjtJQUFBLENBcEN2QixDQUFBOztpQ0FBQTs7S0FEa0MsS0FIcEMsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/highlight-css-color/lib/highlight-css-color-view.coffee