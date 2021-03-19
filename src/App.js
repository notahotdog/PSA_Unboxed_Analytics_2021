import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { subscribeToTimer } from "./test";
import { jsonDataLoad } from "./test";

class App extends Component {
  constructor(props) {
    super(props);

    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp,
      })
    );

    jsonDataLoad((err, jsonData) => this.setState({ jsonData }));
  }

  state = {
    timestamp: "no timestamp yet",
    jsonData: "",
  };

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
          Json Data Load Value : {this.state.jsonData}
        </p>
      </div>
    );
  }
}

export default App;
