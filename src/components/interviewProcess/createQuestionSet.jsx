import React from "react";
import Form from "../registration/form";
import ErrorMessage from "./../registration/ErrorMessage";
import http from "../../services/http";
import config from "../../config";
import SetNamePopup from "./../common/SetNamePopup";
import Select from "./../registration/select";
import Input from "../registration/input";

const tableStyle = {
  maxHeight: "500px",
  overflow: "auto"
};

const divStyle = {
  float: "right"
};

const errorStyle = {
  color: "red"
};

let techUrl = "QuestionBank/Technologies";
let questionSetUrl = "QuestionSet/CreateSet";
let questionCountBaseUrl = "QuestionSet/GetQuestionCount";
let technologyRoute, techValue, questionTypeValue, levelValue;
let questionRoute;

class CreateQuestionSet extends Form {
  state = {
    questionSetRow: [
      {
        title: "questionSet",
        showTechnologyDropdown: false
      }
    ],
    type: [
      {
        name: "Aptitude"
      },
      {
        name: "Technical"
      }
    ],
    newRow: {
      showTechnologyDropdown: false
    },
    level: [
      {
        name: "Low"
      },
      {
        name: "Medium"
      },
      {
        name: "High"
      }
    ],
    modalOpen: false,
    techOptions: [],
    totalQuestions: null,
    errors: {},
    isDisabled: true,
    rowIndex: 0
  };

  componentWillMount() {
    technologyRoute = config.apiEndPoint + techUrl;
    questionRoute = config.apiEndPoint + questionCountBaseUrl;

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

    http.get(questionRoute, requestHeaders).then(response => {
      this.setState({ totalQuestions: response.data.TotalQuestionCount });
    });
  }

  handleAddClick = e => {
    let rowIndex = this.state.rowIndex;
    console.log("this", this.state.questionSetRow);
    rowIndex = rowIndex + 1;
    e.preventDefault();
    let questionSetRow = { ...this.state.newRow };
    this.state.questionSetRow.push(questionSetRow);
    this.setState(this.state);
    this.setState({ rowIndex });
  };

  handleRemoveClick = e => {
    let rowIndex = this.state.rowIndex;
    rowIndex = rowIndex - 1;
    e.preventDefault();
    this.state.questionSetRow.splice(-1, 1);
    this.setState(this.state);
    this.setState({ rowDisabled: false });
    let errors = { ...this.state.errors };
    errors = {};
    this.setState({ rowIndex, errors, isDisabled: false });
  };

  handleClick = () => {
    console.log("test", this.state.questionSetRow);
    this.setState({
      modalOpen: true,
      showCreate: true,
      showInput: true,
      modalBody: "Please Enter the Name of the Set"
    });
  };

  handleClose = () => {
    this.setState({
      modalOpen: false,
      showCreate: true,
      modalBody: "Please Enter the Name of the Set",
      showInput: true
    });
  };

  handleCreate = (input, name) => {
    const url = config.apiEndPoint + questionSetUrl;
    const requestHeaders = {
      headers: {
        clientKey: config.clientKey,
        contentType: "application/json"
      }
    };

    let questionSetDetails = [];
    debugger;
    this.state.questionSetRow.forEach(questionSet => {
      questionSetDetails.push(questionSet);
    });
    const requestPayload = {
      setName: name,
      questionsSetDetails: questionSetDetails
    };

    console.log("requestPayload", JSON.stringify(requestPayload),this.state.questionSetRow);

    http.post(url, requestPayload, requestHeaders).then(response => {
      console.log("Response", response.data);
      if (response.data.IsQuestionSetCreated) {
        this.setState({
          modalBody: "Question Set Created",
          showCreate: false,
          showInput: false
        });
      } else {
        this.setState({
          modalBody: "Question Set Cannot Be Created Due To Server Issue",
          showCreate: false,
          showInput: false
        });
      }
    });
  };

