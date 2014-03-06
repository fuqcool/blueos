ferret.module('blueos.rest.app', function (exports, require, module) {
  var http = require('core.http');

  function get(name, cb) {
    if (name === 'wallpaper') {
      cb({
        "name": "wallpaper",
        "title": "Wallpaper",
        "url": "wallpaper/",
        "height": 600,
        "width": 800,
        "icon": "icon.png"
      });
    } else if (name === 'taskmgr') {
      cb({
        "name": "taskmgr",
        "title": "Task Manager",
        "url": "taskmgr/",
        "height": 600,
        "width": 400,
        "icon": "icon.png"
      });
    } else if (name === 'calc') {
      cb({
        "name": "calc",
        "title": "Calculator",
        "url": "calc/",
        "icon": "icon.png"
      });
    }

    // http({
    //   type: 'get',
    //   dataType: 'json',
    //   url: '/rest/app',
    //   data: { name: name },
    //   success: function (data) {
    //     cb(data);
    //   }
    // })
  }

  function query(data, cb) {
    cb([
      {
        "name": "wallpaper",
        "title": "Wallpaper",
        "url": "wallpaper/",
        "height": 600,
        "width": 800,
        "icon": "icon.png"
      },
      {
        "name": "taskmgr",
        "title": "Task Manager",
        "url": "taskmgr/",
        "height": 600,
        "width": 400,
        "icon": "icon.png"
      },
      {
        "name": "calc",
        "title": "Calculator",
        "url": "calc/",
        "icon": "icon.png"
      }
    ]);

    // http({
    //   type: 'get',
    //   dataType: 'json',
    //   url: '/rest/apps',
    //   data: data,
    //   success: function (response) {
    //     cb(response);
    //   }
    // });
  }

  exports.get = get;
  exports.query = query;
});
