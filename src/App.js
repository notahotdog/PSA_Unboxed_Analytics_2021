import React, { Component } from "react";
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
      var jsonData = obj;
      this.setState({ jsonData });
      var date = [];
      var yhat = [];
      var lower = [];
      var upper = [];
      var weeklyDate = [];
      var weeklyyHat = [];
      var weeklyLower = [];
      var weeklyUpper = [];

      var sumyHat = 0;
      var sumLower = 0;
      var sumUpper = 0;
      var ctr = 0;

      for (var i in obj) {
        // console.log(obj[i].ds);
        date.push(obj[i].ds);
        yhat.push(obj[i].yhat);
        lower.push(obj[i].lower);
        upper.push(obj[i].upper);

        sumyHat += obj[i].yhat;
        sumLower += obj[i].lower;
        sumUpper += obj[i].upper;

        //Weekly forecast
        if (ctr == 6) {
          weeklyDate.push(obj[i].ds);
          weeklyyHat.push(sumyHat / 7);
          weeklyLower.push(sumLower / 7);
          weeklyUpper.push(sumUpper / 7);
          sumyHat = 0;
          sumLower = 0;
          sumUpper = 0;
          ctr = 0;
        }

        ctr++;
      }

      this.setState({ date });
      this.setState({ yhat });
      this.setState({ lower });
      this.setState({ upper });
      this.setState({ weeklyDate });
      this.setState({ weeklyyHat });
      this.setState({ weeklyLower });
      this.setState({ weeklyUpper });
      console.log("TESTING");
      console.log(date);
      console.log(yhat);
    });
  }

  state = {
    timestamp: "no timestamp yet",
    jsonData: [],
    date: [],
    yhat: [],
    lower: [],
    upper: [],
    weeklyDate: [],
    weeklyyHat: [],
    weeklyUpper: [],
    weeklyLower: [],
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>PSA Dashboard </h1>
          <PowerBIEmbed
            embedConfig={{
              type: "report", // Supported types: report, dashboard, tile, visual and qna
              id: "c7455611-c8c1-4e6d-80cc-240e9ea6a47b",
              embedUrl:
                "https://app.powerbi.com/reportEmbed?reportId=c7455611-c8c1-4e6d-80cc-240e9ea6a47b&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWV9fQ%3d%3d",
              accessToken:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNWJhNWVmNWUtMzEwOS00ZTc3LTg1YmQtY2ZlYjBkMzQ3ZTgyLyIsImlhdCI6MTYxNjMzNjcxMSwibmJmIjoxNjE2MzM2NzExLCJleHAiOjE2MTYzNDA2MTEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFhdDNiOXRINTJWYlRnS000L2F6Sy91UU0wMmJ6RHYrbkhpNUd6WHpPSWJrSVlxVXZnQk85bENrYU52dmw3cUFzIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImZhbWlseV9uYW1lIjoiTW9peiIsImdpdmVuX25hbWUiOiJVbWFyIiwiaXBhZGRyIjoiMTE1LjY2LjExMi41MyIsIm5hbWUiOiJVbWFyIEJpbiBNb2l6Iiwib2lkIjoiODBkNmU0NWYtYzczYy00YWJkLWIzY2ItYTgzNjIyZGY2NjllIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTc2OTMyMzIzMi0xNTU4NzAxODczLTEzMTcwNTk0OTUtMTEyNTIxIiwicHVpZCI6IjEwMDM3RkZFQUE3MjdBOEIiLCJyaCI6IjAuQVZRQVh1LWxXd2t4ZDA2RnZjX3JEVFItZ2c4QkhJZGhYckZQZzZ5WVlRcC1rUkJVQU1BLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IktXRmRoaVAzOGtrb1VuVXhzUE1jU21SdkJlSUZXWDdJUzRLWVNzNjNXQXciLCJ0aWQiOiI1YmE1ZWY1ZS0zMTA5LTRlNzctODViZC1jZmViMGQzNDdlODIiLCJ1bmlxdWVfbmFtZSI6IkUwMjk4NjY4QHUubnVzLmVkdSIsInVwbiI6IkUwMjk4NjY4QHUubnVzLmVkdSIsInV0aSI6ImZMMXREWmlOSEUyZW56bUhhckVrQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.A6I97IEOOFKTAFfBx1qBuTWWyNems4KkfXeKh053AYSNSfQbHOzftSIHRnAh6sU_qk9DtCgLIaeKfQyMhxo_DdtyObH5mkcDclfjIMpOe5dIvIpFHLnuNWXXN69P5QXJf1WKSGkpSXnB5_9j035nD_2W5DEs6A_NwvVSoeCRKAMPJ8Bou5B0ZVgxJdoXBuqMMu_3fmzdh2LAD2PuBPQzaZDRZkA-l8qJ_C2venrPSEFzhPGeUSj0llybzMYpF34S8V8tBOkz--xMJInJ9IOefyI76o55NYfutGjGDkJ960re00BK2dnMuyhhM7LMkTW1ZWHRc6yerNRVmCsi6W9QAg",
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
        <h1> Daily Forecast (2 Months) </h1>

        <Line
          date={this.state.date}
          yhat={this.state.yhat}
          lower={this.state.lower}
          upper={this.state.upper}
        />

        <h1> Weekly Averaged Forecast </h1>

        <Line
          date={this.state.weeklyDate}
          yhat={this.state.weeklyyHat}
          lower={this.state.weeklyLower}
          upper={this.state.weeklyUpper}
        />
      </div>
    );
  }
}

export default App;
