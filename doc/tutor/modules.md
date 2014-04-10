### How to write a module
BlueOS uses a CMD-style module loader(which is developed by ourselves). Each module is a small unit of javascript, which can *require* and be *required* by other modules. A module is typically written like this:

``` javascript
ferret.module('main', function (require, exports, module) {
  module.exports = function () {
    var config = require('blueos.rest.config');
    var wallpaper = require('blueos.wallpaper');

    config.get('wallpaper', function (url) {
      wallpaper.set(url);
    });
  };
});
```

The first parameter is the name of the module, the second parameter is the initialization function of the module. The second function is invoked with three arguments. The first parameter is a function that can be used to *require* other modules; the second one is an empty object, we can use it to export properties and methods that is visible by other modules(once required); the third parameter is the parent object of the second parameter.

The example above is the entry module of BlueOS. It fetches user's preferred wallpaper from the server and update ui. This feature involves two modules: `blueos.rest.config` and `blueos.wallpaper`. The first module provides REST-ful api to fetch user's configuration by key, the later provide api to update the url of wallpaper.

### Run module

Each module is evaluated lazily, that is, when they are *required* by some other module. Once it is initialized, it will be cached for later usage.

We can also explicitly initialized module using `ferret.use`.

``` javascript
ferret.use([
  'main',
  'blueos.dock',
  'blueos.status',
  'blueos.ajaxstatus',
  'blueos.effect.layer'
], function (main) {
  main();
});
```

The first parameter of is an array of module names, the second paratemer is a function which is invoked with a list of module instances.
In code above, we only care about *main* module, so we only write *main* in param list.
