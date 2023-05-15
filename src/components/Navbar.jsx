import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { NavLink, Link } from "react-router-dom";
import icon from "./images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  return (
    <div className="nav-main-container">
      <nav className="nav-container">
        <div className="menu-icon" onClick={() => setClick(!click)}>
          {click ? <FaTimes /> : <GiHamburgerMenu />}
        </div>
        <div className="nav-logo-container">
          <Link to={"/"}>
            <img className="nav-logo" src={icon} alt="logo" />
          </Link>
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li>
            <a onClick={closeMobileMenu}>
              <NavLink className="nav-list-style" to={"/"}>
                Home
              </NavLink>
            </a>
          </li>
          <li>
            <a onClick={closeMobileMenu}>
              <NavLink className="nav-list-style" to={"/cryptocurrencies"}>
                Cryptocurrencies
              </NavLink>
            </a>
          </li>
          <li>
            <a onClick={closeMobileMenu}>
              <NavLink className="nav-list-style" to={"/news"}>
                News
              </NavLink>
            </a>
          </li>
        </ul>
        <h1 className="logo">
          <Link className="logo-style" to={"/"}>
            COINDASH
          </Link>
        </h1>
      </nav>
    </div>
  );
};

export default Navbar;
