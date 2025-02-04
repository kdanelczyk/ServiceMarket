import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

export const useCategories = (page = 0, size = 16) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories(page, size);
                setCategories(response.data.content);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [page, size]);

    return { categories, loading, error };
};
