ferret.module('blueos.app', function (require, exports, module) {
  /** App manager
   *  @module blueos/app
   *  @requires core/event
   *  @requires blueos/rest/app
   *  @requires blueos/app/GUIApplication
   */

  var event = require('core.event');
  var appRest = require('blueos.rest.app');
  var GUIApplication = require('blueos.app.GUIApplication');

  var appCache = {};

  /** Run an application
   *  @param {string} - the name of the application
   *  @param {object} - extra options passed to app constructor
   *  @fires app-run
   */
  exports.run = function (name, options) {
    if (appCache[name]) {
      appCache[name].run();
      return;
    }

    appRest.get(name, function (options) {
      var app = makeApp(options);

      try {
        app.run();
        console.log('app run:', name);
        appCache[name] = app;
        event.trigger('app-run', app);
      } catch (e) {
        console.log('app failed to run:', name);
      }
    });
  }

  /** Terminate an application
   *  @param {string} - the name of the application to be terminated
   *  @fires app-terminate
   */
  exports.terminate = function (name) {
    var app = appCache[name];
    app.terminate();
    delete appCache[name];

    console.log('app terminate:', name);
    event.trigger('app-terminate', app);
  }

  // create an app instance
  function makeApp(options) {
    var app;

    if (options.type && options.type.toLowerCase() === 'service') {
      // launch service
    } else {
      // launch GUI
      return new GUIApplication(options);
    }
  }

  /** Get all running apps
   *  @returns {object} a dictionary of app name/instance
   */
  exports.getRunningApps = function () {
    return appCache;
  }

});
