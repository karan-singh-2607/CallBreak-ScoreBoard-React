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
import Overlay from "./components/overlay";
import Footer from "./components/footer";

import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";
import "./styles.css";

const InputCell = styled.div`
  min-width: 50px;
`;

const MessageDiv = styled.div`
  border-radius: 5px;
  display: ${props => (props.show ? "block" : "none")};
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
    errorMessages: [],
    warningMessages: "",
    showOverlay: false
  };
  rounds = { p1: [], p2: [], p3: [], p4: [] };
  playerCalls = [];
  playerScores = [];
  processedScores = [];
  gameCount = 5;
  order = ["p1", "p2", "p3", "p4"];

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
      errorInInput: false,
      showOverlay: false
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
    hands = hands.map(el => Number(el));
    calls = calls.map(el => Number(el));
    let processedScores = [];
    for (let i = 0; i < hands.length; i++) {
      if (hands[i] >= calls[i]) {
        processedScores[i] = calls[i] + "." + (hands[i] - calls[i]);
      } else {
        processedScores[i] = -1 * calls[i];
      }
    }
    return processedScores;
  };

  handleScoreInput = ar => {
    if (this.isValid(ar)) {
      if (ar.some(el => el >= 8)) {
        let callsForThisGame = this.playerCalls[this.playerCalls.length - 1];
        callsForThisGame = callsForThisGame.map(el => Number(el));
        let callsGeEight = [callsForThisGame.findIndex(el => el >= 8)];
        if (callsGeEight.includes(ar.findIndex(el => el >= 8))) {
          console.log("here");
        }
      }
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
      this.setState({ warningMessages: "Player name(s) empty" });
    } else {
      let names = this.state.playerNames;
      names[ind] = name;
      this.setState({ playerNames: names, warningMessages: "" });
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
    const userInput = [p1, p2, p3, p4].map(el => Number(el));
    this.state.gameState === "call"
      ? this.handleCallInput(userInput)
      : this.handleScoreInput(userInput);
  };

  handleChange = (playerNum, value) => {
    this.setState({ [playerNum]: value });
  };

  toggleDisplay = () => {
    if (
      (this.state.gameNumber === 0 && this.state.gameState === "call") ||
      !this.state.allowClick
    ) {
      this.newRound();
    } else {
      this.setState({ showOverlay: !this.state.showOverlay });
    }
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

    let inputs = [];
    this.order.forEach(el => {
      inputs.push(
        <InputCell>
          <ScoreInput
            id={el}
            gameState={this.state.gameState}
            onChange={this.handleChange}
          />
        </InputCell>
      );
    });

    let history = "";
    /*for (let i = 0; i < this.rounds.p1.length; i++) {
      let temp = [];
      for (let nm in this.rounds) {
        temp.push(Number(this.rounds[nm][i]));
      }
      let uniqueScores = [...new Set(temp)].sort();
    }*/

    let allErrorMessages = [];
    for (let i = 0; i < this.state.errorMessages.length; i++) {
      allErrorMessages.push(
        <li key={uuid.v4()}>{this.state.errorMessages[i]}</li>
      );
    }

    return (
      <div className="App container mt-2 mb-2 border border-primary rounded">
        <Head />
        <Overlay
          showOverlay={this.state.showOverlay}
          yesFunction={this.newRound}
          noFunction={this.toggleDisplay}
        />

        <h1 className="mb-2">
          Call Break <sup>&#x2660;</sup>
        </h1>
        <div style={{ minHeight: "calc(100vh - 120px)" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="border-bottom border-primary pb-3 mb-3"
          >
            <SButton
              label={this.state.label}
              allowClick={this.state.allowClick}
              onClick={this.handleClick}
              type="primary"
            />
            <SButton
              label="New Round"
              allowClick={true}
              onClick={this.toggleDisplay}
              type="warning"
            />
          </div>

          <div className="grid-container">
            <TableHead
              playerNames={this.state.playerNames}
              onChange={this.onPlayerNameChange}
            />
            <Fragment key={"Round" + this.state.round}>
              <div
                className="bg-success text-white p-1"
                title="Enter calls and hands in this row"
                style={{
                  textAlign: "center",
                  lineHeight: "15px",
                  fontSize: "0.9em"
                }}
              >
                Ongoing{" "}
                <span style={{ fontSize: "0.7em" }}>
                  (<i>Round {this.state.ongoingRound}</i>)
                </span>
              </div>
              {inputs}
            </Fragment>
            {rows}
            <TableBottom processedScores={this.processedScores} />
          </div>
          {history}
          <MessageDiv
            style={{ backgroundColor: "#ff000033" }}
            show={this.state.errorInInput}
            className="border border-danger mt-4 p-2"
          >
            <h4>Error. The input is not valid.</h4>
            <ul>{allErrorMessages}</ul>
          </MessageDiv>
          <MessageDiv
            style={{ backgroundColor: "#fff20033" }}
            show={this.state.warningMessages}
            className="border border-warning mt-4 p-2"
          >
            <h4>Warning</h4>
            <ul>
              <li>{this.state.warningMessages}</li>
            </ul>
          </MessageDiv>
        </div>
        <Footer height="60px" />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
