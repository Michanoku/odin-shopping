import { useState } from 'react';

import '../css/root.css';
import NavBar from '../components/NavBar.jsx';
import SideBar from '../components/SideBar.jsx';


export default function Root() {
  const [ sideBarOpen, setSideBarOpen ] = useState(false);

  function toggleSideBar() {
    setSideBarOpen(prev => !prev);
  }

  return (
    <div className="rootDiv">
        <NavBar toggleSideBar={toggleSideBar}/>
        <SideBar isOpen={sideBarOpen}/>
        <div className="pageContent"></div>
    </div>
  );
}
