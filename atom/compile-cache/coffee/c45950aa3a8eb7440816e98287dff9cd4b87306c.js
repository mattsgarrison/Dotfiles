(function() {
  var ShellRunner, SourceInfo, TestRunner,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ShellRunner = require('./shell-runner');

  SourceInfo = require('./source-info');

  module.exports = TestRunner = (function() {
    function TestRunner(params) {
      this.command = __bind(this.command, this);
      this.initialize(params);
    }

    TestRunner.prototype.initialize = function(params) {
      this.params = params;
      return this.testParams = new SourceInfo();
    };

    TestRunner.prototype.run = function() {
      var shell;
      shell = new ShellRunner(this.shellRunnerParams());
      this.params.setTestInfo(this.command());
      return shell.run();
    };

    TestRunner.prototype.shellRunnerParams = function() {
      return {
        write: this.params.write,
        exit: this.params.exit,
        command: this.command,
        cwd: this.testParams.cwd
      };
    };

    TestRunner.prototype.command = function() {
      var cmd;
      cmd = this.params.testScope === "single" ? this.testParams.testSingleCommand() : this.params.testScope === "all" ? this.testParams.testAllCommand() : this.testParams.testFileCommand();
      return cmd.replace('{relative_path}', this.testParams.activeFile()).replace('{line_number}', this.testParams.currentLine());
    };

    return TestRunner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1DQUFBO0lBQUEsa0ZBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUNBLFVBQUEsR0FBYSxPQUFBLENBQVEsZUFBUixDQURiLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNRO0FBQ1MsSUFBQSxvQkFBQyxNQUFELEdBQUE7QUFDWCwrQ0FBQSxDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsVUFBRCxDQUFZLE1BQVosQ0FBQSxDQURXO0lBQUEsQ0FBYjs7QUFBQSx5QkFHQSxVQUFBLEdBQVksU0FBQyxNQUFELEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsTUFBVixDQUFBO2FBQ0EsSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxVQUFBLENBQUEsRUFGUjtJQUFBLENBSFosQ0FBQTs7QUFBQSx5QkFPQSxHQUFBLEdBQUssU0FBQSxHQUFBO0FBQ0gsVUFBQSxLQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVksSUFBQSxXQUFBLENBQVksSUFBQyxDQUFBLGlCQUFELENBQUEsQ0FBWixDQUFaLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsV0FBUixDQUFvQixJQUFDLENBQUEsT0FBRCxDQUFBLENBQXBCLENBREEsQ0FBQTthQUVBLEtBQUssQ0FBQyxHQUFOLENBQUEsRUFIRztJQUFBLENBUEwsQ0FBQTs7QUFBQSx5QkFZQSxpQkFBQSxHQUFtQixTQUFBLEdBQUE7YUFDakI7QUFBQSxRQUFBLEtBQUEsRUFBUyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQWpCO0FBQUEsUUFDQSxJQUFBLEVBQVMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQURqQjtBQUFBLFFBRUEsT0FBQSxFQUFTLElBQUMsQ0FBQSxPQUZWO0FBQUEsUUFHQSxHQUFBLEVBQVMsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUhyQjtRQURpQjtJQUFBLENBWm5CLENBQUE7O0FBQUEseUJBa0JBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxVQUFBLEdBQUE7QUFBQSxNQUFBLEdBQUEsR0FBUyxJQUFDLENBQUEsTUFBTSxDQUFDLFNBQVIsS0FBcUIsUUFBeEIsR0FDRixJQUFDLENBQUEsVUFBVSxDQUFDLGlCQUFaLENBQUEsQ0FERSxHQUVJLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBUixLQUFxQixLQUF4QixHQUNILElBQUMsQ0FBQSxVQUFVLENBQUMsY0FBWixDQUFBLENBREcsR0FHSCxJQUFDLENBQUEsVUFBVSxDQUFDLGVBQVosQ0FBQSxDQUxKLENBQUE7YUFNQSxHQUFHLENBQUMsT0FBSixDQUFZLGlCQUFaLEVBQStCLElBQUMsQ0FBQSxVQUFVLENBQUMsVUFBWixDQUFBLENBQS9CLENBQXdELENBQ3BELE9BREosQ0FDWSxlQURaLEVBQzZCLElBQUMsQ0FBQSxVQUFVLENBQUMsV0FBWixDQUFBLENBRDdCLEVBUE87SUFBQSxDQWxCVCxDQUFBOztzQkFBQTs7TUFMSixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/ruby-test/lib/test-runner.coffee