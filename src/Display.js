import React from "react";

function Display(props) {
  return (
    <div>
      <h1>{props.state.status}</h1>
      <h2>
        {props.state.turns > 0
          ? `You have ${props.state.turns} left.`
          : `Game over! The number you had to guess was ${props.state.answer}.`}
      </h2>
      <h2>
        {props.state.guessed &&
          `You have won $${props.state.prize}! Refresh to play again`}
      </h2>
      <input
        type="number"
        onChange={props.handleChange}
        value={props.state.guess}
      />
      <button onClick={props.handleClick} disabled={props.state.disabled}>
        Guess!
      </button>
    </div>
  );
}

export default Display;
