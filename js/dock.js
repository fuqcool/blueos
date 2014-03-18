ferret.module('blueos.dock', function (require, exports, module) {
  var appManager = require('blueos.app');
  var appRest = require('blueos.rest.app');
  var event = require('core.event');

  var $dock = $('#dock');
  var $icons = $dock.find('.icons');

  appRest.query({}, function (data) {
    if (ferret.isArray(data)) {
      var html = '';
      ferret.forEach(data, function (app) {
        html += '<div class="appicon" title="' + app.title + '" app-name="' + app.name + '">' +
          '<img src="' + app.name + '/' + app.icon + '" />' +
          '</div>';
      });

      $icons.append(html);
      $icons.tooltip({
        position: {
          my: 'right-7 center-32'
        },
        tooltipClass: 'app-tooltip',
        show: false,
        hide: false
      });
    }
  });

  $icons.on('click', '.appicon', function () {
    var name = $(this).attr('app-name');
    appManager.run(name);
  });

  event.listen('app-run', function (app) {
    $icons.find('[app-name=' + app.name + ']').addClass('running');
  });

  event.listen('app-terminate', function (app) {
    $icons.find('[app-name=' + app.name + ']').removeClass('running');
  });
});
