import React from "react";

import styled from "styled-components";

const HeaderCell = styled.td`
  text-align: center;
  padding: 3px;
  height: 35px;
  border: solid 1px black;
`;

export default class TableBottom extends React.Component {
  render() {
    let ongoingScoreSum = this.props.processedScores.reduce(
      (r, a) =>
        a.map((b, i) => Math.round((Number(r[i] || 0) + Number(b)) * 10) / 10),
      []
    );

    return (
      <tr>
        <HeaderCell width="120">
          <strong>Total</strong>
        </HeaderCell>
        <HeaderCell>
          <strong>{ongoingScoreSum[0]}</strong>
        </HeaderCell>
        <HeaderCell>
          <strong>{ongoingScoreSum[1]}</strong>
        </HeaderCell>
        <HeaderCell>
          <strong>{ongoingScoreSum[2]}</strong>
        </HeaderCell>
        <HeaderCell>
          <strong>{ongoingScoreSum[3]}</strong>
        </HeaderCell>
      </tr>
    );
  }
}
