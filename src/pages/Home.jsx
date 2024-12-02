import React from "react";
import usePodcastFilter from "../hooks/usePodcastFilter";
import PodcastFilter from "../components/PodcastFilter";
import PodcastList from "../components/PodcastList";

const Home = ({ podcasts }) => {
  const { inputFilter, setInputFilter, podcastFiltered } =
    usePodcastFilter(podcasts);

  return (
    <div>
      <PodcastFilter
        inputFilter={inputFilter}
        setInputFilter={setInputFilter}
        count={podcasts ? podcastFiltered.length : 0}
      />

      {podcasts ? (
        <PodcastList podcasts={podcastFiltered} />
      ) : (
        <div className="loading-spinner-big"></div>
      )}
    </div>
  );
};

export default Home;
