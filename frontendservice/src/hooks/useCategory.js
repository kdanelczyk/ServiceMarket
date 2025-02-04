import { useEffect, useState } from 'react';
import { getCategoryById } from '../services/api';

export const useCategory = (categoryId) => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!categoryId) return;

        const fetchCategory = async () => {
            setLoading(true);
            try {
                const response = await getCategoryById(categoryId, token);
                setCategory(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [categoryId, token]);

    return { category, loading, error };
};
