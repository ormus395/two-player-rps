function startGame(e) {
  e.preventDefault();
  let rounds = document.getElementById("rounds").value;
  let throwTime = document.getElementById("throw-time").value;
  console.log("game started");
  // grab the values of the
  console.log(rounds, throwTime);

  // emit game start,
  socket.emit("gameStart", { rounds, throwTime });
}
