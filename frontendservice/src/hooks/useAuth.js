import { useEffect, useState } from "react";
import { login as apiLogin, logout as apiLogout, signup as apiSignup } from "../services/api"; // Importujemy funkcje API
import { getUserRole, getUsername } from "../utils/auth";

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            setUserRole(getUserRole(token));
            setUsername(getUsername(token));
        }
    }, []);

    const login = async (credentials) => {
        try {
            localStorage.removeItem("token");
            const response = await apiLogin(credentials);
            if (response.data?.token) {
                localStorage.setItem("token", response.data.token);
                setIsLoggedIn(true);
                setUserRole(getUserRole(response.data.token));
                setUsername(getUsername(response.data.token));
                window.location.href = "/users/me";
                return true;
            } else {
                throw new Error("No token received");
            }
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const signup = async (userData) => {
        try {
            await apiSignup(userData);
            return true;
        } catch (error) {
            console.error("Signup failed:", error);
            return false;
        }
    };

    const logout = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("There is no token!");
            return;
        }

        try {
            await apiLogout(token);
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUserRole(null);
            setUsername(null);
            window.location.href = "/auth/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    return { isLoggedIn, userRole, username, login, signup, logout };
};
