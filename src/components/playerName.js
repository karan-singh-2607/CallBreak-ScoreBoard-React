import React from "react";
import styled from "styled-components";

const Input = styled.input`
  text-align: center;
  outline: none;
  border: none;
  width: calc(100% - 10px);
  padding: 5px;
  height: 30px;
  font-size: 1em;
  font-weight: 700;
  color: ${props => (props.editing ? "black" : "#2962ff")};
  background-color: ${props => (props.editing ? "#286cc440" : "white")};
  &:hover {
    cursor: ${props => (props.editing ? "initial" : "pointer")};
  }
`;

export default class PlayerName extends React.Component {
  state = {
    value: this.props.name,
    editing: false
  };

  handleChange = event => {
    this.setState({ value: event.target.value }, () => {
      this.props.onChange(this.props.id, this.state.value);
    });
  };
  handleFocus = event => {
    event.target.select();
    this.setState({ editing: true });
  };
  handleBlur = event => {
    this.setState({ editing: false });
  };
  render() {
    return (
      <Input
        data-tip
        data-for="change-name-message"
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        value={this.state.value}
        placeholder={this.props.id}
        editing={this.state.editing}
        title="Click to edit"
      />
    );
  }
}
