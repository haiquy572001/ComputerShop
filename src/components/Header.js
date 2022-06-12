import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { useMyContext } from "../context/store";

const Header = () => {
  const [{ auth }, dispatch] = useMyContext();
  return (
    <header>
      <nav>
        <Link to="/">
          <img src={Logo} alt="Logo" className="header__logo" />
        </Link>

        <div className="header__tab">
          <Link to="/product">
            <p>Sản phẩm</p>
          </Link>
          <Link to="/cart">
            <p>Giỏ hàng</p>
          </Link>
          {!auth.token ? (
            <Link to="/login">
              <p>Đăng nhập</p>
            </Link>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default Header;
