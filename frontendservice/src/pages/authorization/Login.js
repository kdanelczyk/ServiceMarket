import React, { useState } from "react";
import StyledButton from "../../components/ui/StyledButton";
import StyledForm from "../../components/ui/StyledForm";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(credentials);
        if (!success) alert("Invalid login credentials. Please try again.");
    };

    const fields = [
        { key: "username", label: "Username", type: "text", onChange: handleChange, required: true, minLength: 3, maxLength: 20 },
        { key: "password", label: "Password", type: "password", onChange: handleChange, required: true, minLength: 6 },
    ];

    return (
        <StyledForm title="Login" fields={fields} onSubmit={handleSubmit}>
            <StyledButton type="submit">Login</StyledButton>
        </StyledForm>
    );
};

export default Login;
