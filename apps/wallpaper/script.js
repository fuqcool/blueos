(function () {
  blueos.wallpaper.getAll(function (imgs) {
    render(imgs);
  });

  function render(imgs) {
    var html = '';

    $.each(imgs, function (i, img) {
      html += '<img src="' + img.url + '"></img>';
    });

    $('.arrange').html(html);
    layout();

    $('.arrange img').each(function (i, el) {
      var current = blueos.wallpaper.get();
      var $img = $(el);

      if (getBaseNamse(current) === getBaseNamse($img.attr('src'))) {
        $img.addClass('selected');
      }
    });
  }

  function getBaseNamse(path) {
    var parts = path.split('/');
    return parts[parts.length - 1];
  }

  var BORDER_WIDTH = 3;

  $('body').on('click', '.arrange img', function () {
    var el = $(this);
    var url = el.prop('src');
    blueos.wallpaper.set(url);
    blueos.wallpaper.save(url);

    $('.arrange img').removeClass('selected');
    el.addClass('selected');
  });

  function layout () {
    var totalWidth = $('body').width();
    var imgWidth = totalWidth * 0.28;
    var margin = (totalWidth * 0.16 - 20) / 6.01;

    $('.arrange img').outerWidth(imgWidth);
    $('.arrange img').css({
      margin: margin
    });
  }

  $(window).resize(layout);
}());
