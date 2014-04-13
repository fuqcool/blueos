## Zen-Typing:

### Functionality: 
Zen-Typing is a system application of BlueOS. The main purpose of this app is to provide users fun tool to check their typing speed and accuracy. Also, this application can be used as a tool to practice typing.

### User Manual:
To start this application, the user needs to click on the Zen-Typing icon on the left launch bar. 
Then an IFrame window will pop up on the “desktop” with a Zen-Typing application in it. 

The Zen-Typing application starts with a ‘Start Typing’ button shown in the middle. If the user clicks on the button,
a random text will display on the screen. The words in the text are separated by spaces, and the first word is
highlighted in yellow. In order to pass the first word and jump to the second one, user needs to type what’s 
highlighted in yellow exactly into the result bar, and enter a space at the end. If the user hits the wrong key,
the result bar will turn red to inform the mistyping, and the user can always go back and erase the answer.
After the user passes all the words, the score (word per minute and accuracy) will be shown on the screen. 
Then, the user can click on the ‘Start Typing’ button again to go to the next round.

The IFrame window can be dragged, resized, maximized, and minimized. And this application can be terminated by click
on the ‘X’ button on the top-right of the frame. 

### Behind the Scene:
Zen-Typing starts with initializing a random text document using our `querySelector()` function. Then, the application reads the document and stores all the words in a list, and focuses on the first word. At the same time, the timer counter is started. 

After initialization, the app starts listening for the user keyboard input. If the user correctly typed in the current focused word, it moves its focus to the next element in the list, and when the space bar is hit, the variable `numOfCorrect` and `totalNum` will both increase by 1. If the user hits any wrong key, the warning function will be triggered to highlight the input box in red. Note that, hitting a wrong key doesn’t hurt the user’s typing accuracy, only when the user typed in wrong word and then hit the space bar, his/her typing accuracy will be affected, because this will add 1 to `totalNum` (the denominator of the formula we will mention later). After the user passes all the words in the list, the system will calculate his/her accuracy (`numOfCorrect / totalNum`) and the result as well as time spent will be printed on the screen. Then Zen-Typing will initialize itself for the next round.





