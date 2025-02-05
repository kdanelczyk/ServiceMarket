import React, { useEffect } from 'react';
import StyledButton from './StyledButton';

const TaskSelectionModal = ({ categories, selectedType, onSelectType, onSelectCategory, onClose }) => {
    useEffect(() => {
        // Zablokuj całą stronę poza modalem
        const overlay = document.createElement('div');
        overlay.id = 'page-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        overlay.style.zIndex = '1000';
        overlay.style.pointerEvents = 'none';

        document.body.appendChild(overlay);

        return () => {
            document.body.removeChild(overlay);
        };
    }, []);

    const handleOptionClick = (categoryId) => {
        onSelectCategory(categoryId);
        // Usuń overlay po wybraniu kategorii
        const overlay = document.getElementById('page-overlay');
        if (overlay) {
            document.body.removeChild(overlay);
        }
    };

    const handleTypeClick = (type) => {
        onSelectType(type);
    };

    return (
        <div style={styles.modal}>
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
            <StyledButton onClick={onClose}>Cancel</StyledButton>
        </div>
    );
};

const styles = {
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#2f2f2f',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        textAlign: 'center',
        zIndex: 1000,
    },
    text: {
        marginBottom: '15px',
        fontSize: '16px',
        color: '#ffffff',
    },
};

export default TaskSelectionModal;