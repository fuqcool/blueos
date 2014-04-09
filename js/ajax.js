ferret.module('blueos.ajaxstatus', function (require, exports, module) {
  /** This module uses *status* module to indicate loading status when there is
   *  an ajax request.
   *  @module blueos/ajaxstatus
   *  @requires blueos/status
   */

  var status = require('blueos.status');

  $(document).ajaxStart(function () {
    status.setText('loading...');
    status.show();
  });

  $(document).ajaxStop(function () {
    status.hide();
  });
});
