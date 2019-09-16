/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import http from "../../services/http";
import config from "../../config";
import SendQuestionPopup from "./../common/sendQuestionPopup";
import { Link } from "react-router-dom";
import ModalPopup from "../common/modal";

const tableStyle = {
  border: "1px solid #dcdcdc",
  borderRadius: "20px",
  overflow: "auto",
  maxHeight: "500px"
};

let intervieweeId, candidateName, candidateEmailAddress;
let scoreUrl = "QuestionSet/CandidateScore";
let hrActionUrl = "QuestionSet/CandidateStatus/";
let candidateScore;

class CandidateList extends Component {
  state = {
    testType: [
      {
        name: "Aptitude"
      },
      {
        name: "Technical"
      },
      {
        name: "Aptitude+Technical"
      }
    ]
  };

  componentDidMount() {}

  handleClose = () => {
    this.setState({
      modalOpen: false,
      showModal: false
    });
  };

  handleClick = (input, candidateName) => {
    console.log("props", this.props, input.currentTarget);
    this.props.candidateList.forEach(candidate => {
      if (candidate.Name === candidateName) {
        intervieweeId = candidate.IntervieweeId;
      }
    });
    return (
      <Link
        to="/candidateResponse"
        target="_blank"
        onClick={event => {
          event.preventDefault();
          window.open(this.makeHref("/candidateResponse"));
        }}
      />
    );
    // this.setState({ redirect: true });
  };

  handleSendQuestion = (name, emailAddress, candidateIntervieweeId) => {
    console.log("Clicked", name);
    candidateName = name;
    candidateEmailAddress = emailAddress;
    intervieweeId = candidateIntervieweeId;
    this.setState({ modalOpen: true });
  };

  handleMailSent = () => {
    this.setState({ isMailSent: true });
  };

  handleScore = candidateIntervieweeId => {
    console.log("inter", candidateIntervieweeId);
    const scoreRoute = config.apiEndPoint + scoreUrl;
    const requestHeaders = {
      headers: {
        clientKey: config.clientKey
      }
    };
    http.get(scoreRoute, requestHeaders).then(response => {
      console.log(response.data);
      const filteredArray = response.data.filter(
        x => x.CandidateId === candidateIntervieweeId
      );
      console.log("filteredArray", filteredArray);
      response.data.forEach(response => {
        console.log("Testing", response.CandidateId, candidateIntervieweeId);
        if (response.CandidateId === candidateIntervieweeId) {
          candidateScore = response;
          intervieweeId = candidateIntervieweeId;
          console.log("Candidate", candidateScore);
          this.setState({ showModal: true });
        }
      });
    });
  };

  handleConfirmClick = (intervieweeId, hrAction) => {
    const statusUrl = config.apiEndPoint + hrActionUrl + intervieweeId;

    const requestHeaders = {
      headers: {
        clientKey: config.clientKey
      }
    };

    const requestPayload = {
      Status: hrAction
    };

    console.log("requestPayload", requestPayload);

    http.put(statusUrl, requestPayload, requestHeaders);
    const receipientUri = "HrForm/EmailReceipients";
    const uri = config.apiEndPoint + receipientUri;
    let candidateList;
    candidateList = [...this.props.candidateList];

    http.get(uri, requestHeaders).then(response => {
      console.log("Response", response);
      response.data.forEach(candidate => {
        candidateList.push(candidate);
      });
      this.setState({ candidateList, modalOpen: false, showModal: false });
    });
  };

  render() {
    const { candidateList } = this.props;
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/candidateResponse",
            state: { intervieweeId: intervieweeId }
          }}
        />
      );
    }
    return (
      <React.Fragment>
        <br />
        {this.state.showModal && (
          <ModalPopup
            open={this.state.showModal}
            onClose={this.handleClose}
            heading="Interviewee Test Results"
            modalBody={candidateScore}
            intervieweeId={intervieweeId}
            onConfirmClick={this.handleConfirmClick}
          />
        )}
        {this.state.modalOpen && (
          <SendQuestionPopup
            modalBody={this.state.modalBody}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            heading="Send Question Set"
            testType={this.state.testType}
            candidateName={candidateName}
            candidateEmailAddress={candidateEmailAddress}
            onMailSent={this.handleMailSent}
            intervieweeId={intervieweeId}
          />
        )}
        <div className="row">
          <div className="col-lg-12">
            <h2 className="title-1 m-b-25">Candidate List</h2>
            <div className="table-responsive  m-b-40" style={tableStyle}>
              <table className="table table-borderless table-striped table-earning">
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Email Address</th>
                    <th>Status </th>
                    <th>Hr Name </th>
                    <th>Email Sent Date</th>
                    <th>Question Set</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {candidateList.map((candidate, index) => (
                    <tr key={index}>
                      <td>
                        {candidate.Status === "Question Paper Sent" ? (
                          <Link
                            to={{
                              pathname: candidate.Name
                            }}
                            onClick={event => {
                              event.preventDefault();
                              window.open(
                                `candidateResponse/${candidate.IntervieweeId}`
                              );
                            }}
                          >
                            {candidate.Name}
                          </Link>
                        ) : (
                          candidate.Name
                        )}
                      </td>
                      <td>{candidate.EmailAddress}</td>
                      <td>{candidate.Status}</td>
                      <td>{candidate.HrName}</td>
                      <td>{candidate.MailSentDate}</td>
                      <td>
                        {candidate.Status === "Form Filled" ? (
                          <a
                            className="createRound"
                            onClick={() =>
                              this.handleSendQuestion(
                                candidate.Name,
                                candidate.EmailAddress,
                                candidate.IntervieweeId
                              )
                            }
                          >
                            Send
                          </a>
                        ) : candidate.Status === "Question Paper Sent" ? (
                          <a
                            className="createRound"
                            onClick={() =>
                              this.handleSendQuestion(
                                candidate.Name,
                                candidate.EmailAddress,
                                candidate.IntervieweeId
                              )
                            }
                          >
                            Send Again
                          </a>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        {candidate.Status === "Test Submitted" ? (
                          <a
                            className="createRound"
                            onClick={() =>
                              this.handleScore(candidate.IntervieweeId)
                            }
                          >
                            View
                          </a>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CandidateList;
