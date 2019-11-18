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
  height: 30px;
  border: 1px solid;
`;

const ErrorDiv = styled.div`
  color: red;
  display: ${props => (props.error ? "block" : "none")};
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
    error: false,
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
      error: false
    });
    this.playerCalls = [];
    this.playerScores = [];
    this.processedScores = [];
  };

  isValid = ar => {
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
    check.push(ar.some(el => !Number.isInteger(Number(el))));
    check.push(ar.some(el => Number(el) < minimum));
    check.push(ar.some(el => Number(el) > maximum));

    if (this.state.gameState === "call") {
      check.push(ar.reduce((a, b) => Number(a) + Number(b), 0) > total);
    } else {
      check.push(ar.reduce((a, b) => Number(a) + Number(b), 0) !== total);
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
      this.setState({ error: true });
    }
  };

  onPlayerNameChange = (id, name) => {
    let ind = ["p1-name", "p2-name", "p3-name", "p4-name"].findIndex(
      el => el === id
    );
    if ((name === "") | (name === undefined)) {
      console.log(name);
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
        error: false
      });
      this.playerCalls.push(ar);
    } else {
      this.setState({ error: true });
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
      <div className="App" style={{ maxWidth: "900px", marginTop: "5px" }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Callbreak</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="./images/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="./images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="./images/favicon-16x16.png"
          />
          <link rel="manifest" href="./images/site.webmanifest" />
        </Helmet>
        <header
          style={{
            display: "flex",
            alignItems: "flex-end",
            height: "60px",
            textAlign: "left",
            width: "100%"
          }}
        >
          <h1>
            Call Break <sup>&#x2660; {/*spade ♠*/}</sup>
          </h1>
        </header>
        <div style={{ minHeight: "calc(100vh - 150px)" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              label={this.state.label}
              allowClick={this.state.allowClick}
              onClick={this.handleClick}
            />
            <Button
              label="New Round"
              allowClick={true}
              onClick={this.newRound}
            />
          </div>
          <hr />
          <table>
            <TableHead
              playerNames={this.state.playerNames}
              onChange={this.onPlayerNameChange}
            />
            <tbody>
              <tr key={"Round" + this.state.round}>
                <td style={{ textAlign: "center", border: "solid 1px black" }}>
                  Ongoing{" "}
                  <span style={{ fontSize: "0.7em" }}>
                    (<i>Round {this.state.ongoingRound}</i>)
                  </span>
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
            <ul>{allErrorMessages}</ul>
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
