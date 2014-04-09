## Google Map:

### Functionality: 
Wallpaper is a user application of BlueOS. The main purpose of this app is to provide users a handy tool to easily browser Google map.

### User Manual:
To start this application, the user needs to click on the Google Map icon on the left launch bar. Then an IFrame window will pop up on the “desktop” with Google map inside it. Depending on the user’s browser setting, this application might ask the user for his/her permission to get the current location. Then the map opens targeting at the user’s current location with a default zoom level. The user can use this map just like any other similar Google map APIs.

This simple Google map API does not contain all of real Google map features, but we do offer the most important features, including an address search box, a zoom level modification bar, and a Map/Satellite option. Since those features came with a self-explanatory name, we are not going to explain them here in great detail.

The IFrame window can be dragged, minimized, resized, and maximized. The map will work fine in any reasonable window size. And this application can be terminated by click on the ‘X’ button on the top-right of the frame. 

### Behind the Scene:
Here is some important high-level approach of the application procedure that we think is worth mentioning: This application is based on the Google Map API provided by Google. We start our application by calling the get current location function supported by HTML5, and then we pass in our current latitude and longitude to the initialization function of the map API. Then, the initialization function initializes every essential component of the map, including the address search box, and displays the current geo-location within plus/minus 0.03 range of the given latitude and longitude. 

### References:
Part of the code is taken from Google Developer: https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
