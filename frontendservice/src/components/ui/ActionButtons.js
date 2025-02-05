import React from "react";
import { useNavigate } from "react-router-dom";
import StyledButton from "./StyledButton";

const ActionButtons = ({ urls, onSave }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            navigate(urls.delete);
        }
    };

    return (
        <div style={styles.container}>
            {urls.create && (
                <StyledButton onClick={() => navigate(urls.create)}>
                    Create
                </StyledButton>
            )}
            {urls.update && (
                <StyledButton onClick={() => navigate(urls.update)}>
                    Update
                </StyledButton>
            )}
            {urls.delete && (
                <StyledButton onClick={handleDelete}>
                    Delete
                </StyledButton>
            )}
            {urls.goBack && (
                <StyledButton onClick={() => navigate(urls.goBack)}>
                    Go Back
                </StyledButton>
            )}
            {onSave && (
                <StyledButton onClick={onSave}>
                    Save
                </StyledButton>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        gap: "10px",
        marginTop: "20px",
    },
};

export default ActionButtons;
