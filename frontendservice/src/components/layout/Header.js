import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCategories } from '../../hooks/useCategories';
import NavigationButtons from '../ui/NavigationButtons';
import TaskSelectionModal from '../ui/TaskSelectionModal';

const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn, userRole, logout } = useAuth();
    const categories = useCategories();
    const [categorySelection, setCategorySelection] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    // States for scroll direction
    const [scrollDirection, setScrollDirection] = useState('up');
    const [prevScrollY, setPrevScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > prevScrollY) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }
            setPrevScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollY]);

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
        <header
            style={{
                ...styles.header,
                transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)', // Hide when scrolling down
                transition: 'transform 0.3s ease-in-out', // Smooth transition
            }}
        >
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
        alignItems: 'center', // Vertically center the content
        padding: '10px 20px', // Reduced padding for smaller header
        backgroundColor: '#1a1a1a',
        color: 'white',
        position: 'fixed',  // Fixed to top
        top: '0',  // Always at the top
        left: '0',
        width: '100%',
        zIndex: 1000,
        boxSizing: 'border-box', // Make sure padding doesn't affect overall width
    },
    logo: {
        cursor: 'pointer',
        fontSize: '20px', // Smaller font size
        margin: '0',
        padding: '0', // Remove default padding/margin
    },
};

export default Header;
