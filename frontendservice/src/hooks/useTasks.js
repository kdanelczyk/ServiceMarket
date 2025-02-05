import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    getTaskOffers,
    getTaskOffersByCategory,
    getTaskRequests,
    getTaskRequestsByCategory,
} from "../services/api";

export const useTasks = ({ method, categoryId }) => {
    const location = useLocation();

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            page: parseInt(params.get("page") || "0"),
            size: parseInt(params.get("size") || "16"),
        };
    };

    const { page, size } = getQueryParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (!method) return;

        const fetchTasks = async () => {
            setLoading(true);
            try {
                let response;
                switch (method) {
                    case "offers":
                        response = await getTaskOffers(page, size);
                        break;
                    case "requests":
                        response = await getTaskRequests(page, size);
                        break;
                    case "offersByCategory":
                        if (categoryId) {
                            response = await getTaskOffersByCategory(categoryId, page, size);
                        }
                        break;
                    case "requestsByCategory":
                        if (categoryId) {
                            response = await getTaskRequestsByCategory(categoryId, page, size);
                        }
                        break;
                    default:
                        throw new Error("Invalid method");
                }

                if (response?.data) {
                    setTasks(response.data.content || []);
                    setTotalPages(response.data.totalPages || 0);
                } else {
                    setTasks([]);
                    setTotalPages(0);
                }
            } catch (err) {
                setError(err?.message || "Error fetching tasks");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [method, categoryId, page, size]);

    return { tasks, totalPages, loading, error, page, size };
};
