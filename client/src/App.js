import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

import Landing from "./views/Landing";
import Game from "./views/Game";
import Lobby from "./views/Lobby";

function App() {
  // app state
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  let [state, setState] = useState({
    self: null,
    oponent: null,
    gameState: {},
    gameStarted: false,
    view: "landing",
    lobbyName: "",
  });

  useEffect(() => {
    setSocket(io({ autoConnect: false }));
  }, []);

  useEffect(() => {
    console.log("I have been called, I am useEffect with socket listeners");
    if (!socket) return;

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    // socket will emmit the creation of the lobby,
    // send the player object (self), openent, lobby name, and game state and other
    // connected players

    socket.on("lobbyCreated", (data) => {
      console.log(data);
      let { self, lobbyName, game } = data;

      setState({
        ...state,
        self,
        lobbyName,
        game,
        view: "lobby",
      });
    });

    socket.on("playerJoined", (data) => {
      console.log("player joined");
      console.log(data);
    });

    // return function () {
    //   socket.offAny((event, ...args) => {
    //     console.log(event, args);
    //   });
    // };
  });

  const handleLobbyCreate = (data) => {
    console.log(data);
    socket.connect();
    socket.emit("createLobby", data);
  };

  const handleLobbyJoin = (data) => {
    console.log(data);

    socket.connect();
    socket.emit("playerJoined", data);
  };

  let currentView = null;

  switch (state.view) {
    case "landing":
      currentView = (
        <Landing
          handleLobbyCreate={handleLobbyCreate}
          handleLobbyJoin={handleLobbyJoin}
        />
      );
      break;
    case "game":
      currentView = <Game />;
      break;
    case "lobby":
      currentView = (
        <Lobby
          lobbyState={{
            self: state.self,
            openent: state.oponent,
            game: state.game,
            lobbyName: state.lobbyName,
          }}
        />
      );
      break;
    default:
      currentView = <Landing />;
  }
  return <div>{currentView}</div>;
}

export default App;
