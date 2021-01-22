class Player {
  constructor(id, username, room) {
    this.id = id;
    this.username = username;

    this.handtype = "";
    this.score = 0;
  }

  updateHandtype(data) {}
}

module.exports = Player;
