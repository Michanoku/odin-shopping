import { Menu, ShoppingCart } from 'lucide-react';
import Search from './Search.jsx';
import '../css/NavBar.css';

export default function NavBar({toggleSideBar}) {

    return (
        <div className="navBar">
            <button className="sideBarToggle svgButton" type="button" onClick={() => toggleSideBar()}><Menu size={32} /></button>
            <h1 className="navTitle">Michanoku Shopping</h1>
            <Search />
            <button className="cartButton svgButton" type="button"><ShoppingCart size={32} /></button>
        </div>
    )
}