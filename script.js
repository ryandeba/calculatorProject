//Declare global variables
let keys = document.getElementById('keys').children;
let display = document.getElementById('display');

let btnPress = []; //To track recent button presses

//Set display to show 0 by default
display.innerText = "0";

if (display.innerText.length > 14) {
  display.innerText = display.innerText.substr(0, 13);
}

//Declare variables for Calculate function
let num1, num2, oper;

//Calculate function
function calculate(n1, n2, op) {
  n1 = parseFloat(n1, 10);
  n2 = parseFloat(n2, 10);

  if (op === undefined) {
    return display.innerText
  } else if (op === "add") {
     return n1 + n2;
  } else if (op === "subtract") {
      return n1 - n2;
  } else if (op === "multiply") {
      return n1 * n2;
  } else if (op === "divide") {
      return n1 / n2;
  } 
}

//Add event listeners to all buttons
for(let key = 0; key < keys.length; key++) {
  keys[key].addEventListener('click', function() {

    console.log(btnPress);

    let num = !this.dataset.action; //Determine if button is number
    let action = this.dataset.action; //Determine if button !number

    //Track 2 most recent button presses
    if (btnPress.length < 2) {
      btnPress.push(this);
    } else {
      btnPress.shift();
      btnPress.push(this);
    }

    //Main functionality  
    if (num) {
      if (display.innerText === "0" || 
          btnPress[0].className === "opKey") {
        display.innerText = this.innerText; //Replace initial 0
      } else {
        display.innerText += this.innerText; //Concat next numbers
      }
    } else if (action === "decimal") {
        if (!display.innerText.match(/\./) && //Check for existing dec.
            btnPress[0].className != "opKey" && //Check user isn't entering new number
            btnPress[0].id != "calc") { //Check user didn't last press "calc"
          display.innerText += this.innerText;
        } else if (btnPress[0].className === "opKey") { //Allow new number to begin with decimal
            display.innerText = "";
            display.innerText += "0" + this.innerText;
        } else if (btnPress[0].id === "calc") { //Clear all data if last button was "calc"
          num1 = undefined;
          num2 = undefined;
          oper = undefined;
          btnPress = [];
          display.innerText = "";
          display.innerText += "0" + this.innerText;
        }  
    } else if (action === "add" ||
               action === "subtract" ||
               action === "multiply" ||
               action === "divide") {
        if (num1 === undefined ||
            btnPress[0].id === "calc") { //Allow new calc from calc'd fig
          num1 = display.innerText;
          oper = action;
        } else {
            num2 = display.innerText;
            num1 = calculate(num1, num2, oper);
            oper = action;
          }
      } else if (action === "clear") {
          num1 = undefined;
          num2 = undefined;
          oper = undefined;
          btnPress = [];
          store = [];
          display.innerText = "0";
      } else if (action === "calculate") {
          if (btnPress[0].id != "calc") {
            num2 = display.innerText;
            display.innerText = calculate(num1, num2, oper);
          } else { //Handle successive "calc"  presses
              num1 = display.innerText;
              display.innerText = calculate(num1, num2, oper);
          }  
      }
  })
}