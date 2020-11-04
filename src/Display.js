import React from "react";

function Display(props) {
  let displayTurns = ``;
  if (props.state.turns > 0) {
    displayTurns = `You have ${props.state.turns} ${
      props.state.turns > 1 ? "turns" : "turn"
    } left.`;
  } else {
    displayTurns = `Game over! The number you had to guess was ${props.state.answer}.`;
  }
  return (
    <div>
      <h1>{props.state.status}</h1>
      <hr />
      <h3>{!props.state.guessed && displayTurns}</h3>
      <h3>
        {props.state.guessed &&
          `You have won $${props.state.prize}! Refresh to play again.`}
      </h3>
      <input
        type="number"
        onChange={props.handleChange}
        value={props.state.guess}
      />
      <br />
      <button
        className="btn btn-primary"
        onClick={props.handleClick}
        disabled={props.state.disabled}
      >
        Guess!
      </button>
    </div>
  );
}

export default Display;
