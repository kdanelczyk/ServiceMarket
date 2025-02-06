import { useEffect, useState } from 'react';
import { createCategory as createCategoryApi, getCategoryById, updateCategory as updateCategoryApi } from '../services/api';

export const useCategory = (categoryId = null) => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!categoryId) return;

        const fetchCategory = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getCategoryById(categoryId, token);
                setCategory(response.data);
                setSuccess(false);
            } catch (err) {
                setError(err.message || 'Error fetching category');
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [categoryId, token]);

    const createCategory = async (categoryData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createCategoryApi(categoryData, token);
            if (response.status === 201) {
                setSuccess(true);
                setCategory(response.data);
            }
        } catch (err) {
            setError(err.message || 'Error creating category');
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (categoryId, categoryData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateCategoryApi(categoryId, categoryData, token);
            if (response.status === 200) {
                setSuccess(true);
                setCategory(response.data);
            }
        } catch (err) {
            setError(err.message || 'Error updating category');
        } finally {
            setLoading(false);
        }
    };

    return {
        category,
        loading,
        error,
        success,
        createCategory,
        updateCategory,
    };

};
