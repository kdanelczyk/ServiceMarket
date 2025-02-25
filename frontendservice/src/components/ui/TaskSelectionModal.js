import React from 'react';
import StyledButton from './StyledButton';

const TaskSelectionModal = ({ categories, selectedType, onSelectType, onSelectCategory, onClose }) => {
    const handleOptionClick = (categoryId) => {
        onSelectCategory(categoryId);
    };

    const handleTypeClick = (type) => {
        onSelectType(type);
    };

    return (
        <div style={styles.backdrop} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {selectedType ? (
                    <>
                        <p style={styles.text}>Please select category:</p>
                        {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((category) => (
                                <StyledButton
                                    key={category.id}
                                    onClick={() => handleOptionClick(category.id)}
                                >
                                    {category.name}
                                </StyledButton>
                            ))
                        ) : (
                            <p style={styles.text}>No categories available.</p>
                        )}
                    </>
                ) : (
                    <>
                        <p style={styles.text}>Please select type of task:</p>
                        <StyledButton onClick={() => handleTypeClick('requests')}>Requests</StyledButton>
                        <StyledButton onClick={() => handleTypeClick('offers')}>Offers</StyledButton>
                    </>
                )}
                <StyledButton onClick={onClose} style={{ marginTop: '15px' }}>Cancel</StyledButton>
            </div>
        </div>
    );
};

const styles = {
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: '#2f2f2f',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        textAlign: 'center',
        minWidth: '300px'
    },
    text: {
        marginBottom: '15px',
        fontSize: '16px',
        color: '#ffffff'
    }
};

export default TaskSelectionModal;