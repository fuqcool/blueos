We use events to loosely couple one module from another. `blueos.event` is massively used across the project code. It provides two main methods:

- `listen(eventName, handler)`
- `trigger(eventName, arg1, arg2, ...)`

The arguments provided in the *trigger* becomes the input arguments of event handlers.

Inside the event module, we cached an dictionary of event names and their corresponding handlers. Multiple handlers for the same event is supported as well.

A typical application of events, is *blueos.dock* module. It listens to *start*, *terminate* events of apps, then show/hide a white dot on left of the application icon.
