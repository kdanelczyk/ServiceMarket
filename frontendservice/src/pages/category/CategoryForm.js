import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StyledButton from '../../components/ui/StyledButton';
import StyledForm from '../../components/ui/StyledForm';
import { useCategory } from '../../hooks/useCategory';

const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { category, loading, error, success, createCategory, updateCategory } = useCategory(id);
    const [formData, setFormData] = useState({
        name: '',
    });

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name
            });
        }
    }, [category]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateCategory(id, formData);
        } else {
            await createCategory(formData);
        }
    };

    useEffect(() => {
        if (success) {
            alert(id ? 'Category updated successfully!' : 'Category created successfully!');
            navigate('/categories/page?page=0&size=16');
        }
    }, [success, navigate, id]);

    const fields = [
        { key: 'name', label: 'Category Name', type: 'text', onChange: handleChange, required: true, minLength: 3, maxLength: 50 },
    ];

    return (
        <StyledForm title={id ? 'Edit Category' : 'Create New Category'} fields={fields} onSubmit={handleSubmit}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <StyledButton type="submit">{id ? 'Update Category' : 'Create Category'}</StyledButton>
                </>
            )}
        </StyledForm>
    );
};

export default CategoryForm;
