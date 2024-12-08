import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SideBar from "../SideBar";
import useLoading from "../../hooks/useLoading";

jest.mock("../../hooks/useLoading");

const mockPodcast = {
  "im:image": [
    { label: "image1.jpg" },
    { label: "image2.jpg" },
    { label: "image3.jpg" },
  ],
  "im:name": { label: "Podcast Name" },
  artistName: "Artist Name",
  summary: { label: "This is a podcast description." },
};

describe("SideBar", () => {
  test("renders SideBar component when on episode page", () => {
    useLoading.mockReturnValue({
      handleLoading: jest.fn(),
    });

    render(
      <BrowserRouter>
        <SideBar podcast={mockPodcast} podcastId="123" />
      </BrowserRouter>
    );

    expect(screen.getByAltText("Podcast Name")).toBeInTheDocument();
    expect(screen.getByText("Podcast Name")).toBeInTheDocument();
    expect(screen.getByText("by Artist Name")).toBeInTheDocument();
    expect(
      screen.getByText("This is a podcast description.")
    ).toBeInTheDocument();
  });
});
