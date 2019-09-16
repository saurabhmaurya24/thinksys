/* eslint-disable no-useless-escape */
import React from "react";
import Form from "../registration/form";
import Input from "./../registration/input";
import ErrorMessage from "../registration/ErrorMessage";
import http from "../../services/http";
import config from "../../config";
import ModalPopup from "./../common/modal";
import Select from "./../registration/select";

let mailUrl = "HrForm/sendMail";
let techUrl = "QuestionBank/Technologies";
let apiRoute, technologyRoute;
let errors = {};
let startIndex = 2;

const errorStyle = {
  color: "red"
};

const divStyle = {
  float: "right"
};

const tableStyle = {
  border: "1px solid #dcdcdc",
  borderRadius: "20px"
};

class SendEmail extends Form {
  state = {
    recipients: [
      {
        name: "",
        emailAddress: "",
        profile: ""
      }
    ],
    newRecipient: [],
    errors: {
      name1: ErrorMessage.name,
      emailAddress1: ErrorMessage.emailId,
      profile1: ErrorMessage.profile
    },
    name: [],
    techOptions: [],
    validEmailRegex: RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
    open: false,
    modalBody: ""
  };

  componentWillMount() {
    apiRoute = config.apiEndPoint + mailUrl;
    technologyRoute = config.apiEndPoint + techUrl;

    const requestHeaders = {
      headers: {
        clientKey: config.clientKey
      }
    };

    http.get(technologyRoute, requestHeaders).then(response => {
      response.data.forEach(tech => {
        const techOptions = [...this.state.techOptions];
        techOptions.push(tech);
        this.setState({ techOptions });
      });
    });
  }

  handleAddClick = e => {
    let newRecipient = { ...this.state.newRecipient };
    const recipients = [...this.state.recipients];
    recipients.push(newRecipient);
    const errors = { ...this.state.errors };
    errors["name" + startIndex] = ErrorMessage.name;
    errors["emailAddress" + startIndex] = ErrorMessage.name;
    errors["profile" + startIndex] = ErrorMessage.name;
    this.setState({ recipients, errors });
    startIndex = startIndex + 1;
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleRemoveClick = e => {
    let recipients = [...this.state.recipients];
    startIndex = startIndex - 1;
    errors["name" + startIndex] = "";
    errors["emailAddress" + startIndex] = "";
    errors["profile" + startIndex] = "";
    recipients.splice(-1, 1);
    this.setState({ recipients, errors });
  };

  getCurrentDate = () => {
    let today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = dd + "-" + mm + "-" + yyyy;
    return today;
  };

  handleClick = () => {
    let isValid = true;
    errors = { ...this.state.errors };
    console.log("Errors", errors);
    this.setState(errors);

    console.log("SendEmail", this.state);

    for (let item of Object.values(this.state.errors)) {
      if (item !== "") {
        isValid = false;
      }
    }

    if (isValid === true) {
      this.setState({
        open: true,
        modalBody: "Please Wait While Mail is Being Sent"
      });

      const emailReceipients = this.state.recipients;
      emailReceipients.forEach(receipient => {
        receipient.name = receipient.name.replace(/ +/g, "");
      });
      const requestHeaders = {
        headers: {
          clientKey: config.clientKey,
          "Content-Type": "application/json"
        }
      };

      const currentDate = this.getCurrentDate();

      const requestPayload = {
        EmailReceipients: emailReceipients,
        EmailSentDate: currentDate,
        HrName: this.props.hrName,
        HrEmailAddress: this.props.hrEmailAddress
      };

      console.log(JSON.stringify(requestPayload));

      console.log("MailUrl", apiRoute);

      http.post(apiRoute, requestPayload, requestHeaders).then(response => {
        console.log(response.data);

        if (response.data.IsMailSent === true) {
          this.setState({ modalBody: "Mail Sent" });
        } else {
          this.setState({
            modalBody: "Mail Could Not Be Sent Due To Server Issue"
          });
        }
      });
    }
  };

  validation = (input, index) => {
    switch (input.name) {
      case "name":
        errors[input.name + (index + 1)] =
          input.value.length === 0 ? ErrorMessage.name : "";
        break;
      case "emailAddress":
        errors[input.name + (index + 1)] =
          input.value.length === 0
            ? ErrorMessage.emailId
            : this.state.validEmailRegex.test(input.value)
            ? ""
            : ErrorMessage.invalidEmail;
        break;
      case "profile":
        errors[input.name + (index + 1)] =
          input.value === "select" ? ErrorMessage.profile : "";
        break;
      default:
        break;
    }

    console.log("errors", errors);
    this.setState({ errors });
  };

  handleChange = (input, state, index) => {
    this.validation(input, index);
    if (input.name === "name") {
      state.recipients[index].name = input.value;
    } else if (input.name === "emailAddress") {
      state.recipients[index].emailAddress = input.value;
    } else {
      state.recipients[index].profile = input.value;
    }
  };

  render() {
    const removeStyle = {
      visibility: this.state.recipients.length === 1 ? "hidden" : "",
      float: "right",
      marginRight: 5
    };
    return (
      <React.Fragment>
        <ModalPopup
          open={this.state.open}
          modalBody={this.state.modalBody}
          onClose={this.handleClose}
          heading="Status"
        />
        <div className="row">
          <div className="col-lg-12">
            <h3 className="title-3 m-b-30">Send Mail</h3>
            <div className="table-responsive  m-b-40" style={tableStyle}>
              <table className="table table-striped table-earning">
                <thead className="table-heading">
                  <tr>
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.recipients.map((receipient, index) => (
                    <tr key={index}>
                      <td className="notApplicable">{index + 1}</td>
                      <td>
                        <Input
                          name="name"
                          value={this.state.recipients["name"]}
                          onChange={({ currentTarget: input }) =>
                            this.handleChange(input, this.state, index)
                          }
                        />
                        <b>
                          {errors && (
                            <div style={errorStyle}>
                              {errors["name" + (index + 1)]}
                            </div>
                          )}
                        </b>
                      </td>
                      <td>
                        <Input
                          name="emailAddress"
                          value={this.state.recipients["emailAddress"]}
                          onChange={({ currentTarget: input }) =>
                            this.handleChange(input, this.state, index)
                          }
                        />
                        <b>
                          {errors && (
                            <div style={errorStyle}>
                              {errors["emailAddress" + (index + 1)]}
                            </div>
                          )}
                        </b>
                      </td>
                      <td>
                        <Select
                          name="profile"
                          options={this.state.techOptions}
                          onChange={({ currentTarget: input }) =>
                            this.handleChange(input, this.state, index)
                          }
                        />
                        <b>
                          {errors && (
                            <div style={errorStyle}>
                              {errors["profile" + (index + 1)]}
                            </div>
                          )}
                        </b>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-primary"
              id="plusButton"
              onClick={this.handleAddClick}
              style={divStyle}
            >
              +
            </button>
            <button
              id="minusButton"
              className="btn btn-primary"
              style={removeStyle}
              onClick={this.handleRemoveClick}
              visivility="hidden"
            >
              -
            </button>
            <br />
            <br />
            <button
              id="emailSend"
              className="btn btn-primary"
              onClick={this.handleClick}
            >
              Send
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SendEmail;
