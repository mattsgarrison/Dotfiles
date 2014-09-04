(function() {
  var $el, $selection, Convert, _context, _height, _width;

  Convert = require('./ColorPicker-convert');

  $el = atom.workspaceView.find('#ColorPicker-alphaSelector');

  $selection = atom.workspaceView.find('#ColorPicker-alphaSelection');

  _context = $el[0].getContext('2d');

  _width = $el.width();

  _height = $el.height();

  module.exports = {
    $el: $el,
    $selection: $selection,
    width: _width,
    height: _height,
    render: function(color) {
      var _gradient, _rgbString;
      _gradient = _context.createLinearGradient(0, 0, 1, _height);
      _context.clearRect(0, 0, _width, _height);
      _rgbString = color.join(', ');
      _gradient.addColorStop(0, "rgba(" + _rgbString + ", 1)");
      _gradient.addColorStop(1, "rgba(" + _rgbString + ", 0)");
      _context.fillStyle = _gradient;
      return _context.fillRect(0, 0, _width, _height);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBR1E7QUFBQSxNQUFBLG1EQUFBOztBQUFBLEVBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSx1QkFBUixDQUFWLENBQUE7O0FBQUEsRUFFQSxHQUFBLEdBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFuQixDQUF3Qiw0QkFBeEIsQ0FGTixDQUFBOztBQUFBLEVBR0EsVUFBQSxHQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBbkIsQ0FBd0IsNkJBQXhCLENBSGIsQ0FBQTs7QUFBQSxFQUlBLFFBQUEsR0FBVyxHQUFJLENBQUEsQ0FBQSxDQUFFLENBQUMsVUFBUCxDQUFrQixJQUFsQixDQUpYLENBQUE7O0FBQUEsRUFLQSxNQUFBLEdBQVMsR0FBRyxDQUFDLEtBQUosQ0FBQSxDQUxULENBQUE7O0FBQUEsRUFNQSxPQUFBLEdBQVUsR0FBRyxDQUFDLE1BQUosQ0FBQSxDQU5WLENBQUE7O0FBQUEsRUFXQSxNQUFNLENBQUMsT0FBUCxHQUNJO0FBQUEsSUFBQSxHQUFBLEVBQUssR0FBTDtBQUFBLElBQ0EsVUFBQSxFQUFZLFVBRFo7QUFBQSxJQUVBLEtBQUEsRUFBTyxNQUZQO0FBQUEsSUFHQSxNQUFBLEVBQVEsT0FIUjtBQUFBLElBTUEsTUFBQSxFQUFRLFNBQUMsS0FBRCxHQUFBO0FBQ0osVUFBQSxxQkFBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLFFBQVEsQ0FBQyxvQkFBVCxDQUE4QixDQUE5QixFQUFpQyxDQUFqQyxFQUFvQyxDQUFwQyxFQUF1QyxPQUF2QyxDQUFaLENBQUE7QUFBQSxNQUNBLFFBQVEsQ0FBQyxTQUFULENBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLE1BQXpCLEVBQWlDLE9BQWpDLENBREEsQ0FBQTtBQUFBLE1BR0EsVUFBQSxHQUFhLEtBQUssQ0FBQyxJQUFOLENBQVcsSUFBWCxDQUhiLENBQUE7QUFBQSxNQUlBLFNBQVMsQ0FBQyxZQUFWLENBQXVCLENBQXZCLEVBQTJCLE9BQUEsR0FBMUMsVUFBMEMsR0FBb0IsTUFBL0MsQ0FKQSxDQUFBO0FBQUEsTUFLQSxTQUFTLENBQUMsWUFBVixDQUF1QixDQUF2QixFQUEyQixPQUFBLEdBQTFDLFVBQTBDLEdBQW9CLE1BQS9DLENBTEEsQ0FBQTtBQUFBLE1BT0EsUUFBUSxDQUFDLFNBQVQsR0FBcUIsU0FQckIsQ0FBQTthQVFBLFFBQVEsQ0FBQyxRQUFULENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLE1BQXhCLEVBQWdDLE9BQWhDLEVBVEk7SUFBQSxDQU5SO0dBWkosQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/color-picker/lib/ColorPicker-alphaSelector.coffee