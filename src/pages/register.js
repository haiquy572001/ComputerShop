import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/store";
import { useMutation } from "react-query";
import { AuthService } from "../services/auth.service";
import { actionTypes } from "../context/reducers";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Register = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { username, email, password, password2 } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeConfirm, setTypeConfirm] = useState(false);

  const [{ auth }, dispatch] = useMyContext();
  const navigate = useNavigate();

  const { isError, error, isLoading, mutateAsync } = useMutation(
    "register",
    AuthService.register,
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
      const errPassword = error.response.data.password ?? "";
      const errUsername =
        error.response.data?.username?.length > 0
          ? error.response.data.username[0]
          : "";
      toast.error(errUsername || errPassword || error.message);
    }
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <div className="auth_page__title">Register</div>

        <div className="form-group">
          <label className="auth_page__email" htmlFor="exampleInputEmail1">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="username"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={username}
          />
        </div>

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

        <div className="form-group">
          <label
            className="auth_page__password"
            htmlFor="exampleInputPassword1"
          >
            Confirm Password
          </label>

          <div className="pass">
            <input
              type={typeConfirm ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password2}
              name="password2"
            />

            <small onClick={() => setTypeConfirm(!typeConfirm)}>
              {typeConfirm ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="btn auth_button w-100"
          disabled={username && email && password && password2 ? false : true}
        >
          Register
        </button>

        <p className="my-2 text-center mt-4">
          You already have an account?{" "}
          <Link to="/login" style={{ color: "#00693B" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
