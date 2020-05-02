import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './navbar.css';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [activeItem, setActiveItem] = useState("getin");

  const active = (item) => {
    setActiveItem(item);
  }

  return (
    <div className="navbar">
      <nav>
        <p className="nav-text">您好！管理员 { user.name }</p>
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => active("getin")}
              className={activeItem === "getin" ? "active" : ""}
            >入库管理</Link>
          </li>
          <li>
            <Link
              to="/borrow"
              onClick={() => active("borrow")}
              className={activeItem === "borrow" ? "active" : ""}
            >借书管理</Link>
          </li>
          <li>
            <Link
              to="/reserve"
              onClick={() => active("reserve")}
              className={activeItem === "reserve" ? "active" : ""}
            >预约管理</Link>
          </li>
          <li>
            <Link
              to="/return"
              onClick={() => active("return")}
              className={activeItem === "return" ? "active" : ""}
            >还书管理</Link>
          </li>
          <li>
            <Link
              to="/list"
              onClick={() => active("list")}
              className={activeItem === "list" ? "active" : ""}
            >本馆图书目录</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
