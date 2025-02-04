import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/api';

export const useUsers = (page = 0, size = 10) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await getAllUsers(token, page, size);
                setUsers(response.data.content);
            } catch (err) {
                setError(err.message || 'Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page, size, token]);

    return { users, loading, error };
};
