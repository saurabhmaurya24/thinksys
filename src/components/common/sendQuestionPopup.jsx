import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import http from "../../services/http";
import config from "../../config";
import QuestionSetDetails from "../interviewProcess/QuestionSetDetails";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
let techUrl = "QuestionBank/Technologies";
let informationUrl = "QuestionSet/SetInformation";
let questionPaperUrl = "QuestionSet/Send";
let updateStatusUrl = "QuestionSet/CandidateStatus";
let questionPaperRoute, technologyRoute, informationRoute, updateStatusRoute;
let questionSets = [];
const testType = [
  { id: 1, name: "Technical" },
  { id: 2, name: "Aptitude" },
  { id: 3, name: "Aptitude + Technical" }
];

class SendQuestionPopup extends Component {
  state = {
    techOptions: [],
    questionSets: [],
    questionSetName: "",
    isMailSent: false,
    showTechOptions: true,
    showQuestionDetail: true,
    isDisabled: true
  };
  componentWillMount() {
    technologyRoute = config.apiEndPoint + techUrl;
    informationRoute = config.apiEndPoint + informationUrl;

    const requestHeaders = {
      headers: {
        clientKey: config.clientKey
      }
    };

    http.get(technologyRoute, requestHeaders).then(response => {
      response.data.forEach(tech => {
        let techOptions = [...this.state.techOptions];
        techOptions.push(tech);
        this.setState({ techOptions });
      });
    });

    http.get(informationRoute, requestHeaders).then(response => {
      console.log("response", response.data);
      questionSets = [...this.state.questionSets];
      response.data.forEach(response => {
        questionSets.push(response);
      });
      this.setState({ questionSets });
    });
  }

  handleChange = input => {
    console.log(input.target.value);
    if (input.target.value !== "Aptitude") {
      this.setState({ showTechOptions: true });
    } else {
      this.setState({ showTechOptions: false });
    }

    let count = 0;
    if (this.state.questionSets.length === 0) {
      const requestHeaders = {
        headers: {
          clientKey: config.clientKey
        }
      };

      http.get(informationRoute, requestHeaders).then(response => {
        console.log("response", response.data);
        let questionSets = [...this.state.questionSets];
        response.data.forEach(response => {
          questionSets.push(response);
        });
        this.setState({ questionSets });
      });
    }
    this.state.questionSets.forEach(questionSet => {
      questionSet.QuestionsSetDetails.forEach(questionSetDetail => {
        if (
          questionSetDetail.QuestionType === input.target.value ||
          input.target.value === "select" ||
          input.target.value === "Aptitude + Technical"
        ) {
          count = count + 1;
        }
      });
      if (count === 0) {
        this.setState({ questionSets: [] });
      } else {
        this.setState(this.state);
        this.setState({ showQuestionDetail: false });
      }
    });
  };

  handleTechnologyChange = input => {
    console.log("input", input.target.value, this.state.questionSets);
    if (input.target.value === "select") {
      const requestHeaders = {
        headers: {
          clientKey: config.clientKey
        }
      };

      http.get(informationRoute, requestHeaders).then(response => {
        console.log("response", response.data);
        let questionSets = [...this.state.questionSets];
        response.data.forEach(response => {
          questionSets.push(response);
        });
        this.setState({ questionSets });
      });
    }

    let count = 0;
    questionSets.forEach(questionSet => {
      questionSet.QuestionsSetDetails.forEach(questionSetDetail => {
        if (questionSetDetail.QuestionTechnology === input.target.value) {
          count = count + 1;
          let questionSets = [...this.state.questionSets];
          questionSets = [];
          questionSets.push(questionSet);
          this.setState({ questionSets });
          this.setState({ showQuestionDetail: false });
          console.log("quest", this.state.questionSets);
        }
      });
      if (count === 0) {
        let questionSets = [...this.state.questionSets];
        questionSets = [];
        this.setState({ questionSets });
      } else {
      }
    });
  };

