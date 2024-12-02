import React from "react";
import EpisodesTable from "./EpisodesTable";

const PodcastContent = ({ podcast, episodes, podcastId }) =>
  episodes.length ? (
    <div>
      <div className="podcast-content-container">
        <h2 className="podcast-content-title">
          Episodes: {podcast.trackCount}
        </h2>
      </div>
      <EpisodesTable episodes={episodes} podcastId={podcastId} />
    </div>
  ) : (
    <div className="loading-spinner-big loading-spinner-big-left-60"></div>
  );

export default PodcastContent;
