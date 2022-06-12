import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// import { login } from '../redux/actions/authAction'
// import { useDispatch, useSelector } from 'react-redux'

const Register = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { username, email, password, confirmPassword } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeConfirm, setTypeConfirm] = useState(false);

  // const { auth } = useSelector(state => state)
  // const dispatch = useDispatch()
  //   const history = useHistory();

  // useEffect(() => {
  //     if(auth.token) history.push("/")
  // }, [auth.token, history])

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(login(userData))
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
              value={confirmPassword}
              name="confirmPassword"
            />

            <small onClick={() => setTypeConfirm(!typeConfirm)}>
              {typeConfirm ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="btn auth_button w-100"
          disabled={
            username && email && password && confirmPassword ? false : true
          }
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
