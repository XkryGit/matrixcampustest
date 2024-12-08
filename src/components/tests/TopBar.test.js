import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TopBar from "../TopBar";

const mockHandleLoading = jest.fn();

jest.mock("../../hooks/useLoading", () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    handleLoading: mockHandleLoading,
  }),
}));

describe("TopBar", () => {
  test("renders TopBar component", () => {
    render(
      <BrowserRouter>
        <TopBar />
      </BrowserRouter>
    );

    expect(screen.getByText("Podcaster")).toBeInTheDocument();
  });

  test("calls handleLoading when clicking the link", () => {
    render(
      <BrowserRouter>
        <TopBar />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Podcaster"));

    expect(mockHandleLoading).toHaveBeenCalled();
  });

  test("not render LoadingIndicator when loading is false", () => {
    render(
      <BrowserRouter>
        <TopBar />
      </BrowserRouter>
    );

    expect(screen.queryByRole("spinner")).not.toBeInTheDocument();
  });
});
