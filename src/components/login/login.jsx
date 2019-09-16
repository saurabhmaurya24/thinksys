/* eslint-disable no-useless-escape */
import React, { Component } from "react";
import logo from "../../resources/img-01.png";
import ErrorMessage from "./../registration/ErrorMessage";
import http from "../../services/http";
import config from "../../config";
import { Redirect } from "react-router-dom";

let errors = {};
const loginUri = config.apiEndPoint + "Hr/Login";
const errorStyle = {
  color: "red",
  float: "right"
};

let isSubmitted = false;

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: ErrorMessage.userName,
      password: ErrorMessage.password
    },
    redirect: false,
    validEmailRegex: RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  };

  handleClick = e => {
    e.preventDefault();
    errors = { ...this.state.errors };
    console.log("Hi", errors, this.state);
    if (this.state.errors.email !== "" || this.state.errors.password !== "") {
      console.log("Errors", this.state.errors);
      this.setState(this.state);
    } else {
      console.log(this.state);
      const requestPayload = {
        username: this.state.email,
        password: this.state.password
      };

      const requestheaders = {
        headers: {
          "Content-Type": "application/json",
          ClientKey: config.clientKey
        }
      };

      http
        .post(loginUri, requestPayload, requestheaders)
        .then(response => {
          if (response.data.access_token == null) {
            errors.invalid = ErrorMessage.invalidUserNameOrPassword;
            this.setState(this.state);
          } else if (response.data.IsHr === false) {
            errors.unauthorized = ErrorMessage.unauthorized;
            this.setState(this.state);
          } else {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            this.setState({ redirect: true });
          }
        })
        .catch(error => {
          console.log("error form submission", error);
        });
      isSubmitted = true;
      console.log("Errtrs", errors);
    }
  };

  handleChange = (input, state) => {
    console.log(input.name);
    if (isSubmitted) {
      delete errors["invalid"];
      delete errors["unauthorized"];
    }
    this.validation(input);
    state[input.name] = input.value;
  };

  validation = input => {
    switch (input.name) {
      case "email":
        errors[input.name] =
          input.value.length === 0 ? ErrorMessage.userName : "";
        break;
      case "password":
        errors[input.name] =
          input.value.length === 0 ? ErrorMessage.password : "";
        break;
      default:
        break;
    }

    this.setState({ errors });
  };

  render() {
    if (localStorage.getItem("access_token") !== null) {
      return <Redirect to="/adminDashboard" />;
    }

    if (this.state.redirect) {
      return <Redirect to="/adminDashboard" />;
    }
    return (
      <React.Fragment>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <img
                className="thinksysLogo"
                alt="Can not be loaded"
                height="200"
                width="200"
                src={require("../../resources/ThinksysLogo.png")}
              />
              <div className="img-hover-zoom--slowmo img" data-tilt>
                <img src={logo} alt="IMG" />
              </div>

              <form className="login100-form validate-form">
                <span className="login100-form-title">
                  <b>Recruiter </b>
                </span>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Valid email is required: ex@abc.xyz"
                >
                  <input
                    className="input100"
                    type="text"
                    name="email"
                    placeholder="UserName"
                    onChange={({ currentTarget: input }) =>
                      this.handleChange(input, this.state)
                    }
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true" />
                  </span>
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={({ currentTarget: input }) =>
                      this.handleChange(input, this.state)
                    }
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true" />
                  </span>
                </div>

                <b>
                  {errors && (
                    <React.Fragment>
                      <div style={errorStyle}>{errors.email}</div>
                    </React.Fragment>
                  )}
                </b>
                <br />
                <b>
                  {errors && (
                    <React.Fragment>
                      <div style={errorStyle}>{errors.password}</div>
                    </React.Fragment>
                  )}
                </b>
                <b>
                  {errors && (
                    <React.Fragment>
                      <div style={errorStyle}>{errors.invalid}</div>
                    </React.Fragment>
                  )}
                </b>
                <b>
                  {errors && (
                    <React.Fragment>
                      <div style={errorStyle}>{errors.unauthorized}</div>
                    </React.Fragment>
                  )}
                </b>

                <div className="container-login100-form-btn">
                  <button
                    className="login100-form-btn"
                    onClick={this.handleClick}
                  >
                    Login
                  </button>
                </div>

                <div className="text-center p-t-12" />

                <div className="text-center p-t-136" />
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
