/*

for rock paper scissors, the player is responsible for the handtype
and their own score

the client chooses their own username

the client sends an intent to pick their own handtype
*/

class Player {
  constructor(id, username) {
    this.id = id; // socket id, unique to client/ connected socket
    this.username = username; // client creates their own

    this.handType = ""; // the client, during the game, will select their handtype
    this.score = 0; // updated each round based on round evaluation
  }

  updateHandtype(handType) {
    this.handType = handType;
  }

  // takes a string, win or loss
  // increment on win, leave alone on loss
  updateScore(result) {
    if (result === "win") {
      this.score++;
    }
  }
}

module.exports = Player;
