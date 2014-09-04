(function() {
  var path;

  path = require('path');

  module.exports = {
    configDefaults: {
      coffeelintExecutablePath: path.join(__dirname, '..', 'node_modules', 'coffeelint', 'bin')
    },
    activate: function() {
      return console.log('activate linter-coffeelint');
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLElBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsY0FBQSxFQUNFO0FBQUEsTUFBQSx3QkFBQSxFQUEwQixJQUFJLENBQUMsSUFBTCxDQUFVLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsY0FBM0IsRUFBMkMsWUFBM0MsRUFBeUQsS0FBekQsQ0FBMUI7S0FERjtBQUFBLElBR0EsUUFBQSxFQUFVLFNBQUEsR0FBQTthQUNSLE9BQU8sQ0FBQyxHQUFSLENBQVksNEJBQVosRUFEUTtJQUFBLENBSFY7R0FIRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/linter-coffeelint/lib/init.coffee