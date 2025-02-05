import { useEffect, useState } from "react";
import { getUserRole, getUsername } from "../utils/auth";

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
        setUserRole(getUserRole(token));
        setUsername(getUsername(token));
    }, []);

    const login = async (credentials) => {
        try {
            localStorage.removeItem("token");
            const response = await login(credentials);
            localStorage.setItem("token", response.data.token);
            setIsLoggedIn(true);
            setUserRole(getUserRole(response.data.token));
            setUsername(getUsername(response.data.token));
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const signup = async (userData) => {
        try {
            await signup(userData);
            return true;
        } catch (error) {
            console.error("Signup failed:", error);
            return false;
        }
    };

    const logout = async () => {
        await logout();
        setIsLoggedIn(false);
        setUserRole(null);
        setUsername(null);
        window.location.href = "/auth/login";
    };

    return { isLoggedIn, userRole, username, login, signup, logout };
};
