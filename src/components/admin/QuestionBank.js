/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import http from "../../services/http";
import config from "../../config";
import { toast, ToastContainer } from "react-toastify";

const uploadUrl = "QuestionBank/Upload";
const divStyle = {
  color: "red",
  float: "right"
};
class QuestionBank extends Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
  }
  state = {
    file: null,
    questionBankUploaded: false,
    uploadErrorMessage: null,
    isUploadButtonDisabled: true
  };

  handleFile = e => {
    let file = e.target.files[0];
    if (file !== undefined) {
      this.setState({ isUploadButtonDisabled: false });
      this.setState({ file: file });
    } else {
      this.setState({ isUploadButtonDisabled: true });
    }
  };

  handleUpload = e => {
    let file = this.state.file;
    let formData = new FormData();
    formData.append("file", file);

    const requestHeaders = {
      headers: {
        clientKey: config.clientKey,
        "Content-Type": "multipart/form-data"
      }
    };

    const url = config.apiEndPoint + uploadUrl;

    http.post(url, formData, requestHeaders).then(response => {
      console.log(response.data);
      if (response.data.IsUploaded) {
        toast.success("Question Bank Successfully Uploaded", {
          position: toast.POSITION.BOTTOM_CENTER
        });
        this.setState({ questionBankUploaded: true });
      } else {
        this.setState({ uploadErrorMessage: response.data.ErrorMessage });
      }
    });
  };

  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <h3>
          <b>Upload Question Bank</b>
        </h3>
        <br />
        <div className="questionbankUploadCriteria">
          <b>
            <h5 className="criteria">
              Please Consider This Criteria While Uploading Question Bank
            </h5>
          </b>
          <ul className="listOfRules">
            <li className="rulesListItem">
              No. of Columns should be :={"  "}
              <b>9</b>
            </li>
            <li className="rulesListItem">
              Column Headers should be
              <ul type="square">
                <b>
                  <li>Question Type</li>
                  <li className="display">Question Name</li>
                  <li>Level</li>
                  <li>Technology</li>
                  <li>Option1</li>
                  <li>Option2</li>
                  <li>Option3</li>
                  <li>Option4</li>
                  <li>Answer</li>
                </b>
              </ul>
            </li>
            <li className="rulesListItem">No Options should be repeated</li>
            <li className="rulesListItem">Question Name is Compulsory</li>
            <li className="rulesListItem">
              Question Type should be <b>Aptitude</b> Or <b>Technical</b>
            </li>
            <li className="rulesListItem">
              Question Level should be <b>Low</b>, <b>Medium</b> Or <b>High</b>
            </li>
          </ul>
          <input type="file" id="file" onChange={e => this.handleFile(e)} />
          <label htmlFor="file" className="btn-3">
            {/* <span>Select</span> */}
          </label>
          {this.state.isUploadButtonDisabled === true ? (
            <button
              className="btn btn-primary"
              onClick={e => this.handleUpload(e)}
              id="uploadDisabled"
              disabled={true}
            >
              Upload
            </button>
          ) : (
            <button
              className="btn btn-primary"
              id="upload"
              onClick={e => this.handleUpload(e)}
            >
              Upload
            </button>
          )}
          <br />
          <br />
          {this.state.uploadErrorMessage !== null && (
            <b>{<div style={divStyle}>{this.state.uploadErrorMessage}</div>}</b>
          )}
          {this.state.questionBankUploaded && (
            <div className="toastPosition">
              <ToastContainer />
            </div>
          )}
        </div>
        <br />
      </React.Fragment>
    );
  }
}

export default QuestionBank;
