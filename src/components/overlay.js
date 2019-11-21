import React from "react";
import SButton from "./button";

export default class Overlay extends React.Component {
  render() {
    return (
      <div
        className={this.props.showOverlay ? "d-flex" : "d-none"}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          bottom: "0",
          left: "0",
          backgroundColor: "#000000b5"
        }}
      >
        <div
          className="border border-danger bg-light rounded p-3"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            width: "270px"
          }}
        >
          <h5 className="text-center mb-4">Do you want to start a new game?</h5>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <SButton
              label="Yes, I'm sure"
              allowClick={true}
              onClick={this.props.yesFunction}
              type="warning"
            />
            <SButton
              label="No, go back"
              allowClick={true}
              onClick={this.props.noFunction}
              type="success"
            />
          </div>
        </div>
      </div>
    );
  }
}
