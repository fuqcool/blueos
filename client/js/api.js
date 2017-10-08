ferret.module('blueos.api', function (require, exports, module) {
  /** Api module, prodvides a bunch of apis for third party developers
   *  @module blueos/api
   *  @requires blueos/wallpaper
   *  @requires blueos/app
   *  @requires core/event
   *  @requires blueos/rest/app
   *  @requires blueos/rest/file
   *  @requires blueos/rest/config
   */
  module.exports = {
    /** wallpaper widget
     *  @see {@link module:blueos/wallpaper}
     */
    wallpaper: require('blueos.wallpaper'),
    /** app manager
     *  @see {@link module:blueos/app}
     */
    app: require('blueos.app'),
    /** event module
     *  @see {@link module:core/event}
     */
    event: require('core.event'),
    /** rest apis
     *  @see {@link module:blueos/rest/app}
     *  @see {@link module:blueos/rest/file}
     *  @see {@link module:blueos/rest/config}
     */
    rest: {
      app: require('blueos.rest.app'),
      file: require('blueos.rest.file'),
      config: require('blueos.rest.config')
    }
  };
});
