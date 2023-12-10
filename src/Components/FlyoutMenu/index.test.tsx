import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import FlyoutMenu from "./index";

describe("Flyout Menu: ", () => {
  test("should render flyout component", () => {
    // Arrange
    render(<FlyoutMenu handleDelete={() => null} handleEdit={() => null} />);

    // Assert
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});
