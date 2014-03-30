ferret.module('blueos.api.wallpaper', function (require, exports, module) {
    var $wallpaper = $('#wallpaper');

    function setBackground(imgUrl) {
      $wallpaper.css('background-image', 'url(' + imgUrl + ')');
    }

    module.exports = {
        setBackground: setBackground
    };
});
