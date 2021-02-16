const Game = require("./Game");
const Player = require("./Player");
/*

the lobby is responsible for the socket room and the connected clients
this means it should have the game object
connected clients as well as sending the information to the clients

*/

class Lobby {
  constructor(name) {
    this.clients = {};
    this.players = [];
    this.name = name;
    this.game;
    this.round; // this might be the time variable
  }

  // initialization creates a game object
  createGame(rounds, throwTime) {
    this.game = new Game(rounds, throwTime);
  }

  // add users to lobby
  // as well as the lobbies game
  addPlayer(name, socket) {
    this.clients[socket.id] = socket;
    this.players.push(new Player(socket.id, name));
  }

  getPlayerById(id) {
    let player = null;
    this.players.forEach((p) => {
      if (p.id === id) {
        player = p;
      }
    });

    return player;
  }

  createGame(rounds, throwTime) {
    let newGame = new Game(rounds, throwTime);
    for (let i = 0; i < this.players.length; i++) {
      newGame.addNewPlayer(this.players[i]);
    }

    this.game = newGame;
    this.startRound();
  }

  onPlayerAction(id, handType) {
    // get player by id
    // update the player hand type
    this.game.onPlayerUpdate(id, handType);
  }

  startRound() {
    // create an interval to act as the round loop
    // the interval will be set to the throw time
    // this should also allow for listening to player actions
    // each second send the current game state, and the time left to select the handtype

    // an interval probably wont work
    // a timeout should be fine for this
    let clients = this.clients;
    let rounds = this.game.rounds;

    let timeOut = setTimeout(function () {
      for (let client in clients) {
        clients[client].emit("test round", "this is a test");
      }
    }, this.game.throwTime * 1000);
    // let interval = setInterval(function () {
    //   if (rounds === 1) {
    //     clearInterval(interval);
    //   }
    //   for (let client in clients) {
    //     clients[client].emit("test round", "this is a test");
    //   }
    //   rounds--;
    // }, this.game.throwTime * 1000);
  }

  endRound() {}

  // sends the lobby data
  // users and game state
  // to the lobby
  update() {
    // emit to room the new game state
  }
}

module.exports = Lobby;
