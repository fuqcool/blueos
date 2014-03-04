ferret.module('Form', function (exports, require, module) {
  var template = '<div class="dialog"></div>';

  function Form(options) {
    this._dialog = $(template).dialog(options);
  }

  Form.prototype.setContent = function (content) {
    this._dialog.html(content);
  };

  Form.prototype.setTitle = function (title) {
    this._dialog.dialog('option', 'title', title);
  };

  Form.prototype.show = function () {
    this._dialog.show();
  };

  Form.prototype.bind = function () {
    debugger;
    return this._dialog.bind;
  };

  module.exports = Form;
});
