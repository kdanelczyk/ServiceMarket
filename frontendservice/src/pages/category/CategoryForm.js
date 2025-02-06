import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StyledButton from '../../components/ui/StyledButton';
import StyledForm from '../../components/ui/StyledForm';
import { useCategory } from '../../hooks/useCategory';

const CategoryForm = () => {
    const { id: categoryId } = useParams();
    const navigate = useNavigate();

    const {
        category,
        loading,
        error,
        success,
        createCategory,
        updateCategory,
    } = useCategory(categoryId);

    const [name, setName] = useState('');

    useEffect(() => {
        if (category && category.name) {
            setName(category.name);
        }
    }, [category]);

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (categoryId) {
            await updateCategory(categoryId, { name });
            if (success) {
                alert('Updated!');
                navigate(`/categories/${categoryId}`);
            }
        } else {
            await createCategory({ name });
            if (success) {
                alert('Created!');
                navigate('/categories/page?page=0&size=10');
            }
        }
    };

    const fields = [
        {
            key: "name",
            label: "Category Name",
            type: "text",
            onChange: handleChange,
            value: name,
            required: true,
            minLength: 3,
            maxLength: 50,
        },
    ];

    return (
        <StyledForm
            title={categoryId ? "Edit Category" : "Create Category"}
            fields={fields}
            onSubmit={handleSubmit}
        >
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <StyledButton type="submit">
                        {categoryId ? "Update" : "Create"}
                    </StyledButton>
                </>
            )}
        </StyledForm>
    );
};

export default CategoryForm;
