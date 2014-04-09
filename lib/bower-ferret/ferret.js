(function () {
  /** @namespace ferret */

  // module buffer
  var modules = {};

  // module init functions
  var moduleFns = {};

  /** Define a new module
   *  @param {string} - module name
   *  @param {function} - constructor of the module
   *  @throws Will throw an error if first parameter is not a string
   *  @throws Will throw an error if second parameter is not a function
   *  @memberof ferret
   */
  function module(name, cb) {
    if (!ferret.isString(name)) {
      console.error('module name should be a string:', name);
    }

    if (!ferret.isFunction(cb)) {
      console.error('module consructor should be a function:', name);
    }

    moduleFns[name] = cb;
  }

  /** Get the instance of a module
   *  @param {string} - module name
   *  @returns {Any} the module instance
   *  @memberof ferret
   */
  function require(name) {
    var result;

    if (modules[name]) {
      result = modules[name].exports;
    } else {
      result = loadModule(name);
    }

    return result;
  }

  /** load the module with given name */
  function loadModule(name) {
    if (moduleFns[name]) {
      var m = { exports: {} };
      modules[name] = m;

      console.log('load module', name);
      moduleFns[name](require, m.exports, m);

      return modules[name].exports;
    }

    throw 'module does not exists: ' + name;
  }

  /** Remove module
   *  @param {string} - name of the module to be removed
   *  @param {boolean} - if true, only remove module cache, the module can be
   *                     re-initiated when required next time; if false, will
   *                     remove the module completely
   *  @memberof ferret
   */
  function removeModule(name, cacheOnly) {
    console.log('remove module', name);
    cacheOnly = (cacheOnly === 'cache' ? true : false);

    if (ferret.isString(name)) {
      delete modules[name];

      if (!cacheOnly) {
        delete moduleFns[name];
      }
    }
  }

  /** Explicitly initialize modules
   *  @param {string|Array} modules - module name or an array of module names
   *  @param {function} - callback function with module instances as arugments
   *  @throw Will throw an error if first parameter is not string or array.
   *  @memberof ferret
   */
  function use(mod, cb) {
    var list;
    if (ferret.isArray(mod)) {
      list = mod;
    } else if (ferret.isString(mod)) {
      list = [mod];
    } else {
      throw 'first parameter of `use` should be an array or string';
    }

    var result = [];
    ferret.forEach(list, function (name) {
      if (ferret.isString(name)) {
        result.push(require(name));
      }
    });

    if (ferret.isFunction(cb)) {
      cb.apply(ferret, result);
    }
  }

  var ferret = window.ferret = window.ferret || {};

  ferret.module = module;
  ferret.use = use;
  ferret.require = require;
  ferret.removeModule = removeModule;
}());

(function () {
  var type = function (o) {
    if (o === null) {
      return 'null';
    } else if (o === undefined) {
      return 'undefined';
    } else if (typeof o === 'object') {
      return _type(o);
    } else {
      return typeof o;
    }

    function _type(o) {
      var typeStr = Object.prototype.toString.apply(o);
      return typeStr.slice(8, -1).toLowerCase();
    }
  };

  var isType = function (expect) {
    return function (obj) {
      return type(obj) === expect;
    };
  };

  var isArray = isType('array');
  var isDate = isType('date');
  var isFunction = isType('function');
  var isObject = function (o) {
    return o !== null && (typeof o === 'object' || typeof o === 'function');
  };
  var isString = isType('string');
  var isNumber = isType('number');
  var isRegExp = isType('regexp');
  var isNull = isType('null');
  var isUndefined = isType('undefined');
  var isBoolean = isType('boolean');
  var isNaN = function (n) {
    // NaN is a number but not equal to itself.
    return isNumber(n) && n !== n;
  };

  var eachArray = function (a, cb, context) {
    if (Array.prototype.forEach) {
      a.forEach(cb, context);
    } else {
      for (var i = 0; i < a.length; i++) {
        cb.call(context, a[i], i, a);
      }
    }
  };

  var eachObject = function (obj, cb, context) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        cb.call(context, obj[prop], prop, obj);
      }
    }
  };

  var map = function (obj, cb, context) {
    var result;

    if (isArray(obj)) {
      result = [];
    } else if (isObject(obj)) {
      result = {};
    }

    if (isFunction(cb)) {
      forEach(obj, function (value, key) {
        result[key] = cb.call(context, value, key, obj);
      });
    }

    return result;
  };

  var forEach = function (obj, cb, context) {
    if (isArray(obj)) {
      eachArray(obj, cb, context);
    } else if (isObject(obj)) {
      eachObject(obj, cb, context);
    }
  };

  var noop = function () {};

  var clone = function (obj) {
    if (!isArray(obj) && !isObject(obj)) {
      console.log(obj);
      return obj;
    }

    return map(obj, function (v, k) {
      return v;
    });
  };

  var extend = function (dest) {
    var srcs = toArray(arguments).slice(1);

    forEach(srcs, function (src) {
      forEach(src, function (v, k) {
        dest[k] = v;
      });
    });

    return dest;
  };

  var defaults = function (obj) {
    var params = toArray(arguments).slice(1);

    forEach(params, function (param) {
      forEach(param, function (v, k) {
        if (obj[k] == null) {
          obj[k] = v;
        }
      });
    });

    return obj;
  };

  var toArray = function (obj) {
    return Array.prototype.slice.call(obj);
  };


  var bind = function (fn, context) {
    var args = toArray(arguments).slice(2);

    return function () {
      fn.apply(context, args.concat(toArray(arguments)));
    };
  };

  var ferret = window.ferret = window.ferret || {};

  ferret.type = type;
  ferret.isArray = isArray;
  ferret.isString = isString;
  ferret.isDate = isDate;
  ferret.isFunction = isFunction;
  ferret.isObject = isObject;
  ferret.isNumber = isNumber;
  ferret.isRegExp = isRegExp;
  ferret.isUndefined = isUndefined;
  ferret.isNull = isNull;
  ferret.isBoolean = isBoolean;
  ferret.isNaN = isNaN;

  ferret.forEach = ferret.each = forEach;
  ferret.toArray = toArray;
  ferret.map = map;
  ferret.noop = noop;
  ferret.clone = clone;
  ferret.extend = extend;
  ferret.defaults = defaults;
  ferret.bind = bind;
}());

ferret.module('core.event', function (require, exports, module) {
  /** Event module
   *  @module core/event
   */

  var events = {};

  /** Listen to an event
   *  @param {string} - the name of the event
   *  @param {function} - event handler
   *  @throws Will throw an error if event name is not a string
   */
  exports.listen = function (event, cb) {
    if (ferret.isString(event)) {
      if (events[event]) {
        events[event].push(cb);
      } else {
        events[event] = [cb];
      }
    } else {
      throw 'event should be a string: ' + event;
    }

    return exports;
  }

  /** Trigger an event
   *  @param {string} - event name to be triggered
   *  @returns {}
   *  @throws Will throw an error if event name is not string
   */
  exports.trigger = function (event) {
    if (ferret.isString(event)) {
      var args = Array.prototype.slice.call(arguments, 1);
      doTrigger(event, args);
    } else {
      throw 'event should be a string: ' + event;
    }

    return exports;
  }

  function doTrigger(name, args) {
    var callbacks = events[name];

    if (callbacks) {
      ferret.forEach(callbacks, function (cb) {
        cb.apply(null, args);
      });
    }
  }

  exports.clear = function () {
    events = {};
  }

});

ferret.module('core.console', function (require, exports, module) {
    module.exports = console;
});
