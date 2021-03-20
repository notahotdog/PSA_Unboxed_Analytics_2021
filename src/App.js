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

    //Upload Json Data
    // updateJsonData = (err,jsonObj) => {
    //   var obj = JSON.parse(jsonObj);
    //   var date = [];
    //   var yhat = [];
    //   var lower = [];
    //   var upper = [];

    //   for (var i in obj) date.push["ds"];

    //   this.setState({ date }); // set State the Date
    // };

    // this.updateJsonData = this.updateJsonData.bind(this);

    //jsonDataLoad((err, jsonData) => this.setState({ jsonData }));
    jsonDataLoad((err, jsonData) => {
      var obj = JSON.parse(jsonData);
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
      // this.setState({ jsonData });
    });
  }

  state = {
    timestamp: "no timestamp yet",
    jsonData: "Retrieving Data",
    date: [],
  };

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
        </p>
        Json Data Load Value : {this.state.jsonData}
        <p>Json Data Type : {typeof this.state.jsonData}</p>
        Date array : {this.state.date}
        Date array format {typeof this.state.date}
        yHat array : {this.state.yhat}
        yhat array format {typeof this.state.yhat}
      </div>
    );
  }
}

export default App;
