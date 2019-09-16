import React from "react";
import Form from "./form";
import ErrorMessage from "./ErrorMessage";

class PermanentAddress extends Form {
  render() {
    const { state, states, previousState } = this.props;
    return (
      <React.Fragment>
        <div align="right">
          {this.renderCheckBox(state, previousState)}
          <span> Same as Current Address</span>
        </div>
        <div className="row">
          <div className="col-6">
            <b>
              {this.renderInput(
                "permanentHouseNumber",
                "Building/HouseNo.*",
                state,
                ErrorMessage.permanentHouseNumber
              )}
            </b>
          </div>
          <div className="col-6">
            <b>
              {this.renderInput(
                "permanentStreet",
                "Street*",
                state,
                ErrorMessage.permanentStreet
              )}
            </b>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <b>
              {this.renderSelect(
                "permanentState",
                "State*",
                state,
                states,
                ErrorMessage.permanentState
              )}
            </b>
          </div>
          <div className="col-6">
            <b>
              {this.renderInput(
                "permanentCity",
                "Town/City*",
                state,
                ErrorMessage.permanentCity
              )}
            </b>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <b>
              {this.renderInput(
                "permanentPinCode",
                "Pin Code*",
                state,
                ErrorMessage.permanentPinCode
              )}
            </b>
          </div>
          <div className="col-6">
            <b>
              {this.renderLabel(
                "permanentCountry",
                "Country*",
                state,
                ErrorMessage.permanentCountry
              )}
            </b>
            {this.renderLabel("india", "India", state)}
          </div>
        </div>
        <br />
        <br />
      </React.Fragment>
    );
  }
}

export default PermanentAddress;
