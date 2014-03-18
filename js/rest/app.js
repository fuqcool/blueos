ferret.module('blueos.rest.app', function (require, exports, module) {
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
    } else if (name === 'map') {
      cb({
        "name": "map",
        "title": "Google Map",
        "url": "map/",
        "icon": "icon.png",
        "width": 500,
        "height": 500
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
      },
      {
        "name": "map",
        "title": "Google Map",
        "url": "map/",
        "icon": "icon.png",
        "width": 500,
        "height": 500
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
