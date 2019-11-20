import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import SButton from "./components/button";
import ScoreInput from "./components/scoreInput";
import TableHead from "./components/tableHead";
import TableBottom from "./components/tableBottom";
import ScoreRow from "./components/scoreRow";
import uuid from "uuid";
import Head from "./components/head";

import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";
import "./styles.css";

const InputCell = styled.div`
  min-width: 50px;
`;

const MessageDiv = styled.div`
  display: ${props => (props.display ? "block" : "none")};
`;

export default class App extends React.Component {
  state = {
    round: 0,
    ongoingRound: 1,
    roundComplete: false,
    gameNumber: 0,
    gameState: "call",
    label: "Record Calls",
    playerNames: ["p1", "p2", "p3", "p4"],
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    allowClick: true,
    errorInInput: false,
    errorMessages: []
  };
  rounds = { p1: [], p2: [], p3: [], p4: [] };
  playerCalls = [];
  playerScores = [];
  processedScores = [];

  newRound = () => {
    this.setState({
      ongoingRound: this.state.roundComplete
        ? this.state.ongoingRound + 1
        : this.state.ongoingRound,
      round: this.state.round + 1,
      roundComplete: false,
      gameNumber: 0,
      gameState: "call",
      label: "Record Calls",
      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
      allowClick: true,
      errorMessages: [],
      errorInInput: false
    });
    this.playerCalls = [];
    this.playerScores = [];
    this.processedScores = [];
  };

  isValid = ar => {
    ar = ar.map(el => Number(el));
    let [minimum, maximum, total] =
      this.state.gameState === "call" ? [1, 8, 32] : [0, 13, 13];
    let inputType = this.state.gameState === "call" ? "calls" : "hands";
    let allErrorMessages = [
      "each input for " + inputType + " must be an integer.",
      "each input for " +
        inputType +
        " must be greater than than " +
        minimum +
        ".",
      "each input for " + inputType + " must be smaller than " + maximum + ".",
      this.state.gameState === "call"
        ? "total of calls must be smaller than " + total + "."
        : "total of hands must be equal to 13."
    ];
    let check = [];
    let errorMessages = [];
    check.push(ar.some(el => !Number.isInteger(el)));
    check.push(ar.some(el => el < minimum));
    check.push(ar.some(el => el > maximum));

    if (this.state.gameState === "call") {
      check.push(ar.reduce((a, b) => a + b, 0) > total);
    } else {
      check.push(ar.reduce((a, b) => a + b, 0) !== total);
    }

    check.forEach((el, i) => {
      if (el) {
        errorMessages.push(allErrorMessages[i]);
      }
    });
    this.setState({ errorMessages: errorMessages });
    return !check.some(el => el);
  };

  processScores = (hands, calls) => {
    let processedScores = [];
    for (let i = 0; i < hands.length; i++) {
      if (Number(hands[i]) >= Number(calls[i])) {
        processedScores[i] =
          calls[i] + "." + (Number(hands[i]) - Number(calls[i]));
      } else {
        processedScores[i] = -1 * Number(calls[i]);
      }
    }
    return processedScores;
  };

  gameCount = 5;
  order = ["p1", "p2", "p3", "p4"];
  handleScoreInput = ar => {
    if (this.isValid(ar)) {
      this.setState({
        gameNumber: this.state.gameNumber + 1,
        errorInInput: false
      });
      let procScores = this.processScores(
        ar,
        this.playerCalls[this.playerCalls.length - 1]
      );
      this.playerScores.push(ar);
      this.processedScores.push(procScores);
      if (this.state.gameNumber < this.gameCount - 1) {
        this.setState({ label: "Record Calls" });
      } else {
        this.setState({
          label: "Round Over!!!",
          roundComplete: true,
          allowClick: false
        });

        let totals = this.processedScores.reduce(
          (r, a) =>
            a.map(
              (b, i) => Math.round((Number(r[i] || 0) + Number(b)) * 10) / 10
            ),
          []
        );
        totals.map((val, ind) => this.rounds[this.order[ind]].push(val));
      }
      this.setState({ gameState: "call" });
    } else {
      this.setState({ errorInInput: true });
    }
  };

