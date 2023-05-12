import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { NavLink, Link } from "react-router-dom";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "./images/logo.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize && screenSize < 801) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-main-container">
      <nav className="nav-container">
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu((prevState) => !prevState)}
        >
          <MenuOutlined />
        </Button>
        <div className="nav-logo-container">
          <img className="nav-logo" src={icon} />
        </div>
        {activeMenu && (
          <ul>
            <li icon={<HomeOutlined />}>
              <a>
                <NavLink className="nav-list-style" to={"/"}>
                  Home
                </NavLink>
              </a>
            </li>
            <li icon={<FundOutlined />}>
              <a>
                <NavLink className="nav-list-style" to={"/cryptocurrencies"}>
                  Cryptocurrencies
                </NavLink>
              </a>
            </li>
            <li icon={<BulbOutlined />}>
              <a>
                <NavLink className="nav-list-style" to={"/news"}>
                  News
                </NavLink>
              </a>
            </li>
          </ul>
        )}
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
