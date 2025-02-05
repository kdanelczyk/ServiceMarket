// src/components/ui/TaskSelectionModal.js
import React from 'react';
import StyledButton from './StyledButton';

const TaskSelectionModal = ({ categories, selectedType, onSelectType, onSelectCategory, onClose }) => {
    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {selectedType ? (
                    <>
                        <p style={styles.text}>Please select category:</p>
                        {categories.map((category) => (
                            <StyledButton key={category.id} onClick={() => onSelectCategory(category.id)}>
                                {category.name}
                            </StyledButton>
                        ))}
                    </>
                ) : (
                    <>
                        <p style={styles.text}>Please select type of task:</p>
                        <StyledButton onClick={() => onSelectType('requests')}>Requests</StyledButton>
                        <StyledButton onClick={() => onSelectType('offers')}>Offers</StyledButton>
                    </>
                )}
                <StyledButton onClick={onClose}>Cancel</StyledButton>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    },
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#2f2f2f',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        textAlign: 'center',
    },
    text: {
        marginBottom: '15px',
        fontSize: '14px',
        color: '#ffffff',
    },
};

export default TaskSelectionModal;
