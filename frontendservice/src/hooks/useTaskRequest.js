import { useEffect, useState } from 'react';
import { createTaskRequest as apiCreateTask, updateTaskRequest as apiUpdateTask, getTaskById } from '../services/api'; // Importujemy metody z API

const useTaskRequest = (id, pathname) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const [taskRequest, setTaskRequest] = useState({
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
                setTaskRequest(response.data);
            } catch (err) {
                setError(err.message || 'Error fetching task request');
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
                setTaskRequest(response.data);
                return response.data;
            }
        } catch (err) {
            setError(err.message || 'Error fetching task request');
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
                setTaskRequest(response.data);
                return response.data;
            }
        } catch (err) {
            setError(err.message || 'Error fetching task request');
        } finally {
            setLoading(false);
        }
    };

    return {
        taskRequest,
        setTaskRequest,
        loading,
        error,
        createTask,
        updateTask
    };
};

export default useTaskRequest;