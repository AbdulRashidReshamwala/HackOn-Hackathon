import React from "react";
import { Link } from "react-router-dom";
export default class Forum extends React.Component {
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
                  <li class="nav-item  ">
                    <a class="nav-link" href="">
                      <i class="material-icons">dashboard</i>
                      <p>Dashboard</p>
                    </a>
                  </li>
                </Link>

                <li class="nav-item active ">
                  <a class="nav-link" href="">
                    <i class="material-icons">content_paste</i>
                    <p>Forum</p>
                  </a>
                </li>
                <Link to="/ml">
                  <li class="nav-item  ">
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
                    Forum
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
                    <h4 class="card-title">Questions/Answers</h4>
                  </div>
                  {/* MAINBODY */}
                  <div class="card-body">
                    <div class="card-body"></div>
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