  handleTechChange = (input, index) => {
    const state = {...this.state};
    const name = input.currentTarget.name;
    state.questionSetRow[index][name] = input.currentTarget.value;
    debugger;
    const requestHeaders = {
      headers: {
        clientKey: config.clientKey
      }
    };
    let questionRoute;
    techValue = input.target.value;
    if (
      questionTypeValue !== undefined &&
      questionTypeValue !== "select" &&
      levelValue !== undefined &&
      levelValue !== "select"
    ) {
      questionRoute = `${
        config.apiEndPoint
      }${questionCountBaseUrl}?level=${levelValue}&questionType=${questionTypeValue}&technology=${techValue}`;
    } else if (levelValue !== undefined && levelValue !== "select") {
      questionRoute = `${
        config.apiEndPoint
      }${questionCountBaseUrl}?level=${levelValue}&technology=${techValue}`;
    } else if (
      questionTypeValue !== undefined &&
      questionTypeValue !== "select"
    ) {
      questionRoute = `${
        config.apiEndPoint
      }${questionCountBaseUrl}?questionTypeValue=${questionTypeValue}&technology=${techValue}`;
    } else {
      questionRoute = `${
        config.apiEndPoint
      }${questionCountBaseUrl}?technology=${techValue}`;
    }
    console.log("questionRoute", questionRoute);

    http.get(questionRoute, requestHeaders).then(response => {
      this.setState({ totalQuestions: response.data.TotalQuestionCount });
    });
  };

  handleChange = (input, index) => {
    const state = {...this.state};
    const name = input.currentTarget.name;
    state.questionSetRow[index][name] = input.currentTarget.value;
    console.log("INput", input.currentTarget);
    questionTypeValue = input.target.value;
    if (input.currentTarget.name === "questionType") {
      if (
        input.currentTarget.value === "Aptitude" ||
        input.currentTarget.value === "select"
      ) {
        state.questionSetRow[index].showTechnologyDropdown = false;
        this.setState(state);
      } else {
        state.questionSetRow[index].showTechnologyDropdown = true;
        this.setState(state);
      }
    }
    const requestHeaders = {
      headers: {
        clientKey: config.clientKey
      }
    };
    let questionRoute;
    if (
      levelValue !== undefined &&
      levelValue !== "select" &&
      techValue !== undefined &&
      techValue !== "select"
    ) {
      questionRoute = `${
        config.apiEndPoint
      }${questionCountBaseUrl}?level=${levelValue}&questionType=${questionTypeValue}&technology=${techValue}`;
    } else if (levelValue !== undefined && levelValue !== "select") {
      questionRoute = `${
        config.apiEndPoint
      }${questionCountBaseUrl}?level=${levelValue}&questionType=${questionTypeValue}`;
    } else if (techValue !== undefined && techValue !== "select") {
      questionRoute = `${
        config.apiEndPoint
      }${questionCountBaseUrl}?technology=${techValue}&questionType=${questionTypeValue}`;
    } else {
      questionRoute = `${
        config.apiEndPoint
      }${questionCountBaseUrl}?questionType=${questionTypeValue}`;
    }
    console.log("questionRoute", questionRoute);
    http.get(questionRoute, requestHeaders).then(response => {
      this.setState({ totalQuestions: response.data.TotalQuestionCount });
    });
  };

  handleQuestionLevelChange = (input, index) => {
    const state = {...this.state};
    const name = input.currentTarget.name;
    state.questionSetRow[index][name] = input.currentTarget.value;
    const requestHeaders = {
      headers: {
        clientKey: config.clientKey
      }
    };
    let questionRoute;
    levelValue = input.target.value;
    console.log("Tech", techValue);
    if (
      questionTypeValue !== undefined &&
      questionTypeValue !== "select" &&
      techValue !== undefined &&
      techValue !== "select"
    ) {
      questionRoute = `${
        config.apiEndPoint
      }${questionCountBaseUrl}?level=${levelValue}&questionType=${questionTypeValue}&technology=${techValue}`;
    } else if (techValue !== undefined && techValue !== "select") {
      questionRoute = `${
        config.apiEndPoint
      }${questionCountBaseUrl}?level=${levelValue}&technology=${techValue}`;
    } else if (
      questionTypeValue !== undefined &&
      questionTypeValue !== "select"
    ) {
      questionRoute = `${
        config.apiEndPoint
      }${questionCountBaseUrl}?level=${levelValue}&questionType=${questionTypeValue}`;
    } else {
      questionRoute = `${
        config.apiEndPoint
      }${questionCountBaseUrl}?level=${levelValue}`;
    }
    console.log("questionRoute", questionRoute);
    http.get(questionRoute, requestHeaders).then(response => {
      this.setState({ totalQuestions: response.data.TotalQuestionCount });
    });
  };

