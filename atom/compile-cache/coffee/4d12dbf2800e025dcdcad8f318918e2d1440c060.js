(function() {
  var ChildProcess, ShellRunner;

  ChildProcess = require('child_process');

  module.exports = ShellRunner = (function() {
    function ShellRunner(params) {
      this.initialize(params);
    }

    ShellRunner.prototype.initialize = function(params) {
      this.params = params || (function() {
        throw "Missing ::params argument";
      })();
      this.write = params.write || (function() {
        throw "Missing ::write parameter";
      })();
      this.write = (function(_this) {
        return function(data) {
          return params.write("" + data);
        };
      })(this);
      this.exit = params.exit || (function() {
        throw "Missing ::exit parameter";
      })();
      return this.command = params.command || (function() {
        throw "Missing ::command parameter";
      })();
    };

    ShellRunner.prototype.run = function() {
      var fullCommand, p;
      p = this.newProcess();
      fullCommand = "cd " + (this.params.cwd()) + " && " + (this.params.command()) + "; exit\n";
      return p.stdin.write(fullCommand);
    };

    ShellRunner.prototype.newProcess = function() {
      var spawn, terminal;
      spawn = ChildProcess.spawn;
      terminal = spawn('zsh', ['-l', '-i']);
      terminal.on('close', (function(_this) {
        return function() {
          return _this.params.exit();
        };
      })(this));
      terminal.stdout.on('data', this.write);
      terminal.stderr.on('data', this.write);
      return terminal;
    };

    return ShellRunner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlCQUFBOztBQUFBLEVBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxlQUFSLENBQWYsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ1E7QUFDUyxJQUFBLHFCQUFDLE1BQUQsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFBLFVBQUQsQ0FBWSxNQUFaLENBQUEsQ0FEVztJQUFBLENBQWI7O0FBQUEsMEJBR0EsVUFBQSxHQUFZLFNBQUMsTUFBRCxHQUFBO0FBQ1YsTUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLE1BQUE7QUFBVSxjQUFNLDJCQUFOO1VBQXBCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxLQUFELEdBQVMsTUFBTSxDQUFDLEtBQVA7QUFBZ0IsY0FBTSwyQkFBTjtVQUR6QixDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsS0FBRCxHQUFTLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsR0FBQTtpQkFBVSxNQUFNLENBQUMsS0FBUCxDQUFhLEVBQUEsR0FBRSxJQUFmLEVBQVY7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUZULENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxJQUFELEdBQVEsTUFBTSxDQUFDLElBQVA7QUFBZSxjQUFNLDBCQUFOO1VBSHZCLENBQUE7YUFJQSxJQUFDLENBQUEsT0FBRCxHQUFXLE1BQU0sQ0FBQyxPQUFQO0FBQWtCLGNBQU0sNkJBQU47V0FMbkI7SUFBQSxDQUhaLENBQUE7O0FBQUEsMEJBVUEsR0FBQSxHQUFLLFNBQUEsR0FBQTtBQUNILFVBQUEsY0FBQTtBQUFBLE1BQUEsQ0FBQSxHQUFJLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBSixDQUFBO0FBQUEsTUFDQSxXQUFBLEdBQWUsS0FBQSxHQUFJLENBQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQUFSLENBQUEsQ0FBQSxDQUFKLEdBQW1CLE1BQW5CLEdBQXdCLENBQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUFSLENBQUEsQ0FBQSxDQUF4QixHQUEyQyxVQUQxRCxDQUFBO2FBRUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFSLENBQWMsV0FBZCxFQUhHO0lBQUEsQ0FWTCxDQUFBOztBQUFBLDBCQWVBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixVQUFBLGVBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxZQUFZLENBQUMsS0FBckIsQ0FBQTtBQUFBLE1BQ0EsUUFBQSxHQUFXLEtBQUEsQ0FBTSxLQUFOLEVBQWEsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFiLENBRFgsQ0FBQTtBQUFBLE1BRUEsUUFBUSxDQUFDLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ25CLEtBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFBLEVBRG1CO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckIsQ0FGQSxDQUFBO0FBQUEsTUFJQSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQWhCLENBQW1CLE1BQW5CLEVBQTJCLElBQUMsQ0FBQSxLQUE1QixDQUpBLENBQUE7QUFBQSxNQUtBLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBaEIsQ0FBbUIsTUFBbkIsRUFBMkIsSUFBQyxDQUFBLEtBQTVCLENBTEEsQ0FBQTthQU1BLFNBUFU7SUFBQSxDQWZaLENBQUE7O3VCQUFBOztNQUpKLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/ruby-test/lib/shell-runner.coffee