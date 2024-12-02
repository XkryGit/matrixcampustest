import { useState, useEffect } from "react";
import { openDB } from "idb";

const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await openDB("PodcastDB", 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains("podcasts")) {
              db.createObjectStore("podcasts", { keyPath: "id" });
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

    const fetchPodcasts = async (db) => {
      const response = await fetch(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      const data = await response.json();
      const podcastsData = data.feed.entry.map((podcast) => ({
        id: podcast.id.attributes["im:id"],
        ...podcast,
      }));

      setPodcasts(podcastsData);

      await db.put("podcasts", { id: "podcasts", podcasts: podcastsData });
      await db.put("lastFetch", { id: "podcasts", timestamp: Date.now() });
    };

    const loadFromDB = async (db) => {
      try {
        const storedPodcasts = await db.get("podcasts", "podcasts");
        const lastFetch = await db.get("lastFetch", "podcasts");

        if (storedPodcasts && lastFetch) {
          const oneDay = 24 * 60 * 60 * 1000;
          const now = Date.now();

          if (now - lastFetch.timestamp < oneDay) {
            setPodcasts(storedPodcasts.podcasts);
            return true;
          }
        }
        return false;
      } catch (error) {
        if (error.name !== "NotFoundError") {
          console.error("Error loading from database:", error);
        }
        return false;
      }
    };

    const fetchData = async () => {
      const db = await initDB();
      if (!db) return;

      const loadedFromDB = await loadFromDB(db);
      if (!loadedFromDB) {
        await fetchPodcasts(db);
      }
    };

    fetchData().catch((error) => {
      if (error.name !== "NotFoundError") {
        console.error("Error fetching data:", error);
      }
    });
  }, []);

  return podcasts;
};

export default usePodcasts;
