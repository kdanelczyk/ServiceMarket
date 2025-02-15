import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import PaginatedList from "../../components/ui/PaginatedList";
import {
    getTaskOffers,
    getTaskOffersByCategory,
    getTaskRequests,
    getTaskRequestsByCategory,
} from "../../services/api";

const TaskList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    let categoryId = new URLSearchParams(location.search).get("categoryId");

    if (!categoryId) {
        const segments = location.pathname.split("/");
        const categoryIndex = segments.findIndex((seg) => seg === "category");
        if (categoryIndex > -1 && segments.length > categoryIndex + 1) {
            categoryId = segments[categoryIndex + 1];
        }
    }

    const urlPath = location.pathname;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response;
                if (urlPath.startsWith("/tasks/requests/category")) {
                    response = await getTaskRequestsByCategory(categoryId, page, size);
                } else if (urlPath.startsWith("/tasks/offers/category")) {
                    response = await getTaskOffersByCategory(categoryId, page, size);
                } else if (urlPath.startsWith("/tasks/requests")) {
                    response = await getTaskRequests(page, size);
                } else if (urlPath.startsWith("/tasks/offers")) {
                    response = await getTaskOffers(page, size);
                } else {
                    throw new Error("Unknown route");
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
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [urlPath, categoryId, page, size]);

    // Function to determine the correct detail URL based on the current path
    const getDetailUrl = (taskId) => {
        if (urlPath.includes("requests")) {
            return `/tasks/requests/${taskId}`;
        } else if (urlPath.includes("offers")) {
            return `/tasks/offers/${taskId}`;
        } else {
            return `/tasks/${taskId}`; // Fallback for unknown paths
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <PaginatedList
                data={tasks}
                totalPages={totalPages}
                pageSize={size}
                onPageChange={(newPage) => {
                    navigate(`?page=${newPage}&size=${size}`);
                }}
                onSizeChange={(newSize) => {
                    navigate(`?page=0&size=${newSize}`);
                }}
                renderItem={(task) => {
                    return (
                        <Card
                            key={task.id}
                            item={task}
                            attributesToShow={[
                                { key: "title", label: "Title" },
                                { key: "description", label: "Description" },
                            ]}
                            link={getDetailUrl(task.id)} // Use the dynamic URL function
                        />
                    );
                }}
            />
        </div>
    );
};

export default TaskList;