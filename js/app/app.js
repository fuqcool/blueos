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
  var template = '' +
    '<div class="dialog">' +
    '  <div class="dialog-head">' +
    '    <div class="dialog-headbar">' +
    '      <div class="dialog-title"></div>' +
    '      <div class="dialog-menu"></div>' +
    '      <div class="clear"></div>' +
    '    </div>' +
    '  </div>' +
    '  <div class="dialog-content"></content>' +
    '</div>';

  var app = require('blueos.app');

  // GUI app
  // var template = '<div class="dialog"></div>';

  function GUIApplication(options) {
    this.url = options.url || '';
    this.title = options.title || '';
    this.name = options.name || '';
    this.height = options.height;
    this.width = options.width;
    this.options = options;
  }

  GUIApplication.prototype.initDialog = function () {
    var that = this;

    this._dialog = $(template);

    this._dialog.find('.dialog-title').text(this.title);
    this._dialog.css({
      height: this.height,
      width: this.width
    });
    this._dialog.find('.dialog-menu').html(
      '<button class="btn-minimize">-</button>' +
        '<button class="btn-maximize">[]</button>' +
        '<button class="btn-close">X</button>'
    );
    this._dialog.find('.dialog-content').html(
      '<embed class="app-iframe" width="100%" height="100%" frameborder="0" src="' + this.url + '"></embed>');
    this._dialog.find('.dialog-title').css({
      'background-image': 'url(' + this.options.name + '/' + this.options.icon + ')',
      left: 25
    });
    this._dialog.draggable().resizable();


    $('#wallpaper').append(this._dialog);
  };

  GUIApplication.prototype.run = function () {
    if (this._dialog) {
      this.show();
      return;
    }

    this.initDialog();
    // $titlebar.find('.btn-close').click(function () {
    //   app.terminate(that.name);
    // });

    // $titlebar.find('.btn-minimize').click(function () {
    //   that.hide();
    // });

    // $titlebar.on('click', '.btn-maximize', function () {
    //   $(this).removeClass('btn-maximize').addClass('btn-restore');
    //   that.maximize();
    // });

    // $titlebar.on('click', '.btn-restore', function () {
    //   $(this).addClass('btn-maximize').removeClass('btn-restore');
    //   that.restore();
    // });
  };

  // GUIApplication.prototype.terminate = function () {
  //   this._dialog.dialog('destroy').remove();
  // };

  // GUIApplication.prototype.hide = function () {
  //   this._dialog.parent().hide();
  // };

  // GUIApplication.prototype.show = function () {
  //   this._dialog.parent().show();
  // };

  // GUIApplication.prototype.maximize = function () {
  //   var $dock = $('#dock');

  //   var top = 0;
  //   var left = $dock.width() + 2;
  //   var contentWidth = $(document).width() - $dock.width() - 2;
  //   var contentHeight = $(document).height();

  //   this.height = this._dialog.dialog('option', 'height');
  //   this.width = this._dialog.dialog('option', 'width');
  //   this.top = this._dialog.parent().css('top');
  //   this.left = this._dialog.parent().css('left');

  //   this._dialog.parent().addClass('maximize')
  //     .css({
  //       top: top,
  //       left: left,
  //       width: contentWidth,
  //       height: contentHeight
  //     });
  // };

  // GUIApplication.prototype.restore = function () {
  //   this._dialog.parent().removeClass('maximize')
  //     .css({
  //       top: this.top,
  //       left: this.left,
  //       width: this.width,
  //       height: this.height
  //     });
  // };

  module.exports = GUIApplication;
});
