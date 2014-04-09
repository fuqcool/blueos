## Date and Time:

### Functionality: 
Our BlueOS will always display date and time information on the bottom of the left launch bar, 
including month, date, weekday, and current time.

### Behind the Scene:
Date and time information is pulled using JavaScript built in functions: getMonth(), getDate(), getDay(), getHours(),
getMinutes(), and getSeconds(). And then we append the results into three lines. Also, the time will refresh
itself every second by the setTimeout function, therefore, the time value is always updated automatically.
