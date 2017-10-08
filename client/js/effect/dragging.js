ferret.module('blueos.effect.dragging', function (require, exports, module) {
  var event = require('core.event');

  var dragging = false;
  var element;
  var x, y;

  event.listen('drag-start', function (target, mouseX, mouseY) {
    element = target;
    dragging = true;
    x = mouseX;
    y = mouseY;
  });

  event.listen('drag-stop', function () {
    dragging = false;
  });

  $('body').mousemove(function (evt) {
    if (dragging) {
      var pos = $(element).position();
      $(element).css({
        left: pos.left + evt.clientX - x,
        top: pos.top + evt.clientY - y
      });

      x = evt.clientX;
      y = evt.clientY;

      evt.preventDefault();
      evt.stopPropagation();
    }
  });
});
