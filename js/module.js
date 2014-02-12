(function () {
  // module buffer
  var modules = {};

  // module init functions
  var moduleFns = {};

  function module(name, cb) {
    if ($.isFunction(cb)) {
      moduleFns[name] = cb;
    }
  }

  function require(name) {
    if (modules[name]) {
      return modules[name].exports;
    }

    if (moduleFns[name]) {
      var m = { exports: {} };

      moduleFns[name](m.exports, require, m);
      console.log('load module', name);

      modules[name] = m;

      return modules[name].exports;
    }

    throw 'module does not exists: ' + name;
  }

  window.blueos = window.blueos || {};
  blueos.module = module;
  blueos.require = require;
}());
