import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const RequireAuth = ({ allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (user) {
        if (allowedRoles) {
            if (allowedRoles.includes(user.role)) {
                return <Outlet />;
            } else {
                toast.warning('Access Denied !')
                return <Navigate to="/" state={{ from: location }} />;
            }
        } else {
            return <Outlet />;
        }
    } else {
        return <Navigate to="/login" state={{ from: location }} />;
    }
};

export default RequireAuth;
