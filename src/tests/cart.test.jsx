import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Cart from "../routes/cart.jsx";

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
const removeItem = vi.fn();
const changeAmount = vi.fn();
const cart = [
  { id: 2, amount: 1 },
  { id: 5, amount: 3 },
];

describe("Cart", () => {
  it("shows all items in the cart", () => {
    render(
      <MemoryRouter initialEntries={["/cart/"]}>
        <Routes>
          <Route
            element={
              <Outlet context={{ items, cart, removeItem, changeAmount }} />
            }
          >
            <Route path="/cart/" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const inCart = ["Jeans", "Earring"];
    const notInCart = ["T-shirt", "Harddrive", "Laptop", "Necklace"];

    inCart.forEach((item) => {
      const itemElement = screen.queryByText(item);
      expect(itemElement).toBeInTheDocument();
    });
    notInCart.forEach((item) => {
      const itemElement = screen.queryByText(item);
      expect(itemElement).not.toBeInTheDocument();
    });
  });
  it("shows correct amounts", () => {
    render(
      <MemoryRouter initialEntries={["/cart/"]}>
        <Routes>
          <Route
            element={
              <Outlet context={{ items, cart, removeItem, changeAmount }} />
            }
          >
            <Route path="/cart/" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const inCart = [
      { name: "Jeans", amount: "1" },
      { name: "Earring", amount: "3" },
    ];

    inCart.forEach((item) => {
      const titleElement = screen.queryByText(item.name);
      const parent = titleElement.closest(".itemCard");
      const input = parent.querySelector("input");
      expect(input.value).toBe(item.amount);
    });
  });
});
