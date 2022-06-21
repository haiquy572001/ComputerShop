import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { useMutation } from "react-query";
import { AuthService } from "../services/auth.service";
import { useMyContext } from "../context/store";
import { actionTypes } from "../context/reducers";

const Menu = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [{ auth }, dispatch] = useMyContext();

  const { isError, error, isLoading, mutateAsync } = useMutation(
    "login",
    AuthService.sign_out,
    {
      onSuccess: (res) => {
        dispatch({ type: actionTypes.REMOVE_AUTH });
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        navigate("/");
      },
    }
  );
  return (
    <div className="menu ml-4">
      <ul className="navbar-nav flex-row">
        <li
          className="nav-item dropdown"
          style={{
            opacity: 1,
            color: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar
              src={
                "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/273170665_1300173097136704_1553076717779068553_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RYbhnJJlErwAX_GbU5D&_nc_oc=AQmTDjdsUxKttuh3luFn3Ao4O3zqmRHZvj_l0aW7z3JwEy7AMwae0BIAkL0YaeKzLDI&_nc_ht=scontent.fdad3-4.fna&oh=00_AT_knFWOMtWQ1pa2y35ryMy3RrKlUxGJqm3Jj7xKb_goYw&oe=62AAF82D"
              }
              size="medium-avatar"
            />
          </span>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <button
              className="dropdown-item"
              style={{ outline: "none" }}
              onClick={() => {
                if (setOpen) {
                  setOpen(true);
                }
              }}
            >
              Profile
            </button>

            {/* <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() => {}}
              style={{ cursor: "pointer" }}
            >
              My Order
            </label> */}
            <button
              className="dropdown-item"
              style={{ outline: "none" }}
              onClick={() => {
                navigate("/orders");
              }}
            >
              My Order
            </button>

            <div className="dropdown-divider"></div>
            <label
              className="dropdown-item"
              onClick={async () => {
                await dispatch({ type: actionTypes.REMOVE_AUTH });
                localStorage.removeItem("token");
                localStorage.removeItem("refresh_token");
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              Log out
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
