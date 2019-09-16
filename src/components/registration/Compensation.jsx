import React from "react";
import ErrorMessage from "./ErrorMessage";
import Form from "./form";

class Compensation extends Form {
  render() {
    const { state } = this.props;
    console.log("comp", state);
    return (
      <React.Fragment>
        <br />
        <div className="row">
          <div className="col-6">
            {this.renderInput(
              "currentCTC",
              "Current CTC (in Lakhs)*",
              state,
              ErrorMessage.currentCTC
            )}
          </div>
          <div className="col-6">
            {this.renderInput(
              "expectedCTC",
              "Expected CTC (in Lakhs)*",
              state,
              ErrorMessage.expectedCTC
            )}
          </div>
          <div className="col-6">
            {this.renderInput(
              "noticePeriod",
              "Notice Period (in Days)*",
              state,
              ErrorMessage.noticePeriod
            )}
          </div>
          <div className="col-6">
            {this.renderDate(
              "resignationDate",
              "Resignation Date(If Resigned Already)",
              state,
              null
            )}
          </div>
          <div className="col-6">
            {this.renderDate(
              "lastWorkingDate",
              "Last Working Date",
              state,
              null
            )}
          </div>
        </div>
        <br />
      </React.Fragment>
    );
  }
}

export default Compensation;
