import { Sun, Moon, House, Store } from 'lucide-react';
import {
  NavLink,
} from "react-router-dom";
import '../css/SideBar.css';

export default function SideBar({isOpen, theme, handleSetTheme}) {
    
    const Icon = theme === "dark" ? Moon : Sun


    return (
        <div className={`sideBar ${isOpen ? "open" : ""}`}>
            <div className="links">
                <NavLink 
                    to="/"
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                >
                    <House size={32} />
                    <span>Home</span>
                </NavLink>
                <NavLink 
                    to="shop/"
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                >
                    <Store size={32} />
                    <span>Shop</span>
                </NavLink>
            </div>
            <button className="themeButton" onClick={() => handleSetTheme()}>
                <Icon size={32}/>
            </button>
        </div>
    )
}