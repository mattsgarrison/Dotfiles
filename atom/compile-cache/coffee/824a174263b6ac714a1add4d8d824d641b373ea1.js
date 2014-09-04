(function() {
  var GutterView;

  GutterView = (function() {
    function GutterView(editorView) {
      this.editorView = editorView;
      this.gutter = this.editorView.gutter;
    }

    GutterView.prototype.clear = function() {
      this.gutter.removeClassFromAllLines('linter-error');
      return this.gutter.removeClassFromAllLines('linter-warning');
    };

    GutterView.prototype.render = function(messages) {
      var line, message, _i, _len, _results;
      if (!this.gutter.isVisible()) {
        return;
      }
      this.clear();
      _results = [];
      for (_i = 0, _len = messages.length; _i < _len; _i++) {
        message = messages[_i];
        line = message.range.start.row;
        if (message.level === 'error') {
          this.gutter.addClassToLine(line, 'linter-error');
        }
        if (message.level === 'warning') {
          _results.push(this.gutter.addClassToLine(line, 'linter-warning'));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return GutterView;

  })();

  module.exports = GutterView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBR0E7QUFBQSxNQUFBLFVBQUE7O0FBQUEsRUFBTTtBQU1TLElBQUEsb0JBQUMsVUFBRCxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsVUFBRCxHQUFjLFVBQWQsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BRHRCLENBRFc7SUFBQSxDQUFiOztBQUFBLHlCQUtBLEtBQUEsR0FBTyxTQUFBLEdBQUE7QUFDTCxNQUFBLElBQUMsQ0FBQSxNQUFNLENBQUMsdUJBQVIsQ0FBZ0MsY0FBaEMsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyx1QkFBUixDQUFnQyxnQkFBaEMsRUFGSztJQUFBLENBTFAsQ0FBQTs7QUFBQSx5QkFjQSxNQUFBLEdBQVEsU0FBQyxRQUFELEdBQUE7QUFDTixVQUFBLGlDQUFBO0FBQUEsTUFBQSxJQUFBLENBQUEsSUFBZSxDQUFBLE1BQU0sQ0FBQyxTQUFSLENBQUEsQ0FBZDtBQUFBLGNBQUEsQ0FBQTtPQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsS0FBRCxDQUFBLENBREEsQ0FBQTtBQUdBO1dBQUEsK0NBQUE7K0JBQUE7QUFDRSxRQUFBLElBQUEsR0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUEzQixDQUFBO0FBQ0EsUUFBQSxJQUFHLE9BQU8sQ0FBQyxLQUFSLEtBQWlCLE9BQXBCO0FBQ0UsVUFBQSxJQUFDLENBQUEsTUFBTSxDQUFDLGNBQVIsQ0FBdUIsSUFBdkIsRUFBNkIsY0FBN0IsQ0FBQSxDQURGO1NBREE7QUFJQSxRQUFBLElBQUcsT0FBTyxDQUFDLEtBQVIsS0FBaUIsU0FBcEI7d0JBQ0UsSUFBQyxDQUFBLE1BQU0sQ0FBQyxjQUFSLENBQXVCLElBQXZCLEVBQTZCLGdCQUE3QixHQURGO1NBQUEsTUFBQTtnQ0FBQTtTQUxGO0FBQUE7c0JBSk07SUFBQSxDQWRSLENBQUE7O3NCQUFBOztNQU5GLENBQUE7O0FBQUEsRUFnQ0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsVUFoQ2pCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter/lib/gutter-view.coffee