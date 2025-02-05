import React, { useState } from "react";
import StyledButton from "../../components/ui/StyledButton";
import StyledForm from "../../components/ui/StyledForm";
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        city: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await signup(formData);
        if (success) {
            alert("Registration successful! You can now log in.");
            window.location.href = "/auth/login";
        } else {
            alert("Registration failed. Please check your data and try again.");
        }
    };

    const fields = [
        { key: "username", label: "Username", type: "text", onChange: handleChange, required: true, minLength: 3, maxLength: 20 },
        { key: "password", label: "Password", type: "password", onChange: handleChange, required: true, minLength: 6 },
        { key: "email", label: "Email", type: "email", onChange: handleChange, required: true },
        { key: "phone", label: "Phone", type: "text", onChange: handleChange, pattern: "\\+?[0-9]{7,15}", required: true },
        { key: "city", label: "City", type: "text", onChange: handleChange, required: true, maxLength: 50 },
    ];

    return (
        <StyledForm title="Sign Up" fields={fields} onSubmit={handleSubmit}>
            <StyledButton type="submit">Sign Up</StyledButton>
        </StyledForm>
    );
};

export default Signup;
