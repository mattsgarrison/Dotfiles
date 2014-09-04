(function() {
  var CommandRunner, glob, path, spawn;

  path = require('path');

  spawn = require('child_process').spawn;

  glob = require('glob');

  module.exports = CommandRunner = (function() {
    function CommandRunner(testStatus, testStatusView) {
      this.testStatus = testStatus;
      this.testStatusView = testStatusView;
    }

    CommandRunner.prototype.run = function() {
      var cfg, cmd, file, matches, pattern, _i, _len, _ref;
      if (atom.project.path == null) {
        return;
      }
      cfg = atom.config.get('test-status');
      cmd = null;
      _ref = Object.keys(cfg);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        pattern = path.join(atom.project.path, file);
        matches = glob.sync(pattern);
        if (matches.length > 0) {
          cmd = cfg[file];
          break;
        }
      }
      if (!cmd) {
        return;
      }
      return this.execute(cmd);
    };

    CommandRunner.prototype.execute = function(cmd) {
      var err, output, proc;
      this.testStatus.removeClass('success fail').addClass('pending');
      cmd = cmd.split(' ');
      try {
        proc = spawn(cmd.shift(), cmd, {
          cwd: atom.project.path
        });
        output = '';
        proc.stdout.on('data', function(data) {
          return output += data.toString();
        });
        proc.stderr.on('data', function(data) {
          return output += data.toString();
        });
        return proc.on('close', (function(_this) {
          return function(code) {
            _this.testStatusView.update(output);
            if (code === 0) {
              atom.emit('test-status:success');
              return _this.testStatus.removeClass('pending fail').addClass('success');
            } else {
              atom.emit('test-status:fail');
              return _this.testStatus.removeClass('pending success').addClass('fail');
            }
          };
        })(this));
      } catch (_error) {
        err = _error;
        this.testStatus.removeClass('pending success').addClass('fail');
        return this.testStatusView.update('An error occured while attempting to run the test command');
      }
    };

    return CommandRunner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdDQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFVLE9BQUEsQ0FBUSxNQUFSLENBQVYsQ0FBQTs7QUFBQSxFQUNDLFFBQVMsT0FBQSxDQUFRLGVBQVIsRUFBVCxLQURELENBQUE7O0FBQUEsRUFHQSxJQUFBLEdBQVUsT0FBQSxDQUFRLE1BQVIsQ0FIVixDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FHTTtBQU9TLElBQUEsdUJBQUUsVUFBRixFQUFlLGNBQWYsR0FBQTtBQUFnQyxNQUEvQixJQUFDLENBQUEsYUFBQSxVQUE4QixDQUFBO0FBQUEsTUFBbEIsSUFBQyxDQUFBLGlCQUFBLGNBQWlCLENBQWhDO0lBQUEsQ0FBYjs7QUFBQSw0QkFLQSxHQUFBLEdBQUssU0FBQSxHQUFBO0FBQ0gsVUFBQSxnREFBQTtBQUFBLE1BQUEsSUFBYyx5QkFBZDtBQUFBLGNBQUEsQ0FBQTtPQUFBO0FBQUEsTUFFQSxHQUFBLEdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGFBQWhCLENBRk4sQ0FBQTtBQUFBLE1BR0EsR0FBQSxHQUFNLElBSE4sQ0FBQTtBQUtBO0FBQUEsV0FBQSwyQ0FBQTt3QkFBQTtBQUNFLFFBQUEsT0FBQSxHQUFVLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUF2QixFQUE2QixJQUE3QixDQUFWLENBQUE7QUFBQSxRQUNBLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBTCxDQUFVLE9BQVYsQ0FEVixDQUFBO0FBR0EsUUFBQSxJQUFHLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLENBQXBCO0FBQ0UsVUFBQSxHQUFBLEdBQU0sR0FBSSxDQUFBLElBQUEsQ0FBVixDQUFBO0FBQ0EsZ0JBRkY7U0FKRjtBQUFBLE9BTEE7QUFhQSxNQUFBLElBQUEsQ0FBQSxHQUFBO0FBQUEsY0FBQSxDQUFBO09BYkE7YUFjQSxJQUFDLENBQUEsT0FBRCxDQUFTLEdBQVQsRUFmRztJQUFBLENBTEwsQ0FBQTs7QUFBQSw0QkEyQkEsT0FBQSxHQUFTLFNBQUMsR0FBRCxHQUFBO0FBQ1AsVUFBQSxpQkFBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxXQUFaLENBQXdCLGNBQXhCLENBQXVDLENBQUMsUUFBeEMsQ0FBaUQsU0FBakQsQ0FBQSxDQUFBO0FBQUEsTUFFQSxHQUFBLEdBQU0sR0FBRyxDQUFDLEtBQUosQ0FBVSxHQUFWLENBRk4sQ0FBQTtBQUlBO0FBQ0UsUUFBQSxJQUFBLEdBQU8sS0FBQSxDQUFNLEdBQUcsQ0FBQyxLQUFKLENBQUEsQ0FBTixFQUFtQixHQUFuQixFQUF3QjtBQUFBLFVBQUEsR0FBQSxFQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBbEI7U0FBeEIsQ0FBUCxDQUFBO0FBQUEsUUFDQSxNQUFBLEdBQVMsRUFEVCxDQUFBO0FBQUEsUUFHQSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQVosQ0FBZSxNQUFmLEVBQXVCLFNBQUMsSUFBRCxHQUFBO2lCQUNyQixNQUFBLElBQVUsSUFBSSxDQUFDLFFBQUwsQ0FBQSxFQURXO1FBQUEsQ0FBdkIsQ0FIQSxDQUFBO0FBQUEsUUFNQSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQVosQ0FBZSxNQUFmLEVBQXVCLFNBQUMsSUFBRCxHQUFBO2lCQUNyQixNQUFBLElBQVUsSUFBSSxDQUFDLFFBQUwsQ0FBQSxFQURXO1FBQUEsQ0FBdkIsQ0FOQSxDQUFBO2VBU0EsSUFBSSxDQUFDLEVBQUwsQ0FBUSxPQUFSLEVBQWlCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxJQUFELEdBQUE7QUFDZixZQUFBLEtBQUMsQ0FBQSxjQUFjLENBQUMsTUFBaEIsQ0FBdUIsTUFBdkIsQ0FBQSxDQUFBO0FBRUEsWUFBQSxJQUFHLElBQUEsS0FBUSxDQUFYO0FBQ0UsY0FBQSxJQUFJLENBQUMsSUFBTCxDQUFVLHFCQUFWLENBQUEsQ0FBQTtxQkFDQSxLQUFDLENBQUEsVUFBVSxDQUFDLFdBQVosQ0FBd0IsY0FBeEIsQ0FBdUMsQ0FBQyxRQUF4QyxDQUFpRCxTQUFqRCxFQUZGO2FBQUEsTUFBQTtBQUlFLGNBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxrQkFBVixDQUFBLENBQUE7cUJBQ0EsS0FBQyxDQUFBLFVBQVUsQ0FBQyxXQUFaLENBQXdCLGlCQUF4QixDQUEwQyxDQUFDLFFBQTNDLENBQW9ELE1BQXBELEVBTEY7YUFIZTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpCLEVBVkY7T0FBQSxjQUFBO0FBb0JFLFFBREksWUFDSixDQUFBO0FBQUEsUUFBQSxJQUFDLENBQUEsVUFBVSxDQUFDLFdBQVosQ0FBd0IsaUJBQXhCLENBQTBDLENBQUMsUUFBM0MsQ0FBb0QsTUFBcEQsQ0FBQSxDQUFBO2VBQ0EsSUFBQyxDQUFBLGNBQWMsQ0FBQyxNQUFoQixDQUF1QiwyREFBdkIsRUFyQkY7T0FMTztJQUFBLENBM0JULENBQUE7O3lCQUFBOztNQWZGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/test-status/lib/command-runner.coffee