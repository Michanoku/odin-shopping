import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
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

// Test if the card behaves correctly
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

    // Set items that should be in the card and not in the cart
    const inCart = ["Jeans", "Earring"];
    const notInCart = ["T-shirt", "Harddrive", "Laptop", "Necklace"];

    // Check that items are in the cart correctly
    inCart.forEach((item) => {
      const itemElement = screen.queryByText(item);
      expect(itemElement).toBeInTheDocument();
    });
    // Check that items are not in the cart correctly
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

    // Set the items in the cart
    const inCart = [
      { name: "Jeans", amount: "1" },
      { name: "Earring", amount: "3" },
    ];

    // Check that each item has the correct amount in the cart
    inCart.forEach((item) => {
      const titleElement = screen.queryByText(item.name);
      const parent = titleElement.closest(".itemCard");
      const input = parent.querySelector("input");
      expect(input.value).toBe(item.amount);
    });
  });
});
