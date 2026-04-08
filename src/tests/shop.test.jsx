import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import Shop from "../routes/shop.jsx";

const items = [
  // clothes
  {
    id: 1,
    title: "T-shirt",
    category: "clothes",
    price: 10,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Jeans",
    category: "clothes",
    price: 40,
    image: "https://via.placeholder.com/150",
  },

  // electronics
  {
    id: 3,
    title: "Harddrive",
    category: "electronics",
    price: 50,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Laptop",
    category: "electronics",
    price: 999,
    image: "https://via.placeholder.com/150",
  },

  // jewelry
  {
    id: 5,
    title: "Earring",
    category: "jewelry",
    price: 199,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    title: "Necklace",
    category: "jewelry",
    price: 299,
    image: "https://via.placeholder.com/150",
  },
];
const addItem = vi.fn();

describe("Shop", () => {
  it("shows all items in regular shop route", () => {
    render(
      <MemoryRouter initialEntries={["/shop/"]}>
        <Routes>
          <Route element={<Outlet context={{ items, addItem }} />}>
            <Route path="/shop/:category?" element={<Shop />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const itemList = [
      "T-shirt",
      "Jeans",
      "Harddrive",
      "Laptop",
      "Earring",
      "Necklace",
    ];

    itemList.forEach((item) => {
      const itemElement = screen.queryByText(item);
      expect(itemElement).toBeInTheDocument();
    });
  });
  it("shows the correct category items on the page", () => {
    render(
      <MemoryRouter initialEntries={["/shop/electronics/"]}>
        <Routes>
          <Route element={<Outlet context={{ items, addItem }} />}>
            <Route path="/shop/:category?" element={<Shop />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const electronics = ["Harddrive", "Laptop"];
    const others = ["T-shirt", "Jeans", "Earring", "Necklace"];

    electronics.forEach((item) => {
      const itemElement = screen.queryByText(item);
      expect(itemElement).toBeInTheDocument();
    });
    others.forEach((item) => {
      const itemElement = screen.queryByText(item);
      expect(itemElement).not.toBeInTheDocument();
    });
  });
  it("shows correct search result on shop page", () => {
    render(
      <MemoryRouter initialEntries={["/shop/?q=ri"]}>
        <Routes>
          <Route element={<Outlet context={{ items, addItem }} />}>
            <Route path="/shop/:category?" element={<Shop />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const correctItems = ["Harddrive", "Earring"];
    const incorrectItems = ["T-shirt", "Jeans", "Laptop", "Necklace"];

    correctItems.forEach((item) => {
      const itemElement = screen.queryByText(item);
      expect(itemElement).toBeInTheDocument();
    });
    incorrectItems.forEach((item) => {
      const itemElement = screen.queryByText(item);
      expect(itemElement).not.toBeInTheDocument();
    });
  });
});
