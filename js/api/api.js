ferret.module('blueos.api', function (require, exports, module) {
    module.exports = {
        wallpaper: require('blueos.api.wallpaper'),
        application: require('blueos.api.application')
    };
});
