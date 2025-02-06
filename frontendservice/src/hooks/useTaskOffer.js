import { useEffect, useState } from 'react';
import { createTaskOffer as apiCreateTask, updateTaskOffer as apiUpdateTask, getTaskById } from '../services/api'; // Importujemy metody z API

const useTaskOffer = (id, pathname) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const [taskOffer, setTaskOffer] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        deadline: '',
        images: []
    });

    useEffect(() => {
        if (!id) return;

        const fetchTask = async () => {
            if (!pathname.includes('edit')) return;
            setLoading(true);
            setError(null);
            try {
                const response = await getTaskById(id);
                setTaskOffer(response.data);
            } catch (err) {
                setError(err.message || 'Error fetching task offer');
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id, pathname, token]);

    const createTask = async (categoryId, formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiCreateTask(categoryId, formData, token);
            if (response.status === 201) {
                setTaskOffer(response.data);
                return response.data;
            }
        } catch (err) {
            setError(err.message || 'Error creating task offer');
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (taskId, formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiUpdateTask(taskId, formData, token);
            if (response.status === 200) {
                setTaskOffer(response.data);
                return response.data;
            }
        } catch (err) {
            setError(err.message || 'Error updating task offer');
        } finally {
            setLoading(false);
        }
    };

    return {
        taskOffer,
        setTaskOffer,
        loading,
        error,
        createTask,
        updateTask
    };
};

export default useTaskOffer;