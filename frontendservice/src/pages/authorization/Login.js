import React, { useState } from "react";
import StyledButton from "../../components/ui/StyledButton";
import StyledForm from "../../components/ui/StyledForm";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await login({ username, password });
        if (success) {
            window.location.href = "/users/me";
        } else {
            alert("Invalid login credentials. Please try again.");
        }
    };

    return (
        <StyledForm title="Login" onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={20}
            />

            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
            />

            <StyledButton type="submit">Login</StyledButton>
        </StyledForm>
    );
};

export default Login;
