(function () {
  var BORDER_WIDTH = 3;

  $('body').on('click', '.arrange img', function () {
    var el = $(this);
    blueos.wallpaper.setBackground(el.prop('src'));

    $('.arrange img').removeClass('selected');
    el.addClass('selected');
  });

  function layout () {
    var totalWidth = $('body').width();
    var imgWidth = totalWidth * 0.28;
    var margin = (totalWidth * 0.16 - 15) / 6.01;

    $('.arrange img').outerWidth(imgWidth);
    $('.arrange img').css({
      margin: margin
    });
  }

  layout();

  $(window).resize(layout);
}());
