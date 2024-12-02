import Home from "./pages/Home";
import Podcast from "./pages/Podcast";
import Episode from "./pages/Episode";

const routesConfig = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/podcast/:podcastId",
    element: Podcast,
  },
  {
    path: "/podcast/:podcastId/episode/:episodeId",
    element: Episode,
  },
];

export default routesConfig;
