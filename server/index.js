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

// const Room = require("./Room");
const Game = require("./Game");
const Player = require("./Player");

app.use(bodyParser.json());
app.use(express.static("public"));

function filterByRoom(room) {
  // returns the users associated with the specific room
  return users.filter((user) => user.room === room);
}
// send index html to client
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "public/index.html"));
});

let socketOne = "im a socket id";
let socketTwo = "im another socket id";

let newGame = new Game();

newGame.addNewPlayer("Player One", socketOne);
newGame.addNewPlayer("Player Two", socketTwo);

function simRound() {
  // so the game loop would be,
  // start a round, this should start a timer ** like 5 secs **
  // where each player has 5 seconds to pick a hand
  // this after five seconds, the results are evaluated
  // results are saves then sent back to the client
  let playerOne = newGame.players[socketOne];
  let playerTwo = newGame.players[socketTwo];
  // start
  let start = setTimeout(() => {
    // evaluate the results of the round
    console.log(newGame);
    if (playerOne.handType > playerTwo.handType)
      console.log("Player One wins!");
    else console.log(playerOne.handType > playerTwo.handType);
  }, 3000);

  setTimeout(() => {
    newGame.onPlayerUpdate(socketOne, "1");
  }, 1000);
  setTimeout(() => {
    newGame.onPlayerUpdate(socketTwo, "2");
  }, 500);
}

simRound();

io.on("connection", (socket) => {});

http.listen(3000, () => {
  console.log("listening on 3000");
});
