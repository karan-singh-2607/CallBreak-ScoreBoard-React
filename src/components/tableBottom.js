import React, { Fragment } from "react";

import styled from "styled-components";

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  height: 30px;
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
      <Fragment>
        <Div className="grid-element">
          <strong>Total</strong>
        </Div>
        <Div className="grid-element">
          <strong>{ongoingScoreSum[0]}</strong>
        </Div>
        <Div className="grid-element">
          <strong>{ongoingScoreSum[1]}</strong>
        </Div>
        <Div className="grid-element">
          <strong>{ongoingScoreSum[2]}</strong>
        </Div>
        <Div className="grid-element">
          <strong>{ongoingScoreSum[3]}</strong>
        </Div>
      </Fragment>
    );
  }
}
