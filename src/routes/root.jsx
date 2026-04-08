import { useState, useEffect, useMemo, useRef } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import "../css/root.css";


// Create a hook to check screensize and decide to hide or show the togglebutton
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 992);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
}

export default function Root() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [theme, setTheme] = useState(getTheme());
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const isDesktop = useIsDesktop();

  // Get categories so we can display links for them
  const categories = useMemo(() => {
    return [...new Set(items.map((item) => item.category))];
  }, [items]);

  // useRef so we don't query twice due to strictMode
  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function fetchItems() {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setItems(result);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchItems();
  }, []);

  // Add an item to the shopping cart
  function addItem(newItem) {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, amount: item.amount + newItem.amount }
            : item,
        );
      } else {
        return [...prev, newItem];
      }
    });
  }

  // Remove an item from the shopping cart
  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  // Change the amount of an item in the shopping cart
  function changeAmount(oldItem) {
    setCart((prev) => {
      return prev.map((item) =>
        item.id === oldItem.id ? { ...item, amount: oldItem.amount } : item,
      );
    });
  }

  // Get the correct theme for this user
  function getTheme() {
    const theme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    applyTheme(theme);
    return theme;
  }

  // Apply a theme
  function applyTheme(newTheme) {
    document.documentElement.className = newTheme;
  }

  // Handle how the theme is set
  function handleSetTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    applyTheme(newTheme);
  }

  // Toggle the side bar open or closed in mobile
  function toggleSideBar() {
    setSideBarOpen((prev) => !prev);
  }

  return (
    <div className="rootDiv">
      <NavBar
        isDesktop={isDesktop}
        isOpen={sideBarOpen}
        toggleSideBar={toggleSideBar}
        counter={cart.filter((item) => item.amount > 0).length}
      />
      <SideBar
        isDesktop={isDesktop}
        isOpen={sideBarOpen}
        theme={theme}
        handleSetTheme={handleSetTheme}
        categories={categories}
      />
      <div className="pageContent">
        <Outlet context={{ items, addItem, cart, removeItem, changeAmount }} />
      </div>
    </div>
  );
}
