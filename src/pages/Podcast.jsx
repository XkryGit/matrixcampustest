import React from "react";
import { useParams } from "react-router-dom";
import usePodcastData from "../hooks/usePodcastData";
import PodcastContent from "../components/PodcastContent";
import SideBar from "../components/SideBar";

const Podcast = ({ podcasts }) => {
  const { podcastId } = useParams();
  const { podcast, episodes } = usePodcastData(podcastId, null, podcasts);

  return (
    <div>
      {podcast && (
        <div className="container-page">
          <SideBar podcast={podcast} podcastId={podcastId} />
          <PodcastContent
            podcast={podcast}
            episodes={episodes}
            podcastId={podcastId}
          />
        </div>
      )}
    </div>
  );
};

export default Podcast;
