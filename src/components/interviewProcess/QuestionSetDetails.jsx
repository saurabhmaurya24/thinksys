import React from "react";

let questionSet;
let questionSetObj = {};
const QuestionSetDetails = props => {
  const { details, questionSetName } = props;
  details.forEach(detail => {
    if (detail.SetName === questionSetName) {
      questionSet = [];
      questionSet.push(detail);
      questionSetObj = questionSet[0];
    }
  });

  console.log("PropSending", details, questionSetName, questionSetObj.QuestionsSetDetails);
  let array = questionSetObj.QuestionsSetDetails.filter(
    component => component["QuestionType"] === "Technical"
  );
  let arrayProcessed = array.reduce((acu, element) => {
    const tech = element["QuestionTechnology"];
    const levels = ["Low", "Medium", "High"];
    if (tech) {
      debugger;
      acu[tech] = acu[tech] || [0, 0, 0];
      acu[tech][levels.indexOf(element["QuestionLevel"])] +=
        element["QuestionCount"];
    }
    return acu;
  }, {});
  console.log("processed array data =", arrayProcessed);

  let questionSetDetails = [];
  for (var property in arrayProcessed) {
    questionSetDetails.push([property, ...arrayProcessed[property]]);
  }
  console.log("processed flat array data =", questionSetDetails);
  //this.setState({ setTableData: flatArray });

console.log("flatArray", questionSetDetails)

  questionSetObj.QuestionsSetDetails.forEach(questionSetDetail => {
    // if(questionSetDetail.QuestionTechnology === )
  });


  return (
    <React.Fragment>
      <table className="table table-borderless table-striped table-earning">
        <thead>
          <tr>
            <th>Test Type</th>
            <th>Low</th>
            <th>Medium </th>
            <th>High</th>
          </tr>
        </thead>
        <tbody>
          {questionSetObj !== {} &&
            questionSetDetails.map((question, index) => (
              <tr key={index}>
               <td>{question[0]}</td>
                <td>{question[1]}</td>
                <td>{question[2]}</td>
                <td>{question[3]}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h5 className="questionsCount">TotalQuestionsCount: {questionSetObj.TotalQuestionsCount}</h5>
    </React.Fragment>
  );
};

export default QuestionSetDetails;
