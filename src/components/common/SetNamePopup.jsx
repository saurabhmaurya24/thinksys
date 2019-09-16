import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import ErrorMessage from "../registration/ErrorMessage";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

let errors = {};

const divStyle = {
  color: "red"
};
class SetNamePopup extends Component {
  state = {
    name: "",
    isCreateDisabled: true
  };
  handleClick = (input, data) => {
    this.setState({
      modalOpen: false
    });
  };

  handleChange = input => {
    const name = input.target.value;
    if (name === "") {
      errors.name = ErrorMessage.name;
      this.setState({ isCreateDisabled: true });
    } else {
      errors = {};
      this.setState({ isCreateDisabled: false });
    }
    this.setState({ name });
    console.log("setName", this.state);
  };

  render() {
    const {
      open,
      onClose,
      heading,
      onCreate,
      modalBody,
      showCreate,
      showInput
    } = this.props;
    return (
      <div style={styles}>
        <Modal show={open}>
          <Modal.Header>
            <Modal.Title>{heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>{modalBody}</label>
            {showInput && (
              <React.Fragment>
                <input
                  autoFocus
                  type="text"
                  className="setName"
                  name="setName"
                  onChange={input => this.handleChange(input)}
                  placeholder="Set Name..."
                />
                <b>{errors && <div style={divStyle}>{errors.name}</div>}</b>
              </React.Fragment>
            )}
          </Modal.Body>

          <Modal.Footer>
            {showCreate === true ? (
              this.state.isCreateDisabled === true ? (
                <button
                  className="btn btn-primary"
                  id="addBtnNotAllowed"
                  onClick={input => onCreate(input, this.state.name)}
                  disabled={true}
                >
                  Create
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={input => onCreate(input, this.state.name)}
                >
                  Create
                </button>
              )
            ) : (
              ""
            )}
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

export default SetNamePopup;
