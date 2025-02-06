import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StyledButton from "../../components/ui/StyledButton";
import StyledForm from "../../components/ui/StyledForm";
import { useUser } from "../../hooks/useUser";

const UserForm = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();
    const { user, loading, error, success, updateUser } = useUser(userId);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        city: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
                password: "",
                phone: user.phone || "",
                city: user.city || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await updateUser(userId, formData);
        if ((response === "User successfully logged out")) {
            alert("User updated successfully!");
            localStorage.removeItem("token");
            navigate("/auth/login");
        } else {
            alert("Update failed. Please check your data and try again.");
        }
    };

    const fields = [
        {
            key: "username",
            label: "Username",
            type: "text",
            onChange: handleChange,
            value: formData.username,
            required: true,
            minLength: 3,
            maxLength: 20,
        },
        {
            key: "password",
            label: "Password",
            type: "password",
            onChange: handleChange,
            value: formData.password,
            required: true,
            minLength: 6,
        },
        {
            key: "email",
            label: "Email",
            type: "email",
            onChange: handleChange,
            value: formData.email,
            required: true,
        },
        {
            key: "phone",
            label: "Phone",
            type: "text",
            onChange: handleChange,
            value: formData.phone,
            pattern: "\\+?[0-9]{7,15}",
            required: true,
        },
        {
            key: "city",
            label: "City",
            type: "text",
            onChange: handleChange,
            value: formData.city,
            required: true,
            maxLength: 50,
        },
    ];

    return (
        <StyledForm title="Update User" fields={fields} onSubmit={handleSubmit}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <StyledButton type="submit">Update User</StyledButton>
                </>
            )}
        </StyledForm>
    );
};

export default UserForm;
