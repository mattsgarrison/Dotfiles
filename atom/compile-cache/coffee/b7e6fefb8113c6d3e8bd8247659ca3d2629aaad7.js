(function() {
  var BufferedNodeProcess, BufferedProcess, Linter, Point, Range, XRegExp, child, path, _ref;

  child = require('child_process').child;

  XRegExp = require('xregexp').XRegExp;

  path = require('path');

  _ref = require('atom'), Range = _ref.Range, Point = _ref.Point, BufferedProcess = _ref.BufferedProcess, BufferedNodeProcess = _ref.BufferedNodeProcess;

  Linter = (function() {
    Linter.syntax = '';

    Linter.prototype.cmd = '';

    Linter.prototype.regex = '';

    Linter.prototype.regexFlags = '';

    Linter.prototype.cwd = null;

    Linter.prototype.defaultLevel = 'error';

    Linter.prototype.linterName = null;

    Linter.prototype.executablePath = null;

    Linter.prototype.isNodeExecutable = false;

    Linter.prototype.errorStream = 'stdout';

    function Linter(editor) {
      this.editor = editor;
      this.cwd = path.dirname(editor.getUri());
    }

    Linter.prototype.getCmdAndArgs = function(filePath) {
      var cmd, cmd_list;
      cmd = this.cmd;
      cmd_list = cmd.split(' ').concat([filePath]);
      if (this.executablePath) {
        cmd_list[0] = "" + this.executablePath + "/" + cmd_list[0];
      }
      cmd_list = cmd_list.map(function(cmd_item) {
        if (/@filename/i.test(cmd_item)) {
          return cmd_item.replace(/@filename/gi, filePath);
        } else {
          return cmd_item;
        }
      });
      if (atom.config.get('linter.lintDebug')) {
        console.log('command and arguments', cmd_list);
      }
      return {
        command: cmd_list[0],
        args: cmd_list.slice(1)
      };
    };

    Linter.prototype.getNodeExecutablePath = function() {
      return path.join(require.resolve('package'), '..', 'apm/node_modules/atom-package-manager/bin/node');
    };

    Linter.prototype.lintFile = function(filePath, callback) {
      var Process, args, command, options, process, stderr, stdout, _ref1;
      _ref1 = this.getCmdAndArgs(filePath), command = _ref1.command, args = _ref1.args;
      if (atom.config.get('linter.lintDebug')) {
        console.log('is node executable: ' + this.isNodeExecutable);
      }
      if (this.isNodeExecutable) {
        Process = BufferedNodeProcess;
      } else {
        Process = BufferedProcess;
      }
      options = {
        cwd: this.cwd
      };
      stdout = (function(_this) {
        return function(output) {
          if (atom.config.get('linter.lintDebug')) {
            console.log('stdout', output);
          }
          if (_this.errorStream === 'stdout') {
            return _this.processMessage(output, callback);
          }
        };
      })(this);
      stderr = (function(_this) {
        return function(output) {
          if (atom.config.get('linter.lintDebug')) {
            console.warn('stderr', output);
          }
          if (_this.errorStream === 'stderr') {
            return _this.processMessage(output, callback);
          }
        };
      })(this);
      process = new Process({
        command: command,
        args: args,
        options: options,
        stdout: stdout,
        stderr: stderr
      });
      return setTimeout(function() {
        return process.kill();
      }, 5000);
    };

    Linter.prototype.processMessage = function(message, callback) {
      var messages, regex;
      messages = [];
      regex = XRegExp(this.regex, this.regexFlags);
      XRegExp.forEach(message, regex, (function(_this) {
        return function(match, i) {
          return messages.push(_this.createMessage(match));
        };
      })(this), this);
      return callback(messages);
    };

    Linter.prototype.createMessage = function(match) {
      var level;
      if (match.error) {
        level = 'error';
      } else if (match.warning) {
        level = 'warning';
      } else {
        level = this.defaultLevel;
      }
      return {
        line: match.line,
        col: match.col,
        level: level,
        message: match.message,
        linter: this.linterName,
        range: this.computeRange(match)
      };
    };

    Linter.prototype.lineLengthForRow = function(row) {
      return this.editor.lineLengthForBufferRow(row);
    };

    Linter.prototype.getEditorScopesForPosition = function(position) {
      return this.editor.displayBuffer.tokenizedBuffer.scopesForPosition(position);
    };

    Linter.prototype.getGetRangeForScopeAtPosition = function(innerMostScope, position) {
      return this.editor.displayBuffer.tokenizedBuffer.bufferRangeForScopeAtPosition(innerMostScope, position);
    };

    Linter.prototype.computeRange = function(match) {
      var colEnd, colStart, innerMostScope, position, range, rowEnd, rowStart, scopes, _ref1, _ref2, _ref3;
      if (match.line == null) {
        match.line = 0;
      }
      rowStart = parseInt((_ref1 = match.lineStart) != null ? _ref1 : match.line) - 1;
      rowEnd = parseInt((_ref2 = match.lineEnd) != null ? _ref2 : match.line) - 1;
      if (rowStart === -1) {
        rowStart = rowEnd = 0;
      }
      if (match.col == null) {
        match.col = 0;
      }
      if (!match.colStart) {
        position = new Point(rowStart, match.col);
        scopes = this.getEditorScopesForPosition(position);
        while (innerMostScope = scopes.pop()) {
          range = this.getGetRangeForScopeAtPosition(innerMostScope, position);
          if (range != null) {
            return range;
          }
        }
      }
      if (match.colStart == null) {
        match.colStart = match.col;
      }
      colStart = parseInt((_ref3 = match.colStart) != null ? _ref3 : 0);
      colEnd = match.colEnd ? parseInt(match.colEnd) : parseInt(this.lineLengthForRow(rowEnd));
      return new Range([rowStart, colStart], [rowEnd, colEnd]);
    };

    return Linter;

  })();

  module.exports = Linter;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNGQUFBOztBQUFBLEVBQUMsUUFBUyxPQUFBLENBQVEsZUFBUixFQUFULEtBQUQsQ0FBQTs7QUFBQSxFQUNDLFVBQVcsT0FBQSxDQUFRLFNBQVIsRUFBWCxPQURELENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBR0EsT0FBdUQsT0FBQSxDQUFRLE1BQVIsQ0FBdkQsRUFBQyxhQUFBLEtBQUQsRUFBUSxhQUFBLEtBQVIsRUFBZSx1QkFBQSxlQUFmLEVBQWdDLDJCQUFBLG1CQUhoQyxDQUFBOztBQUFBLEVBT007QUFJSixJQUFBLE1BQUMsQ0FBQSxNQUFELEdBQVMsRUFBVCxDQUFBOztBQUFBLHFCQUlBLEdBQUEsR0FBSyxFQUpMLENBQUE7O0FBQUEscUJBaUJBLEtBQUEsR0FBTyxFQWpCUCxDQUFBOztBQUFBLHFCQW1CQSxVQUFBLEdBQVksRUFuQlosQ0FBQTs7QUFBQSxxQkFzQkEsR0FBQSxHQUFLLElBdEJMLENBQUE7O0FBQUEscUJBd0JBLFlBQUEsR0FBYyxPQXhCZCxDQUFBOztBQUFBLHFCQTBCQSxVQUFBLEdBQVksSUExQlosQ0FBQTs7QUFBQSxxQkE0QkEsY0FBQSxHQUFnQixJQTVCaEIsQ0FBQTs7QUFBQSxxQkE4QkEsZ0JBQUEsR0FBa0IsS0E5QmxCLENBQUE7O0FBQUEscUJBZ0NBLFdBQUEsR0FBYSxRQWhDYixDQUFBOztBQW1DYSxJQUFBLGdCQUFFLE1BQUYsR0FBQTtBQUNYLE1BRFksSUFBQyxDQUFBLFNBQUEsTUFDYixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsR0FBRCxHQUFPLElBQUksQ0FBQyxPQUFMLENBQWEsTUFBTSxDQUFDLE1BQVAsQ0FBQSxDQUFiLENBQVAsQ0FEVztJQUFBLENBbkNiOztBQUFBLHFCQXVDQSxhQUFBLEdBQWUsU0FBQyxRQUFELEdBQUE7QUFDYixVQUFBLGFBQUE7QUFBQSxNQUFBLEdBQUEsR0FBTSxJQUFDLENBQUEsR0FBUCxDQUFBO0FBQUEsTUFHQSxRQUFBLEdBQVcsR0FBRyxDQUFDLEtBQUosQ0FBVSxHQUFWLENBQWMsQ0FBQyxNQUFmLENBQXNCLENBQUMsUUFBRCxDQUF0QixDQUhYLENBQUE7QUFLQSxNQUFBLElBQUcsSUFBQyxDQUFBLGNBQUo7QUFDRSxRQUFBLFFBQVMsQ0FBQSxDQUFBLENBQVQsR0FBYyxFQUFBLEdBQUUsSUFBQyxDQUFBLGNBQUgsR0FBbUIsR0FBbkIsR0FBcUIsUUFBUyxDQUFBLENBQUEsQ0FBNUMsQ0FERjtPQUxBO0FBQUEsTUFTQSxRQUFBLEdBQVcsUUFBUSxDQUFDLEdBQVQsQ0FBYSxTQUFDLFFBQUQsR0FBQTtBQUN0QixRQUFBLElBQUcsWUFBWSxDQUFDLElBQWIsQ0FBa0IsUUFBbEIsQ0FBSDtBQUNFLGlCQUFPLFFBQVEsQ0FBQyxPQUFULENBQWlCLGFBQWpCLEVBQWdDLFFBQWhDLENBQVAsQ0FERjtTQUFBLE1BQUE7QUFHRSxpQkFBTyxRQUFQLENBSEY7U0FEc0I7TUFBQSxDQUFiLENBVFgsQ0FBQTtBQWVBLE1BQUEsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isa0JBQWhCLENBQUg7QUFDRSxRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksdUJBQVosRUFBcUMsUUFBckMsQ0FBQSxDQURGO09BZkE7YUFrQkE7QUFBQSxRQUNFLE9BQUEsRUFBUyxRQUFTLENBQUEsQ0FBQSxDQURwQjtBQUFBLFFBRUUsSUFBQSxFQUFNLFFBQVEsQ0FBQyxLQUFULENBQWUsQ0FBZixDQUZSO1FBbkJhO0lBQUEsQ0F2Q2YsQ0FBQTs7QUFBQSxxQkFpRUEscUJBQUEsR0FBdUIsU0FBQSxHQUFBO2FBQ3JCLElBQUksQ0FBQyxJQUFMLENBQVUsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsU0FBaEIsQ0FBVixFQUNFLElBREYsRUFFRSxnREFGRixFQURxQjtJQUFBLENBakV2QixDQUFBOztBQUFBLHFCQTBFQSxRQUFBLEdBQVUsU0FBQyxRQUFELEVBQVcsUUFBWCxHQUFBO0FBRVIsVUFBQSwrREFBQTtBQUFBLE1BQUEsUUFBa0IsSUFBQyxDQUFBLGFBQUQsQ0FBZSxRQUFmLENBQWxCLEVBQUMsZ0JBQUEsT0FBRCxFQUFVLGFBQUEsSUFBVixDQUFBO0FBRUEsTUFBQSxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixrQkFBaEIsQ0FBSDtBQUNFLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxzQkFBQSxHQUF5QixJQUFDLENBQUEsZ0JBQXRDLENBQUEsQ0FERjtPQUZBO0FBTUEsTUFBQSxJQUFHLElBQUMsQ0FBQSxnQkFBSjtBQUNFLFFBQUEsT0FBQSxHQUFVLG1CQUFWLENBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxPQUFBLEdBQVUsZUFBVixDQUhGO09BTkE7QUFBQSxNQVlBLE9BQUEsR0FBVTtBQUFBLFFBQUMsR0FBQSxFQUFLLElBQUMsQ0FBQSxHQUFQO09BWlYsQ0FBQTtBQUFBLE1BY0EsTUFBQSxHQUFTLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLE1BQUQsR0FBQTtBQUNQLFVBQUEsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isa0JBQWhCLENBQUg7QUFDRSxZQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksUUFBWixFQUFzQixNQUF0QixDQUFBLENBREY7V0FBQTtBQUVBLFVBQUEsSUFBRyxLQUFDLENBQUEsV0FBRCxLQUFnQixRQUFuQjttQkFDRSxLQUFDLENBQUEsY0FBRCxDQUFnQixNQUFoQixFQUF3QixRQUF4QixFQURGO1dBSE87UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQWRULENBQUE7QUFBQSxNQW9CQSxNQUFBLEdBQVMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsTUFBRCxHQUFBO0FBQ1AsVUFBQSxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixrQkFBaEIsQ0FBSDtBQUNFLFlBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxRQUFiLEVBQXVCLE1BQXZCLENBQUEsQ0FERjtXQUFBO0FBRUEsVUFBQSxJQUFHLEtBQUMsQ0FBQSxXQUFELEtBQWdCLFFBQW5CO21CQUNFLEtBQUMsQ0FBQSxjQUFELENBQWdCLE1BQWhCLEVBQXdCLFFBQXhCLEVBREY7V0FITztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBcEJULENBQUE7QUFBQSxNQTBCQSxPQUFBLEdBQWMsSUFBQSxPQUFBLENBQVE7QUFBQSxRQUFDLFNBQUEsT0FBRDtBQUFBLFFBQVUsTUFBQSxJQUFWO0FBQUEsUUFBZ0IsU0FBQSxPQUFoQjtBQUFBLFFBQXlCLFFBQUEsTUFBekI7QUFBQSxRQUFpQyxRQUFBLE1BQWpDO09BQVIsQ0ExQmQsQ0FBQTthQTZCQSxVQUFBLENBQVcsU0FBQSxHQUFBO2VBQ1QsT0FBTyxDQUFDLElBQVIsQ0FBQSxFQURTO01BQUEsQ0FBWCxFQUVFLElBRkYsRUEvQlE7SUFBQSxDQTFFVixDQUFBOztBQUFBLHFCQWtIQSxjQUFBLEdBQWdCLFNBQUMsT0FBRCxFQUFVLFFBQVYsR0FBQTtBQUNkLFVBQUEsZUFBQTtBQUFBLE1BQUEsUUFBQSxHQUFXLEVBQVgsQ0FBQTtBQUFBLE1BQ0EsS0FBQSxHQUFRLE9BQUEsQ0FBUSxJQUFDLENBQUEsS0FBVCxFQUFnQixJQUFDLENBQUEsVUFBakIsQ0FEUixDQUFBO0FBQUEsTUFFQSxPQUFPLENBQUMsT0FBUixDQUFnQixPQUFoQixFQUF5QixLQUF6QixFQUFnQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxLQUFELEVBQVEsQ0FBUixHQUFBO2lCQUM5QixRQUFRLENBQUMsSUFBVCxDQUFjLEtBQUMsQ0FBQSxhQUFELENBQWUsS0FBZixDQUFkLEVBRDhCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEMsRUFFRSxJQUZGLENBRkEsQ0FBQTthQUtBLFFBQUEsQ0FBUyxRQUFULEVBTmM7SUFBQSxDQWxIaEIsQ0FBQTs7QUFBQSxxQkFzSUEsYUFBQSxHQUFlLFNBQUMsS0FBRCxHQUFBO0FBQ2IsVUFBQSxLQUFBO0FBQUEsTUFBQSxJQUFHLEtBQUssQ0FBQyxLQUFUO0FBQ0UsUUFBQSxLQUFBLEdBQVEsT0FBUixDQURGO09BQUEsTUFFSyxJQUFHLEtBQUssQ0FBQyxPQUFUO0FBQ0gsUUFBQSxLQUFBLEdBQVEsU0FBUixDQURHO09BQUEsTUFBQTtBQUdILFFBQUEsS0FBQSxHQUFRLElBQUMsQ0FBQSxZQUFULENBSEc7T0FGTDtBQU9BLGFBQU87QUFBQSxRQUNMLElBQUEsRUFBTSxLQUFLLENBQUMsSUFEUDtBQUFBLFFBRUwsR0FBQSxFQUFLLEtBQUssQ0FBQyxHQUZOO0FBQUEsUUFHTCxLQUFBLEVBQU8sS0FIRjtBQUFBLFFBSUwsT0FBQSxFQUFTLEtBQUssQ0FBQyxPQUpWO0FBQUEsUUFLTCxNQUFBLEVBQVEsSUFBQyxDQUFBLFVBTEo7QUFBQSxRQU1MLEtBQUEsRUFBTyxJQUFDLENBQUEsWUFBRCxDQUFjLEtBQWQsQ0FORjtPQUFQLENBUmE7SUFBQSxDQXRJZixDQUFBOztBQUFBLHFCQXdKQSxnQkFBQSxHQUFrQixTQUFDLEdBQUQsR0FBQTtBQUNoQixhQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsc0JBQVIsQ0FBK0IsR0FBL0IsQ0FBUCxDQURnQjtJQUFBLENBeEpsQixDQUFBOztBQUFBLHFCQTJKQSwwQkFBQSxHQUE0QixTQUFDLFFBQUQsR0FBQTtBQUMxQixhQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxpQkFBdEMsQ0FBd0QsUUFBeEQsQ0FBUCxDQUQwQjtJQUFBLENBM0o1QixDQUFBOztBQUFBLHFCQThKQSw2QkFBQSxHQUErQixTQUFDLGNBQUQsRUFBaUIsUUFBakIsR0FBQTtBQUM3QixhQUFPLElBQUMsQ0FBQSxNQUNOLENBQUMsYUFDQyxDQUFDLGVBQ0MsQ0FBQyw2QkFIQSxDQUc4QixjQUg5QixFQUc4QyxRQUg5QyxDQUFQLENBRDZCO0lBQUEsQ0E5Si9CLENBQUE7O0FBQUEscUJBc0xBLFlBQUEsR0FBYyxTQUFDLEtBQUQsR0FBQTtBQUNaLFVBQUEsZ0dBQUE7O1FBQUEsS0FBSyxDQUFDLE9BQVE7T0FBZDtBQUFBLE1BQ0EsUUFBQSxHQUFXLFFBQUEsNkNBQTJCLEtBQUssQ0FBQyxJQUFqQyxDQUFBLEdBQXlDLENBRHBELENBQUE7QUFBQSxNQUVBLE1BQUEsR0FBUyxRQUFBLDJDQUF5QixLQUFLLENBQUMsSUFBL0IsQ0FBQSxHQUF1QyxDQUZoRCxDQUFBO0FBTUEsTUFBQSxJQUFJLFFBQUEsS0FBWSxDQUFBLENBQWhCO0FBQ0UsUUFBQSxRQUFBLEdBQVcsTUFBQSxHQUFTLENBQXBCLENBREY7T0FOQTs7UUFTQSxLQUFLLENBQUMsTUFBUTtPQVRkO0FBVUEsTUFBQSxJQUFBLENBQUEsS0FBWSxDQUFDLFFBQWI7QUFDRSxRQUFBLFFBQUEsR0FBZSxJQUFBLEtBQUEsQ0FBTSxRQUFOLEVBQWdCLEtBQUssQ0FBQyxHQUF0QixDQUFmLENBQUE7QUFBQSxRQUNBLE1BQUEsR0FBUyxJQUFDLENBQUEsMEJBQUQsQ0FBNEIsUUFBNUIsQ0FEVCxDQUFBO0FBR0EsZUFBTSxjQUFBLEdBQWlCLE1BQU0sQ0FBQyxHQUFQLENBQUEsQ0FBdkIsR0FBQTtBQUNFLFVBQUEsS0FBQSxHQUFRLElBQUMsQ0FBQSw2QkFBRCxDQUErQixjQUEvQixFQUErQyxRQUEvQyxDQUFSLENBQUE7QUFDQSxVQUFBLElBQUcsYUFBSDtBQUNFLG1CQUFPLEtBQVAsQ0FERjtXQUZGO1FBQUEsQ0FKRjtPQVZBOztRQW1CQSxLQUFLLENBQUMsV0FBWSxLQUFLLENBQUM7T0FuQnhCO0FBQUEsTUFvQkEsUUFBQSxHQUFXLFFBQUEsNENBQTBCLENBQTFCLENBcEJYLENBQUE7QUFBQSxNQXFCQSxNQUFBLEdBQVksS0FBSyxDQUFDLE1BQVQsR0FBcUIsUUFBQSxDQUFTLEtBQUssQ0FBQyxNQUFmLENBQXJCLEdBQWlELFFBQUEsQ0FBUyxJQUFDLENBQUEsZ0JBQUQsQ0FBa0IsTUFBbEIsQ0FBVCxDQXJCMUQsQ0FBQTtBQXNCQSxhQUFXLElBQUEsS0FBQSxDQUNULENBQUMsUUFBRCxFQUFXLFFBQVgsQ0FEUyxFQUVULENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FGUyxDQUFYLENBdkJZO0lBQUEsQ0F0TGQsQ0FBQTs7a0JBQUE7O01BWEYsQ0FBQTs7QUFBQSxFQThOQSxNQUFNLENBQUMsT0FBUCxHQUFpQixNQTlOakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter/lib/linter.coffee