import { useState } from 'react';
import {
    createTaskRequest,
    updateTaskRequest
} from '../services/api';

export const useTaskRequest = (taskRequestId = null) => {
    const [taskRequest, setTaskRequest] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const token = localStorage.getItem('token');

    const createRequest = async (categoryId, taskRequestInput) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createTaskRequest(categoryId, taskRequestInput, token);
            setTaskRequest(response.data);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Error creating task request');
        } finally {
            setLoading(false);
        }
    };

    const updateRequest = async (id, taskRequestInput) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateTaskRequest(id, taskRequestInput, token);
            setTaskRequest(response.data);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Error updating task request');
        } finally {
            setLoading(false);
        }
    };

    return {
        taskRequest,
        loading,
        error,
        success,
        createRequest,
        updateRequest,
    };
};