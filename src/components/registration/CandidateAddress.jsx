import React from "react";
import Form from "./form";
import ErrorMessage from "./ErrorMessage";

class CandidateAddress extends Form {
  render() {
    const { state, states, isSectionOpen } = this.props;
    return (
      <React.Fragment>
        <br />
        <div className="row">
          <div className="col-6">
            <b>
              {this.renderInput(
                "houseNumber",
                "Building/HouseNo.*",
                state,
                ErrorMessage.houseNumber,
                isSectionOpen
              )}
            </b>
          </div>
          <div className="col-6">
            <b>
              {this.renderInput(
                "street",
                "Street*",
                state,
                ErrorMessage.street,
                isSectionOpen
              )}
            </b>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <b>
              {this.renderSelect(
                "state",
                "State*",
                state,
                states,
                ErrorMessage.state
              )}
            </b>
          </div>
          <div className="col-6">
            <b>
              {this.renderInput(
                "city",
                "Town/City*",
                state,
                ErrorMessage.city,
                isSectionOpen
              )}
            </b>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <b>
              {this.renderInput(
                "pinCode",
                "Pin Code*",
                state,
                ErrorMessage.pincode,
                isSectionOpen
              )}
            </b>
          </div>
          <div className="col-6">
            <b>{this.renderLabel("country", "Country", state)}</b>
            {this.renderLabel("india", "India", state)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CandidateAddress;
