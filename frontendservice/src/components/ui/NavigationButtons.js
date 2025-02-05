import React from 'react';
import { useNavigate } from 'react-router-dom';
import StyledButton from './StyledButton';

const NavigationButtons = ({ isLoggedIn, userRole, onLogout, onCreateTask }) => {
    const navigate = useNavigate();

    return (
        <div style={styles.buttonContainer}>
            {isLoggedIn ? (
                <>
                    {userRole?.includes('ROLE_ADMIN') && (
                        <>
                            <StyledButton onClick={() => navigate('/categories/page')}>
                                Categories
                            </StyledButton>
                            <StyledButton onClick={() => navigate('/users/page')}>
                                Users
                            </StyledButton>
                        </>
                    )}
                    <StyledButton onClick={onLogout}>Logout</StyledButton>
                    <StyledButton onClick={onCreateTask}>Create Task</StyledButton>
                </>
            ) : (
                <>
                    <StyledButton onClick={() => navigate('/auth/login')}>Login</StyledButton>
                    <StyledButton onClick={() => navigate('/auth/signup')}>Signup</StyledButton>
                </>
            )}
        </div>
    );
};

const styles = {
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '15px',
    },
};

export default NavigationButtons;
