import { Menu, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Search from './Search.jsx';
import '../css/NavBar.css';

export default function NavBar({toggleSideBar}) {

    return (
        <div className="navBar">
            <button className="sideBarToggle svgButton" type="button" onClick={() => toggleSideBar()}><Menu size={32} /></button>
            <h1 className="navTitle">Michanoku Shopping</h1>
            <Search />
            <Link className="cartLink svgButton" to="cart/">
                <ShoppingCart size={32} />
                <span className="itemCounter"></span>
            </Link>
        </div>
    )
}