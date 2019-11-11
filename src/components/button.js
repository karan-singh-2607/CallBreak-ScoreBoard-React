import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: 1px solid black;
  outline: none;
  padding: 5px;
  color: white;
  border-radius: 5px;
  background-color: ${props => (props.allowClick ? "#166730" : "gray")};
  font-size: 1em;
  width: 120px;
  height: 50px;
  &:hover {
    background: ${props => (props.allowClick ? "green" : "gray")};
    cursor: ${props => (props.allowClick ? "pointer" : "none")};
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
        allowClick={this.props.allowClick}
      >
        {this.props.label}
      </StyledButton>
    );
  }
}
