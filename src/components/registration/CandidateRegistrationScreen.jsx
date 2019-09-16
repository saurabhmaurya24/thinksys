import React from "react";
import PersonalDetails from "./PersonalDetails";
import CandidateAddress from "./CandidateAddress";
import Form from "./form";
import http from "../../services/http";
import config from "../../config";
import EducationalDetails from "./EducationalDetails";
import ProfessionalDetails from "./ProfessionalDetails";
import PermanentAddress from "./PermanentAddress";
import ProfessionalSkills from "./ProfessionalSkills";
import { Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Compensation from "./Compensation";
import SubmitPopup from "../common/submitPopup";
import Roles from "./../login/roles";

const positionUrl = "Metadata/GetPositions";
const stateUrl = "Metadata/state";
const boardUrl = "Metadata/Board";
const universityUrl = "Metadata/University";
const contactedHrUrl = "Contact/GetAll";
let deletedSection;
let isSectionOpen = true;

class CandidateRegistrationScreen extends Form {
  state = {
    sec: [
      {
        title: "PersonalDetails",
        renderInterviewDate: false,
        renderWorkExperience: true
      },
      {
        title: "Current Address"
      },
      {
        title: "Permanent Address"
      }
    ],
    edu: [
      {
        title: "10th"
      },
      {
        title: "12th/Diploma"
      },
      {
        title: "Graduation",
        graduation: "true"
      },
      {
        title: "PostGraduation"
      }
    ],
    qualification: {
      title: "qualification"
    },
    prof: [
      {
        title: "Current",
        isDateOfBirthColumn: true
      },
      {
        title: "Previous",
        isDateOfBirthColumn: true
      }
    ],
    previousOrganization: {
      title: "PreviousOrganization"
    },
    references: [
      {
        title: "Reference1"
      },
      {
        title: "Reference2"
      }
    ],
    newReferences: {
      title: "Reference"
    },
    comp: [
      {
        title: "Compensation"
      }
    ],
    positions: [],
    years: [],
    months: [],
    states: [],
    passingYear: [],
    board: [],
    university: [],
    redirect: false,
    humanResources: [],
    courseType: [
      {
        id: 1,
        name: "Regular"
      },
      {
        id: 2,
        name: "Correspondence"
      }
    ],
    graduationCourses: [
      {
        id: 1,
        name: "B.TECH"
      },
      {
        id: 2,
        name: "BE"
      },
      {
        id: 3,
        name: "BCA"
      },
      {
        id: 4,
        name: "BBA"
      },
      {
        id: 5,
        name: "B.COM"
      },
      {
        id: 6,
        name: "BA"
      },
      {
        id: 7,
        name: "Other"
      }
    ],
    postGraduationCourses: [
      {
        id: 1,
        name: "M.TECH"
      },
      {
        id: 2,
        name: "ME"
      },
      {
        id: 3,
        name: "MCA"
      },
      {
        id: 4,
        name: "MBA"
      },
      {
        id: 5,
        name: "M.COM"
      },
      {
        id: 6,
        name: "MA"
      }
    ],
    skills: [
      {
        title: "development",
        isSelected: true,
        data: [
          {
            id: 101,
            name: "jQuery/HTML/CSS",
            rating: ""
          },
          {
            id: 102,
            name: "SQL/Entity Framework",
            rating: ""
          },
          {
            id: 103,
            name: "C#",
            rating: ""
          },
          {
            id: 104,
            name: ".NET",
            rating: ""
          },
          {
            id: 105,
            name: "MVC",
            rating: ""
          },
          {
            id: 106,
            name: "AngularJS",
            rating: ""
          },
          {
            id: 107,
            name: "Javascript",
            rating: ""
          },
          {
            id: 108,
            name: "ReactJS",
            rating: ""
          },
          {
            id: 109,
            name: "ReactNative",
            rating: ""
          },
          {
            id: 110,
            name: "NodeJS",
            rating: ""
          },
          {
            id: 111,
            name: "Java",
            rating: ""
          },
          {
            id: 112,
            name: "Magento",
            rating: ""
          },
          {
            id: 113,
            name: "PHP",
            rating: ""
          }
        ]
      },
      {
        title: "testing",
        isSelected: false,
        data: [
          {
            id: 201,
            name: "QTP",
            rating: ""
          },
          {
            id: 202,
            name: "SQL",
            rating: ""
          },
          {
            id: 203,
            name: "DB",
            rating: ""
          },
          {
            id: 204,
            name: "QC",
            rating: ""
          },
          {
            id: 205,
            name: "Automation",
            rating: ""
          },
          {
            id: 206,
            name: "Manual",
            rating: ""
          },
          {
            id: 207,
            name: "Scripting/Programming Language",
            rating: ""
          }
        ]
      },
      {
        title: "other",
        isSelected: false,
        data: [{}]
      }
    ],
    rating: [],
    dateOfInterview: [],
    yearOfInterview: [],
    monthOfInterview: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    errors: {},
    educationalSectionOpen: false,
    professionalSectionOpen: false,
    professionalSkillsOpen: false,
    compensationSectionOpen: false,
    currentAddressSectionOpen: false,
    permanentAddressSectionOpen: false,
    personalDetailsSection: true,
    open: false,
    modalBody: "",
    isExpanded: true,
    formErrors: true,
    containerClassName: "container"
  };

  async componentDidMount() {
    for (let i = 0; i <= 20; i++) {
      this.state.years.push(i);
    }

    for (let i = 1; i <= 5; i++) {
      this.state.rating.push(i);
    }

    for (let i = 1; i <= 11; i++) {
      this.state.months.push(i);
    }

    for (let i = 1990; i <= new Date().getFullYear(); i++) {
      this.state.passingYear.push(i);
    }

    for (let i = 2014; i <= new Date().getFullYear(); i++) {
      this.state.yearOfInterview.push(i);
    }

    for (let i = 1; i <= 31; i++) {
      this.state.dateOfInterview.push(i);
    }

    const { data: states } = await http.get(config.apiEndPoint + stateUrl, {
      headers: { clientKey: config.clientKey }
    });

    const accessToken = localStorage.getItem("access_token");

    const loginHeaders = {
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json",
        ClientKey: config.clientKey
      }
    };
    let humanResourcesFromDb = [];
    let humanResources = [];

    console.log("Login", loginHeaders);
    http
      .get(config.apiEndPoint + contactedHrUrl, loginHeaders)
      .then(employees => {
        employees.data.forEach(employee => {
          employee.roles.forEach(role => {
            if (role.role === Roles.HrUser || role.role === Roles.HrManager) {
              let humanResource = {
                Name: employee.Name
              };
              humanResourcesFromDb.push(humanResource);
            }
          });
        });
        var flags = [],
          l = humanResourcesFromDb.length,
          i;
        for (i = 0; i < l; i++) {
          if (flags[humanResourcesFromDb[i].Name]) continue;
          flags[humanResourcesFromDb[i].Name] = true;
          let humanResource = {
            Name: humanResourcesFromDb[i].Name
          };
          humanResources.push(humanResource);
        }
      });

    const { data: positions } = await http.get(
      config.apiEndPoint + positionUrl,
      {
        headers: { clientKey: config.clientKey }
      }
    );

    const { data: board } = await http.get(config.apiEndPoint + boardUrl, {
      headers: { clientKey: config.clientKey }
    });

    const { data: university } = await http.get(
      config.apiEndPoint + universityUrl,
      {
        headers: { clientKey: config.clientKey }
      }
    );

    this.setState({
      positions,
      states,
      board,
      university,
      humanResources
    });

    console.log("State", this.state);
  }

  handleRadioButtonChange(input, state) {
    console.log(input.name, state.sec[0]);
    if (input.value === "fresher") {
      var key = "prof";
      deletedSection = state[key];
      state.sec[0].renderWorkExperience = false;
      delete state[key];
      this.setState({ state });
      toast.info(
        "Experience and Professional Details Section Has Been Removed"
      );
    } else {
      state.prof = deletedSection;
      state.sec[0].renderWorkExperience = true;
      this.setState({ state });
      toast.info("Experience and Professional Details Section Has Been Added");
    }
  }

  renderRadioButton(name, label, value, state, id) {
    return (
      <React.Fragment>
        <label htmlFor={id} className="radio">
          <input
            id={id}
            type="radio"
            name={name}
            value={value}
            defaultChecked
            className="hidden"
            onClick={({ currentTarget: input }) =>
              this.handleRadioButtonChange(input, state)
            }
          />
          <span className="label" />
          {label}
        </label>
      </React.Fragment>
    );
  }

  dashIcon = input => {
    input.currentTarget.classList.toggle("change");
  };

  handleClose = input => {
    console.log("Input", input.currentTarget.value);
    if (input.currentTarget.value === "Yes") {
      this.doSubmit();
    }
    this.setState({
      open: false
    });
  };

  render() {
    const {
      redirect,
      educationalSectionOpen,
      professionalSectionOpen,
      professionalSkillsOpen,
      compensationSectionOpen,
      currentAddressSectionOpen,
      permanentAddressSectionOpen
    } = this.state;
    if (redirect) {
      return <Redirect to="/thankYou" />;
    }
    return (
      <React.Fragment>
        <ToastContainer />
        <SubmitPopup
          open={this.state.open}
          modalBody={this.state.modalBody}
          onClose={input => this.handleClose(input)}
          errors={this.state.formErrors}
        />
        <div className="row">
          <div className="col-9" align="right">
            {this.renderRadioButton(
              "experience",
              "Fresher",
              "fresher",
              this.state,
              "opt1"
            )}
          </div>
          <div className="col-3" align="right">
            {this.renderRadioButton(
              "experience",
              "Experienced",
              "experienced",
              this.state,
              "opt2"
            )}
          </div>
        </div>
        <form
          onSubmit={input =>
            this.handleSubmit(input, this.state.open, this.state.modalBody)
          }
        >
          <fieldset className="fieldSet">
            <legend className="legend">
              <span className="number">1</span> Personal Details
            </legend>
            <PersonalDetails
              state={this.state.sec[0]}
              positions={this.state.positions}
              humanResources={this.state.humanResources}
              years={this.state.years}
              months={this.state.months}
              yearOfInterview={this.state.yearOfInterview}
              monthOfInterview={this.state.monthOfInterview}
              dateOfInterview={this.state.dateOfInterview}
            />
            <hr />
            <legend className="legend">
              <span className="number">2</span> Current Address
              <button
                className="toggleButton"
                onClick={e => {
                  e.preventDefault();
                  this.state.errors.currentAddress = "";
                  this.setState({
                    currentAddressSectionOpen: !currentAddressSectionOpen
                  });
                }}
              >
                <div
                  className={this.state.containerClassName}
                  onClick={input => this.dashIcon(input)}
                >
                  <div className="bar1" />
                  <div className="bar2" />
                  <div className="bar3" />
                </div>
              </button>
            </legend>
            {currentAddressSectionOpen && (
              <CandidateAddress
                headingName="Current Address"
                state={this.state.sec[1]}
                errors={this.state.errors}
                states={this.state.states}
                isSectionOpen={isSectionOpen}
              />
            )}
            <hr />
            <legend className="legend">
              <span className="number">3</span> Permanent Address
              <button
                className="toggleButton"
                onClick={e => {
                  e.preventDefault();
                  this.state.errors.permanentAddress = "";
                  this.setState({
                    permanentAddressSectionOpen: !permanentAddressSectionOpen
                  });
                }}
              >
                <div
                  className={this.state.containerClassName}
                  onClick={input => this.dashIcon(input)}
                >
                  <div className="bar1" />
                  <div className="bar2" />
                  <div className="bar3" />
                </div>
              </button>
            </legend>
            {permanentAddressSectionOpen && (
              <PermanentAddress
                headingName="Permanent Address"
                previousState={this.state.sec[1]}
                state={this.state.sec[2]}
                errors={this.state.errors}
                states={this.state.states}
              />
            )}
            <hr />
            <legend className="legend">
              <span className="number">4</span> Educational Details
              <button
                className="toggleButton"
                onClick={e => {
                  e.preventDefault();
                  this.state.errors.educationalDetails = "";
                  this.setState({
                    educationalSectionOpen: !educationalSectionOpen
                  });
                }}
              >
                <div
                  className={this.state.containerClassName}
                  onClick={input => this.dashIcon(input)}
                >
                  <div className="bar1" />
                  <div className="bar2" />
                  <div className="bar3" />
                </div>
              </button>
            </legend>
            {this.state.educationalSectionOpen && (
              <EducationalDetails
                state={this.state.edu}
                errors={this.state.errors}
                courseType={this.state.courseType}
                years={this.state.passingYear}
                board={this.state.board}
                university={this.state.university}
                graduationCourses={this.state.graduationCourses}
                postGraduationCourses={this.state.postGraduationCourses}
                qualification={this.state.qualification}
              />
            )}
            <hr />
            {this.state.prof !== undefined ? (
              <React.Fragment>
                <legend className="legend">
                  <span className="number">5</span> Professional Details
                  <button
                    className="toggleButton"
                    onClick={e => {
                      e.preventDefault();
                      this.state.errors.professionalDetails = "";
                      this.setState({
                        professionalSectionOpen: !professionalSectionOpen
                      });
                    }}
                  >
                    <div
                      className={this.state.containerClassName}
                      onClick={input => this.dashIcon(input)}
                    >
                      <div className="bar1" />
                      <div className="bar2" />
                      <div className="bar3" />
                    </div>
                  </button>
                </legend>
                {this.state.professionalSectionOpen && (
                  <ProfessionalDetails
                    state={this.state.prof}
                    previousOrganization={this.state.previousOrganization}
                    references={this.state.references}
                    newReferences={this.state.newReferences}
                  />
                )}
                <hr />
              </React.Fragment>
            ) : (
              []
            )}

            <legend className="legend">
              {this.state.hasOwnProperty("prof") ? (
                <span className="number">6 </span>
              ) : (
                <span className="number">5 </span>
              )}{" "}
              Compensation Details
              <button
                className="toggleButton"
                onClick={e => {
                  e.preventDefault();
                  this.setState({
                    compensationSectionOpen: !compensationSectionOpen
                  });
                }}
              >
                <div
                  className={this.state.containerClassName}
                  onClick={input => this.dashIcon(input)}
                >
                  <div className="bar1" />
                  <div className="bar2" />
                  <div className="bar3" />
                </div>
              </button>
            </legend>
            {this.state.compensationSectionOpen && (
              <Compensation state={this.state.comp} />
            )}
            <hr />
            <legend className="legend">
              {this.state.hasOwnProperty("prof") ? (
                <span className="number">7</span>
              ) : (
                <span className="number">6</span>
              )}{" "}
              Skills/Expertise
              <button
                className="toggleButton"
                onClick={e => {
                  e.preventDefault();
                  this.state.errors.compensationDetails = "";
                  this.setState({
                    professionalSkillsOpen: !professionalSkillsOpen
                  });
                }}
              >
                <div
                  className="container"
                  onClick={input => this.dashIcon(input)}
                >
                  <div className="bar1" />
                  <div className="bar2" />
                  <div className="bar3" />
                </div>
              </button>
            </legend>
            {this.state.professionalSkillsOpen && (
              <ProfessionalSkills
                skills={this.state.skills}
                rating={this.state.rating}
              />
            )}
            <hr />
            <br />
            <br />
            {this.renderButton("Submit")}
          </fieldset>
        </form>
      </React.Fragment>
    );
  }
}

export default CandidateRegistrationScreen;
