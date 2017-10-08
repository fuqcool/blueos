ferret.module('blueos.status', function (require, exports, module) {
  /** A component that is placed on top-center of the browser to show
   *  the status of the system
   *  @module blueos/status
   */
  var DURATION = 200;

  var $status = $('<div class="sys-status"></div>');

  /** Add status widget to document and show */
  exports.show = function () {
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

    // effect: slide down
    $status.animate({
      top: 0,
      opacity: 1
    }, DURATION);
  };

  /** Hide status widget */
  exports.hide = function () {
    var height = $status.height();

    setTimeout(function () {
      $status.animate({
        top: -height,
        opacity: 0
      }, DURATION, function () {
        remove();
      });
    }, 300);
  };

  /** Remove the status widget from document */
  function remove() {
    $status.remove();
  }

  /** Set the text of status to be showed
   *  @param {string} text - The text to be displayed
   */
  exports.setText = function (txt) {
    $status.text(txt);
  };

  /** Get the text of the status
   *  @returns {string}
   */
  exports.getText = function () {
    return $status.text();
  };

});
