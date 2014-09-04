(function() {
  var Linter, LinterRuby, linterPath,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  linterPath = atom.packages.getLoadedPackage("linter").path;

  Linter = require("" + linterPath + "/lib/linter");

  LinterRuby = (function(_super) {
    __extends(LinterRuby, _super);

    LinterRuby.syntax = 'source.ruby';

    LinterRuby.prototype.cmd = 'ruby -wc';

    LinterRuby.prototype.executablePath = null;

    LinterRuby.prototype.errorStream = 'stderr';

    LinterRuby.prototype.linterName = 'ruby';

    LinterRuby.prototype.regex = '.+:(?<line>\\d+):((?<warning> warning:)|(?<error>))(?<message>.+)';

    function LinterRuby(editor) {
      LinterRuby.__super__.constructor.call(this, editor);
      atom.config.observe('linter-ruby.rubyExecutablePath', (function(_this) {
        return function() {
          return _this.executablePath = atom.config.get('linter-ruby.rubyExecutablePath');
        };
      })(this));
    }

    LinterRuby.prototype.destroy = function() {
      return atom.config.unobserve('linter-ruby.rubyExecutablePath');
    };

    return LinterRuby;

  })(Linter);

  module.exports = LinterRuby;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixRQUEvQixDQUF3QyxDQUFDLElBQXRELENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLEVBQUEsR0FBRSxVQUFGLEdBQWMsYUFBdEIsQ0FEVCxDQUFBOztBQUFBLEVBR007QUFHSixpQ0FBQSxDQUFBOztBQUFBLElBQUEsVUFBQyxDQUFBLE1BQUQsR0FBUyxhQUFULENBQUE7O0FBQUEseUJBSUEsR0FBQSxHQUFLLFVBSkwsQ0FBQTs7QUFBQSx5QkFNQSxjQUFBLEdBQWdCLElBTmhCLENBQUE7O0FBQUEseUJBUUEsV0FBQSxHQUFhLFFBUmIsQ0FBQTs7QUFBQSx5QkFVQSxVQUFBLEdBQVksTUFWWixDQUFBOztBQUFBLHlCQWFBLEtBQUEsR0FDRSxtRUFkRixDQUFBOztBQWdCYSxJQUFBLG9CQUFDLE1BQUQsR0FBQTtBQUNYLE1BQUEsNENBQU0sTUFBTixDQUFBLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQixnQ0FBcEIsRUFBc0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDcEQsS0FBQyxDQUFBLGNBQUQsR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGdDQUFoQixFQURrQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXRELENBRkEsQ0FEVztJQUFBLENBaEJiOztBQUFBLHlCQXNCQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFaLENBQXNCLGdDQUF0QixFQURPO0lBQUEsQ0F0QlQsQ0FBQTs7c0JBQUE7O0tBSHVCLE9BSHpCLENBQUE7O0FBQUEsRUErQkEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsVUEvQmpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter-ruby/lib/linter-ruby.coffee