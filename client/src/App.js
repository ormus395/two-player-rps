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
  });

  useEffect(() => {
    setSocket(io({ autoConnect: false }));
  }, []);

  useEffect(() => {
    console.log("I have been called");
    if (!socket) return;

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    return function () {
      socket.offAny((event, ...args) => {
        console.log(event, args);
      });
    };
  });

  const handleLobbyCreate = (data) => {
    console.log(data);
    // socket.emit("createLobby", {});
  };

  const handleLobbyJoin = (data) => {
    console.log(data);
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
      currentView = <Lobby />;
      break;
    default:
      currentView = <Landing />;
  }
  return <div>{currentView}</div>;
}

export default App;
