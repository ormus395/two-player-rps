// start game should emit gamestart to the server
// add events to the buttons
// and create game object
function startGame(e) {
  e.preventDefault();
  let rounds = document.getElementById("rounds").value;
  let throwTime = document.getElementById("throw-time").value;
  console.log("game started");
  // grab the values of the
  console.log(rounds, throwTime);

  // emit game start,
  socket.emit("gameStart", { rounds, throwTime });
}

// adds events to the buttons

// game will have the rounds,
// throw time
// and general game loop

function addCircleEvents() {
  let handTypes = document.querySelectorAll(".circle");

  handTypes.forEach((handType) => {
    handType.addEventListener("click", function (e) {
      socket.emit("handPicked", { handType: e.target.classList[1] });
      // build new part of UI
      // its your choice, then other players choice
      choice = e.target.classList[1];
      console.log(choice);
      buildPickedScreen();
    });
  });
}
