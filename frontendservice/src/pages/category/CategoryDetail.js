import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StyledDetail from '../../components/ui/StyledDetail';
import { useCategory } from '../../hooks/useCategory';

const CategoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { category, loading, error, deleteCategory } = useCategory(id);

    const handleDelete = async () => {
        const success = await deleteCategory(id);

        if (success) {
            navigate('/categories/page?page=0&size=16');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!category) return <div>Category not found</div>;

    return (
        <StyledDetail
            title={category.name}
            onGoBack={() => navigate('/categories/page?page=0&size=16')}
            onEdit={() => navigate(`/categories/edit/${id}`)}
            onDelete={handleDelete}
        >
            <div style={styles.detailItem}>

            </div>
        </StyledDetail>
    );
};

const styles = {
    detailItem: {
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#2a2a2a',
        borderRadius: '6px'
    },
    label: {
        color: '#a0a0a0',
        fontSize: '14px',
        marginBottom: '5px',
        display: 'block'
    },
    value: {
        color: '#ffffff',
        fontSize: '16px'
    }
};

export default CategoryDetail;