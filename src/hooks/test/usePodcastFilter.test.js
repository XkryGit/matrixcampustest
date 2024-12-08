import { renderHook, act } from "@testing-library/react";
import usePodcastFilter from "../usePodcastFilter";
import { mockPodcasts } from "./mockdata";

describe("usePodcastFilter", () => {
  test("returns all podcasts when inputFilter is empty", () => {
    const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

    expect(result.current.podcastFiltered).toEqual(mockPodcasts);
  });

  test("filters podcasts based on inputFilter", () => {
    const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

    act(() => {
      result.current.setInputFilter("Podcast");
    });

    expect(result.current.podcastFiltered).toEqual([
      {
        id: "1",
        title: { label: "Podcast 1" },
        episodes: [
          {
            id: "e1",
            title: "Episode 1",
            audioUrl: "http://example.com/e1.mp3",
          },
          {
            id: "e2",
            title: "Episode 2",
            audioUrl: "http://example.com/e2.mp3",
          },
        ],
      },
      {
        id: "2",
        title: { label: "Podcast 2" },
        episodes: [
          {
            id: "e3",
            title: "Episode 3",
            audioUrl: "http://example.com/e3.mp3",
          },
          {
            id: "e4",
            title: "Episode 4",
            audioUrl: "http://example.com/e4.mp3",
          },
        ],
      },
    ]);
  });

  test("returns no podcasts if none match the inputFilter", () => {
    const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

    act(() => {
      result.current.setInputFilter("Nonexistent");
    });

    expect(result.current.podcastFiltered).toEqual([]);
  });
});
