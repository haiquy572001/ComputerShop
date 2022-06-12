import React, { useState, useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/store";
import { useMutation } from "react-query";
import { AuthService } from "../services/auth.service";
import { authTypes } from "../context/reducers/authReducer";
import { toast } from "react-toastify";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const [{ auth }, dispatch] = useMyContext();
  const navigate = useNavigate();

  const { isError, error, isLoading, mutateAsync } = useMutation(
    "login",
    AuthService.login,
    {
      onSuccess: (res) => {
        localStorage.setItem("token", res.data.data.access_token);
        localStorage.setItem("refresh_token", res.data.data.refresh_token);
        dispatch({ type: authTypes.SET_AUTH, payload: res.data.data });
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
    try {
      await mutateAsync(userData);
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  };

  if (isLoading) {
    return (
      <div
        className="position-fixed w-100 h-100 text-center loading"
        style={{
          background: "#0008",
          color: "white",
          top: 0,
          left: 0,
          zIndex: 50,
        }}
      >
        <svg width="205" height="250" viewBox="0 0 40 50">
          <polygon
            stroke="#fff"
            strokeWidth="1"
            fill="none"
            points="20,1 40,40 1,40"
          />
          <text fill="#fff" x="5" y="47">
            Loading
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <div className="auth_page__title">Login</div>

        <div className="form-group">
          <label className="auth_page__email" htmlFor="exampleInputEmail1">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
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
          disabled={email && password ? false : true}
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
