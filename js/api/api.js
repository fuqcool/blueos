blueos.module('blueos.api', function (exports, require, module) {
    module.exports = {
        wallpaper: require('blueos.api.wallpaper'),
        application: require('blueos.api.application')
    };
});
