(function() {
  var $$, HighLightView, Point, Range, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), Point = _ref.Point, Range = _ref.Range, View = _ref.View, $$ = _ref.$$;

  module.exports = HighLightView = (function(_super) {
    __extends(HighLightView, _super);

    function HighLightView() {
      return HighLightView.__super__.constructor.apply(this, arguments);
    }

    HighLightView.content = function() {
      return this.div({
        "class": 'linter-highlight'
      });
    };

    HighLightView.prototype.regions = null;

    HighLightView.prototype.initialize = function(_arg) {
      var _ref1;
      _ref1 = _arg != null ? _arg : {}, this.editorView = _ref1.editorView, this.range = _ref1.range, this.level = _ref1.level;
      this.marker = this.editorView.editor.buffer.markRange(this.range);
      this.marker = this.editorView.editor.displayBuffer.getMarker(this.marker.id);
      this.regions = [];
      this.marker.on('changed', (function(_this) {
        return function() {
          return _this.render();
        };
      })(this));
      return this.render();
    };

    HighLightView.prototype.render = function() {
      var columnEnd, columnStart, row, rowIndex, rowSpan, screenRange, _i, _results;
      screenRange = this.marker.getScreenRange();
      this.removeRegions();
      this.addClass(this.level);
      if (screenRange.start.isEqual(screenRange.end)) {
        screenRange.end.column = new Point(screenRange.end.column + 1, 0);
      }
      rowSpan = screenRange.end.row - screenRange.start.row;
      _results = [];
      for (rowIndex = _i = 0; 0 <= rowSpan ? _i <= rowSpan : _i >= rowSpan; rowIndex = 0 <= rowSpan ? ++_i : --_i) {
        row = screenRange.start.row + rowIndex;
        if (rowIndex === 0) {
          columnStart = screenRange.start.column - 1;
        } else {
          columnStart = 0;
        }
        if (rowIndex === rowSpan) {
          columnEnd = screenRange.end.column;
        } else {
          columnEnd = (this.editorView.editor.displayBuffer.lineForRow(row)).text.length - 1;
        }
        _results.push(this.appendRegion({
          row: row,
          column: columnStart
        }, {
          row: row,
          column: columnEnd
        }));
      }
      return _results;
    };

    HighLightView.prototype.appendRegion = function(start, end) {
      var css, lineHeight, region;
      try {
        lineHeight = this.editorView.lineHeight;
        css = this.editorView.pixelPositionForScreenPosition(start);
        css.height = lineHeight;
        css.width = this.editorView.pixelPositionForScreenPosition(end).left - css.left;
        region = ($$(function() {
          return this.div({
            "class": 'region'
          });
        })).css(css);
        if (css.width > 0 || css.right === 0) {
          this.append(region);
          return this.regions.push(region);
        }
      } catch (_error) {}
    };

    HighLightView.prototype.removeRegions = function() {
      var region, _i, _len, _ref1;
      _ref1 = this.regions;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        region = _ref1[_i];
        region.remove();
      }
      return this.regions = [];
    };

    HighLightView.prototype.remove = function() {
      this.marker.destroy();
      return HighLightView.__super__.remove.apply(this, arguments);
    };

    return HighLightView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUEyQixPQUFBLENBQVEsTUFBUixDQUEzQixFQUFDLGFBQUEsS0FBRCxFQUFRLGFBQUEsS0FBUixFQUFlLFlBQUEsSUFBZixFQUFxQixVQUFBLEVBQXJCLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosb0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsYUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sa0JBQVA7T0FBTCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDRCQUdBLE9BQUEsR0FBUyxJQUhULENBQUE7O0FBQUEsNEJBV0EsVUFBQSxHQUFZLFNBQUMsSUFBRCxHQUFBO0FBQ1YsVUFBQSxLQUFBO0FBQUEsNkJBRFcsT0FBZ0MsSUFBL0IsSUFBQyxDQUFBLG1CQUFBLFlBQVksSUFBQyxDQUFBLGNBQUEsT0FBTyxJQUFDLENBQUEsY0FBQSxLQUNsQyxDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUExQixDQUFvQyxJQUFDLENBQUEsS0FBckMsQ0FBVixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFqQyxDQUEyQyxJQUFDLENBQUEsTUFBTSxDQUFDLEVBQW5ELENBRFYsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxFQUhYLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxNQUFNLENBQUMsRUFBUixDQUFXLFNB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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter/lib/highlight-view.coffee