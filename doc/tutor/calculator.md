### Functionality:
Calculator is a system application of BlueOS. The main purpose of this app is to provide users a handy tool to easily open up a simple calculator.

### User Manual:
To start this application, the user needs to click on the Calculator icon on the left launch bar. Then an IFrame window will pop up on the “desktop” with a calculator in it. This calculator contains simple operations: addition, subtraction, multiplication, and division. It also has a clear button ‘C’ at the top to clear the user input box. This calculator supports logical operation order, for example, if the user type in “3 – 6/3”, it will evaluate 6/3 first, which gives you a final result of 1.

The IFrame window can be dragged and minimized. And this application can be terminated by click on the ‘X’ button on the top-right of the frame.

### Behind the Scene:
Here is some important high-level approach of the application procedure that we think is worth mentioning: The calculator consists with 17 buttons (0 – 9, 4 operators, ‘=’, ‘.’, and ‘C’ symbol), and an input/output screen. When the user enters input by clicking those buttons, the input value will be caught by an onclick event and appended to the input div. And when ‘=’ is pressed, the JavaScript eval() function will be triggered and the output will be printed on the screen.

We also have a variety of user input check functions. For instance, the user is not allowed to enter the operator ‘+’, ‘x’, or ‘/’ as the first character of the equation. Similarly, the user cannot enter two operators in a row, the latest operator will always replace the previous one. Another example: If the user first put in ‘3+3’ and hit ‘=’, the screen will display 6. At this point, he/she can use 6 as a starter and directly add the next operator, if he/she continues to press ‘x2’, the screen will show ‘6x2’ and he/she can hit ‘=’ to get the result 12. However, if after the user enters ‘3+3’ and gets 6, he/she doesn’t want to use 6 as a starter for the next calculation; the user can directly enter new numbers, if our system detects that the next given input is a number, the previous result (6) on the screen will be cleared automatically.

### References:
The fundamental code structure of the application is from http://thecodeplayer.com/walkthrough/javascript-css3-calculator, however, to make the calculator work better, we enhanced its functionality by adding multiple user input checks, it now performs more like other real calculators.
