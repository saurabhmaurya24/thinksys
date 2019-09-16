import React from "react";
const Input = ({ name, value, onChange, label, error, disabled }) => {
  const divStyle = {
    color: "red"
  };
  return (
    <div className="form-group">
      {name !== "organization" ? <label htmlFor={name}>{label}</label> : ""}
      <input
        type="text"
        id={name}
        value={value}
        name={name}
        className="form-control"
        onChange={onChange}
        disabled={disabled}
      />
      <b>{error && <div style={divStyle}>{error}</div>}</b>
    </div>
  );
};

export default Input;
