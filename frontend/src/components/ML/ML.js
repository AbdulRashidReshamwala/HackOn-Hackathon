import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Chart from "chart.js";
export default class ML extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      fileURL: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    });
  }

  handleResponse(response) {
    console.log(response.data);
    this.setState({
      fileURL2: `http://7c206a6d.ngrok.io/static/maps/${response.data.filename}`
    });
    let chartColor = "#FFFFFF";
    var ctx = document.getElementById("ok").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, chartColor);

    var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    let myyChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Normal", "Pneumonia"],
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
            data: [response.data.p[0], response.data.p[1]]
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
  detect() {
    console.log(this.state.file);
    let formData = new FormData();
    formData.append("file", this.state.file);
    axios
      .post("http://7c206a6d.ngrok.io/predict", formData)
      .then(response => this.handleResponse(response));
  }
  render() {
    return (
      <div class="wrapper">
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
                <li class="nav-item  ">
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
                <li class="nav-item active">
                  <a class="nav-link" href="">
                    <i class="material-icons">image_search</i>
                    <p>Disease Detector</p>
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
                  Disease Detector
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
              <div class="card">
                {/* <div class="card-header card-header-primary">
                  <h4 class="card-title">Upload your Report to Diagnose it</h4>
                </div> */}

                {/* MAINBODY */}
                <div class="card-body">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="card">
                          <div class="card-header card-header-primary">
                            <h5 class="card-title">Upload</h5>
                          </div>
                          <div class="card-body">
                            {this.state.fileURL && !this.state.fileURL2 ? (
                              <img class="img-fluid" src={this.state.fileURL} />
                            ) : (
                              <></>
                            )}
                            {this.state.fileURL2 ? (
                              <></>
                            ) : (
                              <input
                                type="file"
                                class="btn btn-primary"
                                onChange={this.handleChange}
                              />
                            )}
                            {this.state.fileURL2 ? (
                              <img
                                class="img-fluid"
                                src={this.state.fileURL2}
                              />
                            ) : (
                              <>
                                <button
                                  class="btn btn-primary"
                                  onClick={file => this.detect(file)}
                                >
                                  Upload
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="card">
                          <div class="card-header card-header-warning">
                            <h5 class="card-title">Result</h5>
                          </div>
                          <div
                            class="card-body"
                            style={{ textAlign: "center" }}
                          >
                            <div class="card-body card-header-warning">
                              <canvas
                                id="ok"
                                height="300px"
                                width="100px"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
