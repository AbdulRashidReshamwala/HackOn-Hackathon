import React from "react";
import "./Dashboard.css";
import TableOne from "./TableOne/TableOne";
import TableTwo from "./TableTwo/TableTwo";
import { Link } from "react-router-dom";
import Chart from "chart.js";
import axios from "axios";
import Cookie from "js-cookie";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleResponse(response) {
    console.log(Object.keys(response.data.disease));
    console.log(Object.values(response.data.disease));

    this.setState({
      diseaseName: Object.keys(response.data.disease),
      occurence: Object.values(response.data.disease),
      drugName: Object.keys(response.data.drugs),
      drugValue: Object.values(response.data.drugs)
    });
    console.log(" check " + this.state.diseaseName[0]);
    //chart1
    let chartColor = "#FFFFFF";

    var ctx = document.getElementById("dailySalesChart").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, chartColor);

    var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    let myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.state.diseaseName.map(i => i),
        datasets: [
          {
            label: "Data",
            borderColor: chartColor,
            pointBorderColor: chartColor,
            pointBackgroundColor: "#1e3d60",
            pointHoverBackgroundColor: "#1e3d60",
            pointHoverBorderColor: chartColor,
            pointBorderWidth: 1,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            data: this.state.occurence
          }
        ]
      },
      options: {
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 0
          }
        },
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "#fff",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        legend: {
          position: "bottom",
          fillStyle: "#FFF",
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,0.4)",
                fontStyle: "bold",
                beginAtZero: true,
                maxTicksLimit: 5,
                padding: 10
              },
              gridLines: {
                drawTicks: true,
                drawBorder: false,
                display: true,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                zeroLineColor: "transparent",
                display: false
              },
              ticks: {
                padding: 10,
                fontColor: "rgba(255,255,255,0.4)",
                fontStyle: "bold"
              }
            }
          ]
        }
      }
    });
    //
    //let chartColor = "#FFFFFF";

    var ctx = document.getElementById("chart").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, chartColor);

    var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    let myyChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.state.drugName,
        datasets: [
          {
            label: "Data",
            borderColor: chartColor,
            pointBorderColor: chartColor,
            pointBackgroundColor: "#1e3d60",
            pointHoverBackgroundColor: "#1e3d60",
            pointHoverBorderColor: chartColor,
            pointBorderWidth: 1,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            data: this.state.drugValue
          }
        ]
      },
      options: {
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 0
          }
        },
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "#fff",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        legend: {
          position: "bottom",
          fillStyle: "#FFF",
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,0.4)",
                fontStyle: "bold",
                beginAtZero: true,
                maxTicksLimit: 5,
                padding: 10
              },
              gridLines: {
                drawTicks: true,
                drawBorder: false,
                display: true,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                zeroLineColor: "transparent",
                display: false
              },
              ticks: {
                padding: 10,
                fontColor: "rgba(255,255,255,0.4)",
                fontStyle: "bold"
              }
            }
          ]
        }
      }
    });
  }

  componentDidMount() {
    let jwt = Cookie.get("jwt");
    axios
      .get("http://7c206a6d.ngrok.io/meta/" + jwt)

      .then(response => this.handleResponse(response));
  }

  render() {
    return (
      <div>
        <div class="wrapper ">
          <div
            class="sidebar"
            data-color="purple"
            data-background-color="white"
            data-image="../assets/img/sidebar-1.jpg"
          >
            <div class="logo">
              <a class="simple-text logo-normal">Reactive Error</a>
            </div>
            <div class="sidebar-wrapper">
              <ul class="nav">
                <Link to="/dashboard">
                  <li class="nav-item active  ">
                    <a class="nav-link" href="./dashboard.html">
                      <i class="material-icons">dashboard</i>
                      Dashboard
                    </a>
                  </li>
                </Link>

                <Link to="/forum">
                  <li class="nav-item ">
                    <a class="nav-link" href="">
                      <i class="material-icons">content_paste</i>
                      <p>Forum </p>
                    </a>
                  </li>
                </Link>
                <Link to="/ml">
                  <li class="nav-item ">
                    <a class="nav-link" href="">
                      <i class="material-icons">image_search</i>
                      <p>Disease Detector </p>
                    </a>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <div class="main-panel">
            <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
              <div class="container-fluid">
                <div class="navbar-wrapper">
                  <a class="navbar-brand" href="javascript:;">
                    Patient Dashboard
                  </a>
                </div>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  aria-controls="navigation-index"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="sr-only">Toggle navigation</span>
                  <span class="navbar-toggler-icon icon-bar"></span>
                  <span class="navbar-toggler-icon icon-bar"></span>
                  <span class="navbar-toggler-icon icon-bar"></span>
                </button>
              </div>
            </nav>

            <div class="content">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="card card-stats">
                      <div class="card-header card-header-warning card-header-icon">
                        <div class="card-icon">
                          <i class="material-icons">content_copy</i>
                        </div>
                        <p class="card-category">Total Reports</p>
                        <h3 class="card-title">4</h3>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="material-icons">access_time</i>updated 2
                          hours ago
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="card card-stats">
                      <div class="card-header card-header-success card-header-icon">
                        <div class="card-icon">
                          <i class="material-icons">scanner</i>
                        </div>
                        <p class="card-category">No of Scans</p>
                        <h3 class="card-title">2</h3>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="material-icons">date_range</i> Last 24 Hours
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="card card-chart">
                    <div class="card-header card-header-success">
                      <div class="ct-chart">
                        <canvas id="dailySalesChart"></canvas>
                      </div>
                    </div>
                    <div class="card-body">
                      <h4 class="card-title">Diseases</h4>
                      <p class="card-category">
                        <span class="text-success">
                          <i class=""></i>
                        </span>
                        shows Disease and its no of occurences
                      </p>
                    </div>
                    <div class="card-footer">
                      <div class="stats">
                        <i class="material-icons">access_time</i> updated 4
                        minutes ago
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="card card-chart">
                    <div class="card-header card-header-warning">
                      <div class="ct-chart">
                        <canvas id="chart"></canvas>
                      </div>
                    </div>
                    <div class="card-body">
                      <h4 class="card-title">Drugs</h4>
                    </div>
                    <div class="card-footer">
                      <div class="stats">
                        <i class="material-icons">access_time</i>updated 2 days
                        ago
                      </div>
                    </div>
                  </div>
                </div>
                <TableOne />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
