let socket = io();

// state should be the self player
// oponent
// game state
// maybe room to send the room to the other player
let state = {
  self: null,
  oponent: null,
  room: "",
};

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

  let main = document.getElementById("main");
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  createLobby();
  createRoomLink();
});

// need a listener for player joined to lobby

// need a listener for game creation

// need a listener for game state update

function createLobby() {
  let main = document.getElementById("main");

  let playerContainer = document.createElement("div");

  let self = document.createElement("div");
  self.innerText = state.self.username;
  playerContainer.appendChild(self);

  let oponent;
  if (state.oponent) {
    oponent = document.createElement("div");
    oponent.innerText = state.oponent.username;
    playerContainer.appendChild(oponent);
  }

  main.appendChild(playerContainer);
}

function createRoomLink() {
  if (state.room.length > 0) {
    let header = document.getElementById("header");

    let url = document.createElement("p");
    url.innerText = document.location + "?" + state.room;

    header.appendChild(url);
  }
}
