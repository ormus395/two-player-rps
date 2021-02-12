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

const CONSTANTS = require("./lib/constants");
const UTILS = require("./server/util");
// const Room = require("./Room");

const Lobby = require("./server/Lobby");
app.use(bodyParser.json());
app.use(express.static("public"));

let lobbies = [];
// send index html to client
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "public/index.html"));
});

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
      oponent: null,
      room: newLobby.room,
    });
  });

  // need a listener for player joining an existing lobby
  socket.on(CONSTANTS.joinLobby, (username, room) => {
    // look to see if room exists
    let lobby = null;
    lobbies.forEach((lob) => {
      if (lob.room === room) lobby = lob;
    });
    // if room exists
    if (lobby) {
      if (lobby.getClients().length === 2) {
        // no join
        socket.emit(CONSTANTS.lobbyFull); // emit to the client that the lobby is full
        // dont add player to existing lobby
      } else {
        lobby.addPlayer(username, socket);
        // when the player is added, should emit to the everyone in the room
        // this will allow both clients to update properly
        io.in(lobby.room).emit(CONSTANTS.playerJoined);
      }
    } else {
      socket.emit(CONSTANTS.noLobby);
    }
  });

  // start the game, this sends the client an event
  // to rewrite the ui
  // also use this event to create the server game object
  socket.on(CONSTANTS.gameStart, (gameState) => {
    // create the game by the lobby
    // the lobby has the connected players,
    // find lobby by socket id
    let playerId = socket.id;
    let lobby;

    lobbies.forEach((l) => {
      if (l.getPlayerById().id === playerId) {
        lobby = l;
      }
    });

    lobby.createGame(gameState.rounds, gameState.throwTime);

    io.in(lobby.room).emit(CONSTANTS.gameStart, lobby.game);
  });

  socket.on(CONSTANTS.playerAction, (handtype) => {
    // get the lobby the player is connected to
    // determine if the hand type is legit
    // if it is, update the game state to match
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(3000, () => {
  console.log("listening on 3000");
});
