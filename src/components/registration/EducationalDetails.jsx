import React from "react";
import Form from "./form";
import ErrorMessage from "./ErrorMessage";

let index = 1;

class EducationalDetails extends Form {
  handleAddClick = e => {
    e.preventDefault();
    let qualification = { ...this.props.qualification };
    qualification.title = qualification.title + index;
    this.props.state.push(qualification);
    this.setState(this.props.state);
    index = index + 1;
  };

  handleRemoveClick = e => {
    e.preventDefault();
    this.props.state.splice(-1, 1);
    this.setState(this.props.state);
  };

  render() {
    const {
      state,
      courseType,
      years,
      board,
      university,
      graduationCourses,
      postGraduationCourses
    } = this.props;

    const removeStyle = {
      visibility: this.props.state.length === 4 ? "hidden" : "",
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
          <div className="col-12">
            <table className="table" id="educationalDetails">
              <thead>
                <tr>
                  <th>Qualification</th>
                  <th>PassingYear</th>
                  <th>Board/University</th>
                  <th>School/College</th>
                  <th>Percentage(%)</th>
                  <th>Regular/Correspondence</th>
                </tr>
              </thead>
              <tbody>
                {state.map((educationalDetail, index) => (
                  <tr key={index}>
                    {educationalDetail.title === "10th" ||
                    educationalDetail.title === "12th/Diploma" ? (
                      <td>
                        {this.renderLabel(
                          "secondary",
                          educationalDetail.title + "*",
                          educationalDetail
                        )}
                      </td>
                    ) : educationalDetail.title.includes("qualification") ? (
                      <td>
                        {this.renderTableInput(
                          "qualification",
                          educationalDetail
                        )}
                      </td>
                    ) : educationalDetail.graduation === "true" ? (
                      <td>
                        <label className="graduation"> Graduation*</label>
                        {this.renderTableSelect(
                          "qualification",
                          educationalDetail,
                          graduationCourses,
                          ErrorMessage.graduationCourse
                        )}
                      </td>
                    ) : (
                      <td>
                        <label className="postGraduation"> P.G.</label>
                        {this.renderTableSelect(
                          "qualification",
                          educationalDetail,
                          postGraduationCourses
                        )}
                      </td>
                    )}
                    <td>
                      {this.renderTableSelect(
                        "year",
                        educationalDetail,
                        years,
                        ErrorMessage.passingYear
                      )}
                    </td>
                    <td>
                      {educationalDetail.title === "10th" ||
                      educationalDetail.title === "12th/Diploma"
                        ? this.renderTableSelect(
                            "boardUniversity",
                            educationalDetail,
                            board,
                            ErrorMessage.board_university
                          )
                        : this.renderTableSelect(
                            "boardUniversity",
                            educationalDetail,
                            university,
                            ErrorMessage.board_university
                          )}
                    </td>
                    <td>
                      {this.renderTableInput(
                        "college",
                        educationalDetail,
                        ErrorMessage.college
                      )}
                    </td>
                    <td>
                      {this.renderTableInput(
                        "percentage",
                        educationalDetail,
                        ErrorMessage.percentage
                      )}
                    </td>
                    <td>
                      {this.renderTableSelect(
                        "qualificationType",
                        educationalDetail,
                        courseType,
                        ErrorMessage.qualificationType
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
              visivility="hidden"
            >
              Remove
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EducationalDetails;
