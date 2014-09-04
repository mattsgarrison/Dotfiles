(function() {
  var SourceInfo, fs;

  fs = require('fs');

  module.exports = SourceInfo = (function() {
    function SourceInfo() {}

    SourceInfo.prototype.frameworkLookup = {
      test: 'test',
      spec: 'rspec',
      feature: 'cucumber'
    };

    SourceInfo.prototype.cwd = function() {
      return atom.project.getPath();
    };

    SourceInfo.prototype.testFileCommand = function() {
      return atom.config.get("ruby-test." + (this.testFramework()) + "FileCommand");
    };

    SourceInfo.prototype.testAllCommand = function() {
      var configName;
      configName = "ruby-test." + (this.testFramework()) + "AllCommand";
      return atom.config.get("ruby-test." + (this.testFramework()) + "AllCommand");
    };

    SourceInfo.prototype.testSingleCommand = function() {
      return atom.config.get("ruby-test." + (this.testFramework()) + "SingleCommand");
    };

    SourceInfo.prototype.activeFile = function() {
      return this._activeFile || (this._activeFile = atom.project.relativize(atom.workspace.getActiveEditor().buffer.file.path));
    };

    SourceInfo.prototype.currentLine = function() {
      var cursor, editor;
      return this._currentLine || (this._currentLine = !this._currentLine ? (editor = atom.workspace.getActiveEditor(), cursor = editor.getCursor(), cursor.getScreenRow() + 1) : void 0);
    };

    SourceInfo.prototype.testFramework = function() {
      var t;
      return this._testFramework || (this._testFramework = !this._testFramework ? (t = this.fileType()) && this.frameworkLookup[t] || this.projectType() : void 0);
    };

    SourceInfo.prototype.fileType = function() {
      var matches;
      return this._fileType || (this._fileType = (matches = this.activeFile().match(/_(test|spec)\.rb$/)) ? matches[1] : (matches = this.activeFile().match(/\.(feature)$/)) ? matches[1] : void 0);
    };

    SourceInfo.prototype.projectType = function() {
      if (fs.existsSync(atom.project.path + '/test')) {
        return 'test';
      } else if (fs.existsSync(atom.project.path + '/spec')) {
        return 'rspec';
      } else if (fs.existsSync(atom.project.path + '/feature')) {
        return 'cucumber';
      } else {
        return null;
      }
    };

    return SourceInfo;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGNBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDUTs0QkFDSjs7QUFBQSx5QkFBQSxlQUFBLEdBQ0U7QUFBQSxNQUFBLElBQUEsRUFBUyxNQUFUO0FBQUEsTUFDQSxJQUFBLEVBQVMsT0FEVDtBQUFBLE1BRUEsT0FBQSxFQUFTLFVBRlQ7S0FERixDQUFBOztBQUFBLHlCQUtBLEdBQUEsR0FBSyxTQUFBLEdBQUE7YUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQWIsQ0FBQSxFQURHO0lBQUEsQ0FMTCxDQUFBOztBQUFBLHlCQVFBLGVBQUEsR0FBaUIsU0FBQSxHQUFBO2FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWlCLFlBQUEsR0FBVyxDQUFBLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBQSxDQUFYLEdBQTZCLGFBQTlDLEVBRGU7SUFBQSxDQVJqQixDQUFBOztBQUFBLHlCQVdBLGNBQUEsR0FBZ0IsU0FBQSxHQUFBO0FBQ2QsVUFBQSxVQUFBO0FBQUEsTUFBQSxVQUFBLEdBQWMsWUFBQSxHQUFXLENBQUEsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUFBLENBQVgsR0FBNkIsWUFBM0MsQ0FBQTthQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFpQixZQUFBLEdBQVcsQ0FBQSxJQUFDLENBQUEsYUFBRCxDQUFBLENBQUEsQ0FBWCxHQUE2QixZQUE5QyxFQUZjO0lBQUEsQ0FYaEIsQ0FBQTs7QUFBQSx5QkFlQSxpQkFBQSxHQUFtQixTQUFBLEdBQUE7YUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWlCLFlBQUEsR0FBVyxDQUFBLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBQSxDQUFYLEdBQTZCLGVBQTlDLEVBRGlCO0lBQUEsQ0FmbkIsQ0FBQTs7QUFBQSx5QkFrQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxnQkFBRCxJQUFDLENBQUEsY0FBZ0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFiLENBQXdCLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZixDQUFBLENBQWdDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFyRSxHQURQO0lBQUEsQ0FsQlosQ0FBQTs7QUFBQSx5QkFxQkEsV0FBQSxHQUFhLFNBQUEsR0FBQTtBQUNYLFVBQUEsY0FBQTthQUFBLElBQUMsQ0FBQSxpQkFBRCxJQUFDLENBQUEsZUFBaUIsQ0FBQSxJQUFRLENBQUEsWUFBUixHQUNoQixDQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWYsQ0FBQSxDQUFULEVBQ0EsTUFBQSxHQUFTLE1BQU0sQ0FBQyxTQUFQLENBQUEsQ0FEVCxFQUVBLE1BQU0sQ0FBQyxZQUFQLENBQUEsQ0FBQSxHQUF3QixDQUZ4QixDQURnQixHQUFBLFFBRFA7SUFBQSxDQXJCYixDQUFBOztBQUFBLHlCQTJCQSxhQUFBLEdBQWUsU0FBQSxHQUFBO0FBQ2IsVUFBQSxDQUFBO2FBQUEsSUFBQyxDQUFBLG1CQUFELElBQUMsQ0FBQSxpQkFBbUIsQ0FBQSxJQUFRLENBQUEsY0FBUixHQUNsQixDQUFDLENBQUEsR0FBSSxJQUFDLENBQUEsUUFBRCxDQUFBLENBQUwsQ0FBQSxJQUFzQixJQUFDLENBQUEsZUFBZ0IsQ0FBQSxDQUFBLENBQXZDLElBQ0EsSUFBQyxDQUFBLFdBQUQsQ0FBQSxDQUZrQixHQUFBLFFBRFA7SUFBQSxDQTNCZixDQUFBOztBQUFBLHlCQWdDQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsVUFBQSxPQUFBO2FBQUEsSUFBQyxDQUFBLGNBQUQsSUFBQyxDQUFBLFlBQWlCLENBQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBYSxDQUFDLEtBQWQsQ0FBb0IsbUJBQXBCLENBQVYsQ0FBSCxHQUNiLE9BQVEsQ0FBQSxDQUFBLENBREssR0FFUCxDQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsVUFBRCxDQUFBLENBQWEsQ0FBQyxLQUFkLENBQW9CLGNBQXBCLENBQVYsQ0FBSCxHQUNILE9BQVEsQ0FBQSxDQUFBLENBREwsR0FBQSxRQUhHO0lBQUEsQ0FoQ1YsQ0FBQTs7QUFBQSx5QkFzQ0EsV0FBQSxHQUFhLFNBQUEsR0FBQTtBQUNYLE1BQUEsSUFBRyxFQUFFLENBQUMsVUFBSCxDQUFjLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBYixHQUFvQixPQUFsQyxDQUFIO2VBQ0UsT0FERjtPQUFBLE1BRUssSUFBRyxFQUFFLENBQUMsVUFBSCxDQUFjLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBYixHQUFvQixPQUFsQyxDQUFIO2VBQ0gsUUFERztPQUFBLE1BRUEsSUFBRyxFQUFFLENBQUMsVUFBSCxDQUFjLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBYixHQUFvQixVQUFsQyxDQUFIO2VBQ0gsV0FERztPQUFBLE1BQUE7ZUFHSCxLQUhHO09BTE07SUFBQSxDQXRDYixDQUFBOztzQkFBQTs7TUFKSixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/ruby-test/lib/source-info.coffee