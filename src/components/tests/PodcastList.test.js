import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PodcastList from "../PodcastList";

const mockPodcasts = [
  {
    id: { attributes: { "im:id": "1" } },
    "im:image": [
      { label: "image1.jpg" },
      { label: "image2.jpg" },
      { label: "image3.jpg" },
    ],
    "im:name": { label: "Podcast 1" },
    "im:artist": { label: "Author 1" },
  },
  {
    id: { attributes: { "im:id": "2" } },
    "im:image": [
      { label: "image1.jpg" },
      { label: "image2.jpg" },
      { label: "image3.jpg" },
    ],
    "im:name": { label: "Podcast 2" },
    "im:artist": { label: "Author 2" },
  },
];

describe("PodcastList", () => {
  test("renders PodcastList", () => {
    render(
      <BrowserRouter>
        <PodcastList podcasts={mockPodcasts} handleLoading={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText("Podcast 1")).toBeInTheDocument();
    expect(screen.getByText("Podcast 2")).toBeInTheDocument();

    expect(screen.getByText("Author: Author 1")).toBeInTheDocument();
    expect(screen.getByText("Author: Author 2")).toBeInTheDocument();

    expect(screen.getAllByRole("link")).toHaveLength(2);

    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});
