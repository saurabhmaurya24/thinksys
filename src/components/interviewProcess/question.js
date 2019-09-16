import React, { Component } from "react";

const checkboxStyle = {
  display: "none"
};

const listStyle = {
  listStyle: "none"
};

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <label className="questionName">
          {this.props.currentQuestion.QuestionName}
          {"?"}
        </label>
        {this.props.currentQuestion.Options.map((option, index) => (
          <label className="radiocontainer" id={index} key={index}>
            <li key={index} style={listStyle}>
              {option.isChecked === true ? (
                <React.Fragment>
                  <input
                    type="checkBox"
                    key={index}
                    onClick={() => this.props.handelOnSelectOption(index)}
                    checked
                    style={checkboxStyle}
                  />
                  <span className="checkMark clicked" />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <input
                    type="checkBox"
                    key={index}
                    onClick={() => this.props.handelOnSelectOption(index)}
                    style={checkboxStyle}
                  />
                  <span className="checkMark" />
                </React.Fragment>
              )}
              {option.OptionName}
            </li>
          </label>
        ))}
      </React.Fragment>
    );
  }
}

export default Question;
