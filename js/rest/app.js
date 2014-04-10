ferret.module('blueos.rest.app', function (require, exports, module) {
  /** rest api to manipulate user's configuration
   *  @module blueos/rest/app
   */

  /** Get app information by name
   *  @param {string} - the name of the app
   *  @param {function} - callback function with app object as arguments
   */
  exports.get = function (name, cb) {
    $.ajax({
      type: 'get',
      url: 'rest/app',
      dataType: 'json',
      data: { name: name },
      success: function (data) {
        cb(data);
      },
      error: function () {
        throw "request app failed: " + name;
      }
    });
  }

  /** Query all the app infomation
   *  @param {object} - query options
   *  @param {function} - callback function with a list of app
   *                      objects as arguments
   */
  exports.query = function (data, cb) {
    $.ajax({
      type: 'get',
      url: 'rest/app',
      dataType: 'json',
      success: function (data) {
        cb(data);
      },
      error: function () {
        cb([]);
      }
    });
  }

});
