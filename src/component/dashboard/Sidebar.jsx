import {Nav, Image} from "react-bootstrap"
import { NavLink } from "react-router-dom"

const Sidebar = () =>{
    return(
            <Nav className="navbar-vertical navbar">
                <div className="nav-scroller">
                {/* Brand logo  */}
                <NavLink className="navbar-brand text-center" to="/dashboard">
                    <Image className="logo-brand" src="../../../public/images/logo.png" alt="diskominfo sumut" style={{ width: "80%" }}  />
                </NavLink>

                {/* Navbar nav  */}
                <ul className="navbar-nav flex-column" id="sideNavbar">
                    <li className="nav-item">
                    <NavLink className={`nav-link has-arrow ${window.location.pathname === '/dashboard' ? 'active' : ''}`} to="/dashboard">
                        <i className="fa-regular nav-icon fa-house me-2 fa-fw"></i>
                        Dashboard
                    </NavLink>
                    </li>

                    <li className="nav-item">
                    <NavLink className={`nav-link has-arrow ${window.location.pathname === '/dashboard-barang' ? 'active' : ''}`} to="/dashboard-barang">
                        <i className="fa-solid fa-box-open me-2 fa-fw"></i>
                        Barang
                    </NavLink>
                    </li>

                    <li className="nav-item">
                    <NavLink className={`nav-link has-arrow ${window.location.pathname.includes('/dashboard-peminjaman')? 'active' : ''}`} to="/dashboard-peminjaman">
                        <i className="fa-solid fa-calendar-week me-2 fa-fw"></i>
                        Peminjaman
                    </NavLink>
                    </li>

                <li className="nav-item">
                    <a className={`nav-link has-arrow ${window.location.pathname.includes('/dashboard-laporan') ? '' : 'collapsed'}`} href="#!" data-bs-toggle="collapse" data-bs-target="#navLaporan" aria-expanded="false" aria-controls="navLaporan">
                        <i className="fa-solid fa-book me-2 fa-fw"></i>
                        Laporan
                    </a>

                    <div id="navLaporan" className={`collapse ${window.location.pathname.includes('/dashboard-laporan') ? 'show' : ''}`} data-bs-parent="#sideNavbar">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                        <NavLink className={`nav-link ${window.location.pathname.includes('/dashboard-laporan-barang') ? 'active' : ''}`} to="/dashboard-laporan-barang">
                            Laporan Barang
                        </NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className={`nav-link ${window.location.pathname.includes('/dashboard-laporan-peminjaman') ? 'active' : ''}`} to="/dashboard-laporan-peminjaman">
                            Laporan Peminjaman
                        </NavLink>
                        </li>
                    </ul>
                    </div>
                </li>

                    <li className="nav-item px-5">
                        <hr className=" nav-link text-white p-0" />
                    </li>

                    <li className="nav-item">
                    <NavLink className={`nav-link ${window.location.pathname.includes('/dashboard/kategori') ? 'active' : ''}`} to="/dashboard/kategori">
                        <i className="fa-regular nav-icon fa-list me-2 fa-fw"></i>
                        Kategori
                    </NavLink>
                    </li>

                    <li className="nav-item">
                    <NavLink className={`nav-link ${window.location.pathname.includes('/dashboard/User') ? 'active' : ''}`} to="/dashboard/user">
                        <i className="fa-solid fa-user me-2 fa-fw"></i>
                        User
                    </NavLink>
                    </li>
                </ul>
                </div>
            </Nav>
    )
}

export default Sidebar;