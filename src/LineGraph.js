import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class LineGraph extends Component {
  //Constructor should extract data
  constructor(props) {
    super(props);
    console.log("Constructor running");
  }
  state = {
    timestamp: "no timestamp yet",
    labels: this.props.date,
    yhat: this.props.yhat,
    upper: this.props.upper,
    lower: this.props.lower,
  };

  render() {
    let chartData = {
      labels: this.props.date,
      datasets: [
        {
          label: "yHat ",
          data: this.props.yhat,
          backgroundColor: [
            "rgba(72, 143, 49, 0.2)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: ["rgba(75, 192, 192, 0.6)"],
        },
        {
          label: "yhat_upper",
          data: this.props.upper,
          backgroundColor: ["rgba(255, 60, 86, 0.2)"],
          borderColor: ["rgba(222, 2, 91, 0.6)"],
        },
        {
          label: "yhat_lower",
          data: this.props.lower,
          backgroundColor: ["rgba(2,99,132,1)"],
          borderColor: ["rgba(2, 99, 132, 0.6)"],
        },
      ],
    };

    return (
      <div>
        <Line data={chartData} />
      </div>
    );
  }
}