  onPlayerNameChange = (id, name) => {
    let ind = ["p1-name", "p2-name", "p3-name", "p4-name"].findIndex(
      el => el === id
    );
    if ((name === "") | (name === undefined)) {
      console.log(`Player name for player ${ind + 1} is empty`);
    } else {
      let names = this.state.playerNames;
      names[ind] = name;
      this.setState({ playerNames: names });
    }
  };

  handleCallInput = ar => {
    if (this.isValid(ar)) {
      this.setState({
        gameState: "play",
        label: "Record Hands",
        errorInInput: false
      });
      this.playerCalls.push(ar);
    } else {
      this.setState({ errorInInput: true });
    }
  };

  handleClick = () => {
    if (this.state.label === "Round Over!!!") {
      return;
    }
    const { p1, p2, p3, p4 } = this.state;
    const userInput = [p1, p2, p3, p4];
    this.state.gameState === "call"
      ? this.handleCallInput(userInput)
      : this.handleScoreInput(userInput);
  };

  handleChange = (playerNum, value) => {
    this.setState({ [playerNum]: value });
  };

  render() {
    let rows = [];

    for (let i = 0; i < this.playerCalls.length; i++) {
      rows.push(
        <ScoreRow
          key={uuid.v4()}
          gameNumber={i}
          calls={this.playerCalls}
          processedScores={this.processedScores}
        />
      );
    }

    let allErrorMessages = [];
    for (let i = 0; i < this.state.errorMessages.length; i++) {
      allErrorMessages.push(
        <li key={uuid.v4()}>{this.state.errorMessages[i]}</li>
      );
    }

    return (
      <div className="App container mt-2">
        <Head />
        <h1 className="mb-2">
          Call Break <sup>&#x2660;</sup>
        </h1>
        <div style={{ minHeight: "calc(100vh - 150px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <SButton
              label={this.state.label}
              allowClick={this.state.allowClick}
              onClick={this.handleClick}
              type="primary"
            />
            <SButton
              label="New Round"
              allowClick={true}
              onClick={this.newRound}
              type="warning"
            />
          </div>
          <hr />
          <div className="grid-container">
            <TableHead
              playerNames={this.state.playerNames}
              onChange={this.onPlayerNameChange}
            />

            <Fragment key={"Round" + this.state.round}>
              <div
                style={{
                  textAlign: "center",
                  lineHeight: "18px"
                }}
              >
                Ongoing{" "}
                <span style={{ fontSize: "0.7em" }}>
                  (<i>Round {this.state.ongoingRound}</i>)
                </span>
              </div>
              <InputCell>
                <ScoreInput
                  id="p1"
                  gameState={this.state.gameState}
                  onChange={this.handleChange}
                />
              </InputCell>
              <InputCell>
                <ScoreInput
                  id="p2"
                  gameState={this.state.gameState}
                  onChange={this.handleChange}
                />
              </InputCell>
              <InputCell>
                <ScoreInput
                  id="p3"
                  gameState={this.state.gameState}
                  onChange={this.handleChange}
                />
              </InputCell>
              <InputCell>
                <ScoreInput
                  id="p4"
                  gameState={this.state.gameState}
                  onChange={this.handleChange}
                />
              </InputCell>
            </Fragment>
            {rows}
            <TableBottom processedScores={this.processedScores} />
          </div>
          <MessageDiv
            display={this.state.errorInInput}
            className="border border-danger mt-4 p-2"
          >
            <h4>Error. The input is not valid.</h4>
          </MessageDiv>
          <MessageDiv
            display={this.state.errorInInput}
            className="border border-warning mt-4 p-2"
          >
            <ul>{allErrorMessages}</ul>
          </MessageDiv>
        </div>
        <footer style={{ height: "60px", textAlign: "center" }}>
          Made by <a href="https://www.darshanbaral.com">Darshan</a>. Fork{" "}
          <a
            href="https://github.com/darshanbaral/callbreak"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </footer>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
