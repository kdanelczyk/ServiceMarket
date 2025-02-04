import { useEffect, useState } from 'react';
import { getTaskRequestsByCategory } from '../services/api';

export const useTaskRequestsByCategory = (categoryId, page = 0, size = 10) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!categoryId) return;

        const fetchTasks = async () => {
            setLoading(true);
            try {
                const response = await getTaskRequestsByCategory(categoryId, page, size);
                setTasks(response.data.content);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [categoryId, page, size]);

    return { tasks, loading, error };
};
