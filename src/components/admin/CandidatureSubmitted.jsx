import React from "react";

const CandidatureSubmitted = props => {
  let candidatesSubmitted = 0;
  console.log("Props", props);
  const candidateList = props.totalCandidatesubmitted;
  candidateList.forEach(candidate => {
    if (candidate.Status === "Form Filled") {
      candidatesSubmitted = candidatesSubmitted + 1;
    }
  });
  return (
    <div className="col-sm-6 col-lg-3">
      <div className="overview-item overview-item--c1">
        <div className="overview__inner">
          <div className="overview-box clearfix">
            <div className="icon">
              <i className="zmdi zmdi-account-o" />
            </div>
            <div className="text">
              <h2>{candidatesSubmitted}</h2>
              <span>candidates have filled the form</span>
            </div>
          </div>
          <div className="overview-chart">
            <canvas id="widgetChart1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatureSubmitted;
