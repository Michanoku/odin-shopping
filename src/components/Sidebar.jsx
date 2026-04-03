import '../css/SideBar.css';

export default function SideBar({isOpen}) {
    
    return (
        <div className={`sideBar ${isOpen ? "open" : ""}`}>

        </div>
    )
}