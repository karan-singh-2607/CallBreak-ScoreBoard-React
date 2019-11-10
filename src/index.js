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

export default class App extends React.Component {
  state = {
    gameNumber: 0,
    gameState: "call",
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    label: "Record Calls"
  };

  playerCalls = [];
  playerScores = [];
  processedScores = [];

  validateCalls = calls => {
    let check = [];
    check.push(calls.some(call => Number(call) < 1));
    check.push(calls.some(call => Number(call) > 8));
    check.push(calls.reduce((a, b) => Number(a) + Number(b), 0) > 32);
    return !check.some(el => el);
  };

  validateScores = scores => {
    let check = [];
    check.push(scores.some(score => Number(score) < 0));
    check.push(scores.reduce((a, b) => Number(a) + Number(b), 0) > 13);
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

  gameLimit = 5;

  handleScoreInput = ar => {
    if (this.validateScores(ar)) {
      this.setState({ gameNumber: this.state.gameNumber + 1 });
      let procScores = this.processScores(
        ar,
        this.playerCalls[this.playerCalls.length - 1]
      );
      this.playerScores.push(ar);
      this.processedScores.push(procScores);
      if (this.state.gameNumber < this.gameLimit - 1) {
        this.setState({ label: "Record Calls" });
      } else {
        this.setState({ label: "New Game" });
      }
      this.setState({ gameState: "call" });
    } else {
      console.log("Scores not valid");
    }
  };

  handleCallInput = ar => {
    if (this.state.gameNumber >= this.gameLimit) {
      this.setState({
        gameNumber: 0
      });
      this.playerCalls = [];
      this.playerScores = [];
      this.processedScores = [];
    } else {
      if (this.validateCalls(ar)) {
        this.playerCalls.push(ar);
        this.setState({ gameState: "play", label: "Record Scores" });
      } else {
        console.log("Calls not valid");
      }
    }
  };

  handleInput = () => {
    if (this.state.label === "New Game") {
      return;
    }
    const { p1, p2, p3, p4 } = this.state;
    const userInput = [p1, p2, p3, p4];
    if (this.state.gameState === "call") {
      this.handleCallInput(userInput);
      /*
      if (this.state.gameNumber >= this.gameLimit) {
        this.setState({
          gameNumber: 0
        });
        this.playerCalls = [];
        this.playerScores = [];
        this.processedScores = [];
      } else {
        if (this.validateCalls(userInput)) {
          this.playerCalls.push(userInput);
          this.setState({ gameState: "play", label: "Record Scores" });
        } else {
          console.log("Calls not valid");
        }
      }*/
    } else {
      this.handleScoreInput(userInput);
      /*
      if (this.validateScores(userInput)) {
        this.setState({ gameNumber: this.state.gameNumber + 1 });
        let procScores = this.processScores(
          [p1, p2, p3, p4],
          this.playerCalls[this.playerCalls.length - 1]
        );
        this.playerScores.push(userInput);
        this.processedScores.push(procScores);
        if (this.state.gameNumber < this.gameLimit - 1) {
          this.setState({ label: "Record Calls" });
        } else {
          this.setState({ label: "New Game" });
        }
        this.setState({ gameState: "call" });
      } else {
        console.log("Scores not valid");
      }*/
    }
    console.log([
      this.state.gameState,
      this.state.gameNumber,
      this.state.label
    ]);
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
          <Button label="New Game" width="auto" />
          <hr />
          <table style={{ width: "90%", margin: "auto", minWidth: "300px" }}>
            <TableHead />
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <Button
                    label={this.state.label}
                    width="100%"
                    height="50px"
                    onClick={this.handleInput}
                  />
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
        </div>
        <footer style={{ height: "60px", textAlign: "center" }}>
          Made by Darshan
        </footer>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
