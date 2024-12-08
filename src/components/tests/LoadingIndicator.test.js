import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingIndicator from "../LoadingIndicator";

describe("LoadingIndicator", () => {
  test("renders LoadingIndicator component when loading is true", () => {
    render(<LoadingIndicator loading={true} />);

    expect(screen.getByRole("spinner")).toBeInTheDocument();
  });

  test("does not render LoadingIndicator component when loading is false", () => {
    render(<LoadingIndicator loading={false} />);

    expect(screen.queryByRole("spinner")).toBeNull();
  });
});
