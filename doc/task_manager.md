## Task Manager

### Functionality:
Task Manager is a system application of BlueOS. The main purpose of this app is to provide users a tool to monitor and
manage all the running applications.

### User Manual: 
To start this application, the user needs to click on the Task Manager icon on the left launch bar. Then an IFrame window 
will pop up on the “desktop” with a Task Manager in it. Task Manager initially shows all the running apps on the desktop.
If the user opens another app while Task Manager is open, the new app will also be shown as running. The user can terminate
any running apps (including Task Manager itself) by clicking on the `terminate` button in the last column. 

The IFrame window can be dragged, resized, maximized, and minimized. And this application can be terminated by click on
the ‘X’ button on the top-right of the frame.

### Behind the Scene:
Here is some important high-level approach of the application procedure that we think is worth mentioning: Task Manager
starts by calling `blueos.app.getRunningApps()` function to get all the running apps, and then get the app name and type,
prints them on the screen. It also has event listener to capture newly opened apps and to append them on the GUI. If the 
user clicks on the terminate button for a particular app, the `blueos.app.terminate(name)` will be triggered, and that app
will be terminated.



