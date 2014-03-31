ferret.module('blueos.wallpaper', function (require, exports, module) {
  var file = require('blueos.rest.file');
  var config = require('blueos.rest.config');

  var $wallpaper = $('#wallpaper');

  function setBackground(imgUrl) {
    $wallpaper.css('background-image', 'url(' + imgUrl + ')');
  }

  function getBackground(imgUrl) {
    return $wallpaper.css('background-image').slice(4, -1);
  }

  function save(imgUrl) {
    config.update({ wallpaper: imgUrl });
  }

  function getAll(cb) {
    file.query({}, function (files) {
      var imgs = [];
      $.each(files, function (i, f) {
        if (f.extension === '.jpg') {
          imgs.push(f);
        }
      });

      cb(imgs);
    });
  }

  module.exports = {
    set: setBackground,
    get: getBackground,
    save: save,
    getAll: getAll
  };
});
