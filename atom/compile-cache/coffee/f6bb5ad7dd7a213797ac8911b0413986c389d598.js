(function() {
  module.exports = {
    activate: function(state) {
      atom.workspaceView.command("space-tab:convert-to-tabs", (function(_this) {
        return function() {
          return _this.convertToTabs();
        };
      })(this));
      return atom.workspaceView.command("space-tab:convert-to-spaces", (function(_this) {
        return function() {
          return _this.convertToSpaces();
        };
      })(this));
    },
    convertToTabs: function() {
      var editor, line, newTextArray, re, result, spaceCount, textArray;
      editor = atom.workspace.activePaneItem;
      spaceCount = editor.getTabLength();
      re = new RegExp("^(( {" + spaceCount + "})+)", 'g');
      textArray = editor.getText().split('\n');
      newTextArray = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = textArray.length; _i < _len; _i++) {
          line = textArray[_i];
          _results.push(line = line.replace(re, function(_, spaces) {
            var len, result;
            len = spaces.length / spaceCount;
            result = '';
            while (result.length < len) {
              result += '\t';
            }
            return result;
          }));
        }
        return _results;
      })();
      result = newTextArray.join('\n');
      return editor.setText(result);
    },
    convertToSpaces: function() {
      var editor, line, newTextArray, re, result, spaceCount, textArray;
      editor = atom.workspace.activePaneItem;
      spaceCount = editor.getTabLength();
      re = new RegExp("^((\t)+)", 'g');
      textArray = editor.getText().split('\n');
      newTextArray = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = textArray.length; _i < _len; _i++) {
          line = textArray[_i];
          _results.push(line = line.replace(re, function(_, tabs) {
            var len, result;
            len = tabs.length * spaceCount;
            result = '';
            while (result.length < len) {
              result += new Array(spaceCount + 1).join(' ');
            }
            return result;
          }));
        }
        return _results;
      })();
      result = newTextArray.join('\n');
      return editor.setText(result);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0M7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUNULE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQiwyQkFBM0IsRUFBd0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsYUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4RCxDQUFBLENBQUE7YUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLDZCQUEzQixFQUEwRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxlQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTFELEVBRlM7SUFBQSxDQUFWO0FBQUEsSUFJQSxhQUFBLEVBQWUsU0FBQSxHQUFBO0FBQ2QsVUFBQSw2REFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBeEIsQ0FBQTtBQUFBLE1BQ0EsVUFBQSxHQUFhLE1BQU0sQ0FBQyxZQUFQLENBQUEsQ0FEYixDQUFBO0FBQUEsTUFFQSxFQUFBLEdBQVMsSUFBQSxNQUFBLENBQU8sT0FBQSxHQUFVLFVBQVYsR0FBdUIsTUFBOUIsRUFBc0MsR0FBdEMsQ0FGVCxDQUFBO0FBQUEsTUFHQSxTQUFBLEdBQVksTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFnQixDQUFDLEtBQWpCLENBQXVCLElBQXZCLENBSFosQ0FBQTtBQUFBLE1BS0EsWUFBQTs7QUFBZTthQUFBLGdEQUFBOytCQUFBO0FBQ2Qsd0JBQUEsSUFBQSxHQUFPLElBQUksQ0FBQyxPQUFMLENBQWEsRUFBYixFQUFpQixTQUFDLENBQUQsRUFBSSxNQUFKLEdBQUE7QUFDdkIsZ0JBQUEsV0FBQTtBQUFBLFlBQUEsR0FBQSxHQUFNLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFVBQXRCLENBQUE7QUFBQSxZQUNBLE1BQUEsR0FBUyxFQURULENBQUE7QUFFQSxtQkFBTSxNQUFNLENBQUMsTUFBUCxHQUFnQixHQUF0QixHQUFBO0FBQ0MsY0FBQSxNQUFBLElBQVUsSUFBVixDQUREO1lBQUEsQ0FGQTttQkFLQSxPQU51QjtVQUFBLENBQWpCLEVBQVAsQ0FEYztBQUFBOztVQUxmLENBQUE7QUFBQSxNQWNBLE1BQUEsR0FBUyxZQUFZLENBQUMsSUFBYixDQUFrQixJQUFsQixDQWRULENBQUE7YUFnQkEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxNQUFmLEVBakJjO0lBQUEsQ0FKZjtBQUFBLElBdUJBLGVBQUEsRUFBaUIsU0FBQSxHQUFBO0FBQ2hCLFVBQUEsNkRBQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQXhCLENBQUE7QUFBQSxNQUNBLFVBQUEsR0FBYSxNQUFNLENBQUMsWUFBUCxDQUFBLENBRGIsQ0FBQTtBQUFBLE1BRUEsRUFBQSxHQUFTLElBQUEsTUFBQSxDQUFPLFVBQVAsRUFBbUIsR0FBbkIsQ0FGVCxDQUFBO0FBQUEsTUFHQSxTQUFBLEdBQVksTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFnQixDQUFDLEtBQWpCLENBQXVCLElBQXZCLENBSFosQ0FBQTtBQUFBLE1BS0EsWUFBQTs7QUFBZTthQUFBLGdEQUFBOytCQUFBO0FBQ2Qsd0JBQUEsSUFBQSxHQUFPLElBQUksQ0FBQyxPQUFMLENBQWEsRUFBYixFQUFpQixTQUFDLENBQUQsRUFBSSxJQUFKLEdBQUE7QUFDdkIsZ0JBQUEsV0FBQTtBQUFBLFlBQUEsR0FBQSxHQUFNLElBQUksQ0FBQyxNQUFMLEdBQWMsVUFBcEIsQ0FBQTtBQUFBLFlBQ0EsTUFBQSxHQUFTLEVBRFQsQ0FBQTtBQUVBLG1CQUFNLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLEdBQXRCLEdBQUE7QUFDQyxjQUFBLE1BQUEsSUFBYyxJQUFBLEtBQUEsQ0FBTSxVQUFBLEdBQWEsQ0FBbkIsQ0FBcUIsQ0FBQyxJQUF0QixDQUEyQixHQUEzQixDQUFkLENBREQ7WUFBQSxDQUZBO21CQUtBLE9BTnVCO1VBQUEsQ0FBakIsRUFBUCxDQURjO0FBQUE7O1VBTGYsQ0FBQTtBQUFBLE1BY0EsTUFBQSxHQUFTLFlBQVksQ0FBQyxJQUFiLENBQWtCLElBQWxCLENBZFQsQ0FBQTthQWdCQSxNQUFNLENBQUMsT0FBUCxDQUFlLE1BQWYsRUFqQmdCO0lBQUEsQ0F2QmpCO0dBREQsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/space-tab/lib/space-tab.coffee