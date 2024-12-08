import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";
import usePodcastFilter from "../../hooks/usePodcastFilter";
import mockPodcasts from "./mockpodcast";

// Mock the usePodcastFilter hook
jest.mock("../../hooks/usePodcastFilter");

describe("Home", () => {
  test("renders loading spinner when podcasts are not provided", () => {
    usePodcastFilter.mockReturnValue({
      inputFilter: "",
      setInputFilter: jest.fn(),
      podcastFiltered: null,
    });

    render(<Home podcasts={undefined} />);

    expect(screen.getByRole("spinner")).toBeInTheDocument();
  });

  test("renders PodcastFilter and PodcastList when podcasts are provided", () => {
    usePodcastFilter.mockReturnValue({
      inputFilter: "",
      setInputFilter: jest.fn(),
      podcastFiltered: mockPodcasts,
    });

    render(
      <BrowserRouter>
        <Home podcasts={mockPodcasts} />
      </BrowserRouter>
    );

    expect(
      screen.getByPlaceholderText("Filter podcast...")
    ).toBeInTheDocument();
    expect(screen.getByText("The Joe Budden Podcast")).toBeInTheDocument();
    expect(
      screen.getByText("Author: The Joe Budden Network")
    ).toBeInTheDocument();
  });
});
