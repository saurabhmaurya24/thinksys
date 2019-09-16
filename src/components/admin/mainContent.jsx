import React, { Component } from "react";
import SendEmail from "./SendEmail";
import GroupedComponent from "./GroupedComponents";

class Content extends Component {
  state = {};
  render() {
    return (
      <div className="main-content">
        <div className="section__content section__content--p30">
          <div className="container-fluid">
            {this.state.emailSectionRendered === false ? (
              <div>
                <GroupedComponent candidateList={this.state.candidateList} />
              </div>
            ) : (
              <SendEmail />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
