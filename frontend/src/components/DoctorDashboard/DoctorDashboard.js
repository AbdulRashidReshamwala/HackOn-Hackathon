import React from "react";
import "../Dashboard/Dashboard.css";
import DocTable from "./DocTable";
import { Link } from "react-router-dom";
import Chart from "chart.js";
import axios from "axios";
import Cookie from "js-cookie";
class DoctorDashboard extends React.Component {
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
  }
  componentDidMount() {
    let jwt = Cookie.get("jwt");
    axios
      .get("http://7c206a6d.ngrok.io/meta/" + jwt)
      .then(response => this.handleResponse(response));
  }

  render() {
    let add = Cookie.get("address");
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
                    Doctor Dashboard
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
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="card card-stats">
                      <div class="card-header card-header-warning card-header-icon">
                        <div class="card-icon">
                          <i class="material-icons">person</i>
                        </div>
                        <p class="card-category">Patients</p>
                        <h3 class="card-title">28</h3>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="material-icons text-danger">warning</i>
                          <a href="javascript:;">Get More Space...</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="card card-stats">
                      <div class="card-header card-header-success card-header-icon">
                        <div class="card-icon">
                          <i class="material-icons">scanner</i>
                        </div>
                        <p class="card-category">Revenue</p>
                        <h3 class="card-title">$34,245</h3>
                      </div>
                      <div class="card-footer">
                        <div class="stats">
                          <i class="material-icons">date_range</i> Last 24 Hours
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-3 col-sm-3">
                    <div class="card card-stats">
                      <div class="card-header card-header-danger card-header-icon">
                        <img
                          class="img-fluid"
                          src={`http://7c206a6d.ngrok.io/static/qr/${add}.jpeg`}
                        />

                        <h3 class="card-title">Scan to Share Reports</h3>
                      </div>
                      <div class="card-footer">
                        <div class="stats">Scan</div>
                      </div>
                    </div>
                  </div>
                </div>

                <DocTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorDashboard;
