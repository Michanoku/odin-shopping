import { Sun, Moon } from 'lucide-react';
import '../css/SideBar.css';

export default function SideBar({isOpen, theme, handleSetTheme}) {
    
    const Icon = theme === "dark" ? Moon : Sun


    return (
        <div className={`sideBar ${isOpen ? "open" : ""}`}>
            <div className="links"></div>
            <button className="themeButton" onClick={() => handleSetTheme()}>
                <Icon size={32}/>
            </button>
        </div>
    )
}