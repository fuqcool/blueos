ferret.module('main', function (exports, require, module) {

  function main() {
    window.id = 'blueos';
    var api = require('blueos.api');
    var app = require('blueos.app');

    // set default wallpaper
    api.wallpaper.setBackground('wallpaper/images/maple.jpg');

    $('#launch').click(function () {
      var $el = $(this);
      app.run($el.attr('app-name').trim());
    });
  }

  module.exports = main;
});

ferret.use(['main'], function (main) {
  main();
});
