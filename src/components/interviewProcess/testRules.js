/* eslint-disable eqeqeq */
import React, { Component } from "react";
import http from "../../services/http";
import config from "../../config";
import { Redirect } from "react-router-dom";

const validUrl = "QuestionSet/Valid";
const deleteCodeUrl = "QuestionSet/RegistrationCode";
let informationUrl = "QuestionSet/SetInformation";
let informationRoute;
let setId, candidateId;
class TestRules extends Component {
  state = {
    totalMarks: 0,
    totalDuration: 0,
    totalQuestions: 0
  };
  componentDidMount() {
    console.log("Props", this.props);
    informationRoute = config.apiEndPoint + informationUrl;
    const url = `${config.apiEndPoint}${validUrl}?registrationCode=${
      this.props.match.params.id
    }`;

    const requestHeaders = {
      headers: {
        clientKey: config.clientKey,
        contentType: "application/json"
      }
    };

    http.get(informationRoute, requestHeaders).then(response => {
      const number = this.props.match.params.id.indexOf("-");
      setId = this.props.match.params.id.substring(0, number);

      const set = response.data.filter(x => x.SetId == setId);
      console.log("response", response.data, set);
      this.setState({
        totalDuration: set[0].TotalDuration,
        totalMarks: set[0].TotalMarks,
        totalQuestions: set[0].TotalQuestionsCount
      });
    });

    http.get(url, requestHeaders).then(response => {
      console.log("Response", response.data);
      if (response.data.IsValidSet !== true) {
        this.setState({ redirect: true });
      }
    });
  }

  handleStartClick = () => {
    const url = `${config.apiEndPoint}${deleteCodeUrl}/${
      this.props.match.params.id
    }`;
    const requestHeaders = {
      headers: {
        clientKey: config.clientKey,
        contentType: "application/json"
      }
    };
    // http.delete(url, requestHeaders);
    const queryString = this.props.match.params.id;
    const number = queryString.indexOf("-");
    setId = queryString.substring(0, number);
    var id = queryString.substring(number, queryString.length);
    id = id.substr(1);
    var index = id.indexOf("-");
    candidateId = id.substring(0, index);
    console.log("CandidateId", candidateId, setId);
    this.setState({ redirectToQuestionPaper: true });
  };

  render() {
    if (this.state.redirectToQuestionPaper) {
      return (
        <Redirect
          to={{
            pathname: "/questions",
            state: { setId: setId, candidateId: candidateId }
          }}
        />
      );
    }

    if (this.state.redirect) {
      return <Redirect to="/notFound" />;
    }
    return (
      <React.Fragment>
        <div className="background">
          <b>
            <strong>
              <h2 className="testHeading">Test Rules</h2>
            </strong>
          </b>
          <div className="testRules">
            <ul className="listOfRules">
              <li className="rulesListItem">
                No. of Questions{" "}
                <h5 className="questionDetails">
                  {" "}
                  {this.state.totalQuestions}
                </h5>
              </li>
              <li className="rulesListItem">
                Total Time{" "}
                <h5 className="questionDetails">
                  {" "}
                  {this.state.totalDuration} minutes
                </h5>
              </li>
              <li className="rulesListItem">
                Total Marks{" "}
                <h5 className="questionDetails">{this.state.totalMarks}</h5>
              </li>
              <li className="rulesListItem">
                There will be no negative marking
              </li>
              <li className="rulesListItem">
                You are not allowed to switch tabs. After 2 warnings your test
                will be submitted.
              </li>
              <li className="rulesListItem">
                After the Time is over, the test will be submitted automatically
              </li>
              <li className="rulesListItem">
                You will not be able to go back when you start the test as the
                test link will expire.
              </li>
            </ul>
            <button
              className="btn btn-primary"
              id="startTest"
              onClick={this.handleStartClick}
            >
              Start Test
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TestRules;
