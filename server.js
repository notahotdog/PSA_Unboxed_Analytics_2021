const io = require("socket.io")();
const express = require("express");
const { spawn } = require("child_process"); // to run the py code

io.on("connection", (client) => {
  client.on("subscribeToTimer", (interval) => {
    //Retrieve Data from backend
    var largeDataSet = [];
    // const python = spawn("python", ["extractJson.py"]); //call python script

    // Simulates processing of FBprophet - inputs
    var simJsonLoad = [
      {
        ds: "2020-01-01",
        yhat: 61769.1653429572,
        lower: 50788.7398810509,
        upper: 71914.2833640337,
      },
      {
        ds: "2020-01-02",
        yhat: 66296.6124266893,
        lower: 55646.4175674358,
        upper: 76129.9471223293,
      },
      {
        ds: "2020-01-03",
        yhat: 64277.1331320435,
        lower: 53527.7374454625,
        upper: 74762.7234676087,
      },
      {
        ds: "2020-01-04",
        yhat: 62153.0287570424,
        lower: 51873.3829883176,
        upper: 72641.2605558883,
      },
    ];
    client.emit("testJsonData", JSON.stringify(simJsonLoad));

    // //Actual Run Data
    // const python = spawn("python", ["FBProphet.py"]);

    // // collect data from script
    // python.stdout.on("data", function (data) {
    //   console.log("Pipe data from python script ...");
    //   largeDataSet.push(data);
    // });
    // // in close event we are sure that stream is from child process is closed
    // python.on("close", (code) => {
    //   console.log(`child process close all stdio with code ${code}`);
    //   jsonLoad = largeDataSet.join("");
    //   console.log("Json Load values");
    //   console.log(jsonLoad); //this.setState
    //   //Parse the Json Data
    //   jsonLoad = jsonLoad.substring(jsonLoad.indexOf("[")); // possible bug here - i want to remove everything before [

    //   client.emit("testJsonData", jsonLoad);
    // });

    // client.emit("testJsonData", "this is a test json data");
    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date());
    }, interval);
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
