import { useState, useMemo } from "react";

const usePodcastFilter = (podcasts) => {
  const [inputFilter, setInputFilter] = useState("");

  const podcastFiltered = useMemo(() => {
    return podcasts
      ? podcasts.filter((podcast) =>
          podcast.title.label.toLowerCase().includes(inputFilter.toLowerCase())
        )
      : [];
  }, [podcasts, inputFilter]);

  return { inputFilter, setInputFilter, podcastFiltered };
};

export default usePodcastFilter;
