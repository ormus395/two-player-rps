/* todos:
   allow user to connect to existing room based on req query param
   if room is full tell client
   make endpoint for game rules
   create socket emits for RPS game
*/

/*
   room will have room name
   number of users connected

*/

const express = require("express");
const app = require("express")();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);
const bodyParser = require("body-parser");

const CONSTANTS = require("../lib/constants");
const UTILS = require("./util");
// const Room = require("./Room");

const Lobby = require("./Lobby");
const { constants } = require("buffer");
app.use(bodyParser.json());
app.use(express.static("public"));

let lobbies = [];
// send index html to client
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "public/index.html"));
});

// fuck timers for now
// players pick
// once both players have picked decrement rounds
// send round results over
// need to update the players score

// socket is the client
io.on("connection", (socket) => {
  console.log("A user connected " + socket.id);

  // when the client emits a create lobby event, create a new lobby

  socket.on(CONSTANTS.createLobby, (data) => {
    console.log(data);
    console.log(UTILS.createRandomString());

    let room = UTILS.createRandomString();
    let newLobby = new Lobby(room);

    lobbies.push(newLobby);

    newLobby.addPalyer(data, socket);

    console.log(newLobby);
    console.log(lobbies);

    socket.join(newLobby.room);

    // need to emit to client that the lobby was created
    socket.emit(CONSTANTS.lobbyCreated, {
      self: newLobby.getPlayerById(socket.id),
    });
  });

  // need a listener for player joining an existing lobby
  // need to emit player joined existing lobby

  socket.on("disconnect", () => {
    console.log("user connected");
  });
});

http.listen(3000, () => {
  console.log("listening on 3000");
});
