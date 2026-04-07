import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Root from "../routes/root.jsx";
import Shop from "../routes/shop.jsx";

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
            image: "image.png",
            category: "test",
          },
        ]),
    }),
  ),
);

test("ShopCard works in the full app, cart counter updates", async () => {
const user = userEvent.setup();
  // Render Root with a MemoryRouter
  render(
    <MemoryRouter initialEntries={["/shop"]}>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="shop" element={<Shop />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  // Wait for fetch effect to complete
  const addToCartButton = await screen.findByRole("button", {
    name: /add to cart/i,
  });
  // Amount input and buttons
  const input = screen.getByRole("spinbutton"); // type="number"
  const addButton = screen.getByLabelText(/add/i);
  const subButton = screen.getByLabelText(/subtract/i);

  // Check initial value
  expect(input.value).toBe("1");

  // Increase
  await user.click(addButton);
  expect(input.value).toBe("2");

  // Decrease
  await user.click(subButton);
  expect(input.value).toBe("1");

  // Add to cart
  await user.click(addToCartButton);

  // Check NavBar counter
  const counter = screen.getByTestId("cart-counter");
  expect(counter.textContent).toBe("1");
});
