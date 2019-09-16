import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Registration from "./components/registration/Registration";
import ThankYou from "./components/registration/ThankYou";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login/login";
import NotFound from "./components/common/notFound";
import AdminDashboard from "./components/admin/AdminDashboard";
import SendEmail from "./components/admin/SendEmail";
import CandidateResponse from "./components/registration/candidateResponseForm";
import QuestionPaper from "./components/interviewProcess/questionPaper";
import TestRules from "./components/interviewProcess/testRules";

function App() {
  return (
    <Switch>
      <Route path="/candidate/registration/:id" component={Registration} />
      <Route
        path="/candidate/registration/HrView=true"
        exact
        component={Registration}
      />
      <Route
        path="/candidate/registration/isViewable=false"
        exact
        component={Registration}
      />
      <Route path="/thankYou" exact component={ThankYou} />
      <Route path="/login" exact component={Login} />
      <Route path="/notFound" exact component={NotFound} />
      <Route path="/adminDashboard/sendEmail" exact component={SendEmail} />
      <Route path="/adminDashboard" exact component={AdminDashboard} />
      <Route
        path="/candidateResponse/:id"
        exact
        component={CandidateResponse}
      />
      <Route path="/candidateResponse" exact component={CandidateResponse} />
      <Route path="/questions" exact component={QuestionPaper} />
      <Route path="/candidate/questionPaper/:id" exact component={TestRules} />
      <Route path="/" exact component={Login} />
      {<Redirect to="/notFound" />}}
    </Switch>
  );
}

export default App;
