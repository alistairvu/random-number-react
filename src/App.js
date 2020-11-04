import React from "react";
import Display from "./Display";

const numApi =
  "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain";
const prizeApi =
  "https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      answer: 0,
      guess: 0,
      prize: 0,
      status: "Guess a number from 1 to 100!",
      guessed: false,
      disabled: false,
      turns: 5,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const numResponse = await fetch(numApi);
    const prizeResponse = await fetch(prizeApi);
    const numText = await numResponse.text();
    const prizeTest = await prizeResponse.text();
    this.setState({
      loading: false,
      answer: parseInt(numText),
      prize: parseInt(prizeTest) * 1000,
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
