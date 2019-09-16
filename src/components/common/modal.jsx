import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import http from "../../services/http";
import config from "../../config";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
let hrAction;
class ModalPopup extends Component {
  state = {
    isDisabled: true
  };
  handleSelectClick = e => {
    hrAction = e.target.value;
    if (e.target.value !== "select") {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  // handleClick = (intervieweeId, open) => {
  //   console.log(hrAction);
  //   const statusUrl = config.apiEndPoint + hrActionUrl + intervieweeId;

  //   const requestHeaders = {
  //     headers: {
  //       clientKey: config.clientKey
  //     }
  //   };

  //   const requestPayload = {
  //     Status: hrAction
  //   };

  //   http.put(statusUrl, requestPayload, requestHeaders);
  // };

  render() {
    const {
      open,
      modalBody,
      onClose,
      heading,
      intervieweeId,
      onConfirmClick
    } = this.props;

    console.log(modalBody, intervieweeId, open);
    return (
      <div style={styles}>
        <Modal show={open}>
          <Modal.Header>
            <div className="modalHeading">
              <Modal.Title>{heading}</Modal.Title>
            </div>
          </Modal.Header>
          {heading === "Interviewee Test Results" ? (
            <Modal.Body>
              <h6 className="textSize">
                Marks Scored <b className="right">{modalBody.Score}</b>
              </h6>{" "}
              <br />
              <h6 className="textSize">
                Total Marks <b className="right">{modalBody.TotalMarks}</b>
              </h6>
              <br />
              <h6 className="textSize">
                Percentage{" "}
                <b className="right">
                  {Math.round((modalBody.Score / modalBody.TotalMarks) * 100) /
                    100}
                  %{" "}
                </b>
              </h6>
              <br />
              <h6 className="textSize">HR Action</h6>
              <div className="select" id="hrAction">
                <select
                  className="selected"
                  name="slct"
                  id="slct"
                  onClick={this.handleSelectClick}
                >
                  <option value="select">Select...</option>
                  <option value="Face To Face">Proceed To Next Round</option>
                  <option value="Rejected">Reject</option>
                </select>
              </div>
              <br />
              {this.state.isDisabled === true ? (
                <button
                  onClick={() => onConfirmClick(intervieweeId, hrAction)}
                  disabled={true}
                  className="btn btn-primary"
                  id="sendBtnNotAllowed"
                >
                  Confirm
                </button>
              ) : (
                <button
                  onClick={() => onConfirmClick(intervieweeId, hrAction)}
                  className="btn btn-primary"
                  id="sendBtn"
                >
                  Confirm
                </button>
              )}
            </Modal.Body>
          ) : (
            <Modal.Body>{modalBody}</Modal.Body>
          )}
          <Modal.Footer>
            <button
              className="btn btn-primary"
              onClick={input => onClose(input)}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalPopup;
