ferret.module('blueos.rest.config', function (require, exports, module) {
  function get(key, cb) {
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

  function update(data, cb) {
    $.ajax({
      type: 'update',
      url: 'rest/config',
      dataType: 'json',
      data: data,
      success: function (data) {
        console.log('success');
      },
      error: function () {
        console.log('error');
      }
    });
  }

  exports.update = update;
  exports.get = get;
});
