import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Podcast from "../Podcast";
import usePodcastData from "../../hooks/usePodcastData";
import mockPodcasts from "./mockpodcast";

// Mock the usePodcastData hook
jest.mock("../../hooks/usePodcastData");

describe("Podcast", () => {
  test("renders Podcast component with podcast data", () => {
    usePodcastData.mockReturnValue({
      podcast: mockPodcasts[0],
      episodes: mockPodcasts[0].episodes,
    });

    render(
      <MemoryRouter initialEntries={["/podcast/1"]}>
        <Routes>
          <Route
            path="/podcast/:podcastId"
            element={<Podcast podcasts={mockPodcasts} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("The Joe Budden Podcast")).toBeInTheDocument();
    expect(screen.getByText("Episode 1")).toBeInTheDocument();
  });

  test("renders Podcast component without data", () => {
    usePodcastData.mockReturnValue({
      podcast: mockPodcasts[0],
      episodes: [],
    });

    render(
      <MemoryRouter initialEntries={["/podcast/1"]}>
        <Routes>
          <Route
            path="/podcast/:podcastId"
            element={<Podcast podcasts={mockPodcasts} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("The Joe Budden Podcast")).toBeInTheDocument();
    expect(screen.getByRole("spinner")).toBeInTheDocument();
  });

  test("does not render Podcast component when podcast data is not available", () => {
    usePodcastData.mockReturnValue({
      podcast: null,
      episodes: [],
    });

    render(
      <MemoryRouter initialEntries={["/podcast/1"]}>
        <Routes>
          <Route
            path="/podcast/:podcastId"
            element={<Podcast podcasts={mockPodcasts} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.queryByText("The Joe Budden Podcast")
    ).not.toBeInTheDocument();
  });
});
