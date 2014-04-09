ferret.module('blueos.api', function (require, exports, module) {
  module.exports = {
    wallpaper: require('blueos.wallpaper'),
    app: require('blueos.app'),
    event: require('core.event'),
    rest: {
      app: require('blueos.rest.app'),
      file: require('blueos.rest.file'),
      config: require('blueos.rest.config')
    }
  };
});
