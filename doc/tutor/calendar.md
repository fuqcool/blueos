### Functionality
Calendar is a system application of BlueOS. The main purpose of this app is to provide users a handy tool to easily open up a calendar.

### User Manual
To start this application, the user needs to click on the Calendar icon on the left launch bar. Then an IFrame window will pop up on the “desktop” with a calendar in it. The default date (today) will be highlighted with a rectangle border and a different color. The user can navigate the calendar by clicking the left/right arrow in the frame, which will turn the calendar to the previous/next month accordingly. The user can also click to highlight any particular dates that are not grayed out.

The IFrame window can be dragged and minimized. And this application can be terminated by click on the ‘X’ button on the top-right of the frame.

### Behind the Scene
Here is some important high-level approach of the application procedure that we think is worth mentioning: The core function of this application is based on jQuery Datepicker script. In the initialization process, we provide the Datapicker default values, such as first day: 1, which is Sunday, and we set the day short cut name to be 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', and 'Sat'. And in the associated CCS file, we beautify the calendar UI by adding a variety of styles.

### References
Part of the CSS style is taken from http://designmodo.com/calendar-jquery-css3/
