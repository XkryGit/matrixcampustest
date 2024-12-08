import React from "react";
import { renderHook, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import useLoading from "../useLoading";

const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

describe("useLoading", () => {
  test("initially sets loading to false", () => {
    const { result } = renderHook(() => useLoading(), { wrapper });

    expect(result.current.loading).toBe(false);
  });

  test("sets loading to true when handleLoading is called", () => {
    const { result } = renderHook(() => useLoading(), { wrapper });

    act(() => {
      result.current.handleLoading();
    });

    expect(result.current.loading).toBe(true);
  });

  test("sets loading to true when location changes", () => {
    const { result, rerender } = renderHook(() => useLoading(), { wrapper });

    act(() => {
      result.current.handleLoading();
    });

    expect(result.current.loading).toBe(true);

    rerender();

    expect(result.current.loading).toBe(true);
  });
});
