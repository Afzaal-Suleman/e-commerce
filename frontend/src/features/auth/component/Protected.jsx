import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
    const user = useSelector((state) => state.user);
    
    // Check if user is logged in
    if (user.status !== 'success') { 
        // replace is used for history
        return <Navigate to='/' replace={true}/>;
    }

    // Render children if user is logged in
    return children;
};

export default Protected;
