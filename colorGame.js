var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");
var winaudio = new Audio('audio1.mp3');
var loseaudio = new Audio('audio2.mp3');



init();

function init(){
  // mode buttons event listeners
  setUpModeButtons();
  setUpSquares();
reset();
}


function setUpModeButtons(){
for(i=0; i < modeButtons.length; i++){
  modeButtons[i].addEventListener("click", function(){
  modeButtons[0].classList.remove("selected");
  modeButtons[1].classList.remove("selected");
  modeButtons[2].classList.remove("selected");
  this.classList.add("selected"); 
  
  numSquares = getNumberOfSquares(this.textContent);
  reset();
  });
}   
}

function getNumberOfSquares(difficultyLevelStr) {
  switch (difficultyLevelStr) {
    case 'Hard':
      return 6;
    case 'Medium':
      return 5;
    case 'Easy':
    default:
      return 3;
  }
}

function setUpSquares(){
for(i= 0; i<squares.length; i++){
  squares[i].addEventListener("click", function(){
    var clickedColor = this.style.backgroundColor;
    if(clickedColor === pickedColor){
        winaudio.play();
       messageDisplay.textContent = "Correct";
      resetButton.textContent = "Play Again?";
       changeColors(clickedColor);
      h1.style.background = clickedColor;
    }else{
        loseaudio.play();
      this.style.background = "#455166";
      messageDisplay.textContent = "Try again";
    }
  });
}
  
}



function reset(){
// generate all new colors
  colors = generateRandomColors(numSquares);
//pick a new random color from array
  pickedColor =  pickColor();
//change colorDisplay to match picked Color
 colorDisplay.textContent = pickedColor;
 resetButton.textContent = "New Colors";
 messageDisplay.textContent = "";
// change colors of squares
  for(i=0; i<squares.length;i++){
    if(colors[i]){
     squares[i].style.display = "block";
     squares[i].style.background = colors[i]; 
    }else{
      squares[i].style.display = "none";
    }
    
  }
  h1.style.background = "steelblue";   
}

resetButton.addEventListener("click", function(){
reset();
});



function changeColors(color){
  for(i = 0; i < squares.length; i++){
    squares[i].style.background = color;
  }
}

function pickColor(){
  var random = Math.floor(Math.random()* colors.length);
  return colors[random];
}

function generateRandomColors(num){
  var arr =[];
  for(var i= 0; i<num;i++){
    arr.push(randomColor())
  }
  return arr;
}

function randomColor(){
var r =  Math.floor(Math.random() * 256);
var g = Math.floor(Math.random() * 256);
var b = Math.floor(Math.random() * 256);
return "rgb("+r+", "+g+", "+b+")";  
}

