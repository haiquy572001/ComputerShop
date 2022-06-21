import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Cart } from "../assets/icons/cart.svg";
import Logo from "../assets/images/logo.png";
import { useMyContext } from "../context/store";
import Menu from "../components/Menu";

const Header = ({ open, setOpen }) => {
  const [{ auth, cart }, dispatch] = useMyContext();
  return (
    <header>
      <nav>
        <Link to="/">
          <img src={Logo} alt="Logo" className="header__logo" />
        </Link>

        <div className="header__tab">
          <Link to="/">
            <p>Sản phẩm</p>
          </Link>
          <Link to="/carts">
            <div className="position-relative">
              {cart.count > 0 && <div className="count_cart">{cart.count}</div>}
              <Cart />
            </div>
          </Link>
          {!auth.token ? (
            <Link to="/login">
              <p>Đăng nhập</p>
            </Link>
          ) : null}
          {auth.token ? <Menu open={open} setOpen={setOpen} /> : null}
        </div>
      </nav>
    </header>
  );
};

export default Header;
