import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{ height: this.props.height, textAlign: "center" }}
        className="border-top border-primary pt-2"
      >
        &copy; 2021 | <a href="https://vanilacodes.com/">KARAN</a>
      </footer>
    );
  }
}
