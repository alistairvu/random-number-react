import React from "react";
import Display from "./Display";

const numApi =
  "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      answer: 0,
      guess: 0,
      prize: 11000,
      status: "Guess a number from 1 to 100!",
      guessed: false,
      disabled: false,
      turns: 8,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const numResponse = await fetch(numApi);
    const numText = await numResponse.text();
    this.setState({
      loading: false,
      answer: parseInt(numText),
    });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ guess: event.target.value });
  }

  handleClick(event) {
    event.preventDefault();
    this.setState((state) => ({
      turns: state.turns - 1,
      prize: state.prize - 1000,
    }));
    if (this.state.turns === 1 && this.state.guess !== this.state.answer) {
      this.setState({
        status: "Game over",
        disabled: true,
      });
    }

    if (this.state.guess < this.state.answer) {
      this.setState({ status: "Too low!" });
    } else if (this.state.guess > this.state.answer) {
      this.setState({ status: "Too high!" });
    } else {
      this.setState({ status: "Correct!", guessed: true, disabled: true });
    }
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    } else {
      return (
        <Display
          state={this.state}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
        />
      );
    }
  }
}

export default App;
