import React from "react";
import Form from "./form";

const tableStyle = {
  maxHeight: "500px",
  overflow: "auto"
};

class ProfessionalSkills extends Form {
  handleAddClick = e => {
    e.preventDefault();
    let skill = { ...this.props.skills[2] };
    console.log("Skills", this.props.skills, skill);
    this.props.skills.push(skill);
    console.log(this.props.skills);
    this.setState(this.props.skills);
  };

  handleRemoveClick = e => {
    e.preventDefault();
    this.props.state.splice(-1, 1);
    this.setState(this.props.state);
  };
  render() {
    const { skills, rating } = this.props;
    let skillsToRender;

    const filteredSkills = skills.filter(s => s.isSelected === true);
    skillsToRender = filteredSkills[0];

    return (
      <React.Fragment>
        <br />
        <div className="row">
          <div className="col-4">
            {this.renderRadioButton(
              "skills",
              "Development",
              "development",
              "1",
              skills,
              true
            )}
          </div>
          <div className="col-4">
            {this.renderRadioButton(
              "skills",
              "QA",
              "testing",
              "2",
              skills,
              false
            )}
          </div>
          <div className="col-4">
            {this.renderRadioButton(
              "skills",
              "Other",
              "other",
              "3",
              skills,
              false
            )}
          </div>
        </div>
        <div style={tableStyle}>
          <table className="table" id="educationalDetails">
            <thead>
              <tr>
                <th>Skill/Tool</th>
                {skillsToRender.title !== "other" ? (
                  <th>Self Rating(1-5)</th>
                ) : (
                  []
                )}
              </tr>
            </thead>
            <tbody>
              {skillsToRender.data.map((skill, index) => (
                <tr key={index}>
                  {skillsToRender.title !== "other" ? (
                    <td>{this.renderLabel("skill", skill.name, skill)}</td>
                  ) : (
                    <td> {this.renderInput("name", "Name", skill)}</td>
                  )}
                  {skillsToRender.title !== "other" ? (
                    <td>{this.renderSkillSelect("rating", skill, rating)}</td>
                  ) : (
                    []
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfessionalSkills;
