import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PodcastContent from "../PodcastContent";

const mockPodcast = {
  trackCount: 10,
};

const mockEpisodes = [
  { id: 1, title: "Episode 1" },
  { id: 2, title: "Episode 2" },
];

const mockPodcastId = "123";

jest.mock("../EpisodesTable", () => {
  return jest.fn(() => <div>EpisodesTable Component</div>);
});

describe("PodcastContent", () => {
  test("renders PodcastContent component with episodes", () => {
    render(
      <PodcastContent
        podcast={mockPodcast}
        episodes={mockEpisodes}
        podcastId={mockPodcastId}
      />
    );

    expect(
      screen.getByText(`Episodes: ${mockPodcast.trackCount}`)
    ).toBeInTheDocument();

    expect(screen.getByText("EpisodesTable Component")).toBeInTheDocument();
  });

  test("renders loading spinner when there are no episodes", () => {
    render(
      <PodcastContent
        podcast={mockPodcast}
        episodes={[]}
        podcastId={mockPodcastId}
      />
    );

    expect(screen.getByRole("spinner")).toBeInTheDocument();
  });
});
