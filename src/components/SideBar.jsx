import React from "react";
import { Link, useLocation } from "react-router-dom";
import useLoading from "../hooks/useLoading";

const SideBar = ({ podcast, podcastId }) => {
  const location = useLocation();
  const { handleLoading } = useLoading();

  if (location.pathname.includes("/episode/")) {
    return (
      <div className="sidebar-container">
        <Link
          to={`/podcast/${podcastId}`}
          onClick={handleLoading}
          className="sidebar-link"
        >
          <img
            src={podcast["im:image"][2].label}
            alt={podcast["im:name"].label}
            className="sidebar-image"
          />
          <hr className="sidebar-divider" />
          <div>
            <p className="sidebar-title">{podcast["im:name"].label}</p>
            <p className="sidebar-author">by {podcast.artistName}</p>
          </div>
          <hr className="sidebar-divider" />
        </Link>
        <div className="sidebar-description-container">
          <p className="sidebar-description-title">Description:</p>
          <p className="sidebar-description">{podcast.summary.label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-container sidebar-link">
      <img
        src={podcast["im:image"][2].label}
        alt={podcast["im:name"].label}
        className="sidebar-image"
      />
      <hr className="sidebar-divider" />
      <div>
        <p className="sidebar-title">{podcast["im:name"].label}</p>
        <p className="sidebar-author">by {podcast.artistName}</p>
      </div>
      <hr className="sidebar-divider" />
      <div className="sidebar-description-container">
        <p className="sidebar-description-title">Description:</p>
        <p className="sidebar-description">{podcast.summary.label}</p>
      </div>
    </div>
  );
};

export default SideBar;
