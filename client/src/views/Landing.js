import { useState } from "react";

const Landing = (props) => {
  const [values, setValues] = useState({
    username: "",
    rounds: "1",
    throwTime: "3",
    lobby: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.id === "join") {
      props.handleLobbyJoin({
        username: values.username,
        lobby: values.lobby,
      });
    } else {
      props.handleLobbyCreate({
        username: values.username,
        rounds: values.rounds,
        throwTime: values.throwTime,
      });
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Rock Paper Scissors</h1>

      <div>
        <form id="create" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="username">Enter username: </label>
          <input
            name="username"
            type="text"
            value={values.username}
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor="rounds">Enter rounds: </label>
          <select
            name="rounds"
            id="rounds"
            value={values.rounds}
            onChange={(e) => handleChange(e)}
          >
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
          </select>
          <label htmlFor="throwTime">Select time limit for throw: </label>
          <select
            name="throwTime"
            id="throwTime"
            onChange={(e) => handleChange(e)}
            value={values.timer}
          >
            <option value="3">3 Seconds</option>
            <option value="5">5 Seconds</option>
            <option value="7">7 Seconds</option>
          </select>
          <button>Create Lobby</button>
        </form>
        <p>Or</p>
        <form id="join" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="join">Join Lobby</label>
          <input
            type="text"
            name="lobby"
            value={values.lobby}
            placeholder="Lobby name"
            onChange={(e) => handleChange(e)}
          />
          <button>Join</button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
