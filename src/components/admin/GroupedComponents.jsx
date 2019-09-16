import React from "react";
import AdmminHeadingDashboard from "./HeadingDashboard";
import CandidatureSubmitted from "./CandidatureSubmitted";
import EmailsSent from "./EmailsSent";
import CandidateList from "./CandidateList";
import InterviewsScheduled from "./InterviewsScheduled";

const GroupedComponent = props => {
  console.log("Grouped", props)
  return (
    <React.Fragment>
      <AdmminHeadingDashboard />
      <div className="row m-t-25">
        <EmailsSent totalCandidates={props.candidateList} />
        <CandidatureSubmitted totalCandidatesubmitted={props.candidateList} />
        <InterviewsScheduled totalCandidates={props.candidateList}/>
      </div>
      <CandidateList candidateList={props.candidateList} />
    </React.Fragment>
  );
};

export default GroupedComponent;
