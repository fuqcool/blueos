## Wallpaper:

### Functionality: 
Wallpaper is a system application of BlueOS. The main purpose of this app is to provide users the ability to change the background of the system (the browser background).

### User Manual:
To start this application, the user needs to click on the Wallpaper icon on the left launch bar. Then an IFrame window will pop up on the “desktop” with 9 wallpaper images for the user to choose. The user can click on any one of them to change the background. 

When an image is selected, the border of the image would turn to orange from white. This is a visual effect we made to inform the user of the current selected wallpaper.

The IFrame window can be dragged, minimized, resized, and maximized. When the user changes the width of the frame, the images inside the frame would shrink or expand accordingly to fit the new IFrame width. Also, if the height of the IFrame is shrunk to a point where it cannot display all the pictures at once, a vertical scroll bar will appear to let the user scroll up and down to pick images.

The browser window dimensions can also be change just like on any other pages. When the user drags to change the browser window, the image would not lose original ratio; instead, the overflowed part of the picture will be hidden, if there is any.

When the user click on the X button on the top-right of the frame, the application exits and the server always memorizes the last selected wallpaper. The second time when BlueOS is launched, that particular wallpaper will be the default background.

### Behind the Scene:
Here is some important high-level approach of the application procedure that we think is worth mentioning: Basically, the image arrangement and their styles are managed in a CSS file. They are displayed with ‘inline-block’ style, and are given a hover effect (tiny position changing and shadow effect) as well as a selected effect, which is mentioned above. 

Each time when a wallpaper is selected, its system catches the image URL by the “get” function we defined, and then sent the URL to the server. The system will immediately set the background to the given image using the “set” function. Each wallpaper is a static image with resolution 1920 x 1080. At the same time, when the background is changed, the “save” function is called as well to have the server remember the last selected wallpaper URL. And next time when BlueOS is launched, that particular wallpaper will become the default background.

### References:
The wallpaper images are from the following source:
Maple: www.1hdwallpapers.com
Horse: www.wallike.com
Baby: www.mi9.com
Fish: www.wallpaperstock.net
Map: www.wallconvert.com
Moon: www.hdw.eweb4.com
Waterfall: www.hddesktopbackgrounds.us
Wood: www.hqwallbase.com
Winter: www.wall-pix.net
