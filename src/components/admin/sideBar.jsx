import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return <ul>
    <li>
      <Link to ="/admin/sendEmail">Send Email</Link>
    </li>
    <li>
    <Link to ="/admin/candidateList">View Candidate List</Link>
    </li>
  </ul>;
};

export default SideBar;
