import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Root from "../routes/root.jsx";
import Shop from "../routes/shop.jsx";
import Cart from "../routes/cart.jsx";

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

// Shopcard is used in the shop routes
describe("Shopcard", () => {
  it("Shopcard works, cart counter updates when added", async () => {
    const user = userEvent.setup();
    // Render Root so we have access to functions that increase the counters
    render(
      <MemoryRouter initialEntries={["/shop/"]}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="shop/" element={<Shop />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    // Wait for fetch effect to complete
    const addToCartButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });

    // Get input and buttons and counter
    const input = screen.getByRole("spinbutton");
    const addButton = screen.getByLabelText(/add/i);
    const subButton = screen.getByLabelText(/subtract/i);
    const counter = screen.getByTestId("cart-counter");

    // Check initial values
    expect(input.value).toBe("1");
    expect(counter.textContent).toBe("0");

    // Increase
    await user.click(addButton);
    expect(input.value).toBe("2");

    // Decrease
    await user.click(subButton);
    expect(input.value).toBe("1");

    // Add to cart
    await user.click(addToCartButton);

    // Check counter again
    expect(counter.textContent).toBe("1");
  });
});

// Cartcard is used in the shopping cart
describe("Cartcard", () => {
  it("Cartcard works, cart counter updates when removed", async () => {
    const user = userEvent.setup();
    // Render Root so we have access to functions that increase the counters
    render(
      <MemoryRouter initialEntries={["/shop/"]}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="shop/" element={<Shop />} />
            <Route path="cart/" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    // Wait for fetch effect to complete
    const addToCartButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });
    // Get input and buttons and counter
    const shopAddButton = screen.getByLabelText(/add/i);
    const counter = screen.getByTestId("cart-counter");

    // Increase
    await user.click(shopAddButton);
    // Add to cart
    await user.click(addToCartButton);

    // Navigate to cart
    await user.click(counter);

    // Check to see if cart item exists
    const cartItem = await screen.findByText(/Test Item/i);
    expect(cartItem).toBeInTheDocument();

    // Add elements for continued testing
    const RemoveFromCartButton = await screen.findByRole("button", {
      name: /remove/i,
    });
    const input = screen.getByRole("spinbutton");
    const addButton = screen.getByLabelText(/add/i);
    const subButton = screen.getByLabelText(/subtract/i);

    // Initial value from being put in the cart
    expect(input.value).toBe("2");

    // Increase
    await user.click(addButton);
    expect(input.value).toBe("3");

    // Decrease
    await user.click(subButton);
    expect(input.value).toBe("2");

    // Decreasing to 0 should remove item from cart temporarily
    await user.click(subButton);
    await user.click(subButton);
    expect(input.value).toBe("0");
    expect(counter.textContent).toBe("0");

    // Adding the item should return it to the cart
    await user.click(addButton);
    expect(input.value).toBe("1");
    expect(counter.textContent).toBe("1");

    // Removing it with the button should remove it from the cart and the page
    await user.click(RemoveFromCartButton);
    expect(counter.textContent).toBe("0");
    const emptyCart = screen.getByText(/items in your cart/i);
    expect(emptyCart).toBeInTheDocument();
  });
});
