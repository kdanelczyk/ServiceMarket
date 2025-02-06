import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllUsers } from '../services/api';

export const useUsers = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            page: parseInt(params.get("page") || "0"),
            size: parseInt(params.get("size") || "16"),
        };
    };

    const { page, size } = getQueryParams();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await getAllUsers(token, page, size);
                if (response.data) {
                    setUsers(response.data.content);
                    return response.data;
                } else {
                    setUsers([]);
                }
            } catch (err) {
                setError(err?.message || 'Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchUsers();
        }
    }, [token, page, size]);

    return { users, loading, error, page, size };
};
