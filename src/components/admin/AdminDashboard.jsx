/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense } from "react";
import http from "../../services/http";
import config from "../../config";
import SendEmail from "./SendEmail";
import { Redirect } from "react-router-dom";
import CreateQuestionSet from "../interviewProcess/createQuestionSet";
import QuestionBank from "./QuestionBank";
import ViewQuestionBank from "../interviewProcess/questionBank";
const GroupedComponent = React.lazy(() => import("./GroupedComponents"));

let loggedInUserInfo = {};
let className = {
  class: "account-item clearfix js-item-menu"
};
let imageUrl;
let dashboardActiveclass = "active has-sub";
let mailActiveClass = "";
let registrationClass = "";
let questionSetActiveClass = "";
let uploadQuestionActiveClass = "";

class AdminDashboard extends Component {
  state = {
    candidateList: [],
    emailSectionRendered: false,
    dashboardSectionRendered: true,
    createQuestionSetRendered: false,
    toggleDropDown: false,
    uploadQuestionBankRendered: false,
    viewQuestionBankRendered: false,
    loggedInUserInfo: {},
    navbarStyle: {
      display: "none"
    },
    ulStyle: {
      display: "none"
    }
  };

  getCandidateList(isFromRedirect) {
    const receipientUri = "HrForm/EmailReceipients";
    const uri = config.apiEndPoint + receipientUri;
    const requestHeaders = {
      headers: {
        clientKey: config.clientKey
      }
    };

    let candidateList;
    if (isFromRedirect) {
      candidateList = [];
    } else {
      candidateList = [...this.state.candidateList];
    }

    http.get(uri, requestHeaders).then(response => {
      console.log("Response", response);
      response.data.forEach(candidate => {
        candidateList.push(candidate);
      });
      this.setState({ candidateList });
    });
  }

  componentWillMount() {
    const token = localStorage.getItem("access_token");
    const userInfo = localStorage.getItem("userInfo");
    if (token !== null) {
      console.log("loggedInInfo", userInfo);
      loggedInUserInfo = JSON.parse(userInfo);
      const uri = config.imageUrlEndPoint + loggedInUserInfo.Image;
      imageUrl = encodeURI(uri);
      console.log("ImageUrl", imageUrl);
      this.getCandidateList(false);
    } else {
      loggedInUserInfo.access_token = null;
      this.setState(loggedInUserInfo);
    }
  }

  handleClick = input => {
    const ulStyle = { ...this.state.ulStyle };
    if (this.state.ulStyle.display === "none") {
      ulStyle.display = "block";
      this.setState({ ulStyle });
    } else {
      ulStyle.display = "none";
      this.setState({ ulStyle });
    }
    console.log(input.currentTarget.name);
    let emailSectionRendered = { ...this.state.emailSectionRendered };
    let createQuestionSetRendered = { ...this.state.createQuestionSetRendered };
    let dashboardSectionRendered = { ...this.state.dashboardSectionRendered };
    let viewQuestionBankRendered = { ...this.state.viewQuestionBankRendered };
    let uploadQuestionBankRendered = {
      ...this.state.uploadQuestionBankRendered
    };
    if (input.currentTarget.name === "email") {
      emailSectionRendered = true;
      createQuestionSetRendered = false;
      dashboardSectionRendered = false;
      viewQuestionBankRendered = false;
      mailActiveClass = "active has-sub";
      registrationClass = "";
      dashboardActiveclass = "";
      questionSetActiveClass = "";
      uploadQuestionActiveClass = "";
      this.setState(
        {
          emailSectionRendered,
          createQuestionSetRendered,
          dashboardSectionRendered,
          uploadQuestionBankRendered,
          viewQuestionBankRendered
        },
        () => {
          console.log(this.state);
        }
      );
    } else if (input.currentTarget.name === "questionSet") {
      mailActiveClass = "";
      dashboardActiveclass = "";
      registrationClass = "";
      emailSectionRendered = false;
      createQuestionSetRendered = true;
      dashboardSectionRendered = false;
      uploadQuestionBankRendered = false;
      viewQuestionBankRendered = false;
      questionSetActiveClass = "active has-sub";
      uploadQuestionActiveClass = "";
      this.setState(
        {
          emailSectionRendered,
          createQuestionSetRendered,
          dashboardSectionRendered,
          uploadQuestionBankRendered,
          viewQuestionBankRendered
        },
        () => {
          console.log(this.state);
        }
      );
    }else if(input.currentTarget.name === "questionBank"){

    } else if (input.currentTarget.name === "upload") {
      mailActiveClass = "";
      dashboardActiveclass = "";
      registrationClass = "";
      emailSectionRendered = false;
      createQuestionSetRendered = false;
      dashboardSectionRendered = false;
      uploadQuestionBankRendered = true;
      viewQuestionBankRendered = false;
      questionSetActiveClass = "";
      uploadQuestionActiveClass = "active has-sub";
      this.setState(
        {
          emailSectionRendered,
          createQuestionSetRendered,
          dashboardSectionRendered,
          uploadQuestionBankRendered,
          viewQuestionBankRendered
        },
        () => {
          console.log(this.state);
        }
      );
    } else if (input.currentTarget.name === "view") {
      mailActiveClass = "";
      dashboardActiveclass = "";
      registrationClass = "";
      emailSectionRendered = false;
      createQuestionSetRendered = false;
      dashboardSectionRendered = false;
      uploadQuestionBankRendered = false;
      viewQuestionBankRendered = true;
      questionSetActiveClass = "";
      uploadQuestionActiveClass = "active has-sub";
      this.setState(
        {
          emailSectionRendered,
          createQuestionSetRendered,
          dashboardSectionRendered,
          uploadQuestionBankRendered,
          viewQuestionBankRendered
        },
        () => {
          console.log(this.state);
        }
      );
    } else {
      mailActiveClass = "";
      dashboardActiveclass = "active has-sub";
      registrationClass = "";
      uploadQuestionActiveClass = "";
      questionSetActiveClass = "";
      dashboardSectionRendered = true;
      emailSectionRendered = false;
      createQuestionSetRendered = false;
      uploadQuestionBankRendered = false;
      viewQuestionBankRendered = false;

      this.setState(
        {
          emailSectionRendered,
          createQuestionSetRendered,
          dashboardSectionRendered,
          uploadQuestionBankRendered,
          viewQuestionBankRendered
        },
        () => {
          console.log(this.state);
        }
      );
      this.getCandidateList(true);
    }
  };

