### Functionality
Weather is a system application of BlueOS. The main purpose of this app is to provide users a simple real-time whether forecast tool.

### User Manual
To start this application, the user needs to click on the Weather icon on the left launch bar. Then an IFrame window will pop up on the “desktop” with a weather forecast tool in it. Depending on the user’s browser setting, the browser might ask him/her for location sharing permission.

The Weather application starts with displaying the weather and temperature condition in current day (several hours earlier to the current time), at the current location. User can use the left/right arrow to browse for the previous/future whether condition. Each page has an interval of three hours. And the user can at most find out the weather condition for the next five days.

The IFrame window can be dragged and minimized. And this application can be terminated by click on the ‘X’ button on the top-right of the frame.

### Behind the Scene
Here is some important high-level approach of the application procedure that we think is worth mentioning: the body contains two ‘div’s, the whether condition ‘div’, which is the rectangle window showing the associated whether condition, and the location ‘div’, which is the city and state tag at the bottom.

The JavaScript starts by getting the user’s current location information. Then, the main function will check to see if the cached JSON data is newer than 30 minutes. If it’s not, we will connect to the weather info provider (Open Weather Map API) and get their weather JSON data, and then call the main function again. If the cache is newer than 30 minutes, we will use the cached data. The main function will find the corresponding city and its weather in the JSON file put them into a big ‘ul’ list condition, the associated weather condition icon files are also added to the list during this time. Also, we have functions for switching to the previous/next ‘li’ element of the list. Each time when the previous/next arrow is clicked, it triggers the JavaScript function to switch to the previous/next item in the list.

Lastly, we have a CCS file to beautify the frame UI, as well as handling the display methodology of the list elements.

### References
The idea and some of the JavaScript code, whether condition icons, and CSS style is taken from: http://tutorialzine.com/2013/05/weather-web-app-geolocation-revisited/
