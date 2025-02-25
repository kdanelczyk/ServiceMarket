import React from 'react';

const Card = ({ item, attributesToShow, link }) => {
    return (
        <a
            href={link}
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
            <div style={styles.detailsContainer}>
                {attributesToShow.map((attr, index) => (
                    <React.Fragment key={attr.key}>
                        {index > 0 && <div style={styles.separator} />}
                        <div style={styles.details}>
                            <strong>{attr.label}:</strong> {item[attr.key] || 'Brak'}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </a>
    );
};

const styles = {
    card: {
        display: 'block',
        backgroundColor: '#444',
        padding: '15px',
        marginBottom: '10px',
        color: '#fff',
        textDecoration: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
    },
    details: {
        fontSize: '14px',
        padding: '5px 0',
    },
    separator: {
        height: '20px',
        width: '1px',
        backgroundColor: 'white',
    }
};

export default Card;
