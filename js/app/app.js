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

  // global drag
  var dragging = false;
  var element;
  var x, y;

  document.body.onmousedown = function (evt) {
    var dialogs = $(evt.target).parents('.dialog');
    if (dialogs.length) {
      dialogs.addClass('dragging');
      element = dialogs[0];
      dragging = true;
      x = evt.clientX;
      y = evt.clientY;
    }
  };

  document.body.onmouseup = function () {
    $(element).removeClass('dragging');
    dragging = false;
  };

  document.body.onmousemove = function (evt) {
    if (dragging) {
      element.style.left = ((parseInt(element.style.left) || 0) + evt.clientX - x) + 'px',
      element.style.top = ((parseInt(element.style.top) || 0) + evt.clientY - y) + 'px'

      x = evt.clientX;
      y = evt.clientY;

      evt.preventDefault();
      evt.stopPropagation();
    }
  };

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
  }

  GUIApplication.prototype.initDialog = function () {
    var that = this;

    this._dialog = $(template);

    this._dialog.find('.dialog-title').text(this.title);

    this._dialog.find('.dialog-menu').html(
      '<button class="btn-minimize">-</button>' +
        '<button class="btn-maximize">[]</button>' +
        '<button class="btn-close">X</button>'
    );
    this._dialog.find('.dialog-content').html(
      '<iframe class="app-iframe" width="100%" height="100%" frameborder="0" src="' + this.url + '"></iframe>');
    this._dialog.find('.dialog-title').css({
      'background-image': 'url(' + this.options.name + '/' + this.options.icon + ')',
      left: 25
    });
    this._dialog.hide();

    $('#wallpaper').append(this._dialog);

    var frame = this._dialog.find('iframe')[0].contentWindow;
    frame.onload = function () {
      that._dialog.find('.dialog-body').css({
        height: $(frame.document.body).innerHeight(),
        width: $(frame.document).innerWidth()
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
