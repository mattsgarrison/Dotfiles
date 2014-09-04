(function() {
  var SvgPreviewView, fs, url,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  url = require('url');

  fs = require('fs-plus');

  SvgPreviewView = require('./svg-preview-view');

  module.exports = {
    configDefaults: {
      grammars: ['text.xml']
    },
    activate: function() {
      atom.workspaceView.command('svg-preview:toggle', (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
      return atom.workspace.registerOpener(function(uriToOpen) {
        var error, host, pathname, protocol, _ref;
        try {
          _ref = url.parse(uriToOpen), protocol = _ref.protocol, host = _ref.host, pathname = _ref.pathname;
        } catch (_error) {
          error = _error;
          return;
        }
        if (protocol !== 'svg-preview:') {
          return;
        }
        try {
          if (pathname) {
            pathname = decodeURI(pathname);
          }
        } catch (_error) {
          error = _error;
          return;
        }
        if (host === 'editor') {
          return new SvgPreviewView({
            editorId: pathname.substring(1)
          });
        } else {
          return new SvgPreviewView({
            filePath: pathname
          });
        }
      });
    },
    toggle: function() {
      var editor, grammars, previewPane, previousActivePane, uri, _ref, _ref1;
      editor = atom.workspace.getActiveEditor();
      if (editor == null) {
        return;
      }
      grammars = (_ref = atom.config.get('svg-preview.grammars')) != null ? _ref : [];
      if (_ref1 = editor.getGrammar().scopeName, __indexOf.call(grammars, _ref1) < 0) {
        return;
      }
      uri = "svg-preview://editor/" + editor.id;
      previewPane = atom.workspace.paneForUri(uri);
      if (previewPane) {
        previewPane.destroyItem(previewPane.itemForUri(uri));
        return;
      }
      previousActivePane = atom.workspace.getActivePane();
      return atom.workspace.open(uri, {
        split: 'right',
        searchAllPanes: true
      }).done(function(svgPreviewView) {
        if (svgPreviewView instanceof SvgPreviewView) {
          svgPreviewView.renderSvg();
          return previousActivePane.activate();
        }
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVCQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FBTixDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBREwsQ0FBQTs7QUFBQSxFQUdBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG9CQUFSLENBSGpCLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxjQUFBLEVBQ0U7QUFBQSxNQUFBLFFBQUEsRUFBVSxDQUFFLFVBQUYsQ0FBVjtLQURGO0FBQUEsSUFHQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLG9CQUEzQixFQUFpRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUMvQyxLQUFDLENBQUEsTUFBRCxDQUFBLEVBRCtDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakQsQ0FBQSxDQUFBO2FBR0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFmLENBQThCLFNBQUMsU0FBRCxHQUFBO0FBQzVCLFlBQUEscUNBQUE7QUFBQTtBQUNFLFVBQUEsT0FBNkIsR0FBRyxDQUFDLEtBQUosQ0FBVSxTQUFWLENBQTdCLEVBQUMsZ0JBQUEsUUFBRCxFQUFXLFlBQUEsSUFBWCxFQUFpQixnQkFBQSxRQUFqQixDQURGO1NBQUEsY0FBQTtBQUdFLFVBREksY0FDSixDQUFBO0FBQUEsZ0JBQUEsQ0FIRjtTQUFBO0FBS0EsUUFBQSxJQUFjLFFBQUEsS0FBWSxjQUExQjtBQUFBLGdCQUFBLENBQUE7U0FMQTtBQU9BO0FBQ0UsVUFBQSxJQUFrQyxRQUFsQztBQUFBLFlBQUEsUUFBQSxHQUFXLFNBQUEsQ0FBVSxRQUFWLENBQVgsQ0FBQTtXQURGO1NBQUEsY0FBQTtBQUdFLFVBREksY0FDSixDQUFBO0FBQUEsZ0JBQUEsQ0FIRjtTQVBBO0FBWUEsUUFBQSxJQUFHLElBQUEsS0FBUSxRQUFYO2lCQUNNLElBQUEsY0FBQSxDQUFlO0FBQUEsWUFBQSxRQUFBLEVBQVUsUUFBUSxDQUFDLFNBQVQsQ0FBbUIsQ0FBbkIsQ0FBVjtXQUFmLEVBRE47U0FBQSxNQUFBO2lCQUdNLElBQUEsY0FBQSxDQUFlO0FBQUEsWUFBQSxRQUFBLEVBQVUsUUFBVjtXQUFmLEVBSE47U0FiNEI7TUFBQSxDQUE5QixFQUpRO0lBQUEsQ0FIVjtBQUFBLElBeUJBLE1BQUEsRUFBUSxTQUFBLEdBQUE7QUFDTixVQUFBLG1FQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFmLENBQUEsQ0FBVCxDQUFBO0FBQ0EsTUFBQSxJQUFjLGNBQWQ7QUFBQSxjQUFBLENBQUE7T0FEQTtBQUFBLE1BR0EsUUFBQSxxRUFBcUQsRUFIckQsQ0FBQTtBQUlBLE1BQUEsWUFBYyxNQUFNLENBQUMsVUFBUCxDQUFBLENBQW1CLENBQUMsU0FBcEIsRUFBQSxlQUFpQyxRQUFqQyxFQUFBLEtBQUEsS0FBZDtBQUFBLGNBQUEsQ0FBQTtPQUpBO0FBQUEsTUFNQSxHQUFBLEdBQU8sdUJBQUEsR0FBc0IsTUFBTSxDQUFDLEVBTnBDLENBQUE7QUFBQSxNQVFBLFdBQUEsR0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQWYsQ0FBMEIsR0FBMUIsQ0FSZCxDQUFBO0FBU0EsTUFBQSxJQUFHLFdBQUg7QUFDRSxRQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLFdBQVcsQ0FBQyxVQUFaLENBQXVCLEdBQXZCLENBQXhCLENBQUEsQ0FBQTtBQUNBLGNBQUEsQ0FGRjtPQVRBO0FBQUEsTUFhQSxrQkFBQSxHQUFxQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBQSxDQWJyQixDQUFBO2FBY0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLEdBQXBCLEVBQXlCO0FBQUEsUUFBQSxLQUFBLEVBQU8sT0FBUDtBQUFBLFFBQWdCLGNBQUEsRUFBZ0IsSUFBaEM7T0FBekIsQ0FBOEQsQ0FBQyxJQUEvRCxDQUFvRSxTQUFDLGNBQUQsR0FBQTtBQUNsRSxRQUFBLElBQUcsY0FBQSxZQUEwQixjQUE3QjtBQUNFLFVBQUEsY0FBYyxDQUFDLFNBQWYsQ0FBQSxDQUFBLENBQUE7aUJBQ0Esa0JBQWtCLENBQUMsUUFBbkIsQ0FBQSxFQUZGO1NBRGtFO01BQUEsQ0FBcEUsRUFmTTtJQUFBLENBekJSO0dBTkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/svg-preview/lib/svg-preview.coffee