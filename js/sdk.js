(function () {
    window.blueos = window.blueos || {};

    var frame = window;
    while (frame.id !== 'blueos' && frame.parent != null) {
        frame = frame.parent;
    }

    if (frame.id === 'blueos') {
        window.blueos.api = frame.blueos.require('blueos.api');
    } else {
        console.log('unable to load blueos.api');
    }
}());