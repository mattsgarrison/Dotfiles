(function() {
  var RubyTestView;

  RubyTestView = require('./ruby-test-view');

  module.exports = {
    configDefaults: {
      testAllCommand: "bundle exec ruby -I test test",
      testFileCommand: "bundle exec ruby -I test {relative_path}",
      testSingleCommand: "bundle exec ruby -I test {relative_path}:{line_number}",
      rspecAllCommand: "bundle exec rspec --tty spec",
      rspecFileCommand: "bundle exec rspec --tty {relative_path}",
      rspecSingleCommand: "bundle exec rspec --tty {relative_path}:{line_number}",
      cucumberAllCommand: "bundle exec cucumber features",
      cucumberFileCommand: "bundle exec cucumber {relative_path}",
      cucumberSingleCommand: "bundle exec cucumber {relative_path}:{line_number}"
    },
    rubyTestView: null,
    activate: function(state) {
      atom.config.setDefaults("ruby-test", this.configDefaults);
      return this.rubyTestView = new RubyTestView(state.rubyTestViewState);
    },
    deactivate: function() {
      return this.rubyTestView.destroy();
    },
    serialize: function() {
      return {
        rubyTestViewState: this.rubyTestView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFlBQUE7O0FBQUEsRUFBQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGtCQUFSLENBQWYsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGNBQUEsRUFDRTtBQUFBLE1BQUEsY0FBQSxFQUFnQiwrQkFBaEI7QUFBQSxNQUNBLGVBQUEsRUFBaUIsMENBRGpCO0FBQUEsTUFFQSxpQkFBQSxFQUFtQix3REFGbkI7QUFBQSxNQUdBLGVBQUEsRUFBaUIsOEJBSGpCO0FBQUEsTUFJQSxnQkFBQSxFQUFrQix5Q0FKbEI7QUFBQSxNQUtBLGtCQUFBLEVBQW9CLHVEQUxwQjtBQUFBLE1BTUEsa0JBQUEsRUFBb0IsK0JBTnBCO0FBQUEsTUFPQSxtQkFBQSxFQUFxQixzQ0FQckI7QUFBQSxNQVFBLHFCQUFBLEVBQXVCLG9EQVJ2QjtLQURGO0FBQUEsSUFXQSxZQUFBLEVBQWMsSUFYZDtBQUFBLElBYUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0IsV0FBeEIsRUFBcUMsSUFBQyxDQUFBLGNBQXRDLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxZQUFELEdBQW9CLElBQUEsWUFBQSxDQUFhLEtBQUssQ0FBQyxpQkFBbkIsRUFGWjtJQUFBLENBYlY7QUFBQSxJQWlCQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFlBQVksQ0FBQyxPQUFkLENBQUEsRUFEVTtJQUFBLENBakJaO0FBQUEsSUFvQkEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxpQkFBQSxFQUFtQixJQUFDLENBQUEsWUFBWSxDQUFDLFNBQWQsQ0FBQSxDQUFuQjtRQURTO0lBQUEsQ0FwQlg7R0FIRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/ruby-test/lib/ruby-test.coffee