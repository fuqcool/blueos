ferret.module('main', function (exports, require, module) {
    window.id = 'blueos';

    function main() {
        var api = require('blueos.api');

        // set default wallpaper
        api.wallpaper.setBackground('wallpaper/images/maple.jpg');

        $('#launch').click(function () {
            api.application.run({
                title: 'Wallpaper Settings',
                url: 'wallpaper/wallpaper.html',
                name: 'wallper-setting',
                height: 600,
                width: 800
            });
        });
    }

    module.exports = main;
});

ferret.use('main', function (main) {
  main();
});
