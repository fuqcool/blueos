BlueOS is an open platform, you can build very interesting apps above it.

### Existing websites
If you have an existing website, and want to quickly integrate it into BlueOS. It should be as easy as writing a config file.

### Configuration
The configuration file should be placed in the root of your app directory. The content may looks like:

``` javascript
{
  "name": "example",
  "title": "Example",
  "icon": "icon.png",
  "height": 450,
  "width": 600,
  "resizable": true,
  "url": "http://example.com",
  "maximize": true
}
```

- The `name` property is the unique identifier for the app. The `title` property is the title that will be displayed to the user, such the title of app dialog, as well as the tooltip of the app icon.

- `icon` is the path of app icon, relative to the root of app.

- `height` and `width` property is the initial height and width of the app.

- If `resizable` is set to false, the app will have a fixed height and width. Also the *maximize* button will disappear.

- If `url` property is specified, the app will simply link the content to the url. Otherwise, BlueOS will take `index.html` in app folder as the main page.

- If `maximize` is set to true, the app will be initially maximized when it is shown on the desktop.

### New app

If you want to develop application specifically for BlueOS, it's also easy. You just put your *js*, *css* and *html* in the app folder, and name your entry html as `index.html`.


