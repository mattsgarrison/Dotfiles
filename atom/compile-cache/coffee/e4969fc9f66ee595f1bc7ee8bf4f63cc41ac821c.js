(function() {
  var RubyTestView;

  RubyTestView = require('./ruby-test-view');

  module.exports = {
    configDefaults: {
      testAllCommand: "ruby -I test test",
      testFileCommand: "ruby -I test {relative_path}",
      testSingleCommand: "ruby -I test {relative_path}:{line_number}",
      rspecAllCommand: "rspec --tty spec",
      rspecFileCommand: "rspec --tty {relative_path}",
      rspecSingleCommand: "rspec --tty {relative_path}:{line_number}",
      cucumberAllCommand: "cucumber features",
      cucumberFileCommand: "cucumber {relative_path}",
      cucumberSingleCommand: "cucumber {relative_path}:{line_number}"
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFlBQUE7O0FBQUEsRUFBQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGtCQUFSLENBQWYsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGNBQUEsRUFDRTtBQUFBLE1BQUEsY0FBQSxFQUFnQixtQkFBaEI7QUFBQSxNQUNBLGVBQUEsRUFBaUIsOEJBRGpCO0FBQUEsTUFFQSxpQkFBQSxFQUFtQiw0Q0FGbkI7QUFBQSxNQUdBLGVBQUEsRUFBaUIsa0JBSGpCO0FBQUEsTUFJQSxnQkFBQSxFQUFrQiw2QkFKbEI7QUFBQSxNQUtBLGtCQUFBLEVBQW9CLDJDQUxwQjtBQUFBLE1BTUEsa0JBQUEsRUFBb0IsbUJBTnBCO0FBQUEsTUFPQSxtQkFBQSxFQUFxQiwwQkFQckI7QUFBQSxNQVFBLHFCQUFBLEVBQXVCLHdDQVJ2QjtLQURGO0FBQUEsSUFXQSxZQUFBLEVBQWMsSUFYZDtBQUFBLElBYUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0IsV0FBeEIsRUFBcUMsSUFBQyxDQUFBLGNBQXRDLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxZQUFELEdBQW9CLElBQUEsWUFBQSxDQUFhLEtBQUssQ0FBQyxpQkFBbkIsRUFGWjtJQUFBLENBYlY7QUFBQSxJQWlCQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFlBQVksQ0FBQyxPQUFkLENBQUEsRUFEVTtJQUFBLENBakJaO0FBQUEsSUFvQkEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxpQkFBQSxFQUFtQixJQUFDLENBQUEsWUFBWSxDQUFDLFNBQWQsQ0FBQSxDQUFuQjtRQURTO0lBQUEsQ0FwQlg7R0FIRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/ruby-test/lib/ruby-test.coffee