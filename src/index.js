import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Button from "./components/button";
import ScoreInput from "./components/scoreInput";
import TableHead from "./components/tableHead";
import TableBottom from "./components/tableBottom";
import ScoreRow from "./components/scoreRow";
import uuid from "uuid";
import { Helmet } from "react-helmet";

import "./styles.css";

const InputCell = styled.td`
  min-width: 50px;
  border: 1px solid rgb(7, 104, 250);
`;

const ErrorDiv = styled.div`
  color: red;
  display: ${props => (props.error ? "block" : "none")};
`;

export default class App extends React.Component {
  state = {
    gameNumber: 0,
    gameState: "call",
    label: "Record Calls",
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    allowClick: true,
    error: false,
    messages: []
  };

  playerCalls = [];
  playerScores = [];
  processedScores = [];
  newGame = () => {
    this.setState({
      gameNumber: 0,
      gameState: "call",
      label: "Record Calls",
      allowClick: true,
      messages: [],
      error: false
    });
    this.playerCalls = [];
    this.playerScores = [];
    this.processedScores = [];
  };

  isValid = ar => {
    let [minimum, maximum, total] =
      this.state.gameState === "call" ? [1, 8, 32] : [0, 13, 13];
    let valName = this.state.gameState === "call" ? "calls" : "hands";
    let allMessages = [
      "each input for " + valName + " must be an integer.",
      "each input for " +
        valName +
        " must be greater than than " +
        minimum +
        ".",
      "each input for " + valName + " must be smaller than " + maximum + ".",
      this.state.gameState === "call"
        ? "total of calls must be smaller than " + total + "."
        : "total of hands must be equal to 13."
    ];
    let check = [];
    let messages = [];
    check.push(ar.some(el => isNaN(el)));
    check.push(ar.some(el => Number(el) < minimum));
    check.push(ar.some(el => Number(el) > maximum));

    if (this.state.gameState === "call") {
      check.push(ar.reduce((a, b) => Number(a) + Number(b), 0) > total);
    } else {
      check.push(ar.reduce((a, b) => Number(a) + Number(b), 0) !== total);
    }

    check.forEach((el, i) => {
      if (el) {
        messages.push(allMessages[i]);
      }
    });
    this.setState({ messages: messages });
    return !check.some(el => el);
  };

  processScores = (scores, calls) => {
    let procScores = [];
    for (let i = 0; i < scores.length; i++) {
      if (Number(scores[i]) >= Number(calls[i])) {
        procScores[i] = calls[i] + "." + (Number(scores[i]) - Number(calls[i]));
      } else {
        procScores[i] = -1 * Number(calls[i]) + ".0";
      }
    }
    return procScores;
  };

  gameCount = 5;

  handleScoreInput = ar => {
    if (this.isValid(ar)) {
      this.setState({ gameNumber: this.state.gameNumber + 1, error: false });
      let procScores = this.processScores(
        ar,
        this.playerCalls[this.playerCalls.length - 1]
      );
      this.playerScores.push(ar);
      this.processedScores.push(procScores);
      if (this.state.gameNumber < this.gameCount - 1) {
        this.setState({ label: "Record Calls" });
      } else {
        this.setState({ label: "Game Over!!!", allowClick: false });
      }
      this.setState({ gameState: "call" });
    } else {
      this.setState({ error: true });
    }
  };

  handleCallInput = ar => {
    if (this.isValid(ar)) {
      this.setState({
        gameState: "play",
        label: "Record Hands",
        error: false
      });
      this.playerCalls.push(ar);
    } else {
      this.setState({ error: true });
    }
  };

  handleClick = () => {
    if (this.state.label === "Game Over!!!") {
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

    let errorMessages = [];
    for (let i = 0; i < this.state.messages.length; i++) {
      errorMessages.push(<li key={uuid.v4()}>{this.state.messages[i]}</li>);
    }

    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Callbreak</title>
        </Helmet>
        <header style={{ height: "60px", textAlign: "left", width: "100%" }}>
          <h1>Callbreak</h1>
        </header>
        <div style={{ minHeight: "calc(100vh - 150px)" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              label={this.state.label}
              allowClick={this.state.allowClick}
              onClick={this.handleClick}
            />
            <Button label="New Game" allowClick={true} onClick={this.newGame} />
          </div>
          <hr />
          <table>
            <TableHead />
            <tbody>
              <tr>
                <td style={{ textAlign: "center", border: "solid 1px black" }}>
                  ongoing
                </td>
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
              </tr>
              {rows}
              <TableBottom processedScores={this.processedScores} />
            </tbody>
          </table>
          <ErrorDiv error={this.state.error}>
            <h3>The input is not valid.</h3>
            <ul>{errorMessages}</ul>
          </ErrorDiv>
        </div>
        <footer style={{ height: "60px", textAlign: "center" }}>
          Made by <a href="https://www.darshanbaral.com">Darshan</a>
        </footer>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
