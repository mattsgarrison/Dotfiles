(function() {
  var RubyMotionAutocompleteView, Snippet, Snippets, _;

  _ = require('underscore-plus');

  RubyMotionAutocompleteView = require('./rubymotion-autocomplete-view');

  Snippet = require(atom.packages.resolvePackagePath('snippets') + '/lib/snippet');

  Snippets = require(atom.packages.resolvePackagePath('snippets') + '/lib/snippets');

  module.exports = {
    autocompleteViews: [],
    editorSubscription: null,
    snippetPrefixes: [],
    activate: function(state) {
      this.editorSubscription = atom.workspaceView.eachEditorView((function(_this) {
        return function(editor) {
          var autocompleteView;
          if (editor.attached && !editor.mini) {
            autocompleteView = new RubyMotionAutocompleteView(editor);
            autocompleteView.snippetPrefixes = _this.snippetPrefixes;
            editor.on('editor:will-be-removed', function() {
              if (!autocompleteView.hasParent()) {
                autocompleteView.remove();
              }
              return _.remove(_this.autocompleteViews, autocompleteView);
            });
            return _this.autocompleteViews.push(autocompleteView);
          }
        };
      })(this));
      return this.collectSnippets((function(_this) {
        return function(prefixes) {
          _this.snippetPrefixes = prefixes;
          return _this.autocompleteViews.forEach(function(v) {
            return v.snippetPrefixes = _this.snippetPrefixes;
          });
        };
      })(this));
    },
    collectSnippets: function(callback) {
      var path;
      path = atom.packages.resolvePackagePath('RubyMotion') + '/snippets/cocoatouch';
      return Snippets.loadSnippetsDirectory(path, function() {
        var item, k, keys, snippets, _i, _j, _len, _len1, _ref;
        snippets = atom.syntax.propertiesForScope([".source.rubymotion"], "snippets");
        keys = [];
        for (_i = 0, _len = snippets.length; _i < _len; _i++) {
          item = snippets[_i];
          _ref = _.keys(item.snippets);
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            k = _ref[_j];
            keys.push(k);
          }
        }
        keys = keys.sort(function(word1, word2) {
          return word1.toLowerCase().localeCompare(word2.toLowerCase());
        });
        return callback(keys);
      });
    },
    deactivate: function() {
      var _ref;
      if ((_ref = this.editorSubscription) != null) {
        _ref.off();
      }
      this.editorSubscription = null;
      this.autocompleteViews.forEach(function(autocompleteView) {
        return autocompleteView.remove();
      });
      return this.autocompleteViews = [];
    },
    serialize: function() {}
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdEQUFBOztBQUFBLEVBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUFKLENBQUE7O0FBQUEsRUFDQSwwQkFBQSxHQUE2QixPQUFBLENBQVEsZ0NBQVIsQ0FEN0IsQ0FBQTs7QUFBQSxFQUVBLE9BQUEsR0FBVSxPQUFBLENBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBZCxDQUFpQyxVQUFqQyxDQUFBLEdBQStDLGNBQXZELENBRlYsQ0FBQTs7QUFBQSxFQUdBLFFBQUEsR0FBVyxPQUFBLENBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBZCxDQUFpQyxVQUFqQyxDQUFBLEdBQStDLGVBQXZELENBSFgsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGlCQUFBLEVBQW1CLEVBQW5CO0FBQUEsSUFDQSxrQkFBQSxFQUFvQixJQURwQjtBQUFBLElBRUEsZUFBQSxFQUFpQixFQUZqQjtBQUFBLElBSUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsa0JBQUQsR0FBc0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFuQixDQUFrQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxNQUFELEdBQUE7QUFDdEQsY0FBQSxnQkFBQTtBQUFBLFVBQUEsSUFBRyxNQUFNLENBQUMsUUFBUCxJQUFvQixDQUFBLE1BQVUsQ0FBQyxJQUFsQztBQUNFLFlBQUEsZ0JBQUEsR0FBdUIsSUFBQSwwQkFBQSxDQUEyQixNQUEzQixDQUF2QixDQUFBO0FBQUEsWUFDQSxnQkFBZ0IsQ0FBQyxlQUFqQixHQUFtQyxLQUFDLENBQUEsZUFEcEMsQ0FBQTtBQUFBLFlBRUEsTUFBTSxDQUFDLEVBQVAsQ0FBVSx3QkFBVixFQUFvQyxT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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/RubyMotion/lib/rubymotion.coffee