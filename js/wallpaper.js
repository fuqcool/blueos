blueos.module('wallpaperSetting', function (exports, require, module) {
  var FormApplication = require('FormApplication');

  var template = '<ul>' +
    '<li><a href="#" class="white-wallpaper">White</a></li>' +
    '</ul>';


  module.exports = new FormApplication({
    html: template,
    title: 'Wallpaper Setting',
    init: function (form) {
      debugger;
    }
  });
});