  handleQuestionSetChange = input => {
    if (input.target.value !== "select") {
      this.setState({
        questionSetName: input.target.value,
        showQuestionDetail: true,
        isDisabled: false
      });
    } else {
      this.setState({ showQuestionDetail: false, isDisabled: true });
    }
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

  handleClick = e => {
    this.setState({ sendingMail: true, isMailSent: true });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { candidateName, candidateEmailAddress, intervieweeId } = this.props;
    console.log(this.state);
    let setId;
    const todayDate = this.getCurrentDate();
    this.state.questionSets.forEach(questionSet => {
      if (questionSet.SetName === this.state.questionSetName) {
        setId = questionSet.SetId;
      }
    });
    e.preventDefault();
    const requestPayload = {
      CandidateName: candidateName,
      CandidateIntervieweeId: intervieweeId,
      CandidateEmailAddress: candidateEmailAddress,
      SetId: setId,
      EmailSentDate: todayDate,
      HrName: userInfo.LoggedInName,
      HrEmailAddress: userInfo.userName
    };

    const requestHeaders = {
      headers: {
        clientKey: config.clientKey,
        "Content-Type": "application/json"
      }
    };

    console.log(JSON.stringify(requestPayload));

    questionPaperRoute = config.apiEndPoint + questionPaperUrl;

    const payload = {
      Status: "Question Paper Sent"
    };

    updateStatusRoute = `${
      config.apiEndPoint
    }${updateStatusUrl}/${intervieweeId}`;
    http.put(updateStatusRoute, payload, requestHeaders);

    http
      .post(questionPaperRoute, requestPayload, requestHeaders)
      .then(response => {
        console.log(response.data);
        if (response.data.IsMailSent) {
          this.setState({ sendingMail: false, isMailSent: true });
        }
      });
  };

  render() {
    const { open, onClose, heading } = this.props;
    return (
      <div style={styles}>
        <Modal show={open}>
          <Modal.Header>
            <Modal.Title>{heading}</Modal.Title>
          </Modal.Header>
          {this.state.isMailSent === false ? (
            <Modal.Body>
              <div className="row">
                <div className="col-6">
                  <label>Select The Type Of Test</label>
                  <div className="select">
                    <select
                      className="selected"
                      name="slct"
                      id="slct"
                      onChange={input => this.handleChange(input)}
                    >
                      <option value="select"> Select...</option>
                      {testType.map((option, index) => (
                        <option
                          key={index}
                          value={option.name}
                          onClick={this.handleChange}
                        >
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  {this.state.showTechOptions && (
                    <React.Fragment>
                      <label>Select the type of technology</label>
                      <div className="select">
                        <select
                          className="selected"
                          name="slct"
                          id="slct"
                          onChange={input => this.handleTechnologyChange(input)}
                        >
                          <option value="select"> Select...</option>
                          {this.state.techOptions.map((option, index) => (
                            <option key={index} value={option.Name}>
                              {option.Name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <div className="col-6">
                  <br />
                  <label>Select Question Set To Send</label>
                  <div className="select">
                    <select
                      className="selected"
                      name="slct"
                      id="slct"
                      onChange={input => this.handleQuestionSetChange(input)}
                    >
                      ><option value="select"> Select...</option>
                      {this.state.questionSets.map((option, index) => (
                        <option key={index} value={option.SetName}>
                          {option.SetName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <br />
              {this.state.questionSetName &&
                this.state.showQuestionDetail === true &&
                this.state.questionSets.length !== 0 && (
                  <QuestionSetDetails
                    details={this.state.questionSets}
                    questionSetName={this.state.questionSetName}
                  />
                )}
              {this.state.isDisabled === true ? (
                <button
                  onClick={this.handleClick}
                  disabled={true}
                  className="btn btn-primary"
                  id="sendBtnNotAllowed"
                >
                  Send
                </button>
              ) : (
                <button
                  onClick={this.handleClick}
                  className="btn btn-primary"
                  id="sendBtn"
                >
                  Send
                </button>
              )}
            </Modal.Body>
          ) : this.state.sendingMail === true ? (
            <Modal.Body>Sending Email</Modal.Body>
          ) : (
            <Modal.Body>Mail Sent</Modal.Body>
          )}
          <Modal.Footer>
            <button
              className="btn btn-primary"
              onClick={input => onClose(input)}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SendQuestionPopup;
