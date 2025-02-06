import { useEffect, useState } from 'react';
import { createCategory as createCategoryApi, deleteCategory as deleteCategoryApi, getCategoryById, updateCategory as updateCategoryApi } from '../services/api';

export const useCategory = (id = null) => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!id) return;

        const fetchCategory = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getCategoryById(id, token);
                setCategory(response.data);
                console.log(response.data);
                return response.data;
            } catch (err) {
                setError(err.message || 'Error fetching category');
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id, token]);

    const createCategory = async (categoryData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createCategoryApi(categoryData, token);
            if (response.status === 200) {
                setSuccess(true);
                setCategory(response.data);
                return response.data;
            }
        } catch (err) {
            setError(err.message || 'Error creating category');
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (id, categoryData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateCategoryApi(id, categoryData, token);
            if (response.status === 200) {
                setSuccess(true);
                setCategory(response.data);
                return response.data;
            }
        } catch (err) {
            setError(err.message || 'Error updating category');
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (categoryIdToDelete) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await deleteCategoryApi(categoryIdToDelete, token);
            if (response.status === 204) {
                setSuccess(true);
                setCategory(null);
                return true;
            }
            return false;
        } catch (err) {
            setError(err.message || 'Error deleting category');
            return false;
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
        deleteCategory
    };
};
