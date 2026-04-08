import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Root from "../routes/root.jsx";
import Frontpage from "../routes/frontpage.jsx";

// Mock the fetch globally
vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            title: "Test Item",
            price: 5,
            image: "https://via.placeholder.com/150",
            category: "test",
          },
        ]),
    }),
  ),
);

// Fr
describe("NavBar", () => {
  it("Toggle Button does not appear on desktop and sidebar is open", () => {
    // Set window size to desktop size
    window.innerWidth = 1200;
    window.dispatchEvent(new Event("resize"));
    // Render Root with Frontpage
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/" element={<Frontpage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    // toggle button should not be visible
    const toggleButton = screen.queryByRole("button", {
      name: /toggle sidebar/i,
    });
    expect(toggleButton).not.toBeInTheDocument();

    // sidebar should be visible
    const sidebar = screen.queryByRole("navigation", {
      name: /main navigation/i,
    });
    expect(sidebar).toHaveAttribute("aria-hidden", "false");
  });

  it("Toggle button and sidebar appearance is correct, toggling works", async () => {
    // Set window size to mobile size
    window.innerWidth = 800;
    window.dispatchEvent(new Event("resize"));

    // Get the user
    const user = userEvent.setup();

    // Render Root with Frontpage
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/" element={<Frontpage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    // toggle button should be visible
    const toggleButton = screen.queryByRole("button", {
      name: /toggle sidebar/i,
    });
    expect(toggleButton).toHaveAttribute("aria-hidden", "false");

    // sidebar should not be visible
    const hiddenSidebar = screen.queryByRole("navigation", {
      name: /main navigation/i,
    });
    expect(hiddenSidebar).not.toBeInTheDocument();

    // User clicks toggle button
    await user.click(toggleButton);

    // Sidebar should have appeared
    const visibleSidebar = screen.queryByRole("navigation", {
      name: /main navigation/i,
    });
    expect(visibleSidebar).toHaveAttribute("aria-hidden", "false");
  });
});
