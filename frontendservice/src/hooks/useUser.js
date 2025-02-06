import { useEffect, useState } from 'react';
import { getUserById, updateUser as updateUserApi } from '../services/api';

export const useUser = (userId = null) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const token = localStorage.getItem('token');


    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getUserById(userId, token);
                setUser(response.data);
                setSuccess(false);
                return response.data;
            } catch (err) {
                setError(err.message || 'Error fetching user');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, token]);

    const updateUser = async (userId, userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateUserApi(userId, userData, token);
            if (response === "User successfully logged out") {
                setSuccess(true);
                return response;
            } else {
                setSuccess(false);
                return null;
            }
        } catch (err) {
            setError(err.message || 'Error updating user');
            setSuccess(false);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        error,
        success,
        updateUser,
    };
};
