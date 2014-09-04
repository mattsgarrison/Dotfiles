(function() {
  var path;

  path = require('path');

  module.exports = {
    configDefaults: {
      coffeelintExecutablePath: path.join(__dirname, '..', 'node_modules', 'coffeelint', 'bin'),
      coffeelintConfigPath: null
    },
    activate: function() {
      return console.log('activate linter-coffeelint');
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLElBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsY0FBQSxFQUNFO0FBQUEsTUFBQSx3QkFBQSxFQUEwQixJQUFJLENBQUMsSUFBTCxDQUFVLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsY0FBM0IsRUFBMkMsWUFBM0MsRUFBeUQsS0FBekQsQ0FBMUI7QUFBQSxNQUNBLG9CQUFBLEVBQXNCLElBRHRCO0tBREY7QUFBQSxJQUlBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixPQUFPLENBQUMsR0FBUixDQUFZLDRCQUFaLEVBRFE7SUFBQSxDQUpWO0dBSEYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter-coffeelint/lib/init.coffee