import { renderHook, act } from "@testing-library/react";
import usePodcasts from "../usePodcasts";
import { openDB } from "idb";
import { mockPodcast } from "./mockdata";

jest.mock("idb");

const mockFetchResponse = {
  feed: {
    entry: mockPodcast.map((podcast) => ({
      id: { attributes: { "im:id": podcast.id } },
      "im:name": { label: podcast.title },
      "im:artist": { label: podcast.artist },
    })),
  },
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockFetchResponse),
  })
);

describe("usePodcasts", () => {
  let db;

  beforeEach(async () => {
    db = {
      get: jest.fn(),
      put: jest.fn(),
      createObjectStore: jest.fn(),
      objectStoreNames: {
        contains: jest.fn().mockReturnValue(false),
      },
    };

    openDB.mockResolvedValue(db);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches and sets podcasts from API when not in DB", async () => {
    db.get.mockResolvedValueOnce(null);
    db.get.mockResolvedValueOnce(null);

    const { result } = renderHook(() => usePodcasts());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current).toEqual(
      mockPodcast.map((podcast) => ({
        id: { attributes: { "im:id": podcast.id } },
        "im:name": { label: podcast.title },
        "im:artist": { label: podcast.artist },
      }))
    );

    expect(db.put).toHaveBeenCalledWith("podcasts", {
      id: "podcasts",
      podcasts: expect.any(Array),
    });

    expect(db.put).toHaveBeenCalledWith("lastFetch", {
      id: "podcasts",
      timestamp: expect.any(Number),
    });
  });

  test("loads podcasts from DB if recent", async () => {
    const oneDay = 24 * 60 * 60 * 1000;
    const now = Date.now();

    db.get.mockResolvedValueOnce({
      podcasts: mockPodcast.map((podcast) => ({
        id: podcast.id["attributes"]["im:id"],
        "im:name": { label: podcast.title },
        "im:artist": { label: podcast.artist },
      })),
    });

    db.get.mockResolvedValueOnce({
      id: "podcasts",
      timestamp: now - oneDay / 2,
    });

    const { result } = renderHook(() => usePodcasts());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current).toEqual(
      mockPodcast.map((podcast) => ({
        id: podcast.id["attributes"]["im:id"],
        "im:name": { label: podcast.title },
        "im:artist": { label: podcast.artist },
      }))
    );

    expect(fetch).not.toHaveBeenCalled();
  });
});
