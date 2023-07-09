import {Nav, Image} from "react-bootstrap"
import { NavLink } from "react-router-dom"
import React, { useState } from 'react';

const Sidebar = () =>{
    const [isDropdownActive, setIsDropdownActive] = useState(false);
  
    const toggleDropdown = () => {
        setIsDropdownActive(prevState => !prevState);
    };
    return(
            <Nav className="navbar-vertical navbar" style={{ background: "#394867" }}>
                <div className="nav-scroller">
                {/* Brand logo  */}
                <NavLink className="navbar-brand text-center" to="/dashboard">
                    <Image className="logo-brand" src="../../../public/images/il.png" alt="" style={{ width: "80%" }}  />
                </NavLink>

                {/* Navbar nav  */}
                <ul className="navbar-nav flex-column" id="sideNavbar">
                    <li className="nav-item">
                    <NavLink className={`nav-link has-arrow ${window.location.pathname === '/dashboard' ? 'active' : ''}`} to="/dashboard">
                        <i className="fa-regular nav-icon fa-house me-2 fa-fw"></i>
                        Dashboards
                    </NavLink>
                    </li>

                    <li className="nav-item">
                    <NavLink className={`nav-link has-arrow ${window.location.pathname.includes('/dashboard-peminjaman')? 'active' : ''}`} to="/dashboard-peminjaman">
                        <i className="fa-solid fa-calendar-week me-2 fa-fw"></i>
                        Loan
                    </NavLink>
                    </li>

                    <li className="nav-item">
                    <NavLink className={`nav-link has-arrow ${window.location.pathname.includes('/dashboard-laporan-peminjaman')? 'active' : ''}`} to="/dashboard-laporan-peminjaman">
                        <i className="fa-solid fa-memo-pad me-2 fa-fw"></i>
                        Report
                    </NavLink>
                    </li>

                    <li className="nav-item px-5">
                        <hr className=" nav-link text-white p-0" />
                    </li>

                    <li className="nav-item">
                    <NavLink className={`nav-link ${window.location.pathname.includes('/dashboard-barang') ? 'active' : ''}`} to="/dashboard-barang">
                    <i className="fa-solid fa-box-open me-2 fa-fw"></i> Items 
                    </NavLink>
                    </li>
                    

                    <li className="nav-item">
                    <NavLink className={`nav-link ${window.location.pathname.includes('/dashboard-kategori') ? 'active' : ''}`} to="/dashboard-kategori">
                        <i className="fa-regular nav-icon fa-list me-2 fa-fw"></i>
                        Categories
                    </NavLink>
                    </li>

                    <li className="nav-item">
                    <NavLink className={`nav-link ${window.location.pathname.includes('/dashboard-user') ? 'active' : ''}`} to="/dashboard-user">
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