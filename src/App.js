import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { subscribeToTimer } from "./test";
import { jsonDataLoad } from "./test";
import Line from "./LineGraph";

class App extends Component {
  constructor(props) {
    super(props);

    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp,
      })
    );

    jsonDataLoad((err, jsonData) => {
      var obj = JSON.parse(jsonData);
      this.setState({ jsonData });
      var date = [];
      var yhat = [];
      var lower = [];
      var upper = [];

      for (var i in obj) {
        // console.log(obj[i].ds);
        date.push(obj[i].ds);
        yhat.push(obj[i].yhat);
        lower.push(obj[i].lower);
        upper.push(obj[i].upper);
      }

      this.setState({ date });
      this.setState({ yhat });
      this.setState({ lower });
      this.setState({ upper });
      console.log("TESTING");
      console.log(date);
      console.log(yhat);
    });
  }

  state = {
    timestamp: "no timestamp yet",
    jsonData: "Retrieving Data",
    date: [],
    yhat: [],
    lower: [],
    upper: [],
  };

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
        </p>
        Json Data Load Value : {this.state.jsonData}
        <p>Json Data Type : {typeof this.state.jsonData}</p>
        <h1> Date</h1>
        Date array : {this.state.date}
        Date array format {typeof this.state.date}
        <h1> Yhat</h1>
        yHat array : {this.state.yhat}
        yhat array format {typeof this.state.yhat}
        <Line
          date={this.state.date}
          yhat={this.state.yhat}
          lower={this.state.lower}
          upper={this.state.upper}
        />
      </div>
    );
  }
}

export default App;
