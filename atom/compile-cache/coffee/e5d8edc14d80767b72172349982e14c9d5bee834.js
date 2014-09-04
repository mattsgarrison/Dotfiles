(function() {
  var CommandRunner, child_process, crypto, each_slice, fs, os, path, _;

  child_process = require('child_process');

  os = require('os');

  path = require('path');

  fs = require('fs');

  crypto = require('crypto');

  _ = require('lodash');

  each_slice = function(array, size, callback) {
    var i, slice, _i, _ref, _results;
    _results = [];
    for (i = _i = 0, _ref = array.length; size > 0 ? _i <= _ref : _i >= _ref; i = _i += size) {
      slice = array.slice(i, i + size);
      _results.push(callback(slice));
    }
    return _results;
  };

  module.exports = CommandRunner = (function() {
    CommandRunner._cachedEnv = void 0;

    CommandRunner.fetchEnvOfLoginShell = function(callback) {
      var command, outputPath;
      if (!process.env.SHELL) {
        return callback(new Error("SHELL environment variable is not set."));
      }
      if (process.env.SHELL.match(/csh$/)) {
        return callback(new Error("" + process.env.SHELL + " is not supported."));
      }
      outputPath = this.getEnvOutputFilePath();
      command = "" + process.env.SHELL + " -l -i -c '$(printenv > " + outputPath + ")'";
      return child_process.exec(command, (function(_this) {
        return function(execError, stdout, stderr) {
          if (execError != null) {
            return callback(execError);
          }
          return fs.readFile(outputPath, function(readError, data) {
            var env;
            if (fs.existsSync(outputPath)) {
              fs.unlinkSync(outputPath);
            }
            if (readError != null) {
              return callback(readError);
            }
            env = _this.parseResultOfPrintEnv(data.toString());
            return callback(null, env);
          });
        };
      })(this));
    };

    CommandRunner.getEnvOutputFilePath = function() {
      var outputPath, randomHex;
      randomHex = crypto.randomBytes(20).toString('hex');
      outputPath = path.join(os.tmpdir(), "atom-lint_" + randomHex + ".txt");
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      return outputPath;
    };

    CommandRunner.parseResultOfPrintEnv = function(string) {
      var env, key, line, lines, lines_and_last_chars, matches, value, _i, _len, _match;
      env = {};
      lines_and_last_chars = string.split(/([^\\])\n/);
      lines = each_slice(lines_and_last_chars, 2, function(slice) {
        return slice.join('');
      });
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        matches = line.match(/^(.+?)=([\S\s]*)$/);
        if (matches == null) {
          continue;
        }
        _match = matches[0], key = matches[1], value = matches[2];
        if (!(key != null) || key.length === 0) {
          continue;
        }
        env[key] = value;
      }
      return env;
    };

    CommandRunner.mergePathEnvs = function(baseEnv, subsequentEnv) {
      var key, _i, _len, _ref;
      _ref = ['PATH', 'GEM_PATH'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        baseEnv[key] = this.mergePaths(baseEnv[key], subsequentEnv[key]);
      }
      return baseEnv;
    };

    CommandRunner.mergePaths = function(baseString, subsequentString) {
      var basePaths, paths, subsequentPaths;
      basePaths = baseString ? baseString.split(':') : [];
      subsequentPaths = subsequentString ? subsequentString.split(':') : [];
      paths = basePaths.concat(subsequentPaths);
      return _.uniq(paths).join(':');
    };

    CommandRunner.getEnv = function(callback) {
      if (this._cachedEnv === void 0) {
        return this.fetchEnvOfLoginShell((function(_this) {
          return function(error, env) {
            if (error != null) {
              console.log(error.stack);
            }
            if (env != null) {
              _this._cachedEnv = _this.mergePathEnvs(env, process.env);
            } else {
              _this._cachedEnv = process.env;
            }
            return callback(_this._cachedEnv);
          };
        })(this));
      } else {
        return callback(this._cachedEnv);
      }
    };

    function CommandRunner(command) {
      this.command = command;
    }

    CommandRunner.prototype.run = function(callback) {
      return CommandRunner.getEnv((function(_this) {
        return function(env) {
          return _this.runWithEnv(env, callback);
        };
      })(this));
    };

    CommandRunner.prototype.runWithEnv = function(env, callback) {
      var hasInvokedCallback, proc, result;
      proc = child_process.spawn(this.command[0], this.command.slice(1), {
        env: env
      });
      result = {
        command: this.command,
        env: env,
        stdout: '',
        stderr: ''
      };
      hasInvokedCallback = false;
      proc.stdout.on('data', function(data) {
        return result.stdout += data;
      });
      proc.stderr.on('data', function(data) {
        return result.stderr += data;
      });
      proc.on('close', function(exitCode) {
        if (hasInvokedCallback) {
          return;
        }
        result.exitCode = exitCode;
        callback(null, result);
        return hasInvokedCallback = true;
      });
      return proc.on('error', function(error) {
        if (hasInvokedCallback) {
          return;
        }
        callback(error, result);
        return hasInvokedCallback = true;
      });
    };

    return CommandRunner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlFQUFBOztBQUFBLEVBQUEsYUFBQSxHQUFnQixPQUFBLENBQVEsZUFBUixDQUFoQixDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFHQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FITCxDQUFBOztBQUFBLEVBSUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBSlQsQ0FBQTs7QUFBQSxFQUtBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUixDQUxKLENBQUE7O0FBQUEsRUFPQSxVQUFBLEdBQWEsU0FBQyxLQUFELEVBQVEsSUFBUixFQUFjLFFBQWQsR0FBQTtBQUNYLFFBQUEsNEJBQUE7QUFBQTtTQUFTLG1GQUFULEdBQUE7QUFDRSxNQUFBLEtBQUEsR0FBUSxLQUFLLENBQUMsS0FBTixDQUFZLENBQVosRUFBZSxDQUFBLEdBQUksSUFBbkIsQ0FBUixDQUFBO0FBQUEsb0JBQ0EsUUFBQSxDQUFTLEtBQVQsRUFEQSxDQURGO0FBQUE7b0JBRFc7RUFBQSxDQVBiLENBQUE7O0FBQUEsRUFZQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osSUFBQSxhQUFDLENBQUEsVUFBRCxHQUFjLE1BQWQsQ0FBQTs7QUFBQSxJQUVBLGFBQUMsQ0FBQSxvQkFBRCxHQUF1QixTQUFDLFFBQUQsR0FBQTtBQUNyQixVQUFBLG1CQUFBO0FBQUEsTUFBQSxJQUFHLENBQUEsT0FBUSxDQUFDLEdBQUcsQ0FBQyxLQUFoQjtBQUNFLGVBQU8sUUFBQSxDQUFhLElBQUEsS0FBQSxDQUFNLHdDQUFOLENBQWIsQ0FBUCxDQURGO09BQUE7QUFHQSxNQUFBLElBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBbEIsQ0FBd0IsTUFBeEIsQ0FBSDtBQUVFLGVBQU8sUUFBQSxDQUFhLElBQUEsS0FBQSxDQUFNLEVBQUEsR0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQWQsR0FBcUIsb0JBQTNCLENBQWIsQ0FBUCxDQUZGO09BSEE7QUFBQSxNQU9BLFVBQUEsR0FBYSxJQUFDLENBQUEsb0JBQUQsQ0FBQSxDQVBiLENBQUE7QUFBQSxNQVVBLE9BQUEsR0FBVSxFQUFBLEdBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFkLEdBQXFCLDBCQUFyQixHQUE4QyxVQUE5QyxHQUEwRCxJQVZwRSxDQUFBO2FBWUEsYUFBYSxDQUFDLElBQWQsQ0FBbUIsT0FBbkIsRUFBNEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsU0FBRCxFQUFZLE1BQVosRUFBb0IsTUFBcEIsR0FBQTtBQUMxQixVQUFBLElBQThCLGlCQUE5QjtBQUFBLG1CQUFPLFFBQUEsQ0FBUyxTQUFULENBQVAsQ0FBQTtXQUFBO2lCQUVBLEVBQUUsQ0FBQyxRQUFILENBQVksVUFBWixFQUF3QixTQUFDLFNBQUQsRUFBWSxJQUFaLEdBQUE7QUFDdEIsZ0JBQUEsR0FBQTtBQUFBLFlBQUEsSUFBNkIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxVQUFkLENBQTdCO0FBQUEsY0FBQSxFQUFFLENBQUMsVUFBSCxDQUFjLFVBQWQsQ0FBQSxDQUFBO2FBQUE7QUFDQSxZQUFBLElBQThCLGlCQUE5QjtBQUFBLHFCQUFPLFFBQUEsQ0FBUyxTQUFULENBQVAsQ0FBQTthQURBO0FBQUEsWUFHQSxHQUFBLEdBQU0sS0FBQyxDQUFBLHFCQUFELENBQXVCLElBQUksQ0FBQyxRQUFMLENBQUEsQ0FBdkIsQ0FITixDQUFBO21CQUlBLFFBQUEsQ0FBUyxJQUFULEVBQWUsR0FBZixFQUxzQjtVQUFBLENBQXhCLEVBSDBCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBNUIsRUFicUI7SUFBQSxDQUZ2QixDQUFBOztBQUFBLElBeUJBLGFBQUMsQ0FBQSxvQkFBRCxHQUF1QixTQUFBLEdBQUE7QUFDckIsVUFBQSxxQkFBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLE1BQU0sQ0FBQyxXQUFQLENBQW1CLEVBQW5CLENBQXNCLENBQUMsUUFBdkIsQ0FBZ0MsS0FBaEMsQ0FBWixDQUFBO0FBQUEsTUFDQSxVQUFBLEdBQWEsSUFBSSxDQUFDLElBQUwsQ0FBVSxFQUFFLENBQUMsTUFBSCxDQUFBLENBQVYsRUFBd0IsWUFBQSxHQUFXLFNBQVgsR0FBc0IsTUFBOUMsQ0FEYixDQUFBO0FBRUEsTUFBQSxJQUE2QixFQUFFLENBQUMsVUFBSCxDQUFjLFVBQWQsQ0FBN0I7QUFBQSxRQUFBLEVBQUUsQ0FBQyxVQUFILENBQWMsVUFBZCxDQUFBLENBQUE7T0FGQTthQUdBLFdBSnFCO0lBQUEsQ0F6QnZCLENBQUE7O0FBQUEsSUErQkEsYUFBQyxDQUFBLHFCQUFELEdBQXdCLFNBQUMsTUFBRCxHQUFBO0FBQ3RCLFVBQUEsNkVBQUE7QUFBQSxNQUFBLEdBQUEsR0FBTSxFQUFOLENBQUE7QUFBQSxNQUdBLG9CQUFBLEdBQXVCLE1BQU0sQ0FBQyxLQUFQLENBQWEsV0FBYixDQUh2QixDQUFBO0FBQUEsTUFJQSxLQUFBLEdBQVEsVUFBQSxDQUFXLG9CQUFYLEVBQWlDLENBQWpDLEVBQW9DLFNBQUMsS0FBRCxHQUFBO2VBQzFDLEtBQUssQ0FBQyxJQUFOLENBQVcsRUFBWCxFQUQwQztNQUFBLENBQXBDLENBSlIsQ0FBQTtBQU9BLFdBQUEsNENBQUE7eUJBQUE7QUFDRSxRQUFBLE9BQUEsR0FBVSxJQUFJLENBQUMsS0FBTCxDQUFXLG1CQUFYLENBQVYsQ0FBQTtBQUNBLFFBQUEsSUFBZ0IsZUFBaEI7QUFBQSxtQkFBQTtTQURBO0FBQUEsUUFFQyxtQkFBRCxFQUFTLGdCQUFULEVBQWMsa0JBRmQsQ0FBQTtBQUdBLFFBQUEsSUFBWSxDQUFBLENBQUUsV0FBRCxDQUFELElBQVcsR0FBRyxDQUFDLE1BQUosS0FBYyxDQUFyQztBQUFBLG1CQUFBO1NBSEE7QUFBQSxRQUlBLEdBQUksQ0FBQSxHQUFBLENBQUosR0FBVyxLQUpYLENBREY7QUFBQSxPQVBBO2FBY0EsSUFmc0I7SUFBQSxDQS9CeEIsQ0FBQTs7QUFBQSxJQWdEQSxhQUFDLENBQUEsYUFBRCxHQUFnQixTQUFDLE9BQUQsRUFBVSxhQUFWLEdBQUE7QUFDZCxVQUFBLG1CQUFBO0FBQUE7QUFBQSxXQUFBLDJDQUFBO3VCQUFBO0FBQ0UsUUFBQSxPQUFRLENBQUEsR0FBQSxDQUFSLEdBQWUsSUFBQyxDQUFBLFVBQUQsQ0FBWSxPQUFRLENBQUEsR0FBQSxDQUFwQixFQUEwQixhQUFjLENBQUEsR0FBQSxDQUF4QyxDQUFmLENBREY7QUFBQSxPQUFBO2FBRUEsUUFIYztJQUFBLENBaERoQixDQUFBOztBQUFBLElBcURBLGFBQUMsQ0FBQSxVQUFELEdBQWEsU0FBQyxVQUFELEVBQWEsZ0JBQWIsR0FBQTtBQUNYLFVBQUEsaUNBQUE7QUFBQSxNQUFBLFNBQUEsR0FBZSxVQUFILEdBQW1CLFVBQVUsQ0FBQyxLQUFYLENBQWlCLEdBQWpCLENBQW5CLEdBQThDLEVBQTFELENBQUE7QUFBQSxNQUNBLGVBQUEsR0FBcUIsZ0JBQUgsR0FBeUIsZ0JBQWdCLENBQUMsS0FBakIsQ0FBdUIsR0FBdkIsQ0FBekIsR0FBMEQsRUFENUUsQ0FBQTtBQUFBLE1BRUEsS0FBQSxHQUFRLFNBQVMsQ0FBQyxNQUFWLENBQWlCLGVBQWpCLENBRlIsQ0FBQTthQUdBLENBQUMsQ0FBQyxJQUFGLENBQU8sS0FBUCxDQUFhLENBQUMsSUFBZCxDQUFtQixHQUFuQixFQUpXO0lBQUEsQ0FyRGIsQ0FBQTs7QUFBQSxJQTJEQSxhQUFDLENBQUEsTUFBRCxHQUFTLFNBQUMsUUFBRCxHQUFBO0FBQ1AsTUFBQSxJQUFHLElBQUMsQ0FBQSxVQUFELEtBQWUsTUFBbEI7ZUFDRSxJQUFDLENBQUEsb0JBQUQsQ0FBc0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLEtBQUQsRUFBUSxHQUFSLEdBQUE7QUFDcEIsWUFBQSxJQUE0QixhQUE1QjtBQUFBLGNBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFLLENBQUMsS0FBbEIsQ0FBQSxDQUFBO2FBQUE7QUFFQSxZQUFBLElBQUcsV0FBSDtBQUNFLGNBQUEsS0FBQyxDQUFBLFVBQUQsR0FBYyxLQUFDLENBQUEsYUFBRCxDQUFlLEdBQWYsRUFBb0IsT0FBTyxDQUFDLEdBQTVCLENBQWQsQ0FERjthQUFBLE1BQUE7QUFHRSxjQUFBLEtBQUMsQ0FBQSxVQUFELEdBQWMsT0FBTyxDQUFDLEdBQXRCLENBSEY7YUFGQTttQkFPQSxRQUFBLENBQVMsS0FBQyxDQUFBLFVBQVYsRUFSb0I7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0QixFQURGO09BQUEsTUFBQTtlQVdFLFFBQUEsQ0FBUyxJQUFDLENBQUEsVUFBVixFQVhGO09BRE87SUFBQSxDQTNEVCxDQUFBOztBQXlFYSxJQUFBLHVCQUFFLE9BQUYsR0FBQTtBQUFZLE1BQVgsSUFBQyxDQUFBLFVBQUEsT0FBVSxDQUFaO0lBQUEsQ0F6RWI7O0FBQUEsNEJBMkVBLEdBQUEsR0FBSyxTQUFDLFFBQUQsR0FBQTthQUNILGFBQWEsQ0FBQyxNQUFkLENBQXFCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEdBQUQsR0FBQTtpQkFDbkIsS0FBQyxDQUFBLFVBQUQsQ0FBWSxHQUFaLEVBQWlCLFFBQWpCLEVBRG1CO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckIsRUFERztJQUFBLENBM0VMLENBQUE7O0FBQUEsNEJBK0VBLFVBQUEsR0FBWSxTQUFDLEdBQUQsRUFBTSxRQUFOLEdBQUE7QUFDVixVQUFBLGdDQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sYUFBYSxDQUFDLEtBQWQsQ0FBb0IsSUFBQyxDQUFBLE9BQVEsQ0FBQSxDQUFBLENBQTdCLEVBQWlDLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxDQUFlLENBQWYsQ0FBakMsRUFBb0Q7QUFBQSxRQUFFLEdBQUEsRUFBSyxHQUFQO09BQXBELENBQVAsQ0FBQTtBQUFBLE1BRUEsTUFBQSxHQUNFO0FBQUEsUUFBQSxPQUFBLEVBQVMsSUFBQyxDQUFBLE9BQVY7QUFBQSxRQUNBLEdBQUEsRUFBSyxHQURMO0FBQUEsUUFFQSxNQUFBLEVBQVEsRUFGUjtBQUFBLFFBR0EsTUFBQSxFQUFRLEVBSFI7T0FIRixDQUFBO0FBQUEsTUFRQSxrQkFBQSxHQUFxQixLQVJyQixDQUFBO0FBQUEsTUFVQSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQVosQ0FBZSxNQUFmLEVBQXVCLFNBQUMsSUFBRCxHQUFBO2VBQ3JCLE1BQU0sQ0FBQyxNQUFQLElBQWlCLEtBREk7TUFBQSxDQUF2QixDQVZBLENBQUE7QUFBQSxNQWFBLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBWixDQUFlLE1BQWYsRUFBdUIsU0FBQyxJQUFELEdBQUE7ZUFDckIsTUFBTSxDQUFDLE1BQVAsSUFBaUIsS0FESTtNQUFBLENBQXZCLENBYkEsQ0FBQTtBQUFBLE1BZ0JBLElBQUksQ0FBQyxFQUFMLENBQVEsT0FBUixFQUFpQixTQUFDLFFBQUQsR0FBQTtBQUNmLFFBQUEsSUFBVSxrQkFBVjtBQUFBLGdCQUFBLENBQUE7U0FBQTtBQUFBLFFBQ0EsTUFBTSxDQUFDLFFBQVAsR0FBa0IsUUFEbEIsQ0FBQTtBQUFBLFFBRUEsUUFBQSxDQUFTLElBQVQsRUFBZSxNQUFmLENBRkEsQ0FBQTtlQUdBLGtCQUFBLEdBQXFCLEtBSk47TUFBQSxDQUFqQixDQWhCQSxDQUFBO2FBc0JBLElBQUksQ0FBQyxFQUFMLENBQVEsT0FBUixFQUFpQixTQUFDLEtBQUQsR0FBQTtBQUNmLFFBQUEsSUFBVSxrQkFBVjtBQUFBLGdCQUFBLENBQUE7U0FBQTtBQUFBLFFBQ0EsUUFBQSxDQUFTLEtBQVQsRUFBZ0IsTUFBaEIsQ0FEQSxDQUFBO2VBRUEsa0JBQUEsR0FBcUIsS0FITjtNQUFBLENBQWpCLEVBdkJVO0lBQUEsQ0EvRVosQ0FBQTs7eUJBQUE7O01BZEYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/atom-lint/lib/command-runner.coffee