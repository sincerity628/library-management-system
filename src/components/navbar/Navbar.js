import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './navbar.css';

const Navbar = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  const [activeItem, setActiveItem] = useState("getin");

  const active = (item) => {
    setActiveItem(item);
  }

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li onClick={() => active("getin")}>
            <Link
              className={activeItem === "getin" ? "active" : ""}
              to="/"
            >入库管理</Link>
          </li>
          <li onClick={() => active("borrow")}>
            <Link
              className={activeItem === "borrow" ? "active" : ""}
              to="/borrow"
            >借书管理</Link>
          </li>
          <li onClick={() => active("reserve")}>
            <Link
              className={activeItem === "reserve" ? "active" : ""}
              to="/reserve"
            >预约管理</Link>
          </li>
          <li onClick={() => active("return")}>
            <Link
              className={activeItem === "return" ? "active" : ""}
              to="/return"
            >还书管理</Link>
          </li>
          <li onClick={() => active("list")}>
            <Link
              className={activeItem === "list" ? "active" : ""}
              to="/list"
            >本馆图书目录</Link>
          </li>
          <p className="nav-text">您好！管理员 { user.name }</p>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
