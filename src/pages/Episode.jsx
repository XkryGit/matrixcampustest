import React from "react";
import { useParams } from "react-router-dom";
import usePodcastData from "../hooks/usePodcastData";
import EpisodeContent from "../components/EpisodeContent";
import SideBar from "../components/SideBar";

const Episode = ({ podcasts }) => {
  const { podcastId, episodeId } = useParams();
  const { podcast, episode, audioUrl } = usePodcastData(
    podcastId,
    episodeId,
    podcasts
  );
  return (
    <>
      {podcast && episode && (
        <div className="container-page">
          <SideBar podcast={podcast} podcastId={podcastId} />
          <EpisodeContent episode={episode} audioUrl={audioUrl} />
        </div>
      )}
    </>
  );
};

export default Episode;
