import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCategories } from '../services/api';

export const useCategories = () => {
    const location = useLocation();

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            page: parseInt(params.get("page") || "0"),
            size: parseInt(params.get("size") || "16"),
        };
    };

    const { page, size } = getQueryParams();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories(page, size);
                if (response.data && Array.isArray(response.data.content)) {
                    setCategories(response.data.content);
                    setTotalPages(response.data.totalPages);
                } else {
                    setCategories([]);
                    setTotalPages(0);
                }
            } catch (err) {
                setError(err?.response?.data?.message || 'Error fetching categories');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [page, size]);

    return { categories, totalPages, loading, error, page, size };
};
