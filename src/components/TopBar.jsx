import React from "react";
import { Link } from "react-router-dom";
import useLoading from "../hooks/useLoading";
import LoadingIndicator from "./LoadingIndicator";

const TopBar = () => {
  const { loading, handleLoading } = useLoading();

  return (
    <div className="topbar-container">
      <Link to={`/`} onClick={handleLoading}>
        <h1 className="topbar-title">Podcaster</h1>
      </Link>
      <LoadingIndicator loading={loading} />
    </div>
  );
};

export default TopBar;
