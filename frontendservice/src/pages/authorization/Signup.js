import React, { useState } from "react";
import StyledButton from "../../components/ui/StyledButton";
import StyledForm from "../../components/ui/StyledForm";
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
    const { signup } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        const success = await signup({ username, password, email, phone, city });
        if (success) {
            alert("Registration successful! You can now log in.");
            window.location.href = "/auth/login";
        } else {
            alert("Registration failed. Please check your data and try again.");
        }
    };

    return (
        <StyledForm title="Sign Up" onSubmit={handleSignup}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={20}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Phone (e.g., +48123456789)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="\+?[0-9]{7,15}"
                required
            />
            <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                maxLength={50}
            />
            <StyledButton type="submit">Sign Up</StyledButton>
        </StyledForm>
    );
};

export default Signup;
