import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
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

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Search", () => {
  it("redirects to /shop with the start of the query when used on frontpage", async () => {
    const user = userEvent.setup();
    const navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/" element={<Frontpage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    // Find the search input (role for <input type="search"> is "searchbox")
    const input = await screen.findByRole("searchbox");

    // Type a query and submit (Enter)
    await user.type(input, "test");

    // Assert navigate was called with the correct URL
    expect(navigateMock).toHaveBeenCalledWith(
      {
        pathname: "/shop/",
        search: "?q=t",
      },
      { replace: false },
    );
  });
});
