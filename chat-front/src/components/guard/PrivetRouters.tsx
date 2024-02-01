import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

const useAuth = () => {
  const user = useContext(UserContext);
  return user && user.loggedIn;
};

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
