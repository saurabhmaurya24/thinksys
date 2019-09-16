import React from "react";

const DateInput = ({ name, onChange, label, error }) => {
  const divStyle = {
    color: "red"
  };

  return (
    <div className="form-group">
      {name !== "dateOfInterview" ? <label htmlFor={name}>{label}</label> : 
        <label className="dateOfInterview" htmlFor={name}>{label} </label>}
      <input
        type="date"
        id={name}
        name={name}
        className="form-control"
        onChange={onChange}
        onKeyDown={e => e.preventDefault()}
      />
      <b>{error && <div style={divStyle}>{error}</div>}</b>
    </div>
  );
};

export default DateInput;
