ferret.module('blueos.effect.layer', function (require, exports, module) {
  /** Layer management module
   *  @module blueos/effect/layer
   *  @requires core/event
   */

  var event = require('core.event');

  var layers = [];
  var BASE = 100;
  var MAX = 200;

  /** add an element to layer manager
   *  @param {Element} - a DOM element to be managed
   *  @memberof module:blueos/effect/layer
   */
  function add(el) {
    layers.push($(el).get(0));
    updateIndex();
  }

  /** remove the element from the layer manager
   *  @param {Element} - the element to be removed
   *  @memberof module:blueos/effect/layer
   */
  function remove(el) {
    layers = $.grep(layers, function (l) {
      return l !== $(el).get(0);
    });
    updateIndex();
  }

  /** bring the given element to front
   *  @param {Element} - the element to be brought to front
   *  @memberof module:blueos/effect/layer
   */
  function tofront(el) {
    var q = [];
    var target;

    while (layers.length) {
      var l = layers.pop();

      if (l === $(el).get(0)) {
        target = l;
        break;
      }
      q.unshift(l);
    }

    layers = layers.concat(q);
    layers.push(target);
    updateIndex();
  }

  /** refresh indexes of all layers
   *  @memberof module:blueos/effect/layer
   */
  function updateIndex() {
    var counter = 0;
    ferret.forEach(layers, function (layer, i) {
      $(layer).css({ "z-index": BASE + counter });
      if (i === layers.length - 1) {
        $(layer).addClass('front');
      } else {
        $(layer).removeClass('front');
      }

      counter++;
    });
  }

  event.listen('layer-add', add);
  event.listen('layer-remove', remove);
  event.listen('layer-tofront', tofront);
});
