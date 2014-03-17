ferret.module('blueos.effect.layer', function (exports, require, module) {
  var event = require('core.event');

  var layers = [];
  var BASE = 100;
  var MAX = 200;

  function add(el) {
    layers.push($(el).get(0));
    updateIndex();
  }

  function remove(el) {
    layers = $.grep(layers, function (l) {
      return l !== $(el).get(0);
    });
    updateIndex();
  }

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

  function updateIndex() {
    var counter = 0;
    ferret.forEach(layers, function (l) {
      $(l).css({ "z-index": BASE + counter });
      counter++;
    });
  }

  event.listen('layer-add', add);
  event.listen('layer-remove', remove);
  event.listen('layer-tofront', tofront);
});
