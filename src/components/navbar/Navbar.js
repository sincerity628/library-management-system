import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { Button } from 'semantic-ui-react';
import './navbar.css';

const btnStyle = {
  background: 'transparent',
  padding: '10px 18px',
  border: '1px solid #5e5e5e',
  borderRadius: '5px',
  fontSize: '14px',
  marginLeft : '15px',
  fontWeight: 'bold',
  color: '#5e5e5e',
}

const Navbar = (props) => {
  const { user, signout } = useContext(UserContext);
  const [activeItem, setActiveItem] = useState("getin");
  const [btnLoading, setBtnLoading] = useState(false);

  const active = (item) => {
    setActiveItem(item);
  }

  const handleLogout = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      signout();
    }, 2000);
  }

  return (
    <div className="navbar">
      <nav>
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
        <p className="nav-text">
          您好！管理员 { user.name }
          <Button
            onClick={handleLogout}
            className="nav-btn"
            loading={btnLoading}
            style={btnStyle}
          >退出登陆</Button>
        </p>
      </nav>
    </div>
  );
}

export default Navbar;
