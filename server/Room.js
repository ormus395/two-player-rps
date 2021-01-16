class Room {
  constructor(name) {
    this.name = name;
    this.users = [];
  }

  get userCount() {
    return this.users.length;
  }

  addUser(user) {
    if (this.userCount === 2) {
      return;
    } else {
      this.users.push(user);
    }
  }
}

module.exports = Room;
