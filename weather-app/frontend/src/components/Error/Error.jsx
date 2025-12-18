import React from "react";
import "./error.css";

const Error = ({ errors }) => {
  console.log(errors);
  return (
    <div className="error__container">
      <div className="error__icon">
        <i className="ri-error-warning-line"></i>
      </div>
      <div className="error__info">
        <h3>Unable to fetch data.</h3>
        <p>{errors}</p>
      </div>
    </div>
  );
};

export default Error;
