import React from "react";
import "./playerName.css";
import ContentEditable from "react-contenteditable";

export default class PlayerName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: this.props.name,
      class: "not-editing",
      editing: false
    };
  }
  handleChange = event => {
    this.setState({ html: event.target.value, class: "editing" });
  };
  handleFocus = event => {
    this.setState({ class: "editing" });
  };
  handleBlur = event => {
    this.setState({ class: "not-editing" });
  };
  render() {
    return (
      <ContentEditable
        disabled={false}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        className={this.state.class}
        html={this.state.html}
        style={{ padding: "5px" }}
      />
    );
  }
}
