import React, { Fragment } from "react";
import styled from "styled-components";

const CallSpan = styled.span`
  margin-right: 0.6em;
  font-size: 0.9em;
  text-decoration: line-through;
  width: 25px;
  height: 25px;
    font-style: italic;
  color: #e6ee9c;

`;

const ScoreSpan = styled.span`
  font-size: 1em;
  font-weight: ${props => (props.negative ? "600" : "400")};
  padding-left: 2px;
  padding-right: 2px;
  border: ${props => (props.negative ? "2px solid" : "none")};
  color: ${props => (props.negative ? "#fff" : "inherit")};
  border-radius: ${props => (props.negative ? "50%" : "inherit")};
  height: ${props => (props.negative ? "25px" : "inherit")};
  display: flex;
  align-items: center;
`;

export default class ScoreRow extends React.Component {
  render() {
    let gameNumber = this.props.gameNumber;
    let val = [];
    let callValue = [];
    let bg = "#007321";
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
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
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
    function range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
    var result = range(1, 25);

    let strNum = result.map(String)
    // console.log(strNum)
    return (
      <Fragment>
        <Div>{strNum[this.props.gameNumber]}</Div>
        {rows}
      </Fragment>
    );
  }
}
