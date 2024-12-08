import React from "react";
import { render, screen } from "@testing-library/react";
import AudioPlayer from "../AudioPlayer";

// Mock data
const mockAudioUrl = "http://example.com/audio.mp3";

describe("AudioPlayer", () => {
  test("renders AudioPlayer component with audio source", () => {
    render(<AudioPlayer audioUrl={mockAudioUrl} />);

    const audioElement = screen.getByRole("audio");
    expect(audioElement).toBeInTheDocument();

    expect(audioElement).toHaveAttribute("src", mockAudioUrl);
    expect(audioElement).toHaveAttribute("type", "audio/mpeg");
  });
});
