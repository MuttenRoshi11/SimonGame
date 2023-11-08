
var buttonColors = ["red", "blue", "green", "yellow"];

var randomColors = [];
var guessedColors = [];

var started = false;
var level = 0;

$(".start-button").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    $(".start-button").text("Playing...");
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var chosenColor = $(this).attr("id");
  clickedPattern.push(chosenColor);

  playSound(chosenColor);
  animatePress(chosenColor);

  checkAnswer(clickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (randomColors[currentLevel] === clickedPattern[currentLevel]) {
      if (clickedPattern.length === randomColors.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over :(. Let's play again!");
      $(".start-button").text("Restart the game");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  clickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  randomColors.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  randomColors = [];
  started = false;
}
