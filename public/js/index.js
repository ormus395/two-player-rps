let socket = io();

// state should be the self player
// oponent
// game state
// maybe room to send the room to the other player
let state = {};

let form = document.getElementById("form");
let input = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (input.value) {
    socket.emit("createLobby", input.value);

    input.value = "";
  }
});

socket.on("lobbyCreated", (currentState) => {
  // on lobby creation, update state to match that of what the server wants the client to know
  // rebuild ui to lobby ui
  console.log("lobby was created");
  console.log(currentState);

  state = currentState;
});

// need a listener for player joined to lobby

// need a listener for game creation

// need a listener for game state update
