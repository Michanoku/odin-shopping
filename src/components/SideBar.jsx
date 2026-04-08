import { NavLink } from "react-router-dom";
import { Sun, Moon, House, Store } from "lucide-react";
import "../css/SideBar.css";

// The sidebar that can be hidden or shown on mobile, always visible on desktop
export default function SideBar({
  isDesktop,
  isOpen,
  theme,
  handleSetTheme,
  categories,
}) {
  // Show the correct icon based on the current theme
  const Icon = theme === "dark" ? Moon : Sun;
  const isVisible = isDesktop || isOpen;

  // Categories are stored in lower case in the api, so uppercase the first character
  function getCategory(category) {
    return String(category).charAt(0).toUpperCase() + String(category).slice(1);
  }

  return (
    <nav
      className={`sideBar ${isVisible ? "open" : ""}`}
      aria-hidden={!isVisible}
      data-visible={isVisible}
      aria-label="Main navigation"
    >
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
    </nav>
  );
}
