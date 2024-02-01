import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import PrivateRoute from "./guard/PrivetRouters";
import Home from "./home/Home";

const Views = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path='/home' element={<Home />} />
      </Route>
      <Route path='*' element={<Login />} />
    </Routes>
  );
};

export default Views;
