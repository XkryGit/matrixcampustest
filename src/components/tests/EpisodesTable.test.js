import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EpisodesTable from "../EpisodesTable";

const mockEpisodes = [
  {
    trackId: 1,
    trackName: "Episode 1",
    releaseDate: "2021-01-01T00:00:00Z",
    trackTimeMillis: 3000000,
  },
  {
    trackId: 2,
    trackName: "Episode 2",
    releaseDate: "2021-02-01T00:00:00Z",
    trackTimeMillis: 3600000,
  },
];

const mockPodcastId = "123";

describe("EpisodeTable", () => {
  test("renders EpisodesTable component with episodes", () => {
    render(
      <BrowserRouter>
        <EpisodesTable episodes={mockEpisodes} podcastId={mockPodcastId} />
      </BrowserRouter>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Duration")).toBeInTheDocument();

    expect(screen.getByText("Episode 1")).toBeInTheDocument();
    expect(screen.getByText("Episode 2")).toBeInTheDocument();

    expect(screen.getByText("1/1/2021")).toBeInTheDocument();
    expect(screen.getByText("1/2/2021")).toBeInTheDocument();

    expect(screen.getByText("50.00")).toBeInTheDocument();
    expect(screen.getByText("60.00")).toBeInTheDocument();
  });
});
