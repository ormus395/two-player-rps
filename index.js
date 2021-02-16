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

let port = process.env.PORT || 3001;

const CONSTANTS = require("./lib/constants");
const UTILS = require("./server/util");

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

  let testLobby = new Lobby("name");
  testLobby.addPlayer("test player", socket);
  testLobby.createGame(3, 5);

  socket.onAny((event, ...args) => {
    console.log(event, ...args);
  });

  socket.on("test", (data) => {
    console.log(data);
  });
  // when the client emits a create lobby event, create a new lobby

  socket.on(CONSTANTS.createLobby, (data) => {
    console.log(data);
    console.log(UTILS.createRandomString());

    let name = UTILS.createRandomString();
    let newLobby = new Lobby(name);

    lobbies.push(newLobby);

    newLobby.addPlayer(data, socket);

    console.log(newLobby);
    console.log(lobbies);

    socket.join(newLobby.name);

    // need to emit to client that the lobby was created
    socket.emit(CONSTANTS.lobbyCreated, {
      self: newLobby.getPlayerById(socket.id),
      oponent: null,
      lobbyName: newLobby.name,
    });
  });

  // need a listener for player joining an existing lobby
  socket.on(CONSTANTS.joinLobby, (username, lobbyName) => {
    // look to see if lobby exists
    let lobby = null;
    lobbies.forEach((lob) => {
      if (lob.name === lobbyName) lobby = lob;
    });
    // if lobby exists
    if (lobby) {
      if (lobby.getClients().length === 2) {
        // no join
        socket.emit(CONSTANTS.lobbyFull); // emit to the client that the lobby is full
        // dont add player to existing lobby
      } else {
        lobby.addPlayer(username, socket);
        // when the player is added, should emit to the everyone in the lobby
        // this will allow both clients to update properly
        io.in(lobby.name).emit(CONSTANTS.playerJoined);
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

    io.in(lobby.name).emit(CONSTANTS.gameStart, lobby.game);
  });

  socket.on(CONSTANTS.playerAction, (handtype) => {
    lobbies.forEach((l) => {
      if (socket.id === l.getPlayerById(socket.id)) {
        l.onPlayerAction(socket.id, handtype);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log("listening on " + port);
});
