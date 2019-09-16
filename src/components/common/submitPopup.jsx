import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class SubmitPopup extends Component {
   handleClose = () =>{
     console.log("Clicked");
   }
    render() {
        const { open, modalBody, onClose, errors } = this.props;
        return (
          <div style={styles}>
            <Modal show={open} onHide={this.handleClose}>
              <Modal.Header>
                <Modal.Title>Status</Modal.Title>
              </Modal.Header>
              <Modal.Body>{modalBody}</Modal.Body>
              <Modal.Footer>
              {errors === false && <button value="No" className="btn btn-secondary" onClick={(input) => onClose(input)}>
                  No
                </button>
              }
                {errors === false ? <button className="btn btn-primary" value="Yes" onClick={(input) => onClose(input)}>
                  Yes
                </button> 
                :
                <button className="btn btn-primary" value="Close" onClick={(input) => onClose(input)}>
                  Close
                </button> 
                }
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
}
 
export default SubmitPopup;