import React from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import ReactSpinner from "react-bootstrap-spinner";
export default class TableOne extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  fetchFile(id) {
    console.log(id);
    axios.get("http://7c206a6d.ngrok.io/file/" + id).then(response =>
      this.setState({
        selectedFile: response.data
      })
    );
  }
  componentDidMount() {
    let jwt = Cookie.get("jwt");
    let formData = new FormData();
    formData.append("jwt", jwt);
    console.log(jwt);
    axios({
      url: "http://7c206a6d.ngrok.io/patient/dashboard",
      method: "POST",
      data: formData
    }).then(response => this.setState({ files: response.data.files }));
  }
  render() {
    return (
      <div class="row">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header card-header-tabs card-header-primary">
              <div class="nav-tabs-navigation">
                <div class="nav-tabs-wrapper">
                  <span class="nav-tabs-title">Files</span>
                  <ul class="nav nav-tabs" data-tabs="tabs">
                    <li class="nav-item">
                      <Link to="/upload">
                        <a class="nav-link" data-toggle="tab">
                          <i class="material-icons">cloud</i> Upload File
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="card-body table-responsive">
                <table class="table table-hover">
                  <thead class="text-primary">
                    <th>Name</th>
                    <th>Owner</th>
                  </thead>
                  {this.state.files ? (
                    this.state.files.map(file => {
                      return (
                        <tr onClick={() => this.fetchFile(file[0])}>
                          <td>{file[0]}</td>
                          <td>{file[2]}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <h1>
                      load
                      <ReactSpinner type="border" color="primary" size="5" />
                    </h1>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header card-header-warning">
              <h4 class="card-title">Select a file to Preview</h4>
            </div>
            <div class="card-body table-responsive">
              {this.state.selectedFile ? (
                <>
                  <h7 style={{ marginLeft: "12rem" }}>
                    {this.state.selectedFile.filename}
                  </h7>
                  <img
                    className="img-fluid"
                    src={`data:image/jpeg;base64,${this.state.selectedFile.b64img}`}
                  />
                  <br />
                  <h3>Tags</h3>
                  <h4>Disease</h4>
                  {this.state.selectedFile.summary.Disease.map(disease => (
                    <a
                      class="btn btn-warning"
                      target="_blank"
                      href={"http://finto.fi/mesh/en/page/" + disease[1]}
                    >
                      {disease[0]}
                    </a>
                  ))}
                  <br />
                  <h4>Drugs</h4>
                  {this.state.selectedFile.summary.Drug.map(drug => (
                    <a
                      class="btn btn-warning"
                      target="_blank"
                      href={
                        "https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:" +
                        drug[1]
                      }
                    >
                      {drug[0]}
                    </a>
                  ))}
                </>
              ) : (
                <p style={{ marginLeft: "12rem" }}>No file selected</p>
              )}

              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
