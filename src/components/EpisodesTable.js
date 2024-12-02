import React from "react";
import { Link } from "react-router-dom";

const EpisodesTable = ({ episodes, podcastId }) => (
  <table className="podcast-content-container">
    <thead>
      <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>
      {episodes.map((episode) => (
        <React.Fragment key={episode.trackId}>
          <tr>
            <td>
              <Link to={`/podcast/${podcastId}/episode/${episode.trackId}`}>
                {episode.trackName}
              </Link>
            </td>
            <td>{new Date(episode.releaseDate).toLocaleDateString()}</td>
            <td>{(episode.trackTimeMillis / 60000).toFixed(2)}</td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
);

export default EpisodesTable;
