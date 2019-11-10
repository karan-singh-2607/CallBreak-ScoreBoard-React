import React from "react";

import styled from "styled-components";

const HeaderCell = styled.td`
  text-align: center;
  padding: 3px;
`;

export default class TableBottom extends React.Component {
  render() {
    let sum = [0, 0, 0, 0];
    for (let i = 0; i < this.props.processedScores.length; i++) {
      sum[0] = Number(sum[0]) + Number(this.props.processedScores[i][0]);
      sum[1] = Number(sum[1]) + Number(this.props.processedScores[i][1]);
      sum[2] = Number(sum[2]) + Number(this.props.processedScores[i][2]);
      sum[3] = Number(sum[3]) + Number(this.props.processedScores[i][3]);
    }
    return (
      <tr>
        <HeaderCell width="120">
          <strong>Total</strong>
        </HeaderCell>
        <HeaderCell>
          <strong>{sum[0]}</strong>
        </HeaderCell>
        <HeaderCell>
          <strong>{sum[1]}</strong>
        </HeaderCell>
        <HeaderCell>
          <strong>{sum[2]}</strong>
        </HeaderCell>
        <HeaderCell>
          <strong>{sum[3]}</strong>
        </HeaderCell>
      </tr>
    );
  }
}
