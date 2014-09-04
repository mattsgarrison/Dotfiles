(function() {
  var Convert, ResizeHandle, RubyTestView, TestRunner, View, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('underscore-plus');

  View = require('atom').View;

  TestRunner = require('./test-runner');

  ResizeHandle = require('./resize-handle');

  Convert = require('ansi-to-html');

  module.exports = RubyTestView = (function(_super) {
    __extends(RubyTestView, _super);

    function RubyTestView() {
      this.write = __bind(this.write, this);
      this.onTestRunEnd = __bind(this.onTestRunEnd, this);
      this.setTestInfo = __bind(this.setTestInfo, this);
      return RubyTestView.__super__.constructor.apply(this, arguments);
    }

    RubyTestView.content = function() {
      return this.div({
        "class": "ruby-test inset-panel panel-bottom"
      }, (function(_this) {
        return function() {
          _this.div({
            "class": "ruby-test-resize-handle"
          });
          _this.div({
            "class": "panel-heading"
          }, function() {
            _this.span('Running tests: ');
            return _this.span({
              outlet: 'header'
            });
          });
          return _this.div({
            "class": "panel-body"
          }, function() {
            _this.div({
              "class": 'ruby-test-spinner'
            }, 'Starting...');
            return _this.pre("", {
              outlet: 'results'
            });
          });
        };
      })(this));
    };

    RubyTestView.prototype.initialize = function(serializeState) {
      atom.workspaceView.command("ruby-test:toggle", (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
      atom.workspaceView.command("ruby-test:test-file", (function(_this) {
        return function() {
          return _this.testFile();
        };
      })(this));
      atom.workspaceView.command("ruby-test:test-single", (function(_this) {
        return function() {
          return _this.testSingle();
        };
      })(this));
      atom.workspaceView.command("ruby-test:test-previous", (function(_this) {
        return function() {
          return _this.testPrevious();
        };
      })(this));
      atom.workspaceView.command("ruby-test:test-all", (function(_this) {
        return function() {
          return _this.testAll();
        };
      })(this));
      return new ResizeHandle(this);
    };

    RubyTestView.prototype.serialize = function() {};

    RubyTestView.prototype.destroy = function() {
      this.output = '';
      return this.detach();
    };

    RubyTestView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.detach();
      } else {
        this.showPanel();
        if (!this.runner) {
          this.spinner.hide();
          return this.setTestInfo("No tests running");
        }
      }
    };

    RubyTestView.prototype.testFile = function() {
      return this.runTest();
    };

    RubyTestView.prototype.testSingle = function() {
      return this.runTest({
        testScope: "single"
      });
    };

    RubyTestView.prototype.testAll = function() {
      return this.runTest({
        testScope: "all"
      });
    };

    RubyTestView.prototype.testPrevious = function() {
      if (!this.runner) {
        return;
      }
      this.newTestView();
      return this.runner.run();
    };

    RubyTestView.prototype.runTest = function(overrideParams) {
      var params;
      this.newTestView();
      params = _.extend({}, this.testRunnerParams(), overrideParams || {});
      this.runner = new TestRunner(params);
      this.runner.run();
      return this.spinner.show();
    };

    RubyTestView.prototype.newTestView = function() {
      this.output = '';
      this.flush();
      return this.showPanel();
    };

    RubyTestView.prototype.testRunnerParams = function() {
      return {
        write: this.write,
        exit: this.onTestRunEnd,
        setTestInfo: this.setTestInfo
      };
    };

    RubyTestView.prototype.setTestInfo = function(infoStr) {
      return this.header.text(infoStr);
    };

    RubyTestView.prototype.onTestRunEnd = function() {
      return null;
    };

    RubyTestView.prototype.showPanel = function() {
      if (!this.hasParent()) {
        atom.workspaceView.prependToBottom(this);
        return this.spinner = this.find('.ruby-test-spinner');
      }
    };

    RubyTestView.prototype.write = function(str) {
      var convert, converted;
      if (this.spinner) {
        this.spinner.hide();
      }
      this.output || (this.output = '');
      convert = new Convert({
        escapeXML: true
      });
      converted = convert.toHtml(str);
      this.output += converted;
      return this.flush();
    };

    RubyTestView.prototype.flush = function() {
      this.results.html(this.output);
      return this.results.parent().scrollTop(this.results.innerHeight());
    };

    return RubyTestView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdEQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUFKLENBQUE7O0FBQUEsRUFDQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFERCxDQUFBOztBQUFBLEVBRUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBRmIsQ0FBQTs7QUFBQSxFQUdBLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FIZixDQUFBOztBQUFBLEVBSUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxjQUFSLENBSlYsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixtQ0FBQSxDQUFBOzs7Ozs7O0tBQUE7O0FBQUEsSUFBQSxZQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxvQ0FBUDtPQUFMLEVBQWtELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDaEQsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8seUJBQVA7V0FBTCxDQUFBLENBQUE7QUFBQSxVQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxlQUFQO1dBQUwsRUFBNkIsU0FBQSxHQUFBO0FBQzNCLFlBQUEsS0FBQyxDQUFBLElBQUQsQ0FBTSxpQkFBTixDQUFBLENBQUE7bUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLGNBQUEsTUFBQSxFQUFRLFFBQVI7YUFBTixFQUYyQjtVQUFBLENBQTdCLENBREEsQ0FBQTtpQkFJQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sWUFBUDtX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
//# sourceURL=/Users/mattgarrison/Dotfiles/atom/packages/ruby-test/lib/ruby-test-view.coffee