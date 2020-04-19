import React from "react";
import { withRouter } from "react-router-dom";
import "./Login.css";
import $ from "jquery";
import axios from "axios";
import Cookie from "js-cookie";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "pat0@pat.com",
      password: "Pass@123"
    };
  }

  onChangeEmail(email) {
    this.setState({ email: email });
  }

  onChangePassword(password) {
    this.setState({ password: password });
    console.log(this.state.password);
  }

  async handleSubmit(state, event) {
    event.preventDefault();

    let email = state.email;
    let password = state.password;

    axios
      .post("http://7c206a6d.ngrok.io/login", {
        email: email,
        password: password
      })
      .then(response => this.handleResponse(response))
      // .then(this.state.navigate('Profile'))
      .catch(error => alert("Ubaid bhai ye dekhona " + error));
    // //event.preventDefault();
  }

  async handleResponse(response) {
    console.log(response.data.type);
    if (response.status == 200) {
      Cookie.set("email", response.data.email);
      Cookie.set("address", response.data.address);
      Cookie.set("id", String(response.data.id));
      Cookie.set("jwt", response.data.jwt);
      console.log(Cookie.get("jwt"));
      //  console.log(this.props.history);
      //this.props.history.push("/dashboard");
      if (response.data.type == "patient") {
        this.props.history.push("/dashboard");
      } else {
        this.props.history.push("/doc-dashboard");
      }
      console.log("Login sucess");
    } else {
      alert(response.status);
    }
  }

  componentDidMount() {
    $(".message a").click(function() {
      $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
    });
  }

  render() {
    return (
      <div class="login-page">
        <div class="form">
          <form class="register-form">
            <input type="text" placeholder="name" />
            <input type="password" placeholder="password" />
            <input type="text" placeholder="email address" />
            <button>create</button>
            <p class="message">
              Already registered? <a href="#">Sign In</a>
            </p>
          </form>
          <form class="login-form">
            <input
              type="text"
              placeholder="Enter email"
              value={this.state.email}
              onChange={text => this.onChangeEmail(text.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={text => this.onChangePassword(text.target.value)}
            />
            <button onClick={event => this.handleSubmit(this.state, event)}>
              login
            </button>
            <p class="message">
              Not registered? <a href="#">Create an account</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
