import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

// import EditUsername from "../EditUsername";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirect: false
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }
  loginUser() {
    axios
      .post("/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(() => this.setState({ redirect: true }))
      .catch(() => {
        alert("login unsuccessful. try again");
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <h3> Log In</h3>
        <div>
          <input placeholder="username" onChange={this.handleUsername} />
          <input
            placeholder="password "
            type="password"
            onChange={this.handlePassword}
          />
          <a
            className="waves-effect waves-light btn-signup"
            onClick={this.loginUser}
          >
            Log In
          </a>

          <br />
          <br />
          {/* <a>
            <Link to="/editUserName" className="waves-effect waves-UserName">
              Edit User Name
            </Link>
          </a> */}
        </div>
      </div>
    );
  }
}

export default Login;
