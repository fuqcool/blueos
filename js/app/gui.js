ferret.module('blueos.app.GUIApplication', function (require, exports, module) {
  var event = require('core.event');

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
    '    <iframe scrolling="no" frameborder="0" src="about:blank"></iframe>' +
    '    <div class="dialog-cover"></div>' +
    '  </div>' +
    '</div>';

  var app = require('blueos.app');

  var activeIframe = null;
  $(window).blur(function () {
    if (activeIframe != null) {
      event.trigger('layer-tofront', activeIframe);
    }
  });

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

    this.$dialog = $(template);
    this.$head = this.$dialog.find('.dialog-head');
    this.$title = this.$head.find('.dialog-title');
    this.$body = this.$dialog.find('.dialog-body');

    this.$title.text(this.title);

    this.$dialog.mousedown(function () {
      event.trigger('layer-tofront', that.$dialog);
    }).mouseover(function () {
      activeIframe = that.$dialog;
    }).mouseout(function () {
      activeIframe = null;
    });

    this.$head.find('.dialog-menu i').mousedown(function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    });

    this.$head.find('.btn-close').click(function (evt) {
      app.terminate(that.name);
      evt.preventDefault();
      evt.stopPropagation();
    });

    this.$head.find('.btn-minimize').click(function (evt) {
      event.trigger('app-minimize', that);
      evt.preventDefault();
      evt.stopPropagation();
    });

    this.$head.on('click', '.btn-maximize', function (evt) {
      $(this).removeClass('btn-maximize').addClass('btn-restore');
      that.maximize();
      evt.preventDefault();
      evt.stopPropagation();
    });

    this.$head.on('click', '.btn-restore', function (evt) {
      $(this).addClass('btn-maximize').removeClass('btn-restore');
      that.restore();
      evt.preventDefault();
      evt.stopPropagation();
    });

    this.$body.find('iframe').prop('src', this.url);
    this.$title.css({
      'background-image': 'url(' + this.options.name + '/' + this.options.icon + ')'
    });

    this.$dialog.hide();
    this.$dialog.draggable({
      start: $.proxy(this.cover, this),
      stop: $.proxy(this.uncover, this),
      create: function () {
        $(this).css({ position: 'absolute' });
      }
    });
    this.$dialog.resizable({
      resize: $.proxy(this.adjustHeight, this),
      start: $.proxy(this.cover, this),
      stop: $.proxy(this.uncover, this),
      minHeight: 200,
      minWidth: 200
    });

    $('#wallpaper').append(this.$dialog);

    var frame = this.$dialog.find('iframe')[0].contentWindow;
    $(frame).blur(function () {
      event.trigger('layer-tofront', activeIframe);
    });

    frame.onload = function () {
      that.$dialog.width(400);
      that.$dialog.height(400);
      that.$dialog.css(that.initPos());
      that.show();
      event.trigger('layer-add', that.$dialog);
      that.adjustHeight();
    };
  };

  GUIApplication.prototype.initPos = function () {
    var $body = $('body');
    var pos = {
      left: $body.width() * 0.2,
      top: $body.height() * 0.2
    };

    return pos;
  };

  GUIApplication.prototype.cover = function () {
    this.$dialog.addClass('covered');
  };

  GUIApplication.prototype.uncover = function () {
    this.$dialog.removeClass('covered');
  };

  GUIApplication.prototype.run = function () {
    if (this.$dialog) {
      this.show();
      return;
    }

    this.initDialog();
  };

  GUIApplication.prototype.adjustHeight = function () {
    var head = this.$head.outerHeight();
    var dialog = this.$dialog.height();

    this.$body.height(dialog - head);
    this.$body.find('iframe').height(dialog - head);
  };

  GUIApplication.prototype.terminate = function () {
    var that = this;
    this.$dialog.animate({
      opacity: 0
    }, 200, 'swing', function () {
      event.trigger('layer-remove', that.$dialog);
      that.$dialog.remove();
    });
  };

  GUIApplication.prototype.hide = function () {
    this.$dialog.hide();
  };

  GUIApplication.prototype.show = function () {
    this.$dialog.show();
  };

  GUIApplication.prototype.maximize = function () {
    var $dock = $('#dock');

    var top = 0;
    var left = $dock.outerWidth();
    var contentWidth = $(document).width() - $dock.outerWidth() - 2;
    var contentHeight = $(document).height() - 2;

    this.height = this.$dialog.height();
    this.width = this.$dialog.width();
    this.top = this.$dialog.position().top;
    this.left = this.$dialog.position().left;

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

  GUIApplication.prototype.disable = function () {
    this.$dialog.draggable('disable');
    this.$dialog.resizable('disable');
    this.$dialog.css('opacity', '1');
  };

  GUIApplication.prototype.enable = function () {
    this.$dialog.draggable('enable');
    this.$dialog.resizable('enable');
  };

  module.exports = GUIApplication;
});
