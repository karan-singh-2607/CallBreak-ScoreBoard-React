import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Button from "./components/button";
import ScoreInput from "./components/scoreInput";
import TableHead from "./components/tableHead";
import TableBottom from "./components/tableBottom";
import ScoreRow from "./components/scoreRow";

import "./styles.css";

const InputCell = styled.td`
  min-width: 50px;
  border: 2px solid rgb(7, 104, 250);
`;

const ErrorDiv = styled.div`
  text-align: center;
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
    error: false
  };

  playerCalls = [];
  playerScores = [];
  processedScores = [];
  newGame = () => {
    this.setState({
      gameNumber: 0,
      gameState: "call",
      label: "Record Calls",
      allowClick: true
    });
    this.playerCalls = [];
    this.playerScores = [];
    this.processedScores = [];
  };

  isValid = (ar, minimum, maximum, total) => {
    let check = [];
    check.push(ar.some(el => isNaN(el)));
    check.push(ar.some(el => Number(el) < minimum));
    check.push(ar.some(el => Number(el) > maximum));
    check.push(ar.reduce((a, b) => Number(a) + Number(b), 0) > total);
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
    if (this.isValid(ar, 0, 13, 13)) {
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
    if (this.isValid(ar, 1, 8, 32)) {
      this.setState({
        gameState: "play",
        label: "Record Scores",
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
          key={"scoreRow-" + i}
          gameNumber={i}
          calls={this.playerCalls}
          processedScores={this.processedScores}
        />
      );
    }

    return (
      <div className="App">
        <header style={{ height: "60px" }}>
          <h1>callbreak</h1>
        </header>
        <div style={{ minHeight: "calc(100vh - 150px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              label={this.state.label}
              allowClick={this.state.allowClick}
              onClick={this.handleClick}
            />
            <Button label="New Game" allowClick={true} onClick={this.newGame} />
          </div>
          <hr />
          <table style={{ width: "90%", margin: "auto", minWidth: "300px" }}>
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
            <h3>Warning! The input is not valid.</h3>
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
