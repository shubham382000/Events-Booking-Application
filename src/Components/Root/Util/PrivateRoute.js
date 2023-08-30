import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import * as userUtil from './UserUtil';

let PrivateRoute = ({ component: Component, ...rest }) => {

 return !userUtil.isLoggedIn() ? <Navigate to='/users/login' /> : <Outlet/>

}

export default PrivateRoute;    