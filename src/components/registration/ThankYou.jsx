import React, { Component } from "react";

const divStyle = {
  marginTop: 100
};
class ThankYou extends Component {
  render() {
    return (
      <React.Fragment>
        <div align="center" style={divStyle}>
          <br />
          <br />
          <img
            alt="Can not be loaded"
            height="200"
            width="200"
            src={require("../../resources/tick.png")}
          />
          <b>
            <strong>
              <h3 className="display-3">Thank You!</h3>
            </strong>
          </b>

          <p className="lead">
            <strong>
              Your submission is received and we will contact you soon
            </strong>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default ThankYou;
