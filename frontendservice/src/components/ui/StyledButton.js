import React from 'react';

const buttonStyle = {
    padding: '8px 18px',
    borderRadius: '4px',
    border: '1px solid #444',
    backgroundColor: '#444',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '12px',
    margin: '5px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
};

const hoverStyle = {
    backgroundColor: '#333',
};

const StyledButton = ({ children, onClick, type = 'button', style, ...props }) => {
    const [hovered, setHovered] = React.useState(false);

    return (
        <button
            type={type}
            onClick={onClick}
            style={{
                ...buttonStyle,
                ...(hovered ? hoverStyle : {}),
                ...style,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            {...props}
        >
            {children}
        </button>
    );
};

export default StyledButton;
