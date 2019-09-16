import React, { Component } from "react";
import http from "../../services/http";
import config from "../../config";
import { Redirect } from "react-router-dom";

class CandidateResponse extends Component {
  state = {
    candidateResponse: {}
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/notFound" />;
    }
    return (
      <div className="responseBox">
        <b><h2 className="responseHeading">Candidate Response</h2></b>
        <br></br>
          <h5>Personal Details</h5>
        <div className="limiter">
		<div className="container-table100">
			<div className="wrap-table100">
				<div className="table100 ver1 m-b-110">
					<div className="table100-head">
						<table>
							<thead>
              <tr className="row100 head">
                  <th className="cell100 column1">Name</th>
									<th className="cell100 column1">Details</th>
								</tr>
							</thead>
						</table>
					</div>
          <div className="table100-body js-pscroll">
						<table>
							<tbody>
								<tr className="row100 body">
                <td className="cell100 column1">Name</td>
                <td className="cell100 column2">{this.state.PersonalDetail && this.state.PersonalDetail.Name}</td>
                </tr>
                <tr className="row100 body">
                <td className="cell100 column1"> Email Id</td>
									<td className="cell100 column2">{this.state && this.state.EmailID}</td>
									</tr>
                  <tr>
                  <td className="cell100 column1">Father's Name</td>
									<td className="cell100 column2">{this.state.PersonalDetail && this.state.PersonalDetail.FathersName}</td>
                  </tr>
                  <tr>
                  <td className="cell100 column1">Mobile No.</td>
									<td className="cell100 column2">{this.state.PersonalDetail && this.state.PersonalDetail.MobileNo}</td>
                  </tr>
                  <tr>
                  <td className="cell100 column1"> Date Of Birth</td>
									<td className="cell100 column2"> {this.state.PersonalDetail && this.state.PersonalDetail.DOB}</td>
                  </tr>
                  <tr>
                  <td className="cell100 column1">Position Applied For</td>
									<td className="cell100 column2">{this.state.PersonalDetail &&
              this.state.PersonalDetail.PositionApplied}</td>
              </tr>
              <tr>
                  <td className="cell100 column1">Current Address</td>
									<td className="cell100 column2">{this.state.PersonalDetail &&
              this.state.PersonalDetail.CurrentAddress}</td>
              </tr>
              <tr>
                  <td className="cell100 column1">Permanent Address</td>
									<td className="cell100 column2">{this.state.PersonalDetail &&
              this.state.PersonalDetail.PermanentAddress}</td>
                  </tr>
                  <tr>
                  <td className="cell100 column1">Total Experience</td>
									<td className="cell100 column2">{this.state.PersonalDetail &&
              this.state.PersonalDetail.TotalExperience}</td>
                  </tr>
							</tbody>
						</table>
					</div>
          </div>
          </div>
          </div>
          </div>
          <br />
          <h5>Educational Details</h5>
          <div className="limiter">
		<div className="container-table100">
			<div className="wrap-table100">
				<div className="table100 ver1 m-b-110">
					<div className="table100-head">
						<table>
							<thead>
              <tr className="row100 head">
                  <th className="cell100 column1">Qualification</th>
									<th className="cell100 column1">School/College</th>
                  <th className="cell100 column1">Percentage</th>
                  <th className="cell100 column1">Qualification Type</th>
                  <th className="cell100 column1">Board University</th>
								</tr>
							</thead>
						</table>
					</div>
          <div className="table100-body js-pscroll">
						<table>
							<tbody>
              {this.state.EducationalDetail &&
              this.state.EducationalDetail.map((detail, index) => {
                return (
                  <tr key={index}>
                    <td> {detail.Qualification} </td>
                    <td>{detail.SchoolCollege}</td>
                    <td>{detail.Percentage}</td>
                    <td>{detail.QualificationType}</td>
                    <td>{detail.BoardUniversity}</td>
                  </tr>
                );
              })}
							</tbody>
						</table>
					</div>
          </div>
          </div>
          </div>
          </div>
          <br />
          <h5>Professional Details</h5>
          <div className="limiter">
		<div className="container-table100">
			<div className="wrap-table100">
				<div className="table100 ver1 m-b-110">
					<div className="table100-head">
						<table>
							<thead>
              <tr className="row100 head">
                  <th className="cell100 column1">DOJ</th>
									<th className="cell100 column1">DOL</th>
                  <th className="cell100 column1">Designation</th>
                  <th className="cell100 column1">Organization</th>
								</tr>
							</thead>
						</table>
					</div>
          
						<table>
							<tbody>
              {this.state.OrganizationalDetail &&
              this.state.OrganizationalDetail.map((detail, index) => {
                return (
                  <tr key={index}>
                    <td> {detail.DOJ} </td>
                    <td>{detail.DOL}</td>
                    <td>{detail.Designation}</td>
                    <td>{detail.Organization}</td>
                  </tr>
                );
              })}
							</tbody>
						</table>
					</div>
          </div>
          </div>
          </div>
         
          <br></br>
          <h5>Compensation Details</h5>
          <div className="limiter">
		<div className="container-table100">
			<div className="wrap-table100">
				<div className="table100 ver1 m-b-110">
					<div className="table100-head">
						<table>
							<thead>
              <tr className="row100 head">
                  <th className="cell100 column1">Name</th>
									<th className="cell100 column1">Details</th>
								</tr>
							</thead>
						</table>
					</div>
          <div className="table100-body js-pscroll">
						<table>
							<tbody>
								<tr className="row100 body">
                <td className="cell100 column1">Notice Period</td>
                <td className="cell100 column2">{this.state.SalaryNoticeDetail &&
              this.state.SalaryNoticeDetail.NoticePeriod}</td>
                </tr>
                <tr className="row100 body">
                <td className="cell100 column1">Last Working Date</td>
									<td className="cell100 column2">{this.state.SalaryNoticeDetail &&
              this.state.SalaryNoticeDetail.LastWorkingDate}</td>
									</tr>
                  <tr>
                  <td className="cell100 column1">Current CTC (in Lakhs)</td>
									<td className="cell100 column2">{this.state.SalaryNoticeDetail &&
              this.state.SalaryNoticeDetail.CurrentCTC}</td>
                  </tr>
                  <tr>
                  <td className="cell100 column1">Expected CTC(in Lakhs)</td>
									<td className="cell100 column2">{this.state.SalaryNoticeDetail &&
              this.state.SalaryNoticeDetail.ExpectedCTC}</td>
                  </tr>
                  <tr>
                  <td className="cell100 column1"> Resignation Date</td>
									<td className="cell100 column2"> {this.state.SalaryNoticeDetail &&
              this.state.SalaryNoticeDetail.ResignationDate}</td>
                  </tr>
							</tbody>
						</table>
					</div>
          </div>
          </div>
          </div>
          </div>
          <br />
          <h5>Professional Skills</h5>
          <div className="limiter">
		<div className="container-table100">
			<div className="wrap-table100">
				<div className="table100 ver1 m-b-110">
					<div className="table100-head">
						<table>
							<thead>
              <tr className="row100 head">
                  <th className="cell100 column1">Name</th>
									<th className="cell100 column1">Rating</th>
								</tr>
							</thead>
						</table>
					</div>
          <div className="table100-body js-pscroll">
						<table>
							<tbody>
              {this.state.ProfessionalSkills &&
              this.state.ProfessionalSkills.ProfessionalSkillsDetail.map(
                (detail, index) => {
                  return (
                    <tr key = {index} className="row100 body">
                       <td className="cell100 column1">{detail.Name}</td>
                <td className="cell100 column2">{detail.Rating}</td>
                    </tr>
                  );
                }
              )}
							</tbody>
						</table>
					</div>
          </div>
          </div>
          </div>
          </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("Props", this.props);
    const intervieweeId = this.props.match.params.id;
    console.log("intervieweeId", this.props);
    const url = config.apiEndPoint + `hrForm?id=${intervieweeId}`;
    const requestHeaders = {
      headers: {
        clientKey: config.clientKey
      }
    };
    http
      .get(url, requestHeaders)
      .then(response => {
        console.log(response.data);
        let candidateResponse = { ...this.state.candidateResponse };
        candidateResponse = response.data;
        console.log(candidateResponse);
        this.setState(candidateResponse);
      })
      .catch(error => {
        console.log("err", error);
        this.setState({ redirect: true });
      });
  }
}

export default CandidateResponse;
