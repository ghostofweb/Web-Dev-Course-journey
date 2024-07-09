let gamePattern = [];

let buttonColors = ["red","blue","green","yellow"];

let userClickedPattern = [];

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
  
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed")
    setInterval(() => {
        $("#"+currentColor).removeClass("pressed")
    },100 );
  }
function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4)

let randomChooseColor = buttonColors[randomNumber];

gamePattern.push(randomChooseColor);
$("#"+randomChooseColor).fadeIn(100).fadeOut(150).fadeIn(100);
let audio = new Audio("sounds/"+randomChooseColor+".mp3");
audio.play();
}
$(document).keydown(function (e) { 
    
});