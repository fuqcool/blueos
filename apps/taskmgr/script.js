$(function () {
  blueos.event.listen('app-run', function () {
    render();
  });

  blueos.event.listen('app-terminate', function () {
    render();
  });

  render();

  $('body').on('click', '.btn-terminate', function (evt) {
    var $el = $(this);
    var name = $el.closest('tr').attr('app-name');
    blueos.app.terminate(name);
  });

  function render() {
    var apps = blueos.app.getRunningApps();
    var html = '';
    $.each(apps, function (key, app) {
      html += '' +
        '<tr app-name="' + app.name + '">' +
        '  <td>' + app.title + '</td>' +
        '  <td>' + app.type + '</td>' +
        '  <td>Running</td>' +
        '  <td><button class="btn-terminate">Terminate</button></td>' +
        '</tr>';
    });
    if (html === '') {
      html = '<tr><td>No running apps.</td></tr>';
    }

    $('#app-list').html(html);
  }
})
