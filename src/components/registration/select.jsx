import React from "react";

const Select = ({ name, value, onChange, label, error, options, disabled }) => {
  const divStyle = {
    color: "red"
  };
  return (
    <div className="form-group">
      {name !== "qualification" ? <label htmlFor={name}>{label}</label> : ""}

      <select
        id={name}
        name={name}
        value={value}
        className="form-control"
        onChange={onChange}
        disabled={disabled}
      >
        <option value="select">Select...</option>

        {options.map((option, index) => (
          <option key={index} value={option.Name}>
            {option.Text || option.name || option.Name || option}
          </option>
        ))}
      </select>
      <b>{error && <div style={divStyle}>{error}</div>}</b>
    </div>
  );
};

export default Select;
