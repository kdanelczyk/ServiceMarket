import React from 'react';
import { getUsername, getUserRole } from '../../utils/auth';
import StyledButton from './StyledButton';

const StyledDetail = ({ title, children, onGoBack, onEdit, onDelete, createdBy }) => {
    const token = localStorage.getItem('token');
    const isLoggedIn = Boolean(token);
    const userRole = getUserRole(token);
    const username = getUsername(token);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{title}</h1>
            <div style={styles.details}>{children}</div>
            <div style={styles.buttonContainer}>
                <StyledButton onClick={onGoBack} style={styles.button}>
                    Go Back
                </StyledButton>

                {isLoggedIn && (userRole !== 'ROLE_USER' || username === createdBy) && onEdit && (
                    <StyledButton onClick={onEdit} style={styles.button}>
                        Edit
                    </StyledButton>
                )}

                {isLoggedIn && (userRole !== 'ROLE_USER' || username === createdBy) && onDelete && (
                    <StyledButton onClick={onDelete} style={{ ...styles.button, ...styles.deleteButton }}>
                        Delete
                    </StyledButton>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '30px',
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
        maxWidth: '800px',
        margin: '40px auto',
        color: '#f0f0f0',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        color: '#ffffff',
        fontSize: '28px',
        marginBottom: '25px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    details: {
        color: '#f0f0f0',
        fontSize: '18px',
        marginBottom: '40px',
        lineHeight: '1.6',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '15px',
    },
    button: {
        padding: '12px 15px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#3a3a3a',
        color: '#ffffff',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        flex: 1,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
    },
};

export default StyledDetail;