  handleLogout = () => {
    loggedInUserInfo.access_token = null;
    const toggleDropDown = false;
    className.class = "account-item clearfix js-item-menu";
    localStorage.clear();
    this.setState({ loggedInUserInfo, toggleDropDown });
    console.log(this.state);
  };

  handleToggleDropdown = () => {
    console.log("Clicked");
    let toggleDropDown = this.state.toggleDropDown;
    toggleDropDown = !toggleDropDown;
    console.log("TD", toggleDropDown);
    if (toggleDropDown) {
      className.class = "account-item clearfix js-item-menu show-dropdown";
    } else {
      className.class = "account-item clearfix js-item-menu";
    }
    this.setState({ toggleDropDown });
  };

  registrationClick = () => {
    console.log("Redirect");
    registrationClass = "active has-sub";
    dashboardActiveclass = "";
    mailActiveClass = "";
    window.open("/candidate/registration/HrView=true", "_blank");
  };

  dashIcon = input => {
    input.currentTarget.classList.toggle("is-active");
    if (this.state.navbarStyle.display === "block") {
      const navbarStyle = { ...this.state.navbarStyle };
      navbarStyle.display = "none";
      this.setState({ navbarStyle });
    } else {
      const navbarStyle = { ...this.state.navbarStyle };
      navbarStyle.display = "block";
      this.setState({ navbarStyle });
    }
  };

