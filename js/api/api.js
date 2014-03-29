ferret.module('blueos.api', function (require, exports, module) {
  module.exports = {
    wallpaper: require('blueos.api.wallpaper'),
    app: require('blueos.app'),
    event: require('core.event')
  };
});
