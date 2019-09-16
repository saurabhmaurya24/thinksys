import React from "react";
import Form from "./form";
import ErrorMessage from "./ErrorMessage";

class PersonalDetails extends Form {
  render() {
    const {
      state,
      positions,
      humanResources,
      years,
      months,
      yearOfInterview,
      monthOfInterview,
      dateOfInterview
    } = this.props;
    console.log("HumanResource", humanResources);
    return (
      <React.Fragment>
        <br />
        <div className="row">
          <div className="col-6">
            <b>
              {this.renderInput(
                "firstName",
                "First Name*",
                state,
                ErrorMessage.firstName
              )}
            </b>
          </div>
          <div className="col-6">
            <b>{this.renderInput("lastName", "Last Name", state)}</b>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <b>
              {this.renderSelect(
                "positionAppliedFor",
                "Position Applied For*",
                state,
                positions,
                ErrorMessage.positionAppliedFor
              )}
            </b>
          </div>
          <div className="col-6">
            <b>
              {this.renderSelect(
                "contactedHr",
                "Contacted HR*",
                state,
                humanResources,
                ErrorMessage.contactedHR
              )}
            </b>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <br />
            <b>
              {this.renderLabel(
                "firstName",
                "Have you ever been interviewed by us before?",
                state
              )}
            </b>
            <div className="row">
              <div className="col-6">
                {this.renderRadioButton(
                  "interviewedBefore",
                  "Yes",
                  "yes",
                  "choice1",
                  state,
                  false
                )}
              </div>
              <div className="col-6">
                {this.renderRadioButton(
                  "interviewedBefore",
                  "No",
                  "no",
                  "choice2",
                  state,
                  true
                )}
              </div>
            </div>
          </div>
          {state.renderInterviewDate && (
            <React.Fragment>
              <div className="col-2">
                <b>
                  {this.renderSelect(
                    "dateOfInterview",
                    "Date",
                    state,
                    dateOfInterview
                  )}
                </b>
              </div>
              <div className="col-2">
                <b>
                  {this.renderSelect(
                    "monthOfInterview",
                    "Month",
                    state,
                    monthOfInterview
                  )}
                </b>
              </div>
              <div className="col-2">
                <b>
                  {this.renderSelect(
                    "yearOfInterview",
                    "Year",
                    state,
                    yearOfInterview
                  )}
                </b>
              </div>
            </React.Fragment>
          )}
        </div>

        {state.renderWorkExperience && (
          <React.Fragment>
            <div>
              <b>{this.renderLabel("experience", "Work Experience", state)}</b>
            </div>
            <div className="row">
              <div className="col-6">
                {this.renderSelect("years", "Years", state, years)}
              </div>
              <div className="col-6">
                {this.renderSelect("months", "Months", state, months)}
              </div>
            </div>
          </React.Fragment>
        )}

        <div className="row">
          <div className="col-6">
            <b>
              {this.renderInput(
                "fathersName",
                "Father's Name*",
                state,
                ErrorMessage.fathersName
              )}
            </b>
          </div>
          <div className="col-6">
            <b>
              {this.renderDate(
                "dateOfBirth",
                "Date Of Birth*",
                state,
                ErrorMessage.dateOfBirth
              )}
            </b>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <b>
              {this.renderInput(
                "mobileNo",
                "Mobile No.*",
                state,
                ErrorMessage.mobileNumber
              )}
            </b>
          </div>
          <div className="col-6">
            <b>
              {this.renderInput(
                "emailId",
                "Email Id*",
                state,
                ErrorMessage.emailId
              )}
            </b>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PersonalDetails;
