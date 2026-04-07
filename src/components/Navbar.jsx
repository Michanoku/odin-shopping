import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import Search from "./Search.jsx";
import "../css/NavBar.css";

// The navbar that holds the toggle button for mobile, the title and the cart button and counter
export default function NavBar({ toggleSideBar, counter }) {
  return (
    <div className="navBar">
      <button
        className="sideBarToggle svgButton"
        type="button"
        onClick={() => toggleSideBar()}
      >
        <Menu size={32} />
      </button>
      <h1 className="navTitle">Michanoku Shopping</h1>
      <Search />
      <Link className="cartLink svgButton" to="cart/">
        <ShoppingCart size={32} />
        <span className={`itemCounter ${counter > 0 ? "show" : ""}`}>
          {counter}
        </span>
      </Link>
    </div>
  );
}
