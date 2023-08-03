var colorSequence = ['red', 'yellow', 'green', 'blue'];
var gamePattern = [ ];
var userClickedPattern = [ ];
var started = true;
var level = 0;

$(document).keypress(function(){

    if(started){

        $('#level-title').text("Level " + level);
        nextSequence();
    }
    
    started = false;


});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);

};


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length){
          setTimeout(function () {
              nextSequence();
            }, 1000);
          }
        } else {
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $('body').addClass('game-over');
            setTimeout(function(){
                $('body').removeClass('game-over');
            }, 100);
            $('#level-title').text('Game over, Press a key to Restart');
            startOver();
          
        }
};

function nextSequence(){

    userClickedPattern = [ ];
    level++;
    $('#level-title').text("Level " + level);
    var n = Math.random();
    randomNumber = n * 4;
    randomNumber = Math.floor(randomNumber);
    var randomColor = colorSequence[randomNumber];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
};

function startOver(){
    level = 0;
    gamePattern = [];
    started = true;

};


