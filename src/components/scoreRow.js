import React from "react";

import styled from "styled-components";

const GameCell = styled.td`
  text-align: center;
  background-color: lightpink;
  padding: 3px;
`;

export default class ScoreRow extends React.Component {
  render() {
    let i = this.props.gameNumber;
    let val = [];
    if (this.props.processedScores[i]) {
      val = this.props.processedScores[i];
    } else {
      val = this.props.calls[i];
    }

    return (
      <tr>
        <GameCell>
          {["i", "ii", "iii", "iv", "Final"][this.props.gameNumber]}
        </GameCell>
        <GameCell>{val[0]}</GameCell>
        <GameCell>{val[1]}</GameCell>
        <GameCell>{val[2]}</GameCell>
        <GameCell>{val[3]}</GameCell>
      </tr>
    );
  }
}
