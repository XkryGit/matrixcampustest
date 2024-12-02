import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import TopBar from "./components/TopBar";
import AppRoutes from "./AppRoutes";
import usePodcasts from "./hooks/usePodcasts";

function App() {
  const podcasts = usePodcasts();

  return (
    <Router>
      <TopBar />
      <div>
        <AppRoutes podcasts={podcasts} />
      </div>
    </Router>
  );
}

export default App;
