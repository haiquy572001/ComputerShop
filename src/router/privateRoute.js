import { Route, Navigate } from "react-router-dom";

const PrivateRouter = (props) => {
  const firstLogin = localStorage.getItem("token");
  return firstLogin ? <Route {...props} /> : <Navigate to="/" />;
};

export default PrivateRouter;
