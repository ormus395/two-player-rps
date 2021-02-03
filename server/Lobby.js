const Game = require("./Game");
const Player = require("./Player");
/*

the lobby is responsible for the socket room and the connected clients
this means it should have the game object
connected clients as well as sending the information to the clients

*/

class Lobby {
  constructor(room) {
    this.clients = {};
    this.players = [];
    this.room = room;
    this.game;
  }

  // initialization creates a game object
  createGame(rounds, throwTime) {
    this.game = new Game(rounds, throwTime);
  }

  // add users to lobby
  // as well as the lobbies game
  addPalyer(name, socket) {
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

  // sends the lobby data
  // users and game state
  // to the lobby
  update() {
    // emit to room the new game state
  }
}

module.exports = Lobby;
