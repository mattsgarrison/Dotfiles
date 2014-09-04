(function() {
  var $$, HighLightView, HighLightsView, Point, Range, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), Point = _ref.Point, Range = _ref.Range, View = _ref.View, $$ = _ref.$$;

  HighLightView = require('./highlight-view');

  module.exports = HighLightsView = (function(_super) {
    __extends(HighLightsView, _super);

    function HighLightsView() {
      return HighLightsView.__super__.constructor.apply(this, arguments);
    }

    HighLightsView.content = function() {
      return this.div({
        "class": 'linter-highlights'
      });
    };

    HighLightsView.prototype.highlights = [];

    HighLightsView.prototype.initialize = function(editorView) {
      this.editorView = editorView;
      return this.highlights = [];
    };

    HighLightsView.prototype.setHighlights = function(messages) {
      var highlightView, message, _i, _len, _results;
      this.removeHighlights();
      _results = [];
      for (_i = 0, _len = messages.length; _i < _len; _i++) {
        message = messages[_i];
        highlightView = new HighLightView({
          range: message.range,
          editorView: this.editorView,
          level: message.level
        });
        this.editorView.underlayer.append(highlightView);
        _results.push(this.highlights.push(highlightView));
      }
      return _results;
    };

    HighLightsView.prototype.removeHighlights = function() {
      var highlight, _i, _len, _ref1;
      _ref1 = this.highlights;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        highlight = _ref1[_i];
        highlight.remove();
      }
      return this.highlights = [];
    };

    return HighLightsView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUEyQixPQUFBLENBQVEsTUFBUixDQUEzQixFQUFDLGFBQUEsS0FBRCxFQUFRLGFBQUEsS0FBUixFQUFlLFlBQUEsSUFBZixFQUFxQixVQUFBLEVBQXJCLENBQUE7O0FBQUEsRUFDQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxrQkFBUixDQURoQixDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLHFDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLG1CQUFQO09BQUwsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFBQSw2QkFHQSxVQUFBLEdBQVksRUFIWixDQUFBOztBQUFBLDZCQVNBLFVBQUEsR0FBWSxTQUFFLFVBQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLGFBQUEsVUFDWixDQUFBO2FBQUEsSUFBQyxDQUFBLFVBQUQsR0FBYyxHQURKO0lBQUEsQ0FUWixDQUFBOztBQUFBLDZCQWlCQSxhQUFBLEdBQWUsU0FBQyxRQUFELEdBQUE7QUFDYixVQUFBLDBDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsZ0JBQUQsQ0FBQSxDQUFBLENBQUE7QUFDQTtXQUFBLCtDQUFBOytCQUFBO0FBQ0UsUUFBQSxhQUFBLEdBQW9CLElBQUEsYUFBQSxDQUNsQjtBQUFBLFVBQUEsS0FBQSxFQUFPLE9BQU8sQ0FBQyxLQUFmO0FBQUEsVUFDQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBRGI7QUFBQSxVQUVBLEtBQUEsRUFBTyxPQUFPLENBQUMsS0FGZjtTQURrQixDQUFwQixDQUFBO0FBQUEsUUFJQSxJQUFDLENBQUEsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUF2QixDQUE4QixhQUE5QixDQUpBLENBQUE7QUFBQSxzQkFLQSxJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosQ0FBaUIsYUFBakIsRUFMQSxDQURGO0FBQUE7c0JBRmE7SUFBQSxDQWpCZixDQUFBOztBQUFBLDZCQTRCQSxnQkFBQSxHQUFrQixTQUFBLEdBQUE7QUFDaEIsVUFBQSwwQkFBQTtBQUFBO0FBQUEsV0FBQSw0Q0FBQTs4QkFBQTtBQUNFLFFBQUEsU0FBUyxDQUFDLE1BQVYsQ0FBQSxDQUFBLENBREY7QUFBQSxPQUFBO2FBRUEsSUFBQyxDQUFBLFVBQUQsR0FBYyxHQUhFO0lBQUEsQ0E1QmxCLENBQUE7OzBCQUFBOztLQUYyQixLQUw3QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter/lib/highlights-view.coffee