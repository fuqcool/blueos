ferret.module('FormApplication', function (exports, require, module) {
    var Form = require('Form');

    function FormApplication(options) {
        this.url = options.url || '';
        this.title = options.title || '';
        this.name = options.name || '';
        this.height = options.height;
        this.width = options.width;

        this.options = options;
    }

    FormApplication.prototype.run = function () {
        this.form = new Form(this.options);

        this.form.setContent('<iframe class="app-iframe" width="100%" height="100%" frameborder="0" src="' + this.url + '"></iframe>');
        this.form.setTitle(this.title);

        this.form.show();
    };

    FormApplication.prototype.active = function () {
        this.run();
    };

    module.exports = FormApplication;
});
