// function createElement(parent, type) {
//    let element = document.createElement(type);

//    parent.appe
// }

function buildInviteLink(room) {
  let header = document.getElementById("header");
  let p = document.createElement("p");
  p.textContent = `Send link to friend: ${document.URL}?${room}`;
  p.id = "link";
  header.appendChild(p);
}

function buildLobbyList(users) {
  // create a ul,
  // create a list item for each user
  // return the ul
  // this will appench to inner div

  // check to see of the lobby list already exists
  if (document.getElementById("lobby-list")) {
    document.getElementById("lobby-list").remove();
  }

  let ul = document.createElement("ul");
  ul.id = "lobby-list";
  users.forEach((user) => {
    let li = document.createElement("li");
    li.textContent = user.username;

    ul.appendChild(li);
  });

  main.appendChild(ul);
}

function buildLobbyForm() {
  // room created, user joined

  // build the lobby form ui
  login.style.display = "none";
  document.getElementById("login-container").style.display = "none";
  // build lobby

  // form should only be visible to lobby owner
  // will figure out how to add that later
  let form = document.createElement("form");
  form.id = "lobby-settings";
  form.innerHTML = `
      <label for="rounds">Rounds:</label>
      <select name="rounds" id="rounds">
         <option value="1">1</option>
         <option value="3">3</option>
         <option value="5">5</option>
      </select>
      <label for="throw-time">Throw time in seconds:</label>
      <select name="throw-time" id="throw-time">
         <option value="3">3</option>
         <option value="5">5</option>
         <option value="7">7</option>
      </select>
      <button onclick=startGame(event) type="submit" id="start-game">Start Game</button>
     `;
  main.appendChild(form);
}

function buildGameBoard() {
  document.getElementById("lobby-settings").style.display = "none";
  document.getElementById("lobby-list").style.display = "none";
  document.getElementById("link").style.display = "none";

  let scoreboard = document.createElement("div");
  scoreboard.id = "scoreboard";

  let users = ["userOne", "userTwo"];

  for (let i = 0; i < users.length; i++) {
    let p = document.createElement("p");
    p.textContent = user[i];

    scoreboard.appendChild(p);
  }
}
