import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCategories } from '../../hooks/useCategories';
import NavigationButtons from '../ui/NavigationButtons';
import TaskSelectionModal from '../ui/TaskSelectionModal';

const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn, userRole, logout } = useAuth();
    const { categories, loading, error } = useCategories(); // Użycie hooka do pobierania kategorii
    const [categorySelection, setCategorySelection] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    const handleCreateTask = () => {
        setSelectedType(null);
        setCategorySelection(true);
    };

    const handleCategorySelection = (categoryId) => {
        if (selectedType === 'requests') {
            navigate(`/tasks/requests/new/${categoryId}`);
        } else if (selectedType === 'offers') {
            navigate(`/tasks/offers/new/${categoryId}`);
        }
        setCategorySelection(false);
    };

    return (
        <header style={styles.header}>
            <h1 onClick={() => navigate('/dashboard')} style={styles.logo}>ServiceMarket</h1>
            <NavigationButtons isLoggedIn={isLoggedIn} userRole={userRole} onLogout={logout} onCreateTask={handleCreateTask} />

            {categorySelection && (
                <TaskSelectionModal
                    categories={categories}
                    selectedType={selectedType}
                    onSelectType={setSelectedType}
                    onSelectCategory={handleCategorySelection}
                    onClose={() => setCategorySelection(false)}
                />
            )}
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#1a1a1a',
        color: 'white',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        zIndex: 999,
    },
    logo: {
        cursor: 'pointer',
        fontSize: '20px',
    },
};

export default Header;
