import React, { Component } from "react";
import CandidateRegistrationScreen from "./CandidateRegistrationScreen";
import http from "../../services/http";
import config from "../../config";
import { Redirect } from "react-router-dom";
import axios from "axios";

let registrationUri = "HrForm/ValidUser";
let registrationCode;

const backGrounddivStyle = {
  backgroundColor: "#36304a",
  color: "white",
  padding: 10,
  marginTop: -10,
  marginLeft: -20,
  marginRight: -20,
  borderRadius: 5
};
const divStyle = {
  color: "red"
};

class Registration extends Component {
  state = {};
  async componentWillMount() {
    console.log("Props", this.props);
    registrationCode = this.props.match.params.id;
    const requestHeaders = {
      headers: {
        clientKey: config.clientKey,
        "Content-Type": "application/json"
      }
    };

    registrationUri =
      config.apiEndPoint +
      registrationUri +
      "?registrationCode=" +
      registrationCode;

    const accessToken = localStorage.getItem("access_token");
    if (registrationCode === "HrView=true" && accessToken === null) {
      this.setState({ unAuthorized: true });
    }

    if (
      registrationCode !== "HrView=true" &&
      registrationCode !== "isViewable=false"
    ) {
      axios.get(registrationUri, requestHeaders).then(response => {
        console.log(response.data);
        if (!response.data.IsValidUser) {
          this.setState({ redirect: true });
        }
      });
    }
  }

  render() {
    debugger;
    if (this.state.unAuthorized) {
      return <Redirect to="/" />;
    }

    if (this.state.redirect) {
      return <Redirect to="/notFound" />;
    }
    return (
      <div className="form-style-5">
        <h3 align="center">
          <div style={backGrounddivStyle}>
            <b>Candidate Registration Form</b>
          </div>
        </h3>
        <b>
          <h6 align="right" style={divStyle}>
            {" "}
            All * fields are mandatory{" "}
          </h6>
        </b>
        <br />
        <div className="row">
          <div className="col-12">
            <CandidateRegistrationScreen registrationCode={registrationCode} />
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
