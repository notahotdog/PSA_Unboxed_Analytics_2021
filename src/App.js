import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { subscribeToTimer } from "./test";
import { jsonDataLoad } from "./test";
import Line from "./LineGraph";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client"; //More generic

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
        <header className="App-header">
          <h1>POWER BI RESULTS</h1>
          <PowerBIEmbed
            embedConfig={{
              type: "report", // Supported types: report, dashboard, tile, visual and qna
              id: "c7455611-c8c1-4e6d-80cc-240e9ea6a47b",
              embedUrl:
                "https://app.powerbi.com/reportEmbed?reportId=c7455611-c8c1-4e6d-80cc-240e9ea6a47b&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWV9fQ%3d%3d",
              accessToken:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNWJhNWVmNWUtMzEwOS00ZTc3LTg1YmQtY2ZlYjBkMzQ3ZTgyLyIsImlhdCI6MTYxNjMyMjkxNiwibmJmIjoxNjE2MzIyOTE2LCJleHAiOjE2MTYzMjY4MTYsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFzNFc2eUIvTDJUdVpJeFY3WFFKNkhNb1VUOWUzeHJoT0owWjM3cjVxV1FkeHdPa2x2emFnYmkzMFZGMkpidjB2IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImZhbWlseV9uYW1lIjoiTW9peiIsImdpdmVuX25hbWUiOiJVbWFyIiwiaXBhZGRyIjoiMTE1LjY2LjExMi41MyIsIm5hbWUiOiJVbWFyIEJpbiBNb2l6Iiwib2lkIjoiODBkNmU0NWYtYzczYy00YWJkLWIzY2ItYTgzNjIyZGY2NjllIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTc2OTMyMzIzMi0xNTU4NzAxODczLTEzMTcwNTk0OTUtMTEyNTIxIiwicHVpZCI6IjEwMDM3RkZFQUE3MjdBOEIiLCJyaCI6IjAuQVZRQVh1LWxXd2t4ZDA2RnZjX3JEVFItZ2c4QkhJZGhYckZQZzZ5WVlRcC1rUkJVQU1BLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IktXRmRoaVAzOGtrb1VuVXhzUE1jU21SdkJlSUZXWDdJUzRLWVNzNjNXQXciLCJ0aWQiOiI1YmE1ZWY1ZS0zMTA5LTRlNzctODViZC1jZmViMGQzNDdlODIiLCJ1bmlxdWVfbmFtZSI6IkUwMjk4NjY4QHUubnVzLmVkdSIsInVwbiI6IkUwMjk4NjY4QHUubnVzLmVkdSIsInV0aSI6ImZMMXREWmlOSEUyZW56bUhfYTRpQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.WBWl1VmcERs3xZTwdPhXzU4LuoUJo1dGWRj_8G17kv8_vbWj5K4yl9hNG7tAKda5_uB33vyuyhoOEnkVwbv0XnAhmHd5jgj4NzNIKFGzhQ0d74xQa1pYDupcW_Mka-k3U9pa3hD15e56MIBekWLblx6KuS6e7Ddc8o9mMmvYDsmdM49yQpn4Ft90B2WN_XpZjNgl658gTHxkfGMEcI9sE5hkgoRO9PoUvTY4E6SH3c6M8zYB1jzBeUuR0cSvxcgIyWKaK29_zRSaNz-EQCgyYnl5STJ-HxexL8NYtBpbeNAuHUkl4ZZ6Dgoec2i8oOO7kYIW9kk0xUnZdyGDnXPihA",
              tokenType: models.TokenType.Aad,
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: true,
                  },
                },
                background: models.BackgroundType.Transparent,
              },
            }}
            eventHandlers={
              new Map([
                [
                  "loaded",
                  function () {
                    console.log("Report loaded");
                  },
                ],
                [
                  "rendered",
                  function () {
                    console.log("Report rendered");
                  },
                ],
                [
                  "error",
                  function (event) {
                    console.log(event.detail);
                  },
                ],
              ])
            }
            cssClassName={"Embed-container"}
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          />
        </header>
        <h1> Line Graph</h1>
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
