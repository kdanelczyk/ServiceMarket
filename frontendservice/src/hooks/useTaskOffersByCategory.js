import { useEffect, useState } from 'react';
import { getTaskOffersByCategory } from '../services/api';

export const useTaskOffersByCategory = (categoryId, page = 0, size = 10) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!categoryId) return;

        const fetchTasks = async () => {
            setLoading(true);
            try {
                const response = await getTaskOffersByCategory(categoryId, page, size);
                setTasks(response.data.content);
            } catch (err) {
                setError(err.message || 'Error fetching tasks');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [categoryId, page, size]);

    return { tasks, loading, error };
};
