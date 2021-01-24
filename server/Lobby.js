let lobbies = [];

/*

the lobby is responsible for the socket room and the connected clients
this means it should have the game object
connected clients as well as sending the information to the clients

*/

class Lobby {
  constructor(room) {
    this.clients = {};
    this.room = room;
    this.game;
  }

  // initialization creates a game object
  init() {}

  // add users to lobby
  // as well as the lobbies game
  addClient() {}

  // sends the lobby data
  // users and game state
  // to the lobby
  sendDataToClient() {}
}
