// things to do onload
// check the url for an existing search param

// if search param, the link can from a friend from existing lobby
// this will determine fetch data and params later

// need to grab form and its data

// create necessary data

/*
TODOS:
   need to finish lobby UI
   create connection URI for friend
   update lobby list when friend connects
   create start game
   update ui to game when game is started
*/

let state = {
  users: [],
};
let socket = io();
let url = document.location;
let login = document.getElementById("login");
let main = document.getElementById("main");

login.addEventListener("submit", (e) => {
  e.preventDefault();

  let nameValue = document.getElementById("name").value;

  // determine if this is an existing lobby uri
  // if existing lobby uri
  // fetch data from the server
  // connect to the lobby
  // build the ui from server data

  // else
  // let user (for now) create a private room
  // create lobby from server information
  // create ui and sharable link

  if (url.search.split("?")[1]) {
    joinLobby(nameValue);
  } else {
    createNewLobby(nameValue)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        let { user } = json;
        let { room } = json;
        // get user object from server, save on client end
        // get room from server to create shareable link
        // get room to join from server response
        // will return in room key in json object
        socket.emit("joinRoom", { user: user, room: room });
      });
  }
});

// once the user has connected to the room, rebuild UI
// get rid of form, create lobby rules form
// add space to show connected users
// create join link
socket.on("user connected", function (msg) {
  console.log(
    `user: ${msg.user.username} with id: ${msg.user.id} has connected to this room: ${msg.room}`
  );

  login.style.display = "none";
  // build lobby
  let form = document.createElement("form");
  form.id = "lobby-settings";

  form.innerHTML = `
   <label for="rounds">Rounds:</label>
   <select name="rounds" id="rounds">
      <option value="1">1</option>
      <option value="3">3</option>
      <option value="5">5</option>
   </select>
   <label for="throw-time">Throw time in seconds:</label>
   <select name="throw-time" id="throw-time">
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="7">7</option>
   </select>
   <button type="submit" id="lobby-button">Start Game</button>
  `;

  main.appendChild(form);
});

function createNewLobby(nameValue) {
  // get the name from the new user
  // send data to the server
  return fetch("/create-room", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nameValue }),
  });
}

function joinLobby(nameValue) {
  let data = {
    name: nameValue,
    lobby: url.search.split("?")[1],
  };
  return fetch("/rps", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
