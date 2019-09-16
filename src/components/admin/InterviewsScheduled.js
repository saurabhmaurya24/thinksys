import React from "react";

const InterviewsScheduled = props => {
  let interviewsScheduled = 0;
  console.log("Scheduled", props);
  const candidateList = props.totalCandidates;
  candidateList.forEach(candidate => {
    if (candidate.Status === "Face To Face") {
      interviewsScheduled = interviewsScheduled + 1;
    }
  });
  return (
    <div className="col-sm-6 col-lg-3">
      <div className="overview-item overview-item--c4">
        <div className="overview__inner">
          <div className="overview-box clearfix">
            <div className="icon">
              <img
                className="img"
                src={require("../../resources/interview.png")}
                alt="interview"
                height="5"
              />
            </div>
            <div className="text">
              <h2>{interviewsScheduled}</h2>
              <span>Interviews Scheduled</span>
            </div>
          </div>
          <div className="overview-chart">
            <canvas id="widgetChart4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsScheduled;
