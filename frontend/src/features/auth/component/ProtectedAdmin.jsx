import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedAdmin = ({ children }) => {
    const user = useSelector((state) => state.user);

    if (user.status !== 'success') {
        // Redirect to login if user status is not success
        return <Navigate to='/' replace />;
    }

    if (!user.loggedInUser || user.loggedInUser.user.role !== 'admin') {
        // Redirect to admin page if user is not logged in or not an admin
        return <Navigate to='/' replace />;
    }

    // Render children if user is logged in and is an admin
    return children;
};

export default ProtectedAdmin;
