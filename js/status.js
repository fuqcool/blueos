ferret.module('blueos.status', function (require, exports, module) {
  var DURATION = 200;

  var $status = $('<div class="sys-status"></div>');

  function show() {
    $('body').append($status);
    $status.show();

    var width = $status.width();
    var height = $status.height();
    var screenWidth = $(document).width();

    var left = (screenWidth - width) / 2
    $status.css({
      left: left,
      top: -height,
      opacity: 0
    });

    $status.animate({
      top: 0,
      opacity: 1
    }, DURATION);
  }

  function hide() {
    var height = $status.height();

    setTimeout(function () {
      $status.animate({
        top: -height,
        opacity: 0
      }, DURATION, function () {
        remove();
      });
    }, 300);
  }

  function remove() {
    $status.remove();
  }

  function setText(txt) {
    $status.text(txt);
  }

  function getText(txt) {
    return $status.text();
  }

  module.exports = {
    show: show,
    hide: hide,
    setText: setText,
    getText: getText
  };
});
