import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: 1px solid black;
  background: none;
  outline: none;
  padding: 5px;
  color: white;
  border-radius: 5px;
  background: rgb(28, 184, 65);
  font-size: 1em;
  width: auto;
  &:hover {
    background: green;
    cursor: pointer;
  }
`;

export default class Button extends React.Component {
  handleClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <StyledButton
        onClick={this.handleClick}
        style={{ width: this.props.width, height: this.props.height }}
      >
        {this.props.label}
      </StyledButton>
    );
  }
}
