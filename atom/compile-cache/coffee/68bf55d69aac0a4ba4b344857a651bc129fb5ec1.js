(function() {
  var RangeFinder, sortLines, sortLinesInsensitive, sortLinesReversed, uniqueLines;

  RangeFinder = require('./range-finder');

  module.exports = {
    activate: function() {
      atom.workspaceView.command('sort-lines:sort', '.editor', function() {
        var editor;
        editor = atom.workspace.getActiveEditor();
        return sortLines(editor);
      });
      atom.workspaceView.command('sort-lines:reverse-sort', '.editor', function() {
        var editor;
        editor = atom.workspace.getActiveEditor();
        return sortLinesReversed(editor);
      });
      atom.workspaceView.command('sort-lines:unique', '.editor', function() {
        var editor;
        editor = atom.workspace.getActiveEditor();
        return uniqueLines(editor);
      });
      return atom.workspaceView.command('sort-lines:case-insensitive-sort', '.editor', function() {
        var editor;
        editor = atom.workspace.getActiveEditor();
        return sortLinesInsensitive(editor);
      });
    }
  };

  sortLines = function(editor) {
    var sortableRanges;
    sortableRanges = RangeFinder.rangesFor(editor);
    return sortableRanges.forEach(function(range) {
      var textLines;
      textLines = editor.getTextInBufferRange(range).split("\n");
      textLines.sort(function(a, b) {
        return a.localeCompare(b);
      });
      return editor.setTextInBufferRange(range, textLines.join("\n"));
    });
  };

  sortLinesReversed = function(editor) {
    var sortableRanges;
    sortableRanges = RangeFinder.rangesFor(editor);
    return sortableRanges.forEach(function(range) {
      var textLines;
      textLines = editor.getTextInBufferRange(range).split("\n");
      textLines.sort(function(a, b) {
        return b.localeCompare(a);
      });
      return editor.setTextInBufferRange(range, textLines.join("\n"));
    });
  };

  uniqueLines = function(editor) {
    var sortableRanges;
    sortableRanges = RangeFinder.rangesFor(editor);
    return sortableRanges.forEach(function(range) {
      var textLines, uniqued;
      textLines = editor.getTextInBufferRange(range).split("\n");
      uniqued = textLines.filter(function(value, index, self) {
        return self.indexOf(value) === index;
      });
      return editor.setTextInBufferRange(range, uniqued.join("\n"));
    });
  };

  sortLinesInsensitive = function(editor) {
    var sortableRanges;
    sortableRanges = RangeFinder.rangesFor(editor);
    return sortableRanges.forEach(function(range) {
      var textLines;
      textLines = editor.getTextInBufferRange(range).split("\n");
      textLines.sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      return editor.setTextInBufferRange(range, textLines.join("\n"));
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRFQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGlCQUEzQixFQUE4QyxTQUE5QyxFQUF5RCxTQUFBLEdBQUE7QUFDdkQsWUFBQSxNQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFmLENBQUEsQ0FBVCxDQUFBO2VBQ0EsU0FBQSxDQUFVLE1BQVYsRUFGdUQ7TUFBQSxDQUF6RCxDQUFBLENBQUE7QUFBQSxNQUlBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIseUJBQTNCLEVBQXNELFNBQXRELEVBQWlFLFNBQUEsR0FBQTtBQUMvRCxZQUFBLE1BQUE7QUFBQSxRQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWYsQ0FBQSxDQUFULENBQUE7ZUFDQSxpQkFBQSxDQUFrQixNQUFsQixFQUYrRDtNQUFBLENBQWpFLENBSkEsQ0FBQTtBQUFBLE1BUUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixtQkFBM0IsRUFBZ0QsU0FBaEQsRUFBMkQsU0FBQSxHQUFBO0FBQ3pELFlBQUEsTUFBQTtBQUFBLFFBQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZixDQUFBLENBQVQsQ0FBQTtlQUNBLFdBQUEsQ0FBWSxNQUFaLEVBRnlEO01BQUEsQ0FBM0QsQ0FSQSxDQUFBO2FBWUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixrQ0FBM0IsRUFBK0QsU0FBL0QsRUFB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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/sort-lines/lib/sort-lines.coffee