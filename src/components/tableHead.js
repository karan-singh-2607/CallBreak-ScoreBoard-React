import React from "react";

import PlayerName from "./playerName";
import styled from "styled-components";

const HeaderCell = styled.td`
  text-align: center;
  border: 1px solid;
`;

export default class TableHead extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          <HeaderCell width="100">
            <strong>Game</strong>
          </HeaderCell>
          <HeaderCell>
            <PlayerName name="p1" />
          </HeaderCell>
          <HeaderCell>
            <PlayerName name="p2" />
          </HeaderCell>
          <HeaderCell>
            <PlayerName name="p3" />
          </HeaderCell>
          <HeaderCell>
            <PlayerName name="p4" />
          </HeaderCell>
        </tr>
      </thead>
    );
  }
}
