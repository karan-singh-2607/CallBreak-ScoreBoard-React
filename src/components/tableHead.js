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
          <HeaderCell width="120">
            <strong>Game</strong>
          </HeaderCell>
          <HeaderCell>
            <PlayerName name="Player 1" />
          </HeaderCell>
          <HeaderCell>
            <PlayerName name="Player 2" />
          </HeaderCell>
          <HeaderCell>
            <PlayerName name="Player 3" />
          </HeaderCell>
          <HeaderCell>
            <PlayerName name="Player 4" />
          </HeaderCell>
        </tr>
      </thead>
    );
  }
}
