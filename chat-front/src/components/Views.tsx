import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import { Text } from "@chakra-ui/react";
import PrivateRoute from "./guard/PrivetRouters";

const Views = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path='/home' element={<Text>Hi there</Text>} />
      </Route>
      <Route path='*' element={<Login />} />
    </Routes>
  );
};

export default Views;
