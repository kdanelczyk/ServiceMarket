import { useEffect, useState } from 'react';
import { getUserById } from '../services/api';

export const useUser = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await getUserById(userId, token);
                setUser(response.data);
            } catch (err) {
                setError(err.message || 'Error fetching user');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, token]);

    return { user, loading, error };
};
