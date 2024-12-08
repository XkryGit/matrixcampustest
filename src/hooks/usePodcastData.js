import { useState, useEffect } from "react";
import { openDB } from "idb";

const usePodcastData = (podcastId, episodeId, podcasts) => {
  const [podcast, setPodcast] = useState();
  const [episodes, setEpisodes] = useState([]);
  const [episode, setEpisode] = useState();
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await openDB("PodcastDB", 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains("podcasts")) {
              db.createObjectStore("podcasts", { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains("episodes")) {
              db.createObjectStore("episodes", { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains("lastFetch")) {
              db.createObjectStore("lastFetch", { keyPath: "id" });
            }
          },
        });
        return db;
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    const fetchPodcastDetails = async (db, foundPodcast) => {
      const response = await fetch(
        `https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode`
      );
      const data = await response.json();
      const podcastData = { ...foundPodcast, ...data.results[0] };
      const episodesData = data.results.slice(1);

      setPodcast(podcastData);
      setEpisodes(episodesData);

      await db.put("podcasts", { id: podcastId, ...podcastData });
      await db.put("episodes", { id: podcastId, episodes: episodesData });
      await db.put("podcasts", {
        id: `lastFetch_${podcastId}`,
        timestamp: Date.now(),
      });
    };

    const loadFromDB = async (db) => {
      let storedEpisodes;
      try {
        storedEpisodes = await db.get("episodes", podcastId);
      } catch (error) {
        return;
      }
      const storedPodcast = await db.get("podcasts", podcastId);

      const lastFetch = await db.get("podcasts", `lastFetch_${podcastId}`);

      if (storedPodcast && storedEpisodes && lastFetch) {
        const oneDay = 24 * 60 * 60 * 1000;
        const now = Date.now();

        if (now - lastFetch.timestamp < oneDay) {
          setPodcast(storedPodcast);
          setEpisodes(storedEpisodes.episodes);
          return true;
        }
      }
      return false;
    };

    const fetchData = async () => {
      const db = await initDB();
      if (!db) return;
      const foundPodcast = await podcasts.find(
        (podcast) => podcast.id.attributes["im:id"] === podcastId
      );
      setPodcast(foundPodcast);

      const loadedFromDB = await loadFromDB(db);
      if (!loadedFromDB) {
        await fetchPodcastDetails(db, foundPodcast);
      }
    };

    if (podcastId && podcasts) {
      fetchData().catch((error) => {
        if (error.name !== "DataError") {
          console.error("Error fetching data:", error);
        }
      });
    }
  }, [podcastId, podcasts]);

  useEffect(() => {
    if (episodeId && episodes.length > 0) {
      const foundEpisode = episodes.find(
        (e) => e.trackId === Number(episodeId)
      );
      setEpisode(foundEpisode);
    }
  }, [episodeId, episodes]);

  useEffect(() => {
    if (episode && episode.episodeUrl) {
      const fetchAudio = async () => {
        try {
          const proxyUrl = `https://cors-anywhere.herokuapp.com/${episode.episodeUrl}`;
          const audioResponse = await fetch(proxyUrl);
          const audioBlob = await audioResponse.blob();
          const audioObjectUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioObjectUrl);
        } catch (error) {
          console.error("Error fetching audio:", error);
        }
      };
      fetchAudio();
    }
  }, [episode]);

  return { podcast, episodes, episode, audioUrl };
};

export default usePodcastData;
