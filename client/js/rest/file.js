ferret.module('blueos.rest.file', function (require, exports, module) {
  /** rest api to manipulate files in server
   *  @module blueos/rest/file
   */

  /** Query all the files in user folder
   *  @param {object} - query options
   *  @param {function} callback - with a list of files as arguments
   */
  exports.query = function (data, cb) {
    $.ajax({
      type: 'get',
      url: 'rest/file',
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
