var gamePattern = []
var buttonColours = ["red", "blue", "green", "yellow"]
var userClickedPattern = []


var level = 0
var started = false



$("body").on("keydown", function() {
  if (!started) {
    nextSequence();
    started = true;

  }

});




function nextSequence() {
  level++
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  $("h1").text("Level " + level)


}



$("div.btn").on("click", function(event) {
  var userChosenColour = event.target.id;
playSound(userChosenColour)
  animatePress(userChosenColour)
  userClickedPattern.push(userChosenColour)
  checkAnswer(userClickedPattern.length - 1)

})

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play()
}

function animatePress(currentColor) {
  $("div#" + currentColor).addClass("pressed")
  setTimeout(function() {
    $("div.btn").removeClass("pressed");

  }, 100);
}





function checkAnswer(x) {

  if (userClickedPattern[x] === gamePattern[x]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()

      }, 1000);
      userClickedPattern = []
      console.log("works")

    } else {
      console.log("keep going")
    }




  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over")

    }, 200);
    $("h1").text("GAME OVER, press any key to restart")
    restart();

  }

}

function restart() {
  started = false
  gamePattern = []
  level= 0
  userClickedPattern = []
}
