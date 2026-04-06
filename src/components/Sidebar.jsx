import { Sun, Moon, House, Store } from "lucide-react";
import { NavLink } from "react-router-dom";
import "../css/SideBar.css";

export default function SideBar({ isOpen, theme, handleSetTheme, categories }) {
  const Icon = theme === "dark" ? Moon : Sun;

  // Categories are stored in lower case in the api, so uppercase the first character
  function getCategory(category) {
    return String(category).charAt(0).toUpperCase() + String(category).slice(1);
  }

  return (
    <div className={`sideBar ${isOpen ? "open" : ""}`}>
      <div className="links">
        <NavLink
          to="/"
          className={`siteLink ${({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""}`}
          >
          <House size={32} />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="shop/"
          className={`siteLink ${({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""}`}
          >
          <Store size={32} />
          <span>Shop</span>
        </NavLink>
        {categories.map((category) => (
          <NavLink
            key={category}
            to={`shop/${category}`}
            className={`categoryLink ${({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""}`}
          >
            <span>{getCategory(category)}</span>
          </NavLink>
        ))}
      </div>
      <button className="themeButton" onClick={() => handleSetTheme()}>
        <Icon size={32} />
      </button>
    </div>
  );
}
