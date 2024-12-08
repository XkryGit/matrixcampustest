import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PodcastFilter from "../PodcastFilter";

describe("PodcastFilter", () => {
  test("renders PodcastFilter component", () => {
    const mockSetInputFilter = jest.fn();
    const inputFilter = "";
    const count = 10;

    render(
      <PodcastFilter
        inputFilter={inputFilter}
        setInputFilter={mockSetInputFilter}
        count={count}
      />
    );

    expect(screen.getByText(count)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Filter podcast...")
    ).toBeInTheDocument();
  });

  test("calls setInputFilter on input change", () => {
    const mockSetInputFilter = jest.fn();
    const inputFilter = "";
    const count = 10;

    render(
      <PodcastFilter
        inputFilter={inputFilter}
        setInputFilter={mockSetInputFilter}
        count={count}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Filter podcast..."), {
      target: { value: "test" },
    });

    expect(mockSetInputFilter).toHaveBeenCalledWith("test");
  });
});
