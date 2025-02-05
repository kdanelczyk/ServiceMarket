import { useEffect, useState } from 'react';
import { getUserRole, getUsername } from '../utils/auth';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setUserRole(getUserRole(token));
        setUsername(getUsername(token));
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
    };

    return { isLoggedIn, userRole, username, logout };
};
