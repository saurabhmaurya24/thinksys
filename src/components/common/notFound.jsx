import React, { Component } from "react";

class NotFound extends Component {
  state = {};
  render() {
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>Oops!</h1>
          </div>
          <h2>404 - Page not found</h2>
          <p>
            The Registration Link Has Expired. Please Contact HR to generate a
            new Link.{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default NotFound;
