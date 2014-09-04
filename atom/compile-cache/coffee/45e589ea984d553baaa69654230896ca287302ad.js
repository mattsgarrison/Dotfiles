(function() {
  var Linter, LinterScssLint, findFile, linterPath,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  linterPath = atom.packages.getLoadedPackage("linter").path;

  Linter = require("" + linterPath + "/lib/linter");

  findFile = require("" + linterPath + "/lib/util");

  LinterScssLint = (function(_super) {
    __extends(LinterScssLint, _super);

    LinterScssLint.syntax = 'source.css.scss';

    LinterScssLint.prototype.cmd = 'scss-lint --format=XML';

    LinterScssLint.prototype.executablePath = null;

    LinterScssLint.prototype.linterName = 'scss-lint';

    LinterScssLint.prototype.regex = 'line="(?<line>\\d+)" column="(?<col>\\d+)" .*? severity="((?<error>error)|(?<warning>warning))" reason="(?<message>.*?)"';

    function LinterScssLint(editor) {
      LinterScssLint.__super__.constructor.call(this, editor);
      atom.config.observe('linter-scss-lint.scssLintExecutablePath', (function(_this) {
        return function() {
          return _this.executablePath = atom.config.get('linter-scss-lint.scssLintExecutablePath');
        };
      })(this));
      atom.config.observe('linter-scss-lint.scssLintExcludedLinters', (function(_this) {
        return function() {
          return _this.updateCommand();
        };
      })(this));
    }

    LinterScssLint.prototype.destroy = function() {
      atom.config.unobserve('linter-scss-lint.scssLintExecutablePath');
      return atom.config.unobserve('linter-scss-lint.scssLintExcludedLinters');
    };

    LinterScssLint.prototype.updateCommand = function() {
      var config, excludedLinters;
      excludedLinters = atom.config.get('linter-scss-lint.scssLintExcludedLinters');
      if (excludedLinters && excludedLinters.length > 0) {
        this.cmd = "scss-lint --format=XML --exclude-linter=" + (excludedLinters.toString());
      } else {
        this.cmd = 'scss-lint --format=XML';
      }
      config = findFile(this.cwd, ['.scss-lint.yml']);
      if (config) {
        return this.cmd += " -c " + config;
      }
    };

    return LinterScssLint;

  })(Linter);

  module.exports = LinterScssLint;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixRQUEvQixDQUF3QyxDQUFDLElBQXRELENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLEVBQUEsR0FBRSxVQUFGLEdBQWMsYUFBdEIsQ0FEVCxDQUFBOztBQUFBLEVBRUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxFQUFBLEdBQUUsVUFBRixHQUFjLFdBQXRCLENBRlgsQ0FBQTs7QUFBQSxFQUtNO0FBR0oscUNBQUEsQ0FBQTs7QUFBQSxJQUFBLGNBQUMsQ0FBQSxNQUFELEdBQVMsaUJBQVQsQ0FBQTs7QUFBQSw2QkFJQSxHQUFBLEdBQUssd0JBSkwsQ0FBQTs7QUFBQSw2QkFNQSxjQUFBLEdBQWdCLElBTmhCLENBQUE7O0FBQUEsNkJBUUEsVUFBQSxHQUFZLFdBUlosQ0FBQTs7QUFBQSw2QkFXQSxLQUFBLEdBQU8sMEhBWFAsQ0FBQTs7QUFhYSxJQUFBLHdCQUFDLE1BQUQsR0FBQTtBQUNYLE1BQUEsZ0RBQU0sTUFBTixDQUFBLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQix5Q0FBcEIsRUFBK0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDN0QsS0FBQyxDQUFBLGNBQUQsR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHlDQUFoQixFQUQyQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQS9ELENBRkEsQ0FBQTtBQUFBLE1BS0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLDBDQUFwQixFQUFnRSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUM5RCxLQUFDLENBQUEsYUFBRCxDQUFBLEVBRDhEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEUsQ0FMQSxDQURXO0lBQUEsQ0FiYjs7QUFBQSw2QkFzQkEsT0FBQSxHQUFTLFNBQUEsR0FBQTtBQUNQLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFaLENBQXNCLHlDQUF0QixDQUFBLENBQUE7YUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVosQ0FBc0IsMENBQXRCLEVBRk87SUFBQSxDQXRCVCxDQUFBOztBQUFBLDZCQTBCQSxhQUFBLEdBQWUsU0FBQSxHQUFBO0FBQ2IsVUFBQSx1QkFBQTtBQUFBLE1BQUEsZUFBQSxHQUFrQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsMENBQWhCLENBQWxCLENBQUE7QUFFQSxNQUFBLElBQUcsZUFBQSxJQUFvQixlQUFlLENBQUMsTUFBaEIsR0FBeUIsQ0FBaEQ7QUFDRSxRQUFBLElBQUMsQ0FBQSxHQUFELEdBQVEsMENBQUEsR0FBeUMsQ0FBQSxlQUFlLENBQUMsUUFBaEIsQ0FBQSxDQUFBLENBQWpELENBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxJQUFDLENBQUEsR0FBRCxHQUFPLHdCQUFQLENBSEY7T0FGQTtBQUFBLE1BT0EsTUFBQSxHQUFTLFFBQUEsQ0FBUyxJQUFDLENBQUEsR0FBVixFQUFlLENBQUMsZ0JBQUQsQ0FBZixDQVBULENBQUE7QUFRQSxNQUFBLElBQUcsTUFBSDtlQUNFLElBQUMsQ0FBQSxHQUFELElBQVMsTUFBQSxHQUFLLE9BRGhCO09BVGE7SUFBQSxDQTFCZixDQUFBOzswQkFBQTs7S0FIMkIsT0FMN0IsQ0FBQTs7QUFBQSxFQThDQSxNQUFNLENBQUMsT0FBUCxHQUFpQixjQTlDakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter-scss-lint/lib/linter-scss-lint.coffee