import { useState } from 'react';
import {
    createTaskOffer,
    updateTaskOffer
} from '../services/api';

export const useTaskOffer = (taskOfferId = null) => {
    const [taskOffer, setTaskOffer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const token = localStorage.getItem('token');

    const createOffer = async (categoryId, taskOfferInput) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createTaskOffer(categoryId, taskOfferInput, token);
            setTaskOffer(response.data);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Error creating task offer');
        } finally {
            setLoading(false);
        }
    };

    const updateOffer = async (id, taskOfferInput) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateTaskOffer(id, taskOfferInput, token);
            setTaskOffer(response.data);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Error updating task offer');
        } finally {
            setLoading(false);
        }
    };

    return {
        taskOffer,
        loading,
        error,
        success,
        createOffer,
        updateOffer,
    };
};
