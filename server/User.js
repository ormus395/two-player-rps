class User {
  constructor(id, username, room, isRoomOwner) {
    this.id = id;
    this.username = username;
    this.room = room;
    this.isRoomOwner = isRoomOwner;
  }
}

module.exports = User;
