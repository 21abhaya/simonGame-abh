var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).on("keydown",function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
//Event Listener and callback for 'Button' Element
$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");//Inside the handler, you can use the keyword this to refer to the button object that triggered the click.
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});  

//Compares the result of User generated sequence with sequence created in the game itsel 
function checkAnswer(currentLevel){
      
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
     console.log("Success!");
    
    if (userClickedPattern.length === gamePattern.length){
     setTimeout(function(){
         nextSequence();},1000);
     }
    
    } else{
     console.log("Wrong!");
     playSound("wrong");

     $("body").addClass("game-over");
     setTimeout(function () {
        $("body").removeClass("game-over");
     }, 200);

     $("#level-title").text("Game Over, Press Any Key to Restart!");
     startOver();
    }                           

 }
//Calls for neext sequence after each level is completed
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor); 

}
    function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();  
    }

    function animatePress(currentColour){

        $("#" + currentColour).addClass("pressed");

        setTimeout(function(){
            $("#" + currentColour).removeClass("pressed");
    }, 100);
 }

   function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
   }




