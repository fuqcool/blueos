ferret.module('main', function (require, exports, module) {
  module.exports = function () {
    window.id = 'blueos';

    var config = require('blueos.rest.config');
    var wallpaper = require('blueos.wallpaper');

    config.get('wallpaper', function (url) {
      wallpaper.set(url);
    });
  };
});

ferret.use([
  'main',
  'blueos.dock',
  'blueos.status',
  'blueos.ajaxstatus',
  'blueos.effect.layer'
], function (main) {
  main();
});
