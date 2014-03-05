ferret.module('blueos.rest.app', function (exports, require, module) {
  var http = require('core.http');

  function get(name, cb) {
    http({
      type: 'get',
      dataType: 'json',
      url: '/rest/app',
      data: { name: name },
      success: function (data) {
        cb(data);
      }
    })
  }

  function query(data, cb) {
    http({
      type: 'get',
      dataType: 'json',
      url: '/rest/apps',
      data: data,
      success: function (response) {
        cb(response);
      }
    });
  }

  exports.get = get;
  exports.query = query;
});
