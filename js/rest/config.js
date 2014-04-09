ferret.module('blueos.rest.config', function (require, exports, module) {
  /** rest api to manipulate user's configuration
   *  @module blueos/rest/config
   */

  /** Get config by key
   *  @param {string} - config key
   *  @param {function} callback - callback function with config value as arguments
   */
  exports.get = function (key, cb) {
    $.ajax({
      type: 'get',
      url: 'rest/config',
      dataType: 'text',
      data: { key: key },
      success: function (data) {
        cb(data);
      },
      error: function () {
        cb(null);
      }
    });
  }

  /** Update config by object, each key/value pair will be updated
   *  @param {object} - an object with key/value to be updated
   *  @param {function} - callback function with server status as arguments
   */
  exports.update = function (data, cb) {
    $.ajax({
      type: 'update',
      url: 'rest/config',
      dataType: 'json',
      data: data,
      success: function (data) {
        cb('success');
      },
      error: function () {
        cb('error');
      }
    });
  }
});
