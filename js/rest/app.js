ferret.module('blueos.rest.app', function (require, exports, module) {
  function get(name, cb) {
    if (name === 'wallpaper') {
      cb({
        "name": "wallpaper",
        "title": "Wallpaper",
        "url": "apps/wallpaper/",
        "height": 600,
        "width": 800,
        "icon": "icon.png"
      });
    } else if (name === 'taskmgr') {
      cb({
        "name": "taskmgr",
        "title": "Task Manager",
        "url": "apps/taskmgr/",
        "height": 450,
        "width": 400,
        "icon": "icon.png"
      });
    } else if (name === 'calc') {
      cb({
        "name": "calc",
        "title": "Calculator",
        "url": "apps/calc/",
        "icon": "icon.png",
        "height": 275,
        "width": 325,
        "resizable": false
      });
    } else if (name === 'map') {
      cb({
        "name": "map",
        "title": "Google Map",
        "url": "apps/map/",
        "icon": "icon.png",
        "width": 650,
        "height": 450
      });
    } else if (name === 'calendar') {
      cb({
        "name": "calendar",
        "title": "Calendar",
        "url": "apps/calendar/",
        "icon": "icon.png",
        "width": 360,
        "height": 320,
        "resizable": false
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
        "url": "apps/wallpaper/",
        "height": 600,
        "width": 800,
        "icon": "icon.png"
      },
      {
        "name": "taskmgr",
        "title": "Task Manager",
        "url": "apps/taskmgr/",
        "height": 450,
        "width": 400,
        "icon": "icon.png"
      },
      {
        "name": "calc",
        "title": "Calculator",
        "url": "apps/calc/",
        "icon": "icon.png",
        "height": 275,
        "width": 325,
        "resizable": false
      },
      {
        "name": "map",
        "title": "Google Map",
        "url": "apps/map/",
        "icon": "icon.png",
        "width": 650,
        "height": 450
      },
      {
        "name": "calendar",
        "title": "Calendar",
        "url": "apps/calendar/",
        "icon": "icon.png",
        "width": 360,
        "height": 320,
        "resizable": false
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
