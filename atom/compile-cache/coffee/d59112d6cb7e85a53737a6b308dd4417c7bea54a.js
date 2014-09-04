(function() {
  var Linter, LinterRubocop, findFile, linterPath,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  linterPath = atom.packages.getLoadedPackage("linter").path;

  Linter = require("" + linterPath + "/lib/linter");

  findFile = require("" + linterPath + "/lib/util");

  LinterRubocop = (function(_super) {
    __extends(LinterRubocop, _super);

    LinterRubocop.syntax = ['source.ruby', 'source.ruby.rails'];

    LinterRubocop.prototype.cmd = 'rubocop --format emacs';

    LinterRubocop.prototype.linterName = 'rubocop';

    LinterRubocop.prototype.regex = '.+?:(?<line>\\d+):(?<col>\\d+): ' + '((?<warning>[RCW])|(?<error>[EF])): ' + '(?<message>.+)';

    function LinterRubocop(editor) {
      var config;
      LinterRubocop.__super__.constructor.call(this, editor);
      if (editor.getGrammar().scopeName === 'source.ruby.rails') {
        this.cmd += " -R";
      }
      config = findFile(this.cwd, '.rubocop.yml');
      if (config) {
        this.cmd += " --config " + config;
      }
      atom.config.observe('linter-rubocop.rubocopExecutablePath', (function(_this) {
        return function() {
          return _this.executablePath = atom.config.get('linter-rubocop.rubocopExecutablePath');
        };
      })(this));
    }

    LinterRubocop.prototype.destroy = function() {
      return atom.config.unobserve('linter-rubocop.rubocopExecutablePath');
    };

    return LinterRubocop;

  })(Linter);

  module.exports = LinterRubocop;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixRQUEvQixDQUF3QyxDQUFDLElBQXRELENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLEVBQUEsR0FBRSxVQUFGLEdBQWMsYUFBdEIsQ0FEVCxDQUFBOztBQUFBLEVBRUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxFQUFBLEdBQUUsVUFBRixHQUFjLFdBQXRCLENBRlgsQ0FBQTs7QUFBQSxFQUlNO0FBR0osb0NBQUEsQ0FBQTs7QUFBQSxJQUFBLGFBQUMsQ0FBQSxNQUFELEdBQVMsQ0FBQyxhQUFELEVBQWdCLG1CQUFoQixDQUFULENBQUE7O0FBQUEsNEJBSUEsR0FBQSxHQUFLLHdCQUpMLENBQUE7O0FBQUEsNEJBTUEsVUFBQSxHQUFZLFNBTlosQ0FBQTs7QUFBQSw0QkFTQSxLQUFBLEdBQ0Usa0NBQUEsR0FDQSxzQ0FEQSxHQUVBLGdCQVpGLENBQUE7O0FBY2EsSUFBQSx1QkFBQyxNQUFELEdBQUE7QUFDWCxVQUFBLE1BQUE7QUFBQSxNQUFBLCtDQUFNLE1BQU4sQ0FBQSxDQUFBO0FBRUEsTUFBQSxJQUFHLE1BQU0sQ0FBQyxVQUFQLENBQUEsQ0FBbUIsQ0FBQyxTQUFwQixLQUFpQyxtQkFBcEM7QUFDRSxRQUFBLElBQUMsQ0FBQSxHQUFELElBQVEsS0FBUixDQURGO09BRkE7QUFBQSxNQUtBLE1BQUEsR0FBUyxRQUFBLENBQVMsSUFBQyxDQUFBLEdBQVYsRUFBZSxjQUFmLENBTFQsQ0FBQTtBQU1BLE1BQUEsSUFBRyxNQUFIO0FBQ0UsUUFBQSxJQUFDLENBQUEsR0FBRCxJQUFTLFlBQUEsR0FBVyxNQUFwQixDQURGO09BTkE7QUFBQSxNQVNBLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQixzQ0FBcEIsRUFBNEQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDMUQsS0FBQyxDQUFBLGNBQUQsR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHNDQUFoQixFQUR3QztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVELENBVEEsQ0FEVztJQUFBLENBZGI7O0FBQUEsNEJBMkJBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVosQ0FBc0Isc0NBQXRCLEVBRE87SUFBQSxDQTNCVCxDQUFBOzt5QkFBQTs7S0FIMEIsT0FKNUIsQ0FBQTs7QUFBQSxFQXFDQSxNQUFNLENBQUMsT0FBUCxHQUFpQixhQXJDakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter-rubocop/lib/linter-rubocop.coffee