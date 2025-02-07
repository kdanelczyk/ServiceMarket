import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../../utils/auth'; // Importuj metody do dekodowania tokenu
import StyledButton from './StyledButton';

const NavigationButtons = ({ isLoggedIn, onLogout, onCreateTask }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Pobieranie tokenu z localStorage
    const userRole = getUserRole(token); // Pobierz rolę użytkownika z tokenu

    return (
        <div style={styles.buttonContainer}>
            {isLoggedIn ? (
                <>
                    {/* Sprawdzamy rolę użytkownika */}
                    {(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_SUPER_ADMIN') && (
                        <>
                            <StyledButton onClick={() => navigate('/categories/page?page=0&size=10')}>
                                Categories
                            </StyledButton>
                            <StyledButton onClick={() => navigate('/tasks/requests/page?page=0&size=10')}>
                                Requests
                            </StyledButton>
                            <StyledButton onClick={() => navigate('/tasks/offers/page?page=0&size=10')}>
                                Offers
                            </StyledButton>
                            <StyledButton onClick={() => navigate('/users/page?page=0&size=10')}>
                                Users
                            </StyledButton>
                            <StyledButton onClick={() => navigate('/categories/new')}>
                                Create Category
                            </StyledButton>
                        </>
                    )}
                    <StyledButton onClick={onCreateTask}>Create Task</StyledButton>
                    <StyledButton onClick={onLogout}>Logout</StyledButton>
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
        padding: '5px 20px', // Dodaje przestrzeń wokół przycisków
        backgroundColor: '#333', // Kolor tła kontenera
        borderRadius: '10px', // Zaokrąglone rogi
        margin: '2px', // Odstęp od innych elementów
    },
};

export default NavigationButtons;
