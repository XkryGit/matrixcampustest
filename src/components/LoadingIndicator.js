import React from "react";

const LoadingIndicator = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingIndicator;
