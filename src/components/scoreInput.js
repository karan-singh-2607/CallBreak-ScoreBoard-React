import React from "react";
import Form from "react-bootstrap/Form";

export default class ScoreInput extends React.Component {
  state = { value: "", placeholder: "0", isValid: true };
  handleChange = event => {
    const [min, max] = this.props.gameState === "call" ? [1, 8] : [0, 13];
    const val = Number(event.target.value);
    if (val < min || val > max || isNaN(val) || !Number.isInteger(val)) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
    }
    this.setState({ value: event.target.value });
    this.props.onChange(this.props.id, event.target.value);
  };
  handleBlur = () => {
    this.setState({ placeholder: "0" });
  };
  handleFocus = () => {
    this.setState({ placeholder: "", value: "" });
  };
  render() {
    return (
      <Form.Control
        style={{
          textAlign: "center",
          border: "1px solid #007bff",
          fontWeight: "400",
          height: "100%",
          fontFamily: "'Roboto Mono', monospace",
          fontSize: "1.1em"
        }}
        id={this.props.id}
        type="tel"
        placeholder={this.state.placeholder}
        value={this.state.value}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        isInvalid={!this.state.isValid}
      />
    );
  }
}
