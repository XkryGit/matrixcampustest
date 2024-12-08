import React from "react";

const LoadingIndicator = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loading-container">
      <div className="loading-spinner" role="spinner"></div>
    </div>
  );
};

export default LoadingIndicator;
