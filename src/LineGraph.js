import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class LineGraph extends Component {
  //Constructor should extract data
  constructor(props) {
    super(props);

    console.log("Constructor running");

    // this.state = {
    //   labels: this.props.date,
    //   yhat: this.props.yhat,
    //   upper: this.props.upper,
    //   lower: this.props.lower,
    // };

    // this.state = {
    //   timestamp: "no timestamp yet",
    //   //chartData: [],
    // };
  }
  state = {
    timestamp: "no timestamp yet",
    labels: this.props.date,
    yhat: this.props.yhat,
    upper: this.props.upper,
    lower: this.props.lower,
  };

  //Test Extraction of Data
  // getData() {
  //   console.log("some input");
  // }

  // //Alternative Component DidMount
  // componentDidMount() {
  //   console.log("Component Did Mount Running");
  // }

  componentWillReceiveProps(nextProps) {
    console.log("new Props", nextProps);
  }

  componentDidMount() {
    // this.setState({
    //   labels: this.props.date,
    //   yhat: this.props,
    //   upper: this.props.upper,
    //   lower: this.props.lower,
    // });
    // this.getData();
    // this.setState({
    //   chartData: {
    //     // labels: [this.props.date[0], {this.props.date[1]],
    //     labels: ["2020-01-01", "2020-01-02"], //, "2020-01-03", "2020-01-04"],
    //     datasets: [
    //       {
    //         label: "yHat ",
    //         // data: this.props.yhat,
    //         data: [100, 300], //, 420, 157, 321, 345, 123, 432],
    //         backgroundColor: [
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(75, 192, 192, 0.6)",
    //           "rgba(255, 99, 132, 0.6)",
    //         ],
    //         borderColor: ["rgba(75, 192, 192, 0.6)"],
    //       },
    //       {
    //         label: "yhat_upper",
    //         // data: this.props.upper,
    //         data: [1000, 3000], //, 4200, 1570, 3210, 3450, 1230, 4320],
    //         backgroundColor: ["rgba(255, 206, 86, 0.2)"],
    //         borderColor: ["rgba(255, 99, 132, 0.6)"],
    //       },
    //       {
    //         label: "yhat_lower",
    //         // data: this.props.lower,
    //         data: [10, 30], //, 42, 15, 32, 30, 10, 40],
    //         backgroundColor: ["rgba(255,255,255,1000)"],
    //         borderColor: ["rgba(255, 99, 132, 0.6)"],
    //       },
    //     ],
    //   },
    // });
  }

  render() {
    let chartData = {
      labels: this.props.date,
      // labels: ["2020-01-01", "2020-01-02"], //, "2020-01-03", "2020-01-04"],
      datasets: [
        {
          label: "yHat ",
          data: this.props.yhat,
          //   data: [100, 300], //, 420, 157, 321, 345, 123, 432],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: ["rgba(75, 192, 192, 0.6)"],
        },
        {
          label: "yhat_upper",
          data: this.props.upper,
          //   data: [1000, 3000], //, 4200, 1570, 3210, 3450, 1230, 4320],
          backgroundColor: ["rgba(255, 206, 86, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 0.6)"],
        },
        {
          label: "yhat_lower",
          data: this.props.lower,
          //   data: [10, 30], //, 42, 15, 32, 30, 10, 40],
          backgroundColor: ["rgba(255,255,255,1000)"],
          borderColor: ["rgba(255, 99, 132, 0.6)"],
        },
      ],
    };

    return (
      <div>
        <h1>Line Display</h1>
        <Line data={chartData} />
        <h1>testing states</h1>
        {this.state.labels}
        <h2>Label</h2>
        {this.props.date}
        <h3>
          {typeof this.props.date[0]}
          {this.props.date[1]}
        </h3>
        <h2>yHat</h2>
        {this.props.yhat}
        <h3> upper</h3>
        {this.props.upper}
        <h3>Lower</h3>
        {this.props.lower}
      </div>
    );
  }
}
