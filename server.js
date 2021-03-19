const io = require("socket.io")();

io.on("connection", (client) => {
  client.on("subscribeToTimer", (interval) => {
    //Retrieve Data from backend
    client.emit("testJsonData", "this is a test json data");

    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date());
    }, interval);
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
