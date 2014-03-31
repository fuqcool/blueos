ferret.module('blueos.ajaxstatus', function (require, exports, module) {
  var status = require('blueos.status');
  $(document).ajaxStart(function () {
    status.setText('loading...');
    status.show();
  });

  $(document).ajaxStop(function () {
    status.hide();
  });
});
