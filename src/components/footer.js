import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{ height: this.props.height, textAlign: "center" }}
        className="border-top border-primary pt-2"
      >
        &copy; 2019 <a href="https://www.darshanbaral.com">Darshan</a> &middot;
        Fork{" "}
        <a
          href="https://github.com/darshanbaral/callbreak"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </footer>
    );
  }
}
