blueos.module('blueos.api.wallpaper', function (exports, require, module) {
    var $wallpaper = $('#wallpaper');

    function setBackground(imgUrl) {
        $wallpaper.css('background-image', 'url(' + imgUrl + ')');
    }

    module.exports = {
        setBackground: setBackground
    };
});