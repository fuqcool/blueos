ferret.module('blueos.app.GUIApplication', function (require, exports, module) {
  /** GUI application class
   *  @module blueos/app/GUIApplication
   *  @requires core/event
   *  @requires blueos/app
   */

  var event = require('core.event');
  var app = require('blueos.app');

  var template = '' +
    '<div class="dialog">' +
    '  <div class="dialog-head">' +
    '    <div class="dialog-headbar">' +
    '      <div class="dialog-title"></div>' +
    '      <div class="dialog-menu">' +
    '        <i class="glyphicon-minus glyphicon btn-minimize"></i>' +
    '        <i class="glyphicon-plus glyphicon btn-maximize"></i>' +
    '        <i class="glyphicon-remove glyphicon btn-close"></i>' +
    '      </div>' +
    '      <div class="clear"></div>' +
    '    </div>' +
    '  </div>' +
    '  <div class="dialog-body">' +
    '    <iframe frameborder="0" src="about:blank"></iframe>' +
    '    <div class="dialog-cover"></div>' +
    '  </div>' +
    '</div>';


  var activeIframe = null;
  $(window).blur(function () {
    if (activeIframe != null) {
      event.trigger('layer-tofront', activeIframe);
    }
  });

  /** Create a GUI application
   *  @constructor
   *  @alias module:blueos/app/GUIApplication
   */
  function GUIApplication(options) {
    this.url = options.url || '';
    this.title = options.title || '';
    this.name = options.name || '';
    this.height = options.height;
    this.width = options.width;
    this.options = options;
    this.resizable = (options.resizable == null) ? true : options.resizable;
    this.type = 'gui';
  }

  /** Init dialog
   *  @fires layer-tofront
   *  @fires layer-add
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.initDialog = function () {
    var that = this;

    // dialog element
    this.$dialog = $(template);
    // head element
    this.$head = this.$dialog.find('.dialog-head');
    // title element
    this.$title = this.$head.find('.dialog-title');
    // body element
    this.$body = this.$dialog.find('.dialog-body');

    // set dialog title
    this.$title.text(this.title);

    // track active iframe
    this.$dialog.mousedown(function () {
      event.trigger('layer-tofront', that.$dialog);
    }).mouseover(function () {
      activeIframe = that.$dialog;
    }).mouseout(function () {
      activeIframe = null;
    });

    // prevent event propagation when click on dialog buttons
    this.$head.find('.dialog-menu i').mousedown(function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    });

    // terminate app when close button is clicked
    this.$head.find('.btn-close').click(function (evt) {
      app.terminate(that.name);
      evt.preventDefault();
      evt.stopPropagation();
    });

    // minimize app when minimize button is clicked
    this.$head.find('.btn-minimize').click(function (evt) {
      that.savePosition();
      event.trigger('app-minimize', that);
      evt.preventDefault();
      evt.stopPropagation();
    });

    // maximize app when maximize button is clicked
    this.$head.on('click', '.btn-maximize', function (evt) {
      $(this).removeClass('btn-maximize').addClass('btn-restore');
      that.maximize();
      evt.preventDefault();
      evt.stopPropagation();
    });

    // restore app when restore button is clicked
    this.$head.on('click', '.btn-restore', function (evt) {
      $(this).addClass('btn-maximize').removeClass('btn-restore');
      that.restore();
      evt.preventDefault();
      evt.stopPropagation();
    });

    // set body content
    this.$body.find('iframe').prop('src', this.url);
    this.$title.css({
      'background-image': 'url(' + this.options.icon + ')'
    });

    this.$dialog.hide();

    // make dialog draggable
    this.$dialog.draggable({
      start: $.proxy(this.cover, this),
      stop: $.proxy(this.uncover, this),
      create: function () {
        $(this).css({ position: 'absolute' });
      }
    });

    // make dialog resizable if enabled
    if (this.resizable) {
      this.$dialog.resizable({
        resize: $.proxy(this.adjustHeight, this),
        start: $.proxy(this.cover, this),
        stop: $.proxy(this.uncover, this),
        minHeight: 200,
        minWidth: 200
      });
    } else {
      // if not resizable, hide maximize button
      this.$head.find('.btn-maximize').hide();
    }

    // add to desktop
    $('#wallpaper').append(this.$dialog);

    // bring to front when click inside iframe
    var frame = this.$dialog.find('iframe')[0].contentWindow;
    $(frame).blur(function () {
      event.trigger('layer-tofront', activeIframe);
    });

    // calculate width and height of dialog
    frame.onload = function () {
      that.$dialog.width(that.width || 400);
      that.$dialog.height((that.height || 400) + 29);
      that.$dialog.css('opacity', 0);
      that.$dialog.css(that.initPos());
      that.$dialog.show();
      that.adjustHeight();

      that.$dialog.animate({
        opacity: 1
      }, 250, function () {
        event.trigger('layer-add', that.$dialog);
      });
    };
  };

  /** Init position of dialog
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.initPos = function () {
    var $body = $('body');
    var pos = {
      left: $body.width() * 0.2,
      top: $body.height() * 0.2
    };

    return pos;
  };

  /** Show a white cover above the dialog element
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.cover = function () {
    this.$dialog.addClass('covered');
  };

  /** Remove the cover
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.uncover = function () {
    this.$dialog.removeClass('covered');
  };

  /** Run app, if already running, restore from dock
   *  @fires app-restore
   *  @fires layer-tofront
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.run = function () {
    if (this.$dialog) {
      if (this.$dialog.is(':hidden')) {
        event.trigger('app-restore', this);
      }
      event.trigger('layer-tofront', this.$dialog);

      return;
    }

    this.initDialog();
  };

  /** Adjust dialog height
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.adjustHeight = function () {
    var head = this.$head.outerHeight();
    var dialog = this.$dialog.height();

    this.$body.height(dialog - head);
    this.$body.find('iframe').height(dialog - head);
  };

  /** Terminate app
   *  @fires layer-remove
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.terminate = function () {
    var that = this;
    this.$dialog.animate({
      opacity: 0
    }, 200, 'swing', function () {
      event.trigger('layer-remove', that.$dialog);
      that.$dialog.remove();
    });
  };

  /** Hide app
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.hide = function () {
    this.$dialog.hide();
  };

  /** Show app
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.show = function () {
    this.$dialog.show();
  };

  /** Maximize app, and remember the dimensions before maximization
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.maximize = function () {
    var $dock = $('#dock');

    var top = 0;
    var left = $dock.outerWidth();
    var contentWidth = $(document).width() - $dock.outerWidth() - 2;
    var contentHeight = $(document).height() - 2;

    this.savePosition();

    var that = this;
    this.$dialog.addClass('maximize')
      .animate({
        top: top,
        left: left,
        width: contentWidth,
        height: contentHeight
      }, 200, function () {
        that.adjustHeight();
        that.disable();
      });
  };

  /** Save current dialog dimension and position
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.savePosition = function () {
    this.height = this.$dialog.height();
    this.width = this.$dialog.width();
    this.top = this.$dialog.position().top;
    this.left = this.$dialog.position().left;
  };

  /** Restore app from maximize
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.restore = function () {
    var that = this;
    this.$dialog.removeClass('maximize')
      .animate({
        top: this.top,
        left: this.left,
        width: this.width,
        height: this.height
      }, 300, function () {
        that.adjustHeight();
        that.enable();
      });
  };

  /** Disable dragging and resizing
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.disable = function () {
    this.$dialog.draggable('disable');
    this.$dialog.resizable('disable');
    this.$dialog.css('opacity', '1');
  };

  /** Enable dragging and resizing
   *  @memberof module:blueos/app/GUIApplication
   */
  GUIApplication.prototype.enable = function () {
    this.$dialog.draggable('enable');
    this.$dialog.resizable('enable');
  };

  module.exports = GUIApplication;
});
