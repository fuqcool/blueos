ferret.module('blueos.wallpaper', function (require, exports, module) {
  /** Wallpaper module, provide apis to manage the wallpaper.
   *  @module blueos/wallpaper
   *  @requires blueos/rest/file
   *  @requires blueos/rest/config
   */

  var file = require('blueos.rest.file');
  var config = require('blueos.rest.config');

  var $wallpaper = $('#wallpaper');

  /** Set wallpaper
   *  @param {string} - the url of the wallpaper
   */
  exports.set = function (imgUrl) {
    $wallpaper.css('background-image', 'url(' + imgUrl + ')');
  }

  /** Get the url of current wallpaper
   *  @returns {string}
   */
  exports.get = function () {
    return $wallpaper.css('background-image').slice(4, -1);
  }

  /** Save wallpaper preference to backend server
   *  @param {string} - the url of the wallpaper
   */
  exports.save = function (imgUrl) {
    config.update({ wallpaper: imgUrl });
  }

  /** Get all the images with extension `.jpg`
   *  @param {function} - Callback with a list of files as arguments
   */
  exports.getAll = function (cb) {
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
});
