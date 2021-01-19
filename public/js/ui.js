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

function buildScoreboard(users) {
  let lobbySettings = document.getElementById("lobby-settings");
  let lobbyList = document.getElementById("lobby-list");
  let link = document.getElementById("link");
  if (lobbySettings) {
    lobbySettings.style.display = "none";
  }

  if (lobbyList) {
    lobbyList.style.display = "none";
  }

  if (link) {
    link.style.display = "none";
  }

  let scoreboard = document.createElement("div");
  scoreboard.id = "scoreboard";
  scoreboard.classList.add("flex", "container");

  for (let i = 0; i < users.length; i++) {
    let div = document.createElement("div");
    div.id = users[i].username;

    let p = document.createElement("p");
    p.textContent = users[i].username;
    div.appendChild(p);

    p = document.createElement("p");
    p.id = users[i].username + "-score";
    p.textContent = "0";

    div.appendChild(p);

    scoreboard.appendChild(div);
  }

  main.appendChild(scoreboard);
}

function buildGameBoard() {
  let gameBoard = document.createElement("div");
  gameBoard.classList.add("container", "flex", "jc-center", "gameBoard");
  gameBoard.innerHTML = `
    <div class ="handtypes">
      <div class="flex">
        <div class="circle rock"></div>
        <div class="circle paper"></div>
      </div>
      <div class="flex jc-center">
        <div class="circle scissors"></div>
      </div>
    </div>
  `;

  main.appendChild(gameBoard);
}

function buildProgressBar() {
  let progress = document.querySelector(".progress");

  let interval;
  let timer = 0;

  function changeProgress() {
    interval = setInterval(increase, 1000);
  }

  function increase() {
    if (timer === 2) {
      clearInterval(interval);
    }
    if (progress.style.width.length < 1) {
      progress.style.width = "34%";
    } else {
      let width = progress.style.width.split("%")[0];
      let wNumber = parseInt(width);
      wNumber += 34;
      progress.style.width = `${wNumber}%`;
      console.log(width);
    }
    timer++;
  }

  changeProgress();
}

function buildPickedScreen() {
  document.querySelector(".handtypes").style.display = "none";

  let gameBoard = document.querySelector(".gameBoard");
  gameBoard.innerHTML = `
    <div>
      <h3>You picked</h3>
      <div class="choice circle ${choice}"></div>
    </div>
    <div>
      <h3>Your oppenent picked</h3>
      <div class="opponent circle"></div>
    </div>
  `;
}