  handleQuestionCountChange = (input, index) => {
    const state = {...this.state};
    const name = input.currentTarget.name + index;
    state.questionSetRow[index][input.currentTarget.name] = input.currentTarget.value;
    console.log("Value", input.currentTarget);
    const errors = state.errors;

    if (isNaN(input.currentTarget.value)) {
      errors[name] = ErrorMessage.questionCount;
      this.setState({ errors, isDisabled: true });
    } else if (this.state.totalQuestions < input.currentTarget.value) {
      errors[name] = ErrorMessage.lessQuestions;
      this.setState({ errors, isDisabled: true });
    } else if (input.currentTarget.value === "") {
      errors[name] = null;
      this.setState({ isDisabled: true });
    } else {
      errors[name] = null;
      this.setState({ errors, isDisabled: false });
    }
    console.log("state", state);
  };

  render() {
    const removeStyle = {
      visibility: this.state.questionSetRow.length === 1 ? "hidden" : "",
      float: "right",
      marginRight: 5
    };

    return (
      <React.Fragment>
        {this.state.modalOpen && (
          <SetNamePopup
            open={this.state.modalOpen}
            onClose={this.handleClose}
            heading="Set Name"
            data={this.state.questionSetRow}
            onCreate={(input, name) => this.handleCreate(input, name)}
            modalBody={this.state.modalBody}
            showCreate={this.state.showCreate}
            showInput={this.state.showInput}
          />
        )}

        <div className="row">
          <div className="col-lg-12">
            <h2 className="title-1 m-b-25">Create </h2>
            <div className="totalQuestionCount">
              <b>
                Total Questions In the Question Bank {this.state.totalQuestions}
              </b>
            </div>
            <div className="tableResponsive m-b-40" style={tableStyle} />
            <table className="table table-borderless table-striped table-earning">
              <thead>
                <tr>
                  <th>Question Type</th>
                  <th>Technology</th>
                  <th>Level</th>
                  <th>Question Count</th>
                </tr>
              </thead>
              <tbody>
                {this.state.questionSetRow.map((questionType, index) => (
                  <tr key={index}>
                    {this.state.rowIndex === index - 1 ? (
                      <td>
                        <Select
                          name="questionType"
                          value={this.state.questionSetRow[index].name}
                          options={this.state.type}
                          onChange={input =>
                            this.handleChange(input, index)
                          }
                          disabled={true}
                        />
                      </td>
                    ) : (
                      <td>
                        <Select
                          name="questionType"
                          value={this.state.questionSetRow[index].name}
                          options={this.state.type}
                          onChange={input =>
                            this.handleChange(input, index)
                          }
                        />
                      </td>
                    )}
                    {this.state.questionSetRow[index].showTechnologyDropdown ===
                    true ? (
                      <td>
                        <Select
                          name="questionTechnology"
                          value={this.state.questionSetRow[index].name}
                          options={this.state.techOptions}
                          onChange={input =>
                            this.handleTechChange(input, index)
                          }
                        />
                      </td>
                    ) : (
                      <td className="notApplicable">
                        <b>
                          {this.renderLabel(
                            "questionTechnology",
                            "N.A.",
                            this.state.questionSetRow[index]
                          )}
                        </b>
                      </td>
                    )}
                    <td>
                      <Select
                        name="questionlevel"
                        value={this.state.questionSetRow[index].name}
                        error={""}
                        options={this.state.level}
                        onChange={input =>
                          this.handleQuestionLevelChange(input, index)
                        }
                      />
                    </td>
                    <td>
                      <React.Fragment>
                        <Input
                          name="questionCount"
                          onChange={input =>
                            this.handleQuestionCountChange(
                              input,
                              index
                            )
                          }
                        />
                        <b>
                          {this.state.errors["questionCount" + index] !==
                            null && (
                            <div style={errorStyle}>
                              {this.state.errors[`questionCount${index}`]}
                            </div>
                          )}
                        </b>
                      </React.Fragment>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {this.state.isDisabled === true ? (
              <button
                onClick={() => this.handleAddClick}
                style={divStyle}
                disabled={true}
                className="btn btn-primary"
                id="addBtnNotAllowed"
              >
                +Add More
              </button>
            ) : (
              <button
                onClick={this.handleAddClick}
                style={divStyle}
                className="btn btn-primary"
              >
                +Add More
              </button>
            )}
            <button
              className="btn btn-primary"
              style={removeStyle}
              onClick={this.handleRemoveClick}
              visibility="hidden"
            >
              Remove
            </button>
            {this.state.isDisabled === true ? (
              <button
                onClick={this.handleClick}
                disabled={true}
                className="btn btn-primary"
                id="sendBtnNotAllowed"
              >
                Add Set Name
              </button>
            ) : (
              <button
                onClick={this.handleClick}
                className="btn btn-primary"
                id="sendBtn"
              >
                Add Set Name
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateQuestionSet;
