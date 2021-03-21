const io = require("socket.io")();
const express = require("express");
const { spawn } = require("child_process"); // to run the py code

io.on("connection", (client) => {
  client.on("subscribeToTimer", (interval) => {
    //Retrieves data from python script
    var largeDataSet = [];

    const python = spawn("python", ["FBProphet.py"]);

    // collect data from script
    python.stdout.on("data", function (data) {
      console.log("Pipe data from python script ...");
      largeDataSet.push(data);
    });
    // in close event we are sure that stream is from child process is closed
    python.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
      jsonLoad = largeDataSet.join("");
      console.log("Json Load values");
      console.log(jsonLoad); //this.setState
      //Parse the Json Data
      jsonLoad = jsonLoad.substring(jsonLoad.indexOf("[")); // possible bug here - i want to remove everything before [

      client.emit("testJsonData", jsonLoad);
    });

    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date());
    }, interval);
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
