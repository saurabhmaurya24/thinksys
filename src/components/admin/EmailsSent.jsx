import React, { Component } from "react";

class EmailsSent extends Component {
  state = {};
  render() {
    const { totalCandidates } = this.props;
    console.log(totalCandidates);
    totalCandidates.forEach(candidate => {}); //Need to implement logic for current date
    return (
      <div className="col-sm-6 col-lg-3">
        <div className="overview-item overview-item--c3">
          <div className="overview__inner">
            <div className="overview-box clearfix">
              <div className="icon">
                <i className="zmdi zmdi-calendar-note" />
              </div>
              <div className="text">
                <h2>{totalCandidates.length}</h2>
                <span>emails sent this week</span>
              </div>
            </div>
            <div className="overview-chart">
              <canvas id="widgetChart3" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailsSent;
