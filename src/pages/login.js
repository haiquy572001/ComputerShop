import React, { useState, useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/store";
import { useMutation } from "react-query";
import { AuthService } from "../services/auth.service";
import { actionTypes } from "../context/reducers";
import { toast } from "react-toastify";

const Login = () => {
  const initialState = { username: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { username, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const [{ auth }, dispatch] = useMyContext();
  const navigate = useNavigate();

  const { isError, error, mutateAsync } = useMutation(
    "login",
    AuthService.login,
    {
      onSuccess: (res) => {
        dispatch({
          type: actionTypes.LOADING,
          payload: {
            loading: false,
          },
        });
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        dispatch({ type: actionTypes.SET_AUTH, payload: res.data });
        navigate("/");
      },
    }
  );

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.LOADING,
      payload: {
        loading: true,
      },
    });
    try {
      await mutateAsync(userData);
    } catch (error) {
      dispatch({
        type: actionTypes.LOADING,
        payload: {
          loading: false,
        },
      });
      toast.error(error.response.data.detail || "");
    }
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <div className="auth_page__title">Login</div>

        <div className="form-group">
          <label className="auth_page__email" htmlFor="exampleInputUsername1">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername1"
            name="username"
            onChange={handleChangeInput}
            value={username}
          />
        </div>

        <div className="form-group">
          <label
            className="auth_page__password"
            htmlFor="exampleInputPassword1"
          >
            Password
          </label>

          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <p className="my-2">
          <Link to="/register" style={{ color: "#00693B" }}>
            Forgot Password?
          </Link>
        </p>

        <button
          type="submit"
          className="btn auth_button w-100"
          disabled={username && password ? false : true}
        >
          Login
        </button>

        <p className="my-2 text-center mt-4">
          You don't have an account?{" "}
          <Link to="/register" style={{ color: "#00693B" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
