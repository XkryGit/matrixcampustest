import React from "react";
import { render, screen } from "@testing-library/react";
import EpisodeContent from "../EpisodeContent";

// Mock data
const mockEpisode = {
  trackName: "Episode 1",
  description: "<p>This is the description of Episode 1</p>",
};

const mockAudioUrl = "http://example.com/audio.mp3";

jest.mock("../AudioPlayer", () => {
  return jest.fn(() => <div>AudioPlayer Component</div>);
});

describe("EpisodeContent", () => {
  test("renders EpisodeContent component with episode data", () => {
    render(<EpisodeContent episode={mockEpisode} audioUrl={mockAudioUrl} />);

    expect(screen.getByText(mockEpisode.trackName)).toBeInTheDocument();

    expect(
      screen.getByText("This is the description of Episode 1")
    ).toBeInTheDocument();

    expect(screen.getByText("AudioPlayer Component")).toBeInTheDocument();
  });
});
