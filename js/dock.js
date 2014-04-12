ferret.module('blueos.dock', function (require, exports, module) {
  /** The dock panel widget of BlueOS
   *  @module blueos/dock
   *  @requires blueos/app
   *  @requires blueos/rest/app
   *  @requires core/event
   */

  var appManager = require('blueos.app');
  var appRest = require('blueos.rest.app');
  var event = require('core.event');

  var $dock = $('#dock');
  var $icons = $dock.find('.icons');
  var $shutdown = $dock.find('i.shutdown');

  // query all app info and initialize dock panel
  appRest.query({}, function (data) {
    if (ferret.isArray(data)) {
      var html = '';
      ferret.forEach(data, function (app) {
        html += '<div class="appicon" title="' + app.title + '" app-name="' + app.name + '">' +
          '<img src="' + app.icon + '" />' +
          '</div>';
      });

      $icons.append(html);
      $icons.tooltip({
        position: {
          my: 'right-9 center-32'
        },
        tooltipClass: 'app-tooltip',
        show: false,
        hide: false
      });
    }
  });

  // start app when click on app icon
  $icons.on('click', '.appicon', function () {
    var name = $(this).attr('app-name');
    appManager.run(name);
  });

  $shutdown.click(function () {
    if (confirm("Are you sure you want to shutdown BlueOS?")) {
      window.open('','_self').close();
    }
  });

  // listen for app-minimize event, and hide app to dock
  event.listen('app-minimize', function (app) {
    var $icon = $icons.find('[app-name=' + app.name + ']');
    var pos = $icon.position();
    app.$dialog.animate({
      top: pos.top,
      left: pos.left,
      height: 50,
      width: 50,
      opacity: 0.1
    }, 250, function () {
      app.hide();
    });
  });


  // listen for app-restore event, and show app from dock
  event.listen('app-restore', function (app) {
    var $icon = $icons.find('[app-name=' + app.name + ']');
    var pos = $icon.position();
    app.show();
    app.$dialog.css('opacity', 0.1);
    app.$dialog.animate({
      top: app.top,
      left: app.left,
      height: app.height,
      width: app.width,
      opacity: 1
    }, 250);
  });

  // listen for app-run/app-terminate event and toggle `running` class
  // on the corresponding app icon
  event.listen('app-run', function (app) {
    $icons.find('[app-name=' + app.name + ']').addClass('running');
  });

  event.listen('app-terminate', function (app) {
    $icons.find('[app-name=' + app.name + ']').removeClass('running');
  });
});
