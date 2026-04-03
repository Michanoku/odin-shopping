import '../css/root.css';
import NavBar from '../components/NavBar.jsx';
import SideBar from '../components/SideBar.jsx';


export default function Root() {
  return (
    <div className="rootDiv">
        <NavBar/>
        <SideBar/>
        <div className="pageContent"></div>
    </div>
  );
}
