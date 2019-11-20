import React, { Fragment } from "react";

import PlayerName from "./playerName";
import styled from "styled-components";

const HeaderCell = styled.div`
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class TableHead extends React.Component {
  onChange = (id, name) => {
    this.props.onChange(id, name);
  };
  render() {
    return (
      <Fragment>
        <HeaderCell width="100">
          <strong>Game</strong>
        </HeaderCell>
        <HeaderCell>
          <PlayerName
            id="p1-name"
            name={this.props.playerNames[0]}
            onChange={this.onChange}
          />
        </HeaderCell>
        <HeaderCell>
          <PlayerName
            id="p2-name"
            name={this.props.playerNames[1]}
            onChange={this.onChange}
          />
        </HeaderCell>
        <HeaderCell>
          <PlayerName
            id="p3-name"
            name={this.props.playerNames[2]}
            onChange={this.onChange}
          />
        </HeaderCell>
        <HeaderCell>
          <PlayerName
            id="p4-name"
            name={this.props.playerNames[3]}
            onChange={this.onChange}
          />
        </HeaderCell>
      </Fragment>
    );
  }
}
