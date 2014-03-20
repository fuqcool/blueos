blueos.module('desktopPopup', function (require, exports, module) {
  var Application = require('Application');

  function run() {
    var menu = $('#desktopPopup').menu();

    $('#wallpaper').bind('contextmenu', function (evt) {
      evt.preventDefault();

      if (evt.which === 3) {
        menu.show();
      }

      menu.css({
        left: evt.pageX,
        top: evt.pageY
      });
    }).bind('click', function (evt) {
      if (evt.which === 1) {
        menu.hide();
      }
    });

    menu.find('.change-background', function (evt) {
      evt.preventDefault();
    });

  }

  module.exports = new Application({ run: run });
});
