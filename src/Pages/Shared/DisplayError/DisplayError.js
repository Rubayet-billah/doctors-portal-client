import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const DisplayError = () => {
    const { logoutUser } = useContext(AuthContext)

    const handleLogout = () => {
        logoutUser()
            .then(() => { })
            .catch(err => console.error(err))
    }

    const error = useRouteError()
    return (
        <div>
            <h2 className="text-4xl text-red-500 font-bold text-center mt-5 md:mt-24">Something Error</h2>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <p>Please <button onClick={handleLogout} className='bg-accent text-white'>Logout</button> and login again</p>
        </div>
    );
};

export default DisplayError;