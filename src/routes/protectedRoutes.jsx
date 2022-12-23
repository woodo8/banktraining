import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StateContext } from "../context/context";

const ProtectedRoutes = () => {
    const loggedIn = localStorage.getItem("access")
    return loggedIn ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoutes;