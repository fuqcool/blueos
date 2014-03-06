ferret.module('main', function (exports, require, module) {
  module.exports = function () {
    window.id = 'blueos';
    var api = require('blueos.api');

    // set default wallpaper
    api.wallpaper.setBackground('wallpaper/images/maple.jpg');
  };
});

ferret.use(['main', 'blueos.dock', 'blueos.effect.dragging'], function (main) {
  main();
});
