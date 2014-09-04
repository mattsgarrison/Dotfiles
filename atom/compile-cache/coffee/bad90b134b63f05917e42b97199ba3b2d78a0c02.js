(function() {
  var Linter, LinterCoffeelint, findFile, linterPath,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  linterPath = atom.packages.getLoadedPackage('linter').path;

  Linter = require("" + linterPath + "/lib/linter");

  findFile = require("" + linterPath + "/lib/util");

  LinterCoffeelint = (function(_super) {
    __extends(LinterCoffeelint, _super);

    LinterCoffeelint.syntax = ['source.coffee', 'source.litcoffee'];

    LinterCoffeelint.prototype.cmd = 'coffeelint --reporter jslint';

    LinterCoffeelint.prototype.linterName = 'coffeelint';

    LinterCoffeelint.prototype.regex = '<issue line="(?<line>\\d+)"' + '.+?reason="\\[((?<error>error)|(?<warning>warn))\\] (?<message>.+?)"';

    LinterCoffeelint.prototype.regexFlags = 's';

    LinterCoffeelint.prototype.isNodeExecutable = true;

    function LinterCoffeelint(editor) {
      var config;
      LinterCoffeelint.__super__.constructor.call(this, editor);
      config = findFile(this.cwd, ['coffeelint.json']);
      if (config) {
        this.cmd += " -f " + config;
      }
      atom.config.observe('linter-coffeelint.coffeelintExecutablePath', (function(_this) {
        return function() {
          return _this.executablePath = atom.config.get('linter-coffeelint.coffeelintExecutablePath');
        };
      })(this));
      if (editor.getGrammar().scopeName === 'source.litcoffee') {
        this.cmd += ' --literate';
      }
    }

    LinterCoffeelint.prototype.destroy = function() {
      return atom.config.unobserve('linter-coffeelint.coffeelintExecutablePath');
    };

    return LinterCoffeelint;

  })(Linter);

  module.exports = LinterCoffeelint;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixRQUEvQixDQUF3QyxDQUFDLElBQXRELENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLEVBQUEsR0FBRSxVQUFGLEdBQWMsYUFBdEIsQ0FEVCxDQUFBOztBQUFBLEVBRUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxFQUFBLEdBQUUsVUFBRixHQUFjLFdBQXRCLENBRlgsQ0FBQTs7QUFBQSxFQUlNO0FBR0osdUNBQUEsQ0FBQTs7QUFBQSxJQUFBLGdCQUFDLENBQUEsTUFBRCxHQUFTLENBQUMsZUFBRCxFQUFrQixrQkFBbEIsQ0FBVCxDQUFBOztBQUFBLCtCQUlBLEdBQUEsR0FBSyw4QkFKTCxDQUFBOztBQUFBLCtCQU1BLFVBQUEsR0FBWSxZQU5aLENBQUE7O0FBQUEsK0JBU0EsS0FBQSxHQUNFLDZCQUFBLEdBRUEsc0VBWkYsQ0FBQTs7QUFBQSwrQkFjQSxVQUFBLEdBQVksR0FkWixDQUFBOztBQUFBLCtCQWdCQSxnQkFBQSxHQUFrQixJQWhCbEIsQ0FBQTs7QUFrQmEsSUFBQSwwQkFBQyxNQUFELEdBQUE7QUFDWCxVQUFBLE1BQUE7QUFBQSxNQUFBLGtEQUFNLE1BQU4sQ0FBQSxDQUFBO0FBQUEsTUFFQSxNQUFBLEdBQVMsUUFBQSxDQUFTLElBQUMsQ0FBQSxHQUFWLEVBQWUsQ0FBQyxpQkFBRCxDQUFmLENBRlQsQ0FBQTtBQUdBLE1BQUEsSUFBRyxNQUFIO0FBQ0UsUUFBQSxJQUFDLENBQUEsR0FBRCxJQUFTLE1BQUEsR0FBSyxNQUFkLENBREY7T0FIQTtBQUFBLE1BTUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLDRDQUFwQixFQUFrRSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNoRSxLQUFDLENBQUEsY0FBRCxHQUFrQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsNENBQWhCLEVBRDhDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEUsQ0FOQSxDQUFBO0FBU0EsTUFBQSxJQUFHLE1BQU0sQ0FBQyxVQUFQLENBQUEsQ0FBbUIsQ0FBQyxTQUFwQixLQUFpQyxrQkFBcEM7QUFDRSxRQUFBLElBQUMsQ0FBQSxHQUFELElBQVEsYUFBUixDQURGO09BVlc7SUFBQSxDQWxCYjs7QUFBQSwrQkErQkEsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBWixDQUFzQiw0Q0FBdEIsRUFETztJQUFBLENBL0JULENBQUE7OzRCQUFBOztLQUg2QixPQUovQixDQUFBOztBQUFBLEVBeUNBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGdCQXpDakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter-coffeelint/lib/linter-coffeelint.coffee