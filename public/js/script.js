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

let socket = io();
let url = document.location;
let login = document.getElementById("login");
let main = document.getElementById("main");

let lobbyUsers = [];
let user;

login.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById("name").value;

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
    // url includes room name,
    // get username and emit joinRoom event to join room on the server
    // server is looking for an object with username and a roomname
    // roomname is search param from the url
    //username from input
    let data = {
      username: username,
      room: url.search.split("?")[1],
    };

    console.log("url differnet");
    socket.emit("joinRoom", data);
  } else {
    console.log("url not diif");
    // emit createRoom event
    socket.emit("createRoom", username, (response) => {
      if (response.status === "ok") {
        buildLobbyForm();
        buildLobbyList(response.users);
        buildInviteLink(response.room);
        // div.innerHTML = `send this link to a friend: ${document.location}?${response.room}`;
        user = response.users[0];
      }
    });
  }
});

// once the user has connected to the room, rebuild UI
// get rid of form, create lobby rules form
// add space to show connected users
// create join link
socket.on("userJoined", function (data) {
  // this is called when a user joins a private lobby,
  // need to hide the login form,
  // build lobby
  document.getElementById("login-container").style.display = "none";
  buildLobbyList(data.users);
});

socket.on("gameStarted", function (data) {
  // data: users, game state
  console.log(data);
  // hide every element in main
  // create game board
  // create timer progress bar
  buildGameBoard();
});
