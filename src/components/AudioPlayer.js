import React from "react";

const AudioPlayer = ({ audioUrl }) => (
  <audio className="episode-audio" controls>
    <source src={audioUrl} type="audio/mpeg" role="audio" />
    Your browser does not support the audio element.
  </audio>
);

export default AudioPlayer;
