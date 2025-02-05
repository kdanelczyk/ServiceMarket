import React from 'react';

const Card = ({ item, attributesToShow, link }) => {
    return (
        <a
            href={link} // Link do szczegółów przekazany jako props
            style={styles.card}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
            }}
        >
            {attributesToShow.map((attr) => (
                <p key={attr.key} style={styles.details}>
                    <strong>{attr.label}:</strong> {item[attr.key] || 'Brak'}
                </p>
            ))}
        </a>
    );
};

const styles = {
    card: {
        display: 'block',
        backgroundColor: '#444',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '10px',
        color: '#fff',
        textDecoration: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    details: {
        fontSize: '14px',
        margin: '5px 0',
    },
};

export default Card;
