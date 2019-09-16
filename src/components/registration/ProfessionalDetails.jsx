import React from "react";
import Form from "./form";
import ErrorMessage from "./ErrorMessage";

let index = 1;
let referencesIndex = 3;

class ProfessionalDetails extends Form {
  handleAddClick = e => {
    e.preventDefault();
    let previousOrganization = { ...this.props.previousOrganization };

    previousOrganization.title = previousOrganization.title + index;
    this.props.state.push(previousOrganization);
    console.log(this.props.state);
    this.setState(this.props.state);
    index = index + 1;
  };

  handleAddReferenceClick = e =>{
    e.preventDefault();
    let newReferences = {...this.props.newReferences};
    console.log("New References", newReferences);
    newReferences.title = newReferences.title + referencesIndex
    this.props.references.push(newReferences);
    console.log(this.props.references);
    this.setState(this.props.references);
    referencesIndex = referencesIndex + 1
  }

  handleRemoveReferenceClick = e =>{
    e.preventDefault();
    this.props.references.splice(-1, 1);
    referencesIndex = referencesIndex - 1;
    this.setState(this.props.references);
  }

  handleRemoveClick = e => {
    e.preventDefault();
    this.props.state.splice(-1, 1);
    index = index - 1;
    this.setState(this.props.state);
  };

  render() {
    const { state, references } = this.props;

    const removeStyle = {
      visibility: this.props.state.length === 2 ? "hidden" : "",
      float: "right",
      marginRight: 5
    };

    const removeReferenceStyle = {
      visibility: this.props.references.length === 2 ? "hidden" : "",
      float: "right",
      marginRight: 5
    };

    const divStyle = {
      float: "right"
    };

    return (
      <React.Fragment>
        <br />
        <div className="row">
          <div className="col-6">
            {this.renderRadioButton(
              "resignation",
              "Resigned",
              "resigned",
              "option1",
              state,
              true
            )}
          </div>
          <div className="col-6">
            {this.renderRadioButton(
              "resignation",
              "Not Resigned",
              "notResigned",
              "option2",
              state,
              false
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table" id="prodessionalDetails">
              <thead>
                <tr>
                  <th>Organization Name</th>
                  <th>DOJ</th>
                  <th>DOL</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {state.map((professionalDetail, index) => (
                  <tr key={index}>
                    <td>
                      {index === 0 ? (
                        <label className="graduation">
                          Current Organization*
                        </label>
                      ) : (
                        <label className="graduation">
                          Previous Organization
                        </label>
                      )}
                      {this.renderTableInput(
                        "organization",
                        professionalDetail,
                        ErrorMessage.currentOrganization
                      )}
                    </td>
                    <td>
                      {this.renderTableDate(
                        "dateOfJoining",
                        professionalDetail,
                        ErrorMessage.dateOfJoining
                      )}
                    </td>
                    {professionalDetail.isDateOfBirthColumn === true ? (
                      <td>
                        {this.renderTableDate(
                          "dateOfLeaving",
                          professionalDetail
                        )}
                      </td>
                    ) : (
                      <td>
                        <b>
                          {this.renderLabel(
                            "dateOfLeaving",
                            "Currently Working",
                            professionalDetail
                          )}
                        </b>
                      </td>
                    )}
                    <td>
                      {this.renderTableInput(
                        "designation",
                        professionalDetail,
                        ErrorMessage.designation
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <button
              className="btn btn-primary"
              onClick={this.handleAddClick}
              style={divStyle}
            >
              +Add More
            </button>
            <button
              className="btn btn-primary"
              style={removeStyle}
              onClick={this.handleRemoveClick}
            >
              Remove
            </button>
            <br />
            <br />
            <br />
            <div className="row">
              <h6 className="references">References</h6>
            </div>
            <br></br>
            <div className="row">
              <div className="col-12">
                <table className="table" id="educationalDetails">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>ContactNo.</th>
                      <th>Designation</th>
                      <th>Work Relationship</th>
                    </tr>
                  </thead>
                  <tbody>
                    {references.map((detail, index) => (
                      <tr key={index}>
                        <td>
                          {this.renderTableInput(
                            "Name",
                            detail,
                            ErrorMessage.referenceName
                          )}
                        </td>
                        <td>
                          {this.renderTableInput(
                            "ContactNumber",
                            detail,
                            ErrorMessage.referenceContactNumber
                          )}
                        </td>
                        <td>
                          {this.renderTableInput(
                            "Designation",
                            detail,
                            ErrorMessage.referenceDesignation
                          )}
                        </td>
                        <td>
                          {this.renderTableInput(
                            "Relationship",
                            detail,
                            ErrorMessage.referenceRelationship
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <br />
                <button
              className="btn btn-primary"
              onClick={this.handleAddReferenceClick}
              style={divStyle}
            >
              +Add More
            </button>
            <button
              className="btn btn-primary"
              style={removeReferenceStyle}
              onClick={this.handleRemoveReferenceClick}
            >
              Remove
            </button>
            <br />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfessionalDetails;
