import React from "react";
import AudioPlayer from "./AudioPlayer";

const EpisodeContent = ({ episode, audioUrl }) => (
  <div className="episode-content-container">
    <h3 className="episode-title">{episode.trackName}</h3>
    <div
      className="episode-description"
      dangerouslySetInnerHTML={{ __html: episode.description }}
    />
    <hr className="sidebar-divider" />
    <AudioPlayer audioUrl={audioUrl} />
  </div>
);
export default EpisodeContent;
