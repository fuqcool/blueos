ferret.module('blueos.app', function (exports, require, module) {
  var event = require('core.event');
  var appRest = require('blueos.rest.app');
  var GUIApplication = require('blueos.app.GUIApplication');

  var appCache = {};

  function run(name, options) {
    if (appCache[name]) {
      appCache[name].run();
      return;
    }

    appRest.get(name, function (options) {
      var app = makeApp(options);

      try {
        app.run();
        console.log('app run:', name);
        appCache[name] = app;
        event.trigger('app-run', app);
      } catch (e) {
        console.log('app failed to run:', name);
      }
    });
  }

  function terminate(name) {
    var app = appCache[name];
    app.terminate();
    event.trigger('app-terminate', app);
    console.log('app terminate:', name);

    delete appCache[name];
  }

  function makeApp(options) {
    var app;

    if (options.type && options.type.toLowerCase() === 'service') {
      // launch service
    } else {
      // launch GUI
      return new GUIApplication(options);
    }
  }

  exports.run = run;
  exports.terminate = terminate;
});

ferret.module('blueos.app.GUIApplication', function (exports, require, module) {
  var event = require('core.event');

  var template = '' +
    '<div class="dialog">' +
    '  <div class="dialog-head">' +
    '    <div class="dialog-headbar">' +
    '      <div class="dialog-title"></div>' +
    '      <div class="dialog-menu"></div>' +
    '      <div class="clear"></div>' +
    '    </div>' +
    '  </div>' +
    '  <div class="dialog-body">' +
    '    <div class="dialog-content"></div>' +
    '    <div class="dialog-cover"></div>' +
    '  </div>' +
    '</div>';

  var app = require('blueos.app');

  function GUIApplication(options) {
    this.url = options.url || '';
    this.title = options.title || '';
    this.name = options.name || '';
    this.height = options.height;
    this.width = options.width;
    this.options = options;
    this.type = 'gui';
  }

  GUIApplication.prototype.initDialog = function () {
    var that = this;

    this._dialog = $(template);

    this._dialog.mousedown(function (evt) {
      if (evt.which === 1) {
        event.trigger('drag-start', that._dialog, evt.clientX, evt.clientY);
        event.trigger('layer-tofront', that._dialog);
        that._dialog.addClass('dragging active');
      }
    }).mouseup(function () {
      event.trigger('drag-stop');
      that._dialog.removeClass('dragging');
    });

    this._dialog.find('.dialog-title').text(this.title);

    this._dialog.find('.dialog-menu').html(
      '<i class="glyphicon-minus glyphicon btn-minimize"></i>' +
        '<i class="glyphicon-plus glyphicon btn-maximize"></i>' +
        '<i class="glyphicon-remove glyphicon btn-close"></i>'
    ).mousedown(function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    });

    this._dialog.find('.btn-close').click(function (evt) {
      app.terminate(that.name);
      evt.preventDefault();
      evt.stopPropagation();
    });

    this._dialog.find('.btn-minimize').click(function (evt) {
      that.hide();
      evt.preventDefault();
      evt.stopPropagation();
    });

    this._dialog.on('click', '.btn-maximize', function (evt) {
      $(this).removeClass('btn-maximize').addClass('btn-restore');
      that.maximize();
      evt.preventDefault();
      evt.stopPropagation();
    });

    this._dialog.on('click', '.btn-restore', function (evt) {
      $(this).addClass('btn-maximize').removeClass('btn-restore');
      that.restore();
      evt.preventDefault();
      evt.stopPropagation();
    });

    this._dialog.find('.dialog-content').html(
      '<iframe class="app-iframe" frameborder="0" src="' + this.url + '"></iframe>');
    this._dialog.find('.dialog-title').css({
      'background-image': 'url(' + this.options.name + '/' + this.options.icon + ')'
    });

    this._dialog.hide();
    event.trigger('layer-add', this._dialog);

    $('#wallpaper').append(this._dialog);

    var frame = this._dialog.find('iframe')[0].contentWindow;
    frame.onload = function () {
      that._dialog.find('.dialog-body').css({
        height: $(frame.document).height(),
        width: $(frame.document).width()
      });
      that._dialog.show();
    };
  };

  GUIApplication.prototype.run = function () {
    if (this._dialog) {
      this.show();
      return;
    }

    this.initDialog();
  };

  GUIApplication.prototype.terminate = function () {
    var that = this;
    this._dialog.animate({
      opacity: 0
    }, 200, 'swing', function () {
      event.trigger('layer-add', that._dialog.get(0));
      that._dialog.remove();
    });
  };

  GUIApplication.prototype.hide = function () {
    this._dialog.hide();
  };

  GUIApplication.prototype.show = function () {
    this._dialog.show();
  };

  GUIApplication.prototype.maximize = function () {
    var $dock = $('#dock');

    var top = 0;
    var left = $dock.outerWidth();
    var contentWidth = $(document).width() - $dock.outerWidth() - 3;
    var contentHeight = $(document).height() - 2;

    this.height = this._dialog.height();
    this.width = this._dialog.width();
    this.top = this._dialog.position().top;
    this.left = this._dialog.position().left;

    this._dialog.addClass('maximize')
      .animate({
        top: top,
        left: left,
        width: contentWidth,
        height: contentHeight
      }, 200);
  };

  GUIApplication.prototype.restore = function () {
    this._dialog.removeClass('maximize')
      .animate({
        top: this.top,
        left: this.left,
        width: this.width,
        height: this.height
      }, 300);
  };

  module.exports = GUIApplication;
});
