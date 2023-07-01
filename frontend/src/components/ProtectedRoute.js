import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ Component: Component, ...props }) => {
    if (!props.isLoggedIn) {
        return <Navigate to='/sign-in' />;
    }
    return <Component {...props} />;
    
};

export default ProtectedRoute;

