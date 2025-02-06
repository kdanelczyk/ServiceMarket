import { useEffect, useState } from 'react';
import { createTaskRequest as apiCreateTask, deleteTaskRequest as apiDeleteTask, updateTaskRequest as apiUpdateTask, getTaskById } from '../services/api'; // Dodajemy nową metodę z API} from '../services/api'; // Importujemy metody z API

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

    const deleteTask = async (taskId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiDeleteTask(taskId, token);
            if (response.status === 204) {
                setSuccess(true);
                setTaskRequest(null);
                return true;
            }
            return false;
        } catch (err) {
            setError(err.message || 'Error deleting task request');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        taskRequest,
        setTaskRequest,
        loading,
        error,
        success,
        createTask,
        updateTask,
        deleteTask // Dodajemy metodę do zwracanych wartości
    };
};

export default useTaskRequest;