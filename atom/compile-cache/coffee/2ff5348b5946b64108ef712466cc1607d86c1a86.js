(function() {
  var SvgPreviewView, fs, url,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  url = require('url');

  fs = require('fs-plus');

  SvgPreviewView = require('./svg-preview-view');

  module.exports = {
    configDefaults: {
      grammars: ['text.plain.null-grammar', 'text.xml']
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVCQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FBTixDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBREwsQ0FBQTs7QUFBQSxFQUdBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG9CQUFSLENBSGpCLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxjQUFBLEVBQ0U7QUFBQSxNQUFBLFFBQUEsRUFBVSxDQUFFLHlCQUFGLEVBQTZCLFVBQTdCLENBQVY7S0FERjtBQUFBLElBR0EsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixvQkFBM0IsRUFBaUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDL0MsS0FBQyxDQUFBLE1BQUQsQ0FBQSxFQUQrQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpELENBQUEsQ0FBQTthQUdBLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBZixDQUE4QixTQUFDLFNBQUQsR0FBQTtBQUM1QixZQUFBLHFDQUFBO0FBQUE7QUFDRSxVQUFBLE9BQTZCLEdBQUcsQ0FBQyxLQUFKLENBQVUsU0FBVixDQUE3QixFQUFDLGdCQUFBLFFBQUQsRUFBVyxZQUFBLElBQVgsRUFBaUIsZ0JBQUEsUUFBakIsQ0FERjtTQUFBLGNBQUE7QUFHRSxVQURJLGNBQ0osQ0FBQTtBQUFBLGdCQUFBLENBSEY7U0FBQTtBQUtBLFFBQUEsSUFBYyxRQUFBLEtBQVksY0FBMUI7QUFBQSxnQkFBQSxDQUFBO1NBTEE7QUFPQTtBQUNFLFVBQUEsSUFBa0MsUUFBbEM7QUFBQSxZQUFBLFFBQUEsR0FBVyxTQUFBLENBQVUsUUFBVixDQUFYLENBQUE7V0FERjtTQUFBLGNBQUE7QUFHRSxVQURJLGNBQ0osQ0FBQTtBQUFBLGdCQUFBLENBSEY7U0FQQTtBQVlBLFFBQUEsSUFBRyxJQUFBLEtBQVEsUUFBWDtpQkFDTSxJQUFBLGNBQUEsQ0FBZTtBQUFBLFlBQUEsUUFBQSxFQUFVLFFBQVEsQ0FBQyxTQUFULENBQW1CLENBQW5CLENBQVY7V0FBZixFQUROO1NBQUEsTUFBQTtpQkFHTSxJQUFBLGNBQUEsQ0FBZTtBQUFBLFlBQUEsUUFBQSxFQUFVLFFBQVY7V0FBZixFQUhOO1NBYjRCO01BQUEsQ0FBOUIsRUFKUTtJQUFBLENBSFY7QUFBQSxJQXlCQSxNQUFBLEVBQVEsU0FBQSxHQUFBO0FBQ04sVUFBQSxtRUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZixDQUFBLENBQVQsQ0FBQTtBQUNBLE1BQUEsSUFBYyxjQUFkO0FBQUEsY0FBQSxDQUFBO09BREE7QUFBQSxNQUdBLFFBQUEscUVBQXFELEVBSHJELENBQUE7QUFJQSxNQUFBLFlBQWMsTUFBTSxDQUFDLFVBQVAsQ0FBQSxDQUFtQixDQUFDLFNBQXBCLEVBQUEsZUFBaUMsUUFBakMsRUFBQSxLQUFBLEtBQWQ7QUFBQSxjQUFBLENBQUE7T0FKQTtBQUFBLE1BTUEsR0FBQSxHQUFPLHVCQUFBLEdBQXNCLE1BQU0sQ0FBQyxFQU5wQyxDQUFBO0FBQUEsTUFRQSxXQUFBLEdBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFmLENBQTBCLEdBQTFCLENBUmQsQ0FBQTtBQVNBLE1BQUEsSUFBRyxXQUFIO0FBQ0UsUUFBQSxXQUFXLENBQUMsV0FBWixDQUF3QixXQUFXLENBQUMsVUFBWixDQUF1QixHQUF2QixDQUF4QixDQUFBLENBQUE7QUFDQSxjQUFBLENBRkY7T0FUQTtBQUFBLE1BYUEsa0JBQUEsR0FBcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQUEsQ0FickIsQ0FBQTthQWNBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixHQUFwQixFQUF5QjtBQUFBLFFBQUEsS0FBQSxFQUFPLE9BQVA7QUFBQSxRQUFnQixjQUFBLEVBQWdCLElBQWhDO09BQXpCLENBQThELENBQUMsSUFBL0QsQ0FBb0UsU0FBQyxjQUFELEdBQUE7QUFDbEUsUUFBQSxJQUFHLGNBQUEsWUFBMEIsY0FBN0I7QUFDRSxVQUFBLGNBQWMsQ0FBQyxTQUFmLENBQUEsQ0FBQSxDQUFBO2lCQUNBLGtCQUFrQixDQUFDLFFBQW5CLENBQUEsRUFGRjtTQURrRTtNQUFBLENBQXBFLEVBZk07SUFBQSxDQXpCUjtHQU5GLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/svg-preview/lib/svg-preview.coffee