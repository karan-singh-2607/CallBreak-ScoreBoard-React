import React, { Fragment } from "react";
import styled from "styled-components";

const CallSpan = styled.span`
  margin-right: 0.6em;
  font-size: 0.9em;
  text-decoration: line-through;
  font-style: italic;
  color: #e6ee9c;
`;

const ScoreSpan = styled.span`
  font-size: 1em;
  font-weight: 400;
  padding-left: 2px;
  padding-right: 2px;
  color: ${props => (props.negative ? "#ff7070" : "inherit")};
  border-radius: ${props => (props.negative ? "2px" : "inherit")};
`;

export default class ScoreRow extends React.Component {
  render() {
    let gameNumber = this.props.gameNumber;
    let val = [];
    let callValue = [];
    let bg = "#1976d2";
    let fc = "white";
    let fs = "none";
    let negative = [];
    if (this.props.processedScores[gameNumber]) {
      val = this.props.processedScores[gameNumber];
      negative = this.props.processedScores[gameNumber].map(el => el < 0);
      callValue = this.props.calls[gameNumber];
    } else {
      val = this.props.calls[gameNumber];
      callValue = ["", "", "", ""];
      bg = "#bbdefb";
      fc = "black";
      fs = "italic";
    }

    const Div = styled.div`
      background-color: ${bg};
      color: ${fc};
      font-style: ${fs};
      text-align: center;
      height: 30px;
    `;

    let rows = [];
    for (let i = 0; i < val.length; i++) {
      rows.push(
        <Div key={fc + gameNumber + "p" + i}>
          <CallSpan>{callValue[i]}</CallSpan>
          <ScoreSpan negative={negative[i]}>{val[i]}</ScoreSpan>
        </Div>
      );
    }

    return (
      <Fragment>
        <Div>{["i", "ii", "iii", "iv", "Final"][this.props.gameNumber]}</Div>
        {rows}
      </Fragment>
    );
  }
}
