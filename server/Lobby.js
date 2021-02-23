const CONSTANTS = require("../lib/constants");
const Game = require("./Game");
const Player = require("./Player");
/*

the lobby is responsible for the socket room and the connected clients
this means it should have the game object
connected clients as well as sending the information to the clients

*/

class Lobby {
  constructor(name, rounds, throwTime) {
    this.clients = {};
    this.players = [];
    this.name = name;
    this.game = this.createGame(rounds, throwTime);
  }

  getClients() {
    let clients = [];

    for (let client in this.clients) {
      clients.push(this.clients[client]);
    }

    return clients;
  }

  // initialization creates a game object
  createGame(rounds, throwTime) {
    return new Game(rounds, throwTime);
  }

  // add users to lobby
  // as well as the lobbies game
  addPlayer(name, socket) {
    this.clients[socket.id] = socket;
    this.game.addNewPlayer(name, socket.id);
  }

  getPlayerById(id) {
    return this.game.getPlayerById(id);
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
        clients[client].emit(CONSTANTS.roundEnd);
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
  update(event) {
    // emit to room the new game state
    for (let clientId in this.clients) {
      console.log(this);
      let currentPlayer = this.game.getPlayerById(clientId);
      let oppenent = this.game.getOpponent(clientId);

      this.clients[clientId].emit(event, {
        self: currentPlayer,
        opponent: oppenent,
        lobbyName: this.name,
        game: this.game,
      });
    }
  }
}

module.exports = Lobby;
