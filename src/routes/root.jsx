import { useState, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";

import "../css/root.css";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";

export default function Root() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [theme, setTheme] = useState(getTheme());
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);

  const categories = useMemo(() => {
    return [...new Set(items.map(item => item.category))];
  }, [items]);

  useEffect(() => {
    /* First, get the items from the API. */
    async function fetchItems() {
      try {
          const response = await fetch(
            'https://fakestoreapi.com/products/',
          );
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          const result = await response.json();
          return result;
        } catch (error) {
          console.error(error.message);
      }
    }
    fetchItems().then((fetchedItems) => {
      if (fetchedItems) {
        setItems(fetchedItems);
      }
    });
  }, []);

  function addItem(itemId) {
    setCart((prev) => [...prev, itemId]);
  }

  function getTheme() {
    const theme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    applyTheme(theme);
    return theme;
  }

  function applyTheme(newTheme) {
    document.documentElement.className = newTheme;
  }

  function handleSetTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    applyTheme(newTheme);
  }

  function toggleSideBar() {
    setSideBarOpen((prev) => !prev);
  }

  return (
    <div className="rootDiv">
      <NavBar toggleSideBar={toggleSideBar} counter={cart.length} />
      <SideBar
        isOpen={sideBarOpen}
        theme={theme}
        handleSetTheme={handleSetTheme}
        categories={categories}
      />
      <div className="pageContent">
        <Outlet context={{items, addItem}} />
      </div>
    </div>
  );
}
