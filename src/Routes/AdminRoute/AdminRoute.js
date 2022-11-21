import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin/useAdmin';
import Spinner from '../../Pages/Shared/Spinner/Spinner';

const AdminRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const [isAdmin, isAdminLoader] = useAdmin(user?.email)
    const location = useLocation()

    if (loader || isAdminLoader) {
        return <Spinner></Spinner>
    }
    if (user && isAdmin) {
        return children;
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
};

export default AdminRoute;