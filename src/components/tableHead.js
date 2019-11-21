import React, { Fragment } from "react";

import PlayerName from "./playerName";

const headerStyle = {
  border: "1px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

export default class TableHead extends React.Component {
  onChange = (id, name) => {
    this.props.onChange(id, name);
  };
  render() {
    let headercells = [];
    for (let i = 0; i < 4; i++) {
      headercells.push(
        <div style={headerStyle}>
          <PlayerName
            id={["p1-name", "p2-name", "p3-name", "p4-name"][i]}
            name={this.props.playerNames[i]}
            onChange={this.onChange}
          />
        </div>
      );
    }
    return (
      <Fragment>
        <div style={headerStyle}>
          <strong>Game</strong>
        </div>
        {headercells}
      </Fragment>
    );
  }
}
