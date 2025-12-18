import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading__container">
      <div className="loading__icon">
        <i className="ri-sun-line"></i>
      </div>
      <div className="loading__info">
        <h3>Detecting your location</h3>
        <p>
          Your current location will be displayed on the App & used for
          calculating Real time weather.
        </p>
      </div>
    </div>
  );
};

export default Loading;
