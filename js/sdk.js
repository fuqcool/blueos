(function () {
  /** BlueOS SDK, should be used by plugin developers
   *  @module blueos/sdk
   */
  window.blueos = window.blueos || {};

  // keep search its parent window, stop when it has id 'blueos',
  // or it is the top window
  var frame = window;
  while (frame.id !== 'blueos' && frame.parent != null) {
    frame = frame.parent;
  }


  // if 'blueos' can be found, get api object and attach to current window
  // otherwise print error
  if (frame.id === 'blueos') {
    frame.ferret.use('blueos.api', function (api) {
      window.blueos = api;
    });
  } else {
    console.log('unable to load blueos.api');
  }
}());
