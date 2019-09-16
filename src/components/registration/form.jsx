/* eslint-disable no-useless-escape */
import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import DateInput from "./dateInput";
import http from "../../services/http";
import config from "../../config";
import ErrorMessage from "./ErrorMessage";

let errors = {};
let submitErrors = {};
let errorsToBeSet = true;
const submitUrl = "hrForm";
let isChecked = false;
let disabled = false;
const inputStyle = {
  display: "none",
  marginRight: "2"
};

let isFromHandleChange = false;

const labelStyle = {
  marginTop: "10"
};

class Form extends Component {
  state = {
    data: {},
    startDate: new Date(),
    errors: {},
    fontColor: "Red",
    validEmailRegex: RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),

    validDateOfBirth: RegExp("^([0-9]{2})-([0-9]{2})-([0-9]{4})$")
  };

  validateForm = errors => {
    let valid = false;
    let count = 0;

    for (let item of Object.values(errors)) {
      if (item === "") {
        count++;
      }
    }

    if (count === Object.values(errors).length) {
      valid = true;
    }

    console.log("Errors", errors, count, Object.values(errors).length, valid);
    return valid;
  };

  handleSubmit = e => {
    console.log("Inside Submit", errors);
    e.preventDefault();
    errors = submitErrors;

    if ("prof" in this.state) {
    } else {
      const keys = [
        "CurrentdateOfJoining",
        "Currentdesignation",
        "Currentorganization",
        "currentCTC",
        "expectedCTC",
        "noticePeriod"
      ];
      keys.forEach(key => {
        delete errors[key];
      });
    }

    this.setState({ errors });
    if (this.validateForm(errors)) {
      this.setState({
        open: true,
        modalBody: "Are you sure you want to submit your candidature?",
        formErrors: false
      });
    } else if (
      errors.currentAddress !== "" ||
      errors.permanentAddress !== "" ||
      errors.educationalDetails !== "" ||
      errors.professionalDetails !== "" ||
      errors.compensationDetails !== ""
    ) {
      errors.currentAddress = ErrorMessage.currentAddressSection;
      errors.permanentAddress = ErrorMessage.permanentAddressSection;

      const currentAddressSectionOpen = true;
      const permanentAddressSectionOpen = true;
      const educationalSectionOpen = true;
      const professionalSectionOpen = true;
      const compensationSectionOpen = true;

      let containerClassName = this.state.containerClassName;
      if (containerClassName === "container") {
        containerClassName = "container change";
      }
      const isExpanded = true;
      this.setState({
        currentAddressSectionOpen,
        permanentAddressSectionOpen,
        educationalSectionOpen,
        professionalSectionOpen,
        compensationSectionOpen,
        isExpanded,
        containerClassName
      });

      console.log("Mesage", errors);
      this.setState({
        open: true,
        modalBody:
          "You have Errors In Your Form. Please validate before submitting",
        formErrors: true
      });
      return;
    }
  };

  doSubmit = async () => {
    const personalDetail = this.state.sec[0];
    console.log("personalDetail", personalDetail);
    const candidateCurrentAddress = this.state.sec[1];
    const candidatePermanentAddress = this.state.sec[2];
    const professionalReferences = this.state.references;
    const professionalSkills = {};
    const professionalDetail = this.state.prof;
    const educationalDetailState = this.state.edu;
    const compensationDetail = this.state.comp;
    const skills = this.state.skills.filter(s => s.isSelected === true);
    professionalSkills.type = skills[0].title;
    professionalSkills.ProfessionalSkillsDetail = skills[0].data.filter(
      s => s.rating !== ""
    );
    console.log("RegistrationCode", this.props);

    const salaryNoticeDetails = {};
    if (compensationDetail !== undefined) {
      salaryNoticeDetails.currentCTC = compensationDetail.currentCTC;
      salaryNoticeDetails.expectedCTC = compensationDetail.expectedCTC;
      salaryNoticeDetails.noticePeriod = compensationDetail.noticePeriod;
      salaryNoticeDetails.resignationDate = compensationDetail.resignationDate;
      salaryNoticeDetails.lastWorkingDate = compensationDetail.lastWorkingDate;
    }

    let organizationDetail = [];
    let organizationDetailObject = {};
    let educationDetail = [];
    let educationDetailObject = {};

    educationalDetailState.forEach(element => {
      if (
        element.title === "Graduation" ||
        element.title === "PostGraduation"
      ) {
        educationDetailObject.qualification = element.qualification;
      } else {
        educationDetailObject.qualification = element.title;
      }
      educationDetailObject.boardUniversity = element.boardUniversity;
      educationDetailObject.percentage = element.percentage;
      educationDetailObject.year = element.year;
      educationDetailObject.qualificationType = element.qualificationType;
      educationDetailObject.schoolCollege = element.college;
      educationDetail.push({ ...educationDetailObject });
    });

    educationDetail.forEach((element, index) => {
      if (
        element.qualification === undefined &&
        element.boardUniversity === undefined &&
        element.qualificationType === undefined &&
        element.year === undefined
      ) {
        educationDetail.splice(index, 1);
      }
    });

    if (professionalDetail !== undefined) {
      professionalDetail.forEach(element => {
        element.dateOfLeaving =
          element.dateOfLeaving === undefined ? null : element.dateOfLeaving;
        organizationDetailObject.organization = element.organization;
        organizationDetailObject.designation = element.designation;
        organizationDetailObject.doj = element.dateOfJoining;
        organizationDetailObject.dol = element.dateOfLeaving;
        organizationDetail.push({ ...organizationDetailObject });
      });

      organizationDetail.forEach((element, index) => {
        if (
          element.organization === undefined &&
          element.designation === undefined &&
          element.dateOfJoining === undefined &&
          element.dateOfLeaving === undefined
        ) {
          organizationDetail.splice(index, 1);
        }
      });
    }

    const currentAddress = `${candidateCurrentAddress.houseNumber},${
      candidateCurrentAddress.street
    }, ${candidateCurrentAddress.state},${candidateCurrentAddress.city},${
      candidateCurrentAddress.pinCode
    },India`;
    const permanentAddress = `${
      candidatePermanentAddress.permanentHouseNumber
    },${candidatePermanentAddress.permanentStreet}, ${
      candidatePermanentAddress.permanentState
    },${candidatePermanentAddress.permanentCity},${
      candidatePermanentAddress.permanentPinCode
    },India`;

    let fullName;
    if (personalDetail.lastName === undefined) {
      fullName = personalDetail.firstName;
    } else {
      fullName = `${personalDetail.firstName} ${personalDetail.lastName}`;
    }

    let experience;
    if (
      personalDetail.years === undefined &&
      personalDetail.months === undefined
    ) {
      experience = "0 years 0 months";
    } else if (personalDetail.years === undefined) {
      experience = `${personalDetail.months} months`;
    } else if (personalDetail.months === undefined) {
      experience = `${personalDetail.years} years`;
    } else {
      experience = `${personalDetail.years} years ${
        personalDetail.months
      } months`;
    }
    let interviewDate;
    if (
      personalDetail.dateOfInterview === undefined &&
      personalDetail.monthOfInterview === undefined &&
      personalDetail.yearOfInterview === undefined
    ) {
      interviewDate = null;
    }
    if (personalDetail.dateOfInterview !== undefined) {
      interviewDate = `${personalDetail.monthOfInterview} ${
        personalDetail.dateOfInterview
      } ${personalDetail.yearOfInterview}`;
    } else {
      interviewDate = `${personalDetail.monthOfInterview} ${
        personalDetail.yearOfInterview
      }`;
    }

    var requestPayload = {
      emailId: personalDetail.emailId,
      intervieweeId: 0,
      status: "Form Filled",
      PersonalDetail: {
        CurrentAddress: currentAddress,
        PermanentAddress: permanentAddress,
        DOB: personalDetail.dateOfBirth,
        FathersName: personalDetail.fathersName,
        HRName: personalDetail.contactedHr,
        TotalExperience: experience,
        MobileNo: personalDetail.mobileNo,
        Name: fullName,
        PositionApplied: personalDetail.positionAppliedFor,
        IntervieweeId: 0,
        PDID: 0,
        PMDID: 0,
        DateOfInterview: interviewDate
      },
      OrganizationalDetail: organizationDetail,
      EducationalDetail: educationDetail,
      ProfessionalSkills: professionalSkills,
      SalaryNoticeDetail: salaryNoticeDetails,
      RegistrationCode: this.props.registrationCode,
      professionalReferences: professionalReferences
    };

    console.log("requestPayload", JSON.stringify(requestPayload));
    let requestheaders = {
      headers: {
        clientKey: config.clientKey,
        "Content-Type": "application/json",
        Accept: "application/json",
        "EMAIL-RECP": requestPayload.emailId
      }
    };

    const url = config.apiEndPoint + submitUrl;

    http
      .post(url, JSON.stringify(requestPayload), requestheaders)
      .then(() => this.setState({ redirect: true }))
      .catch(error => {
        console.log("error form submission", error);
      });
  };

  handleChange = (input, state) => {
    console.log("input", input.name);
   

    const inputName = input.name;
    delete submitErrors[inputName];

    delete errors[inputName];

    if (
      state.title === "Graduation" ||
      state.title === "10th" ||
      state.title === "12th/Diploma" ||
      state.title === "Current" ||
      state.title === "Reference1" ||
      state.title === "Reference2"
    ) {
      delete submitErrors[state.title + inputName];
      delete errors[state.title + inputName];
    }
    this.validation(input, state);
    const data = state;
    data[input.name] = input.value;

    errorsToBeSet = false;
    if (state.title === "Current Address") {
      isFromHandleChange = true;
    }

    this.setState({ errors }); // Add Errors Here
  };

  validation = (input, state) => {
    console.log("Validation", input.name, state);
    if (input.name === "organization" && state.title !== "Previous") {
      errors[state.title + "organization"] =
        input.value.length === 0 ? ErrorMessage.currentOrganization : "";
    }

    if (input.name === "designation" && state.title !== "Previous") {
      errors[state.title + "designation"] =
        input.value.length === 0 ? ErrorMessage.designation : "";
    }

    // if (input.name === "dateOfLeaving" && state.title !== "Previous") {
    //   errors[state.title + "dateOfLeaving"] =
    //     new Date(input.value) < new Date(state.dateOfJoining)
    //       ? ErrorMessage.dateOfLeaving
    //       : "";
    // }

    if (input.name === "dateOfJoining" && state.title !== "Previous") {
      errors[state.title + "dateOfJoining"] =
        new Date(input.value) > new Date(state.dateOfLeaving)
          ? ErrorMessage.maxDateOfJoining
          : "";
    }

    if (input.name === "year" && state.title !== "PostGraduation") {
      errors[state.title + "year"] =
        input.value === "select" ? ErrorMessage.passingYear : "";
    }

    if (input.name === "college" && state.title !== "PostGraduation") {
      errors[state.title + "college"] =
        input.value.length === 0 ? ErrorMessage.college : "";
    }

    if (input.name === "Name" && state.title === "Reference1") {
      errors[state.title + input.name] =
        input.value.length === 0 ? ErrorMessage.referenceName : "";
    }

    if (input.name === "Designation" && state.title === "Reference1") {
      errors[state.title + input.name] =
        input.value.length === 0 ? ErrorMessage.referenceDesignation : "";
    }

    if (input.name === "ContactNumber" && state.title === "Reference1") {
      errors[state.title + input.name] =
        input.value.length === 0
          ? ErrorMessage.referenceContactNumber
          : isNaN(input.value)
          ? ErrorMessage.mobileNumberNumeric
          : input.value.length !== 10
          ? ErrorMessage.mobileNumbermaxInputSize
          : "";
    }

    if (input.name === "Relationship" && state.title === "Reference2") {
      errors[state.title + input.name] =
        input.value.length === 0 ? ErrorMessage.referenceRelationship : "";
    }

    if (input.name === "Name" && state.title === "Reference2") {
      errors[state.title + input.name] =
        input.value.length === 0 ? ErrorMessage.referenceName : "";
    }

    if (input.name === "Designation" && state.title === "Reference2") {
      errors[state.title + input.name] =
        input.value.length === 0 ? ErrorMessage.referenceDesignation : "";
    }

    if (input.name === "ContactNumber" && state.title === "Reference2") {
      errors[state.title + input.name] =
        input.value.length === 0
          ? ErrorMessage.referenceContactNumber
          : isNaN(input.value)
          ? ErrorMessage.mobileNumberNumeric
          : "";
    }

    if (input.name === "Relationship" && state.title === "1stReference") {
      errors[state.title + input.name] =
        input.value.length === 0 ? ErrorMessage.referenceRelationship : "";
    }

    if (
      input.name === "qualificationType" &&
      state.title !== "PostGraduation"
    ) {
      errors[state.title + "qualificationType"] =
        input.value === "select" ? ErrorMessage.qualificationType : "";
    }

    if (input.name === "percentage" && state.title !== "PostGraduation") {
      errors[state.title + "percentage"] = isNaN(input.value)
        ? ErrorMessage.percentageNumeric
        : input.value.length === 0
        ? ErrorMessage.percentage
        : input.value > 100
        ? ErrorMessage.percentageMaxValue
        : "";
    }

    if (input.name === "boardUniversity" && state.title !== "PostGraduation") {
      errors[state.title + "boardUniversity"] =
        input.value === "select" ? ErrorMessage.board_university : "";
    }

    if (input.name === "qualification" && state.title !== "PostGraduation") {
      errors[state.title + "qualification"] =
        input.value === "select" ? ErrorMessage.graduationCourse : "";
    }

    switch (input.name) {
      case "positionAppliedFor":
        errors.positionAppliedFor =
          input.value.length === 0 ? ErrorMessage.positionAppliedFor : "";
        break;
      case "firstName":
        errors.firstName =
          input.value.length === 0 ? ErrorMessage.firstName : "";
        break;
      case "fathersName":
        errors.fathersName =
          input.value.length === 0 ? ErrorMessage.fathersName : "";
        break;
      case "mobileNo":
        errors.mobileNo =
          input.value.length === 0
            ? ErrorMessage.mobileNumber
            : isNaN(input.value)
            ? ErrorMessage.mobileNumberNumeric
            : input.value.length !== 10
            ? ErrorMessage.mobileNumbermaxInputSize
            : "";
        break;
      case "emailId":
        errors.emailId =
          input.value.length === 0
            ? ErrorMessage.emailId
            : this.state.validEmailRegex.test(input.value)
            ? ""
            : ErrorMessage.invalidEmail;
        break;
      case "dateOfBirth":
        errors.dateOfBirth = this.state.validDateOfBirth.test(input.value)
          ? ErrorMessage.invalidDateOfBirth
          : new Date(input.value) > new Date()
          ? ErrorMessage.futureDateOfBirth
          : this.calculateAge(input.value)
          ? ErrorMessage.age
          : "";
        break;
      case "contactedHr":
        errors.contactedHr =
          input.value === "select" ? ErrorMessage.contactedHR : "";
        break;
      case "houseNumber":
        errors.houseNumber =
          input.value.length === 0 ? ErrorMessage.houseNumber : "";
        break;
      case "street":
        errors.street = input.value.length === 0 ? ErrorMessage.street : "";
        break;
      case "state":
        errors.state = input.value === "select" ? ErrorMessage.state : "";
        break;
      case "city":
        errors.city = input.value.length === 0 ? ErrorMessage.city : "";
        break;
      case "pinCode":
        errors.pinCode = isNaN(input.value)
          ? ErrorMessage.pincodeNumeric
          : input.value.length === 0
          ? ErrorMessage.pincode
          : input.value.length !== 6
          ? ErrorMessage.pincodeMaxInputSize
          : "";
        break;
      case "country":
        errors.country = input.value.length === 0 ? ErrorMessage.country : "";
        break;
      case "permanentHouseNumber":
        errors.permanentHouseNumber =
          input.value.length === 0 ? ErrorMessage.permanentHouseNumber : "";
        break;
      case "permanentStreet":
        errors.permanentStreet =
          input.value.length === 0 ? ErrorMessage.permanentStreet : "";
        break;
      case "permanentState":
        errors.permanentState =
          input.value === "select" ? ErrorMessage.permanentState : "";
        break;
      case "permanentCity":
        errors.permanentCity =
          input.value.length === 0 ? ErrorMessage.permanentCity : "";
        break;
        case "questionCount":
          errors.questionCount = isNaN(input.value) ? ErrorMessage.questionCount : "";
          break;
      case "permanentPinCode":
        errors.permanentPinCode = isNaN(input.value)
          ? ErrorMessage.permanentPincodeNumeric
          : input.value.length === 0
          ? ErrorMessage.permanentPinCode
          : input.value.length !== 6
          ? ErrorMessage.permanentPincodeMaxInputSize
          : "";
        break;
      case "permanentCountry":
        errors.permanentCountry =
          input.value.length === 0 ? ErrorMessage.permanentCountry : "";
        break;
      case "currentCTC":
        errors.currentCTC = isNaN(input.value)
          ? ErrorMessage.CTCNumeric
          : input.value.length === 0
          ? ErrorMessage.currentCTC
          : "";
        break;
      case "expectedCTC":
        errors.expectedCTC = isNaN(input.value)
          ? ErrorMessage.CTCNumeric
          : input.value.length === 0
          ? ErrorMessage.expectedCTC
          : "";
        break;
      case "noticePeriod":
        errors.noticePeriod = isNaN(input.value)
          ? ErrorMessage.noticePeriodNumeric
          : input.value.length === 0
          ? ErrorMessage.noticePeriod
          : "";
        break;

      default:
        break;
    }
  };

  calculateAge(input) {
    const currentDate = this.formatDate(new Date());
    var agediff = currentDate.substring(0, 4) - input.substring(0, 4);
    if (agediff < 18) {
      return true;
    }
    return false;
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  renderButton(label) {
    return <button className="button">{label}</button>;
  }

  handleCheckBoxChange = (currentState, previousState) => {
    isChecked = !isChecked;

    if (isChecked) {
      disabled = true;
      const currentAddressState = previousState;
      const permanentAddressState = currentState;
      if (currentAddressState.houseNumber !== undefined) {
        permanentAddressState.permanentHouseNumber =
          currentAddressState.houseNumber;
      }

      if (currentAddressState.street !== undefined) {
        permanentAddressState.permanentStreet = currentAddressState.street;
      }

      if (currentAddressState.state !== undefined) {
        permanentAddressState.permanentState = currentAddressState.state;
      }

      if (currentAddressState.city !== undefined) {
        permanentAddressState.permanentCity = currentAddressState.city;
      }

      if (currentAddressState.pinCode !== undefined) {
        permanentAddressState.permanentPinCode = currentAddressState.pinCode;
      }

      if (currentAddressState.country !== undefined) {
        permanentAddressState.permanentCountry = currentAddressState.country;
      }

      if (
        permanentAddressState.permanentHouseNumber !== undefined &&
        permanentAddressState.permanentHouseNumber.length > 0
      ) {
        const key = "permanentHouseNumber";
        delete submitErrors[key];
        delete errors[key];
      }

      if (
        permanentAddressState.permanentState !== undefined &&
        permanentAddressState.permanentState.length > 0
      ) {
        const key = "permanentState";
        delete submitErrors[key];
        delete errors[key];
      }

      if (
        permanentAddressState.permanentStreet !== undefined &&
        permanentAddressState.permanentStreet.length > 0
      ) {
        const key = "permanentStreet";
        delete submitErrors[key];
        delete errors[key];
      }

      if (
        permanentAddressState.permanentPinCode !== undefined &&
        permanentAddressState.permanentPinCode.length > 0
      ) {
        const key = "permanentPinCode";
        delete submitErrors[key];
        delete errors[key];
      }

      if (
        permanentAddressState.permanentCity !== undefined &&
        permanentAddressState.permanentCity.length > 0
      ) {
        const key = "permanentCity";
        delete submitErrors[key];
        delete errors[key];
      }

      if (
        permanentAddressState.permanentCountry !== undefined &&
        permanentAddressState.permanentCountry.length > 0
      ) {
        const key = "permanentCountry";
        delete submitErrors[key];
        delete errors[key];
      }

      currentState = permanentAddressState;
      currentState.title = "Permanent Address";

      this.setState(currentState);
    } else {
      disabled = false;
      if (currentState.permanentHouseNumber !== undefined) {
        currentState.permanentHouseNumber = "";
      }

      if (currentState.permanentStreet !== undefined) {
        currentState.permanentStreet = "";
      }

      if (currentState.permanentState !== undefined) {
        currentState.permanentState = "";
      }

      if (currentState.permanentPinCode !== undefined) {
        currentState.permanentPinCode = "";
      }

      if (currentState.permanentCity !== undefined) {
        currentState.permanentCity = "";
      }

      if (currentState.permanentCountry !== undefined) {
        currentState.permanentCountry = "";
      }

      if (currentState.permanentHouseNumber === undefined) {
        const key = "permanentHouseNumber";
        delete submitErrors[key];
        delete errors[key];
      }

      if (currentState.permanentStreet === undefined) {
        const key = "permanentStreet";
        delete submitErrors[key];
        delete errors[key];
      }

      if (currentState.permanentPinCode === undefined) {
        const key = "permanentPinCode";
        delete submitErrors[key];
        delete errors[key];
      }

      if (currentState.permanentState === undefined) {
        const key = "permanentState";
        delete submitErrors[key];
        delete errors[key];
      }

      if (currentState.permanentCountry === undefined) {
        const key = "permanentCountry";
        delete submitErrors[key];
        delete errors[key];
      }

      if (currentState.permanentCity === undefined) {
        const key = "permanentCity";
        delete submitErrors[key];
        delete errors[key];
      }

      if ("permanentHouseNumber" in errors) {
        errors.permanentHouseNumber = ErrorMessage.permanentHouseNumber;
      }

      if ("permanentPinCode" in errors) {
        errors.permanentPinCode = ErrorMessage.permanentPinCode;
      }

      if ("permanentState" in errors) {
        errors.permanentState = ErrorMessage.permanentState;
      }

      if ("permanentStreet" in errors) {
        errors.permanentStreet = ErrorMessage.permanentStreet;
      }

      if ("permanentCity" in errors) {
        errors.permanentCity = ErrorMessage.permanentCity;
      }

      if ("permanentCountry" in errors) {
        errors.permanentCountry = ErrorMessage.permanentCountry;
      }

      this.setState(currentState);
    }
  };

  renderCheckBox = (currentState, previousState) => {
    return (
      <React.Fragment>
        <input
          className="inp-cbx"
          id="cbx"
          type="checkbox"
          style={inputStyle}
          onChange={() =>
            this.handleCheckBoxChange(currentState, previousState)
          }
        />
        <label className="cbx" htmlFor="cbx">
          <span>
            <svg width="12px" height="10px" viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1" />
            </svg>
          </span>
        </label>
      </React.Fragment>
    );
  };

  renderInput = (name, label, state, errorMessage, isSectionOpen) => {
    if (name.includes("permanent") && disabled === true) {
      disabled = true;
    } else {
      disabled = false;
    }

    if (
      isSectionOpen &&
      state.title === "Current Address" &&
      isFromHandleChange === false
    ) {
      errorsToBeSet = true;
    }

    if (
      label !== "Last Name" &&
      errorsToBeSet &&
      errorMessage !== null &&
      state.permanentHouseNumber !== ""
    ) {
      submitErrors[name] = errorMessage;
    }

    return (
      <React.Fragment>
        <Input
          name={name}
          value={state[name]}
          label={label}
          disabled={disabled}
          error={errors[name]}
          onChange={({ currentTarget: input }) =>
            this.handleChange(input, state)
          }
        />
      </React.Fragment>
    );
  };

  renderTableInput = (name, state, errorMessage) => {
    if (
      state.title !== "PostGraduation" &&
      state.title !== "Previous" &&
      // (state.title === "Reference1"  || state.title === "Reference2") &&
      errorsToBeSet
    ) {
      submitErrors[state.title + name] = errorMessage;
    }
    return (
      <Input
        name={name}
        value={state[name]}
        error={errors[state.title + name]}
        onChange={({ currentTarget: input }) => this.handleChange(input, state)}
      />
    );
  };

  renderSelect(name, label, state, options, errorMessage) {
    if (name.includes("permanent") && disabled === true) {
      disabled = true;
    } else {
      disabled = false;
    }

    if (label !== "Years" && label !== "Months" && errorsToBeSet) {
      submitErrors[name] = errorMessage;
    }
    return (
      <Select
        name={name}
        value={state[name]}
        label={label}
        disabled={disabled}
        error={errors[name]}
        options={options}
        onChange={({ currentTarget: input }) => this.handleChange(input, state)}
      />
    );
  }

  renderTableSelect(name, state, options, errorMessage) {
    if (state.title !== "PostGraduation" && errorsToBeSet) {
      submitErrors[state.title + name] = errorMessage;
    }
    return (
      <Select
        name={name}
        value={state[name]}
        error={errors[state.title + name]}
        options={options}
        onChange={({ currentTarget: input }) => this.handleChange(input, state)}
      />
    );
  }

  renderCreateQuestionSelect(name, state, options, errorMessage) {
    submitErrors[state.title + name] = errorMessage;
    return (
      <Select
        name={name}
        value={state[name]}
        error={errors[state.title + name]}
        options={options}
        onChange={({ currentTarget: input }) =>
          this.handleCreateQuestionChange(input, state)
        }
      />
    );
  }

  handleSkillChange = (input, skills) => {
    const data = skills;
    data[input.name] = input.value;
    this.setState({ skills });
  };

  renderSkillSelect(name, skills, options) {
    return (
      <Select
        name={name}
        value={skills[name]}
        error={errors[name]}
        options={options}
        onChange={({ currentTarget: input }) =>
          this.handleSkillChange(input, skills)
        }
      />
    );
  }

  renderLabel(name, label, state) {
    if (name !== "dateOfLeaving") {
      return (
        <div style={labelStyle}>
          <label name={name} value={state[name]}>
            {label}
          </label>
        </div>
      );
    }

    return (
      <div>
        <label name={name} value={state[name]} className="current">
          {label}
        </label>
      </div>
    );
  }

  renderDate(name, label, state, errorMessage) {
    if (name !== "resignationDate" && errorsToBeSet && errorMessage !== null) {
      submitErrors[name] = errorMessage;
    }
    const style = {
      width: 375,
      height: 38
    };
    return (
      <React.Fragment>
        <DateInput
          style={style}
          name={name}
          value={state[name]}
          label={label}
          error={errors[name]}
          onChange={({ currentTarget: input }) =>
            this.handleChange(input, state)
          }
        />
      </React.Fragment>
    );
  }

  handleRadioButtonChange(input, state) {
    console.log("Input, State", input, state);

    if (input.name === "interviewedBefore") {
      if (input.value === "yes") {
        state.renderInterviewDate = true;
      } else {
        state.renderInterviewDate = false;
      }
    } else {
      if (input.name === "resignation") {
        if (input.value === "notResigned" && state[0].title === "Current") {
          state[0].dateOfLeaving = null;
          state[0].isDateOfBirthColumn = false;
        } else {
          state[0].isDateOfBirthColumn = true;
        }
      } else {
        state.forEach(skill => {
          if (skill.title === input.value) {
            skill.isSelected = true;
          } else {
            skill.isSelected = false;
          }
        });
      }
    }

    console.log("Updated state", state);
    this.setState({ state });
  }

  renderRadioButton(name, label, value, id, state, defaultChecked) {
    return (
      <React.Fragment>
        <label htmlFor={id} className="radio">
          <input
            name={name}
            type="radio"
            value={value}
            id={id}
            defaultChecked={defaultChecked}
            className="hidden"
            onChange={({ currentTarget: input }) =>
              this.handleRadioButtonChange(input, state)
            }
          />
          <span className="label" />
          {label}
        </label>
        <br />
        <br />
      </React.Fragment>
    );
  }

  renderTableDate(name, state, errorMessage) {
    if (
      state.title !== "Previous" &&
      name !== "dateOfLeaving" &&
      errorsToBeSet
    ) {
      submitErrors[state.title + name] = errorMessage;
    }
    return (
      <React.Fragment>
        <DateInput
          name={name}
          value={state[name]}
          error={errors[state.title + name]}
          onChange={({ currentTarget: input }) =>
            this.handleChange(input, state)
          }
        />
      </React.Fragment>
    );
  }
}

export default Form;
