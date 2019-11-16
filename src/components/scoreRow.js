import React from "react";

import styled from "styled-components";

const GameCell = styled.td`
  text-align: center;
  padding: 3px;
`;

const CallSpan = styled.span`
  margin-right: 0.6em;
  font-size: 0.9em;
  text-decoration: line-through;
  font-style: italic;
  color: #e6ee9c;
`;

const ScoreSpan = styled.span`
  font-size: 1em;
  font-weight: 700;
  padding-left: 2px;
  padding-right: 2px;
  color: ${props => (props.negative ? "#ff7070" : "inherit")};
  border-radius: ${props => (props.negative ? "2px" : "inherit")};
`;

export default class ScoreRow extends React.Component {
  render() {
    let i = this.props.gameNumber;
    let val = [];
    let callValue = [];
    let bg = "#1976d2";
    let fc = "white";
    let fs = "none";
    let negative = [];
    if (this.props.processedScores[i]) {
      val = this.props.processedScores[i];
      negative = this.props.processedScores[i].map(el => el < 0);
      callValue = this.props.calls[i];
    } else {
      val = this.props.calls[i];
      callValue = ["", "", "", ""];
      bg = "#bbdefb";
      fc = "black";
      fs = "italic";
    }

    /*let scores = [];    
    for (let ind = 0; ind < 4; i++) {
      scores.push(
        <GameCell>
          <CallSpan>{callValue[ind]}</CallSpan>
          <ScoreSpan negative={negative[ind]}>{val[ind]}</ScoreSpan>
        </GameCell>
      );
    }*/

    return (
      <tr style={{ backgroundColor: bg, color: fc, fontStyle: fs }}>
        <GameCell>
          {["i", "ii", "iii", "iv", "Final"][this.props.gameNumber]}
        </GameCell>

        <GameCell>
          <CallSpan>{callValue[0]}</CallSpan>
          <ScoreSpan negative={negative[0]}>{val[0]}</ScoreSpan>
        </GameCell>
        <GameCell>
          <CallSpan>{callValue[1]}</CallSpan>
          <ScoreSpan negative={negative[1]}>{val[1]}</ScoreSpan>
        </GameCell>
        <GameCell>
          <CallSpan>{callValue[2]}</CallSpan>
          <ScoreSpan negative={negative[2]}>{val[2]}</ScoreSpan>
        </GameCell>
        <GameCell>
          <CallSpan>{callValue[3]}</CallSpan>
          <ScoreSpan negative={negative[3]}>{val[3]}</ScoreSpan>
        </GameCell>
      </tr>
    );
  }
}
