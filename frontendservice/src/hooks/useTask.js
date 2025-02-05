import { useEffect, useState } from 'react';
import { getTaskById } from '../services/api';

export const useTask = (id) => {
    const [task, setTask] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchTask = async () => {
            setLoading(true);
            try {
                const response = await getTaskById(id);
                setTask(response.data);

                if (response.data.images && Array.isArray(response.data.images)) {
                    const base64Images = response.data.images.map(
                        (image) => `data:image/jpeg;base64,${image.data}`
                    );
                    setImages(base64Images);
                }
            } catch (err) {
                setError(err.message || 'Error fetching task');
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    return { task, images, loading, error };
};
