import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import Frontpage from "../routes/frontpage.jsx";

// Check if the frontpage behaves correctly
describe("Frontpage", () => {
  it("shows loader when no items exist", () => {
    const items = [];
    const addItem = vi.fn();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<Outlet context={{ items, addItem }} />}>
            <Route path="/" element={<Frontpage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const loader = screen.getByRole("status", { name: /loading/i });
    expect(loader).toBeInTheDocument();
  });
  it("correctly shows the highlighted item", () => {
    const items = [
      {
        id: 1,
        title: "T-shirt",
        category: "clothes",
        price: 10,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        title: "Harddrive",
        category: "electronics",
        price: 50,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        title: "Earring",
        category: "jewelry",
        price: 199,
        image: "https://via.placeholder.com/150",
      },
    ];
    const addItem = vi.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<Outlet context={{ items, addItem }} />}>
            <Route path="/" element={<Frontpage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    const item1 = screen.queryByText("T-shirt");
    const item2 = screen.queryByText("Harddrive");
    const item3 = screen.queryByText("Earring");

    // check that at least ONE is on the screen
    expect(item1 || item2 || item3).toBeInTheDocument();
  });
});
