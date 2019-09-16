/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React, { Component } from "react";
import config from "../../config";
import Question from "./question";
import http from "../../services/http";
import { Redirect } from "react-router-dom";

let questionPaperUrl = "QuestionSet/GetQuestions";
let questionSetUrl = "QuestionSet/SetInformation";
let submitUrl = "QuestionSet/SubmitQuestionPaper";
let updateStatusUrl = "QuestionSet/CandidateStatus";
let questions,
  questionNumber = 0,
  selectedChoice = [],
  hidden,
  visibilityChange,
  alertBrowserSwitch = 2,
  questionId = 1;

class QuestionPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        QuestionID: "",
        QuestionName: "",
        id: "",
        name: "",
        options: [{ id: "", name: "" }],
        selected: [],
        totalQuestions: [],
        totalDuration: {
          minutes: 0,
          seconds: 0
        }
      }
    };
  }

  handleVisibilityChange() {
    if (document[hidden] && alertBrowserSwitch !== 0) {
      alert(
        `Please Don't Switch Tabs. You have ${alertBrowserSwitch} warnings `
      );
      alertBrowserSwitch = alertBrowserSwitch - 1;
    } else if (document[hidden] && alertBrowserSwitch == 0) {
      this.submitCandidateResponse();
      this.setState({ submit: true });
    }
  }

  componentDidMount() {
    console.log("Props", this.props);
    const that = this;
    if (typeof document.hidden !== "undefined") {
      // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }
    document.addEventListener(
      visibilityChange,
      this.handleVisibilityChange.bind(that),
      false
    );

    if (this.props.location.state === undefined) {
      this.setState({ redirect: true });
    } else {
      const questionPaperRoute = `${
        config.apiEndPoint
      }${questionPaperUrl}?setId=${this.props.location.state.setId}`;
      const requestheaders = {
        headers: {
          "Content-Type": "application/json",
          ClientKey: config.clientKey
        }
      };

      const questionSetRoute = `${config.apiEndPoint}${questionSetUrl}`;

      const requestheader = {
        headers: {
          "Content-Type": "application/json",
          ClientKey: config.clientKey
        }
      };
      http.get(questionSetRoute, requestheader).then(response => {
        const currentSet = response.data.filter(
          x => x.SetId == this.props.location.state.setId
        );

        let totalDuration = { ...this.state.totalDuration };
        totalDuration.minutes = parseInt(`${currentSet[0].TotalDuration - 1}`);
        totalDuration.seconds = 59;
        this.timer = setInterval(this.tick.bind(this), 1000);
        console.log("Set", response.data, currentSet, totalDuration);
        this.setState({ totalDuration });
      });

      http.get(questionPaperRoute, requestheaders).then(response => {
        console.log("Response", response.data);
        questions = response.data;
        this.setState({
          currentQuestion: questions[questionNumber],
          totalQuestions: questions
        });
      });
    }
  }

  tick() {
    let totalDuration = { ...this.state.totalDuration };
    totalDuration.seconds = this.state.totalDuration.seconds - 1;
    if (totalDuration.seconds === -1) {
      totalDuration.minutes = totalDuration.minutes - 1;
      totalDuration.seconds = 59;
    }
    if (totalDuration.minutes >= 0) {
      this.setState({ totalDuration });
    }

    if (totalDuration.minutes == 0 && totalDuration.seconds == 0) {
      this.submitCandidateResponse();
      this.setState({ submit: true });
    }
  }

  handleOnOptionChange = index => {
    let currentQuestion = { ...this.state.currentQuestion };
    let option = currentQuestion.Options[index];
    option.isChecked = !option.isChecked;
    currentQuestion.Options[index] = option;

    currentQuestion.Options.forEach(option => {
      if (option.isChecked) {
        const choice = {
          optionId: option.OptionId
        };
        selectedChoice.push(choice);
      }
    });

    this.setState({
      currentQuestion: {
        ...currentQuestion
      }
    });
  };

  submitCandidateResponse() {
    let questionsData = this.state.totalQuestions.map(item => {
      let options = item.Options;
      const selectedChoices = options.reduce((accu, value, index, array) => {
        if (value["isChecked"]) {
          accu.push({ OptionId: value["OptionId"] });
        }
        return accu;
      }, []);
      let questionData = {
        selectedChoice: selectedChoices,
        questionId: item["QuestionId"]
      };
      return questionData;
    });
    const requestPayload = {
      setID: this.props.location.state.setId,
      candidateId: this.props.location.state.candidateId,
      candidateResponse: questionsData
    };
    console.log(JSON.stringify(requestPayload));

    const requestheaders = {
      headers: {
        clientKey: config.clientKey,
        "Content-Type": "application/json"
      }
    };

    const route = config.apiEndPoint + submitUrl;
    http.post(route, requestPayload, requestheaders).then(response => {
      console.log(response.data);
    });

    const payload = {
      Status: "Test Submitted"
    };

    const updateStatusRoute = `${config.apiEndPoint}${updateStatusUrl}/${
      this.props.location.state.candidateId
    }`;
    http.put(updateStatusRoute, payload, requestheaders);
  }

  handleSubmitButton = () => {
    this.submitCandidateResponse();
    this.setState({ submit: true });
  };

  previousButton = () => {
    questionId = questionId - 1;
    questionNumber = questionNumber - 1;
    this.setState({
      currentQuestion: questions[questionNumber]
    });
  };

  nextButton = () => {
    questionId = questionId + 1;
    questionNumber = questionNumber + 1;
    this.setState({
      currentQuestion: questions[questionNumber]
    });
  };

  handleQuestionCountChange = index => {
    questionId = index + 1;
    questionNumber = index;
    this.setState({
      currentQuestion: questions[questionNumber]
    });
    console.log(index);
  };

  render() {
    if (this.state.submit) {
      return <Redirect to="/thankYou" />;
    }
    if (this.state.redirect) {
      return <Redirect to="/notFound" />;
    }
    return (
      this.state.totalQuestions !== undefined &&
      this.state.totalQuestions.length > 0 && (
        <React.Fragment>
          <div className="background">
            <div className="col-8 mx-auto">
              <div className="row">
                <div className="col-9">
                  <div className="questionBox">
                    <div className="timeLabel">
                      <label>
                        <h5>
                          Time left {this.state.totalDuration.minutes}
                          {this.state.totalDuration.seconds <= 9
                            ? `:0${this.state.totalDuration.seconds}`
                            : `:${this.state.totalDuration.seconds}`}
                        </h5>
                      </label>
                    </div>
                    <label>
                      <h3 className="questionLabel">
                        Question {questionId} of{" "}
                        {this.state.totalQuestions.length}
                      </h3>
                    </label>

                    <br />
                    <Question
                      currentQuestion={this.state.currentQuestion}
                      handelOnSelectOption={this.handleOnOptionChange}
                    />
                    <div className="btn-groups">
                      <div className="previousbtn">
                        {questionNumber !== 0 && (
                          <button
                            className="btn btn-primary"
                            onClick={this.previousButton}
                          >
                            Previous
                          </button>
                        )}
                      </div>
                      <div className="nextbtn">
                        {questionNumber !==
                          this.state.totalQuestions.length - 1 && (
                          <button
                            className="btn btn-primary"
                            onClick={this.nextButton}
                          >
                            Next
                          </button>
                        )}
                      </div>
                      <div className="submitbtn">
                        {questionNumber ===
                          this.state.totalQuestions.length - 1 && (
                          <button
                            className="btn btn-primary"
                            onClick={this.handleSubmitButton}
                          >
                            Submit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3 pl-0">
                  <div className="questionNumberBox">
                    {this.state.totalQuestions.map((item, index) => {
                      return (
                        <a
                          id="pushBtn"
                          key={index}
                          title="Button push blue/green"
                          className="button btnPush btnBlueGreen"
                          onClick={() => this.handleQuestionCountChange(index)}
                        >
                          {index + 1}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    );
  }
}

export default QuestionPaper;
