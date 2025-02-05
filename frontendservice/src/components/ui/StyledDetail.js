import React from 'react';
import StyledButton from './ui/StyledButton';

const StyledDetail = ({ title, children, buttonText, onButtonClick }) => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{title}</h1>
            <div style={styles.details}>{children}</div>
            {buttonText && (
                <StyledButton onClick={onButtonClick} style={styles.button}>
                    {buttonText}
                </StyledButton>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#2c2c2c',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        maxWidth: '800px',
        margin: '20px auto',
    },
    title: {
        color: '#ffffff',
        fontSize: '26px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    details: {
        color: '#f0f0f0',
        fontSize: '16px',
        marginBottom: '30px',
    },
    button: {
        marginTop: '20px',
    },
};

export default StyledDetail;
