import React from "react";
import { withRouter } from "react-router-dom";
import Crop from "../Crop/Crop";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
var FormData = require("form-data");

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };

    // console.log(Cookie.get("jwt"));
    this.handleChange = this.handleChange.bind(this);
    this.regionCallback = this.regionCallback.bind(this);
  }

  regionCallback(regions) {
    this.setState({ regions: regions });
  }

  handleChange(event) {
    this.setState({
      fileURL: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    });
  }

  sendResponse(state, event) {
    event.preventDefault();
    console.log(this.state.regions);
    let jwt = Cookie.get("jwt");

    var formData = new FormData();
    formData.append("image", this.state.file, this.state.file.name);
    formData.append("regions", JSON.stringify(this.state.regions));
    formData.append("jwt", jwt);
    console.log(formData.get("image"));

    console.log(formData.get("regions"));

    axios
      .post(`http://5d4d3103.ngrok.io/upload`, formData)
      .then(res => console.log(res))
      .then(this.props.history.push(`/dashboard`));
    alert("File upload succesfully");
    // axios
    //   .post("http://192.168.0.109:5000/upload",
    //     formdata
    //   )
    //   .then(res => console.log(res.data))
    //   .catch(error => console.log(error));
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
              <a
                href="http://www.creative-tim.com"
                class="simple-text logo-normal"
              >
                Reactive Error
              </a>
            </div>
            <div class="sidebar-wrapper">
              <ul class="nav">
                <Link to="/dashboard">
                  <li class="nav-item active ">
                    <a class="nav-link" href="">
                      <i class="material-icons">dashboard</i>
                      <p>Dashboard</p>
                    </a>
                  </li>
                </Link>

                <li class="nav-item  ">
                  <a class="nav-link" href="">
                    <i class="material-icons">content_paste</i>
                    <p>Forum</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="main-panel">
            <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
              <div class="container-fluid">
                <div class="navbar-wrapper">
                  <a class="navbar-brand" href="javascript:;">
                    Upload
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
                  <div class="card-header card-header-primary">
                    <h4 class="card-title">Upload a File</h4>
                  </div>
                  {/* MAINBODY */}
                  <div class="card-body">
                    <div class="card-body" style={{ textAlign: "center" }}>
                      <input
                        type="file"
                        class="btn btn-primary"
                        onChange={this.handleChange}
                      />
                      <Crop
                        fileURL={this.state.fileURL}
                        regionCallback={this.regionCallback}
                      ></Crop>
                      <button
                        class="btn btn-primary"
                        onClick={event => this.sendResponse(this.state, event)}
                      >
                        Upload
                      </button>
                      {/* console.log(this.state.regions) */}
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

export default withRouter(Upload);
