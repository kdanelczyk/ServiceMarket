import { useEffect, useState } from 'react';
import { createTaskOffer as apiCreateTask, deleteTask as apiDeleteTask, updateTaskOffer as apiUpdateTask, getTaskById } from '../services/api'; // Importujemy metody z API

const useTaskOffer = (id, pathname) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
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
            if (pathname.includes('new')) return;
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

    const deleteTask = async (taskId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiDeleteTask(taskId, token);
            if (response.status === 204) {
                setSuccess(true);
                setTaskOffer(null);
                return true;
            }
            return false;
        } catch (err) {
            setError(err.message || 'Error deleting task offer');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        taskOffer,
        setTaskOffer,
        loading,
        error,
        success,
        createTask,
        updateTask,
        deleteTask
    };
};

export default useTaskOffer;