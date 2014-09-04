(function() {
  var Linter, LinterJshint, findFile, linterPath,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  linterPath = atom.packages.getLoadedPackage("linter").path;

  Linter = require("" + linterPath + "/lib/linter");

  findFile = require("" + linterPath + "/lib/util");

  LinterJshint = (function(_super) {
    __extends(LinterJshint, _super);

    LinterJshint.syntax = ['source.js', 'source.js.jquery', 'text.html.basic'];

    LinterJshint.prototype.cmd = 'jshint --verbose --extract=auto';

    LinterJshint.prototype.linterName = 'jshint';

    LinterJshint.prototype.regex = '((?<fail>ERROR: .+)|' + '.+?: line (?<line>[0-9]+), col (?<col>[0-9]+), ' + '(?<message>.+) ' + '\\(((?<error>E)|(?<warning>W))(?<code>[0-9]+)\\)' + ')';

    LinterJshint.prototype.isNodeExecutable = true;

    function LinterJshint(editor) {
      this.formatShellCmd = __bind(this.formatShellCmd, this);
      var config;
      LinterJshint.__super__.constructor.call(this, editor);
      config = findFile(this.cwd, ['.jshintrc']);
      if (config) {
        this.cmd += " -c " + config;
      }
      atom.config.observe('linter-jshint.jshintExecutablePath', this.formatShellCmd);
    }

    LinterJshint.prototype.formatShellCmd = function() {
      var jshintExecutablePath;
      jshintExecutablePath = atom.config.get('linter-jshint.jshintExecutablePath');
      return this.executablePath = "" + jshintExecutablePath;
    };

    LinterJshint.prototype.destroy = function() {
      return atom.config.unobserve('linter-jshint.jshintExecutablePath');
    };

    return LinterJshint;

  })(Linter);

  module.exports = LinterJshint;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBDQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsVUFBQSxHQUFhLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWQsQ0FBK0IsUUFBL0IsQ0FBd0MsQ0FBQyxJQUF0RCxDQUFBOztBQUFBLEVBQ0EsTUFBQSxHQUFTLE9BQUEsQ0FBUSxFQUFBLEdBQUUsVUFBRixHQUFjLGFBQXRCLENBRFQsQ0FBQTs7QUFBQSxFQUVBLFFBQUEsR0FBVyxPQUFBLENBQVEsRUFBQSxHQUFFLFVBQUYsR0FBYyxXQUF0QixDQUZYLENBQUE7O0FBQUEsRUFJTTtBQUdKLG1DQUFBLENBQUE7O0FBQUEsSUFBQSxZQUFDLENBQUEsTUFBRCxHQUFTLENBQUMsV0FBRCxFQUFjLGtCQUFkLEVBQWtDLGlCQUFsQyxDQUFULENBQUE7O0FBQUEsMkJBSUEsR0FBQSxHQUFLLGlDQUpMLENBQUE7O0FBQUEsMkJBTUEsVUFBQSxHQUFZLFFBTlosQ0FBQTs7QUFBQSwyQkFTQSxLQUFBLEdBQ0Usc0JBQUEsR0FDQSxpREFEQSxHQUVBLGlCQUZBLEdBSUEsa0RBSkEsR0FNQSxHQWhCRixDQUFBOztBQUFBLDJCQWtCQSxnQkFBQSxHQUFrQixJQWxCbEIsQ0FBQTs7QUFvQmEsSUFBQSxzQkFBQyxNQUFELEdBQUE7QUFDWCw2REFBQSxDQUFBO0FBQUEsVUFBQSxNQUFBO0FBQUEsTUFBQSw4Q0FBTSxNQUFOLENBQUEsQ0FBQTtBQUFBLE1BRUEsTUFBQSxHQUFTLFFBQUEsQ0FBUyxJQUFDLENBQUEsR0FBVixFQUFlLENBQUMsV0FBRCxDQUFmLENBRlQsQ0FBQTtBQUdBLE1BQUEsSUFBRyxNQUFIO0FBQ0UsUUFBQSxJQUFDLENBQUEsR0FBRCxJQUFTLE1BQUEsR0FBSyxNQUFkLENBREY7T0FIQTtBQUFBLE1BTUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLG9DQUFwQixFQUEwRCxJQUFDLENBQUEsY0FBM0QsQ0FOQSxDQURXO0lBQUEsQ0FwQmI7O0FBQUEsMkJBNkJBLGNBQUEsR0FBZ0IsU0FBQSxHQUFBO0FBQ2QsVUFBQSxvQkFBQTtBQUFBLE1BQUEsb0JBQUEsR0FBdUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG9DQUFoQixDQUF2QixDQUFBO2FBQ0EsSUFBQyxDQUFBLGNBQUQsR0FBa0IsRUFBQSxHQUFFLHFCQUZOO0lBQUEsQ0E3QmhCLENBQUE7O0FBQUEsMkJBaUNBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVosQ0FBc0Isb0NBQXRCLEVBRE87SUFBQSxDQWpDVCxDQUFBOzt3QkFBQTs7S0FIeUIsT0FKM0IsQ0FBQTs7QUFBQSxFQTJDQSxNQUFNLENBQUMsT0FBUCxHQUFpQixZQTNDakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter-jshint/lib/linter-jshint.coffee