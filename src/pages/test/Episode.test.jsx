import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Episode from "../Episode";
import usePodcastData from "../../hooks/usePodcastData";
import mockPodcasts from "./mockpodcast";

// Mock the usePodcastData hook
jest.mock("../../hooks/usePodcastData");

describe("Episode", () => {
  test("renders Episode component with episode data", () => {
    usePodcastData.mockReturnValue({
      podcast: mockPodcasts[0],
      episode: mockPodcasts[0].episodes[0],
      audioUrl: "http://example.com/e1.mp3",
    });

    render(
      <MemoryRouter initialEntries={["/podcast/1/episode/e1"]}>
        <Routes>
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<Episode podcasts={mockPodcasts} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("The Joe Budden Podcast")).toBeInTheDocument();
    expect(screen.getByText("Episode 1")).toBeInTheDocument();
  });

  test("does not render Episode component when episode data is not available", () => {
    usePodcastData.mockReturnValue({
      podcast: null,
      episode: null,
      audioUrl: "",
    });

    render(
      <MemoryRouter initialEntries={["/podcast/1/episode/e1"]}>
        <Routes>
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<Episode podcasts={mockPodcasts} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText("Podcast 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Episode 1")).not.toBeInTheDocument();
  });
});
