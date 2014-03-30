ferret.module('main', function (require, exports, module) {
  module.exports = function () {
    window.id = 'blueos';
    var api = require('blueos.api');

    // set default wallpaper
    api.wallpaper.setBackground('apps/wallpaper/images/maple.jpg');
  };
});

ferret.use([
  'main',
  'blueos.dock',
  'blueos.effect.layer'
], function (main) {
  main();
});
