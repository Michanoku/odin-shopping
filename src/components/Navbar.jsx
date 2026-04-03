export default function NavBar({toggleSideBar}) {

    return (
        <div className="navBar">
            <button className="sideBarToggle" type="button" onClick={() => toggleSideBar()}>SIDEBAR</button>
        </div>
    )
}