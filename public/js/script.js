// things to do onload
// check the url for an existing search param

// if search param, the link can from a friend from existing lobby
// this will determine fetch data and params later

// need to grab form and its data

// create necessary data
let state = {
  users: [],
};
let socket;
let url = document.location;
let login = document.getElementById("login");

login.addEventListener("submit", (e) => {
  e.preventDefault();

  let nameValue = document.getElementById("name").value;

  fetch("/rps", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nameValue }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json.nspUri);
      socket = io("/" + json.nspUri);

      console.log(socket);

      let body = document.querySelector("body");
      let div = document.createElement("div");
      let h3 = document.createElement("h3");

      h3.textContent = json.name;
      div.appendChild(h3);
      body.appendChild(div);

      div = document.createElement("div");
      let p = document.createElement("p");
      p.textContent = `Send this link to a friend: localhost:3000/rps?lobby=${json.nspUri}`;
      div.appendChild(p);
      body.appendChild(div);

      let btn = document.createElement("button");
      btn.id = "clickMe";
      btn.textContent = "Click me";
      btn.addEventListener("click", function (e) {
        ns.emit("button click", "A button was clicked");
      });
      body.appendChild(btn);
    })
    .catch((err) => {
      console.log(err);
    });
});

console.log(url.search.split("?"));

// determine if this is an existing lobby uri
// if existing lobby uri
// fetch data from the server
// connect to the lobby
// build the ui from server data
if (url.search.split("?")[1]) {
} else {
}

// else
// let user (for now) create a private room
// create lobby from server information
// create ui and sharable link

function createNewLobby() {
  // get the name from the new user
  // send data to the server
}

function joinLobby() {}
