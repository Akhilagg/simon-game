var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var gameStarted=false;
var level=0;

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

$(document).keypress(function(){
  if(gameStarted===false){
    $("h1").html("level "+ level);
    nextSequence();
    gameStarted=true;
  }

});


function nextSequence(){
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  // console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").html("level "+ level);
  userClickedPattern=[];
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("failure");
    var audio1=new Audio("sounds/wrong.mp3");
    audio1.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over,Press any key to restart");
    startOver();
  }

}

function startOver(){
  level=0;
  gamePattern=[];
  gameStarted=false;

}
$(".btn").on("click",function(){
  var userChosenColour=$(this).attr("id");
  // console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern.length-1);
});