  render() {
    if (loggedInUserInfo.access_token === null) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <div className="page-wrapper" id="page-wrapper">
          <header className="header-mobile d-block d-lg-none">
            <div className="header-mobile__bar">
              <div className="container-fluid">
                <div className="header-mobile-inner">
                  <a className="logo" href="index.html">
                    <img
                      src={require("../../resources/HrLogo.png")}
                      alt="HR"
                      height="20"
                    />
                  </a>
                  <button
                    className="hamburger hamburger--slider"
                    type="button"
                    onClick={input => this.dashIcon(input)}
                  >
                    <span className="hamburger-box">
                      <span className="hamburger-inner" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <nav className="navbar-mobile" style={this.state.navbarStyle}>
              <div className="container-fluid">
                <ul className="navbar-mobile__list list-unstyled">
                  <li className={dashboardActiveclass}>
                    <i className="fas fa-tachometer-alt" />
                    <a
                      name="dashboard"
                      onClick={input => this.handleClick(input)}
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className={mailActiveClass}>
                    <i className="fa fa-envelope" aria-hidden="true" />
                    <a name="email" onClick={input => this.handleClick(input)}>
                      Send Email
                    </a>
                  </li>
                  <li className={registrationClass}>
                    <i className="fa fa-wpforms" aria-hidden="true" />
                    <a onClick={this.registrationClick}>
                      Candidate Registration Form
                    </a>
                  </li>
                  <li className={registrationClass}>
                    <i className="fa fa-wpforms" aria-hidden="true" />
                    <a onClick={this.handleClick}>Send Question Set</a>
                  </li>
                  <li className={registrationClass}>
                    <i className="fa fa-wpforms" aria-hidden="true" />
                    <a onClick={this.handleClick}>Upload Question Bank</a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
          <aside className="menu-sidebar d-none d-lg-block">
            <div className="logo">
              <img
                src={require("../../resources/HrLogo.png")}
                alt="HR"
                height="20"
              />
            </div>
            <div className="menu-sidebar__content js-scrollbar1">
              <nav className="navbar-sidebar">
                <ul className="list-unstyled navbar__list" id="dashboard">
                  <li className={dashboardActiveclass}>
                    <i className="fas fa-tachometer-alt" />
                    <a
                      name="dashboard"
                      onClick={input => this.handleClick(input)}
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className={mailActiveClass}>
                    <i className="fa fa-envelope" aria-hidden="true" />
                    <a name="email" onClick={input => this.handleClick(input)}>
                      Send Email
                    </a>
                  </li>
                  <li className={registrationClass}>
                    <i className="fa fa-wpforms" aria-hidden="true" />
                    <a onClick={this.registrationClick}>
                      Candidate Registration Form
                    </a>
                  </li>
                  <li className={questionSetActiveClass}>
                    <i className="fa fa-wpforms" aria-hidden="true" />
                    <a
                      name="questionSet"
                      onClick={input => this.handleClick(input)}
                    >
                      Create Question Set
                    </a>
                  </li>
                  <li className={uploadQuestionActiveClass}>
                    <i className="fa fa-question" aria-hidden="true" />
                    <a
                      name="questionBank"
                      onClick={input => this.handleClick(input)}
                    >
                      Question Bank
                    </a>
                    <ul
                      className="list-unstyled navbar__sub-list js-sub-list"
                      style={this.state.ulStyle}
                    >
                      <li>
                        <a
                          name="upload"
                          onClick={input => this.handleClick(input)}
                        >
                          Upload
                        </a>
                      </li>
                      <li>
                        <a
                          name="view"
                          onClick={input => this.handleClick(input)}
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          <div className="page-container">
            <header className="header-desktop">
              <div className="section__content section__content--p30">
                <div className="container-fluid">
                  <div className="header-wrap">
                    <div className="header-button">
                      <div className="account-wrap">
                        <div className={className.class}>
                          <div className="image">
                            <img src={imageUrl} alt="John Doe" />
                          </div>
                          <div className="content">
                            <a
                              className="js-acc-btn"
                              onClick={this.handleToggleDropdown}
                            >
                              <b>{loggedInUserInfo.LoggedInName}</b>
                            </a>
                          </div>
                          <div className="account-dropdown js-dropdown">
                            <div className="info clearfix">
                              <div className="image">
                                <a>
                                  <img src={imageUrl} alt="John Doe" />
                                </a>
                              </div>
                              <div className="content">
                                <h5 className="name">
                                  <a>
                                    <h4>{loggedInUserInfo.LoggedInName}</h4>
                                  </a>
                                </h5>
                                <span>{loggedInUserInfo.userName}</span>
                              </div>
                            </div>
                            <div className="account-dropdown__body">
                              <div className="account-dropdown__item">
                                <a>
                                  <i className="zmdi zmdi-account" />
                                  Account
                                </a>
                              </div>
                              <div className="account-dropdown__item">
                                <a>
                                  <i className="zmdi zmdi-settings" />
                                  Setting
                                </a>
                              </div>
                            </div>
                            <div className="account-dropdown__footer">
                              <a onClick={this.handleLogout}>
                                <i className="zmdi zmdi-power" />
                                Logout
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className="main-content">
              <div className="section__content section__content--p30">
                <div className="container-fluid">
                  {this.state.uploadQuestionBankRendered === true ? (
                    <QuestionBank />
                  ) : this.state.createQuestionSetRendered === true ? (
                    <CreateQuestionSet />
                  ) : this.state.emailSectionRendered === true ? (
                    <div>
                      <SendEmail
                        hrName={loggedInUserInfo.LoggedInName}
                        hrEmailAddress={loggedInUserInfo.userName}
                      />
                    </div>
                  ) : this.state.dashboardSectionRendered === true ? (
                    <Suspense fallback={<div>Loading...</div>}>
                      <GroupedComponent
                        candidateList={this.state.candidateList}
                      />
                    </Suspense>
                  ) : this.state.viewQuestionBankRendered === true ? (
                    <ViewQuestionBank />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
