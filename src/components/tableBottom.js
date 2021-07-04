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

    if (ongoingScoreSum.length === 0) {
      ongoingScoreSum = [0, 0, 0, 0];
    }

    let totals = [];
    for (let i = 0; i < 4; i++) {
      totals.push(
        <Div
          key={this.props.processedScores.length + " " + i}
          className="grid-element" style={{ height: "45px", background: "#ffc107" }}
        >
          <strong>{ongoingScoreSum[i]}</strong>
        </Div>
      );
    }
    return (
      <Fragment>
        <Div className="grid-element" style={{ height: "45px", background: "#ffc107" }}>
          <strong title="This row shows the running total">Total</strong>
        </Div>
        {totals}
      </Fragment>
    );
  }
}
