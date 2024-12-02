import React from "react";
import { Link } from "react-router-dom";
import useLoading from "../hooks/useLoading";

const PodcastList = ({ podcasts }) => {
  const { handleLoading } = useLoading();
  return (
    <ul className="podcast-list">
      {podcasts.map((podcast) => (
        <li key={podcast.id.attributes["im:id"]} className="podcast-item">
          <Link
            to={`/podcast/${podcast.id.attributes["im:id"]}`}
            onClick={handleLoading}
            className="podcast-link"
          >
            <div className="podcast-image-container">
              <img
                src={podcast["im:image"][2].label}
                alt={podcast["im:name"].label}
                className="podcast-image"
              />
            </div>
            <div className="podcast-card">
              <p className="podcast-title">{podcast["im:name"].label}</p>
              <p className="podcast-author">
                Author: {podcast["im:artist"].label}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PodcastList;
