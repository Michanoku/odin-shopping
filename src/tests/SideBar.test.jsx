import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SideBar from "../components/SideBar.jsx";

describe("SideBar", () => {
  const categories = ["clothes", "electronics", "jewelry"];

  it("renders category links correctly", () => {
    render(
      <MemoryRouter>
        <SideBar
          isOpen={true}
          theme="light"
          handleSetTheme={vi.fn()}
          categories={categories}
        />
      </MemoryRouter>
    );

    // Check that Home and Shop links exist
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();

    // Check that all category links exist and are properly capitalized
    categories.forEach((category) => {
      const link = screen.getByText(category.charAt(0).toUpperCase() + category.slice(1));
      expect(link).toBeInTheDocument();
    });
  });

  it("calls handleSetTheme when theme button is clicked", async () => {
    const user = userEvent.setup();
    const handleSetTheme = vi.fn();

    render(
      <MemoryRouter>
        <SideBar
          isOpen={true}
          theme="light"
          handleSetTheme={handleSetTheme}
          categories={categories}
        />
      </MemoryRouter>
    );

    const themeButton = screen.getByRole("button");
    await user.click(themeButton);

    expect(handleSetTheme).toHaveBeenCalledTimes(1);
  });
});