(function() {
  var Clang, ClangFlags, CommandRunner, DIAGNOSTIC_PATTERN, PRELIMINARY_PATTERN, Point, Range, Violation, _ref;

  _ref = require('atom'), Range = _ref.Range, Point = _ref.Point;

  CommandRunner = require('../command-runner');

  Violation = require('../violation');

  ClangFlags = require('clang-flags');

  DIAGNOSTIC_PATTERN = /^(.+):(\d+):(\d+):\s*([^:]+)\s*:\s*([^]+)/;

  PRELIMINARY_PATTERN = /^In file included from (.+):(\d+):/;

  module.exports = Clang = (function() {
    Clang.canonicalName = 'Clang';

    function Clang(filePath) {
      this.filePath = filePath;
    }

    Clang.prototype.run = function(callback) {
      return this.runClang(function(error, violations) {
        if (error != null) {
          return callback(error);
        } else {
          return callback(null, violations);
        }
      });
    };

    Clang.prototype.runClang = function(callback) {
      var runner;
      runner = new CommandRunner(this.buildCommand());
      return runner.run((function(_this) {
        return function(error, result) {
          var violations;
          if (error != null) {
            return callback(error);
          }
          if (result.exitCode === 0 || result.exitCode === 1) {
            violations = _this.parseDiagnostics(result.stderr);
            return callback(null, violations);
          } else {
            return callback(new Error("Process exited with code " + result.exitCode));
          }
        };
      })(this));
    };

    Clang.prototype.parseDiagnostics = function(log) {
      var actualLineNumberInTargetFile, bufferPoint, bufferRange, columnNumber, filePath, line, lineNumber, lines, matches, message, severity, _, _i, _len, _results;
      lines = log.split('\n');
      _results = [];
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        matches = line.match(DIAGNOSTIC_PATTERN);
        if (!matches) {
          matches = line.match(PRELIMINARY_PATTERN);
          if (!matches) {
            continue;
          }
          _ = matches[0], filePath = matches[1], lineNumber = matches[2];
          if (filePath === this.filePath) {
            actualLineNumberInTargetFile = lineNumber;
          }
          continue;
        }
        _ = matches[0], _ = matches[1], lineNumber = matches[2], columnNumber = matches[3], severity = matches[4], message = matches[5];
        if (severity === 'note') {
          continue;
        }
        if (severity === 'fatal error') {
          severity = 'error';
        }
        if (actualLineNumberInTargetFile != null) {
          lineNumber = actualLineNumberInTargetFile;
          columnNumber = 1;
          actualLineNumberInTargetFile = null;
        }
        bufferPoint = new Point(parseInt(lineNumber) - 1, parseInt(columnNumber) - 1);
        bufferRange = new Range(bufferPoint, bufferPoint);
        _results.push(new Violation(severity, bufferRange, message));
      }
      return _results;
    };

    Clang.prototype.buildCommand = function() {
      var addConfigToDiscoveredFlags, command, currentFileFlags, path, userClangPath, userHeaderSearchPaths, _i, _len;
      command = [];
      userClangPath = atom.config.get('atom-lint.clang.path');
      userHeaderSearchPaths = atom.config.get('atom-lint.clang.headerSearchPaths');
      addConfigToDiscoveredFlags = atom.config.get('atom-lint.clang.mergeAtomLintConfigIntoAutoDiscoveredFlags');
      if (userClangPath != null) {
        command.push(userClangPath);
      } else {
        command.push('clang');
      }
      command.push('-fsyntax-only');
      command.push('-fno-caret-diagnostics');
      currentFileFlags = ClangFlags.getClangFlags(this.filePath);
      if (currentFileFlags.length > 0) {
        command = command.concat(currentFileFlags);
      }
      if (currentFileFlags.length === 0 || addConfigToDiscoveredFlags) {
        command.push('-Wall');
        if (userHeaderSearchPaths != null) {
          for (_i = 0, _len = userHeaderSearchPaths.length; _i < _len; _i++) {
            path = userHeaderSearchPaths[_i];
            command.push("-I" + path);
          }
        }
      }
      command.push(this.filePath);
      return command;
    };

    return Clang;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdHQUFBOztBQUFBLEVBQUEsT0FBaUIsT0FBQSxDQUFRLE1BQVIsQ0FBakIsRUFBQyxhQUFBLEtBQUQsRUFBUSxhQUFBLEtBQVIsQ0FBQTs7QUFBQSxFQUNBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLG1CQUFSLENBRGhCLENBQUE7O0FBQUEsRUFFQSxTQUFBLEdBQVksT0FBQSxDQUFRLGNBQVIsQ0FGWixDQUFBOztBQUFBLEVBR0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSxhQUFSLENBSGIsQ0FBQTs7QUFBQSxFQU1BLGtCQUFBLEdBQXFCLDJDQU5yQixDQUFBOztBQUFBLEVBYUEsbUJBQUEsR0FBc0Isb0NBYnRCLENBQUE7O0FBQUEsRUFlQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osSUFBQSxLQUFDLENBQUEsYUFBRCxHQUFpQixPQUFqQixDQUFBOztBQUVhLElBQUEsZUFBRSxRQUFGLEdBQUE7QUFBYSxNQUFaLElBQUMsQ0FBQSxXQUFBLFFBQVcsQ0FBYjtJQUFBLENBRmI7O0FBQUEsb0JBSUEsR0FBQSxHQUFLLFNBQUMsUUFBRCxHQUFBO2FBQ0gsSUFBQyxDQUFBLFFBQUQsQ0FBVSxTQUFDLEtBQUQsRUFBUSxVQUFSLEdBQUE7QUFDUixRQUFBLElBQUcsYUFBSDtpQkFDRSxRQUFBLENBQVMsS0FBVCxFQURGO1NBQUEsTUFBQTtpQkFHRSxRQUFBLENBQVMsSUFBVCxFQUFlLFVBQWYsRUFIRjtTQURRO01BQUEsQ0FBVixFQURHO0lBQUEsQ0FKTCxDQUFBOztBQUFBLG9CQVdBLFFBQUEsR0FBVSxTQUFDLFFBQUQsR0FBQTtBQUNSLFVBQUEsTUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFhLElBQUEsYUFBQSxDQUFjLElBQUMsQ0FBQSxZQUFELENBQUEsQ0FBZCxDQUFiLENBQUE7YUFFQSxN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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/atom-lint/lib/linter/clang.coffee