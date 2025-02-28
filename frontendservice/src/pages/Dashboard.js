import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import PaginatedList from "../components/ui/PaginatedList";
import { getTaskOffers, getTaskRequests } from "../services/api";

const Dashboard = () => {
    const [taskRequests, setTaskRequests] = useState([]);
    const [taskOffers, setTaskOffers] = useState([]);
    const [totalPagesRequests, setTotalPagesRequests] = useState(0);
    const [totalPagesOffers, setTotalPagesOffers] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        const fetchTaskRequests = async () => {
            try {
                const response = await getTaskRequests(page, size);
                setTaskRequests(response?.data?.content || []);
                setTotalPagesRequests(response?.data?.totalPages || 0);
            } catch (error) {
                console.error("Error fetching task requests:", error);
            }
        };

        const fetchTaskOffers = async () => {
            try {
                const response = await getTaskOffers(page, size);
                setTaskOffers(response?.data?.content || []);
                setTotalPagesOffers(response?.data?.totalPages || 0);
            } catch (error) {
                console.error("Error fetching task offers:", error);
            }
        };

        fetchTaskRequests();
        fetchTaskOffers();
    }, [page, size]);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>
                🔥 Discover the Best Task Offers & Requests! 🚀 <br />
                Find work or hire experts with ease.
            </h1>

            <div style={styles.content}>
                <div style={styles.column}>
                    <h2 style={styles.title}>🔍 Task Requests</h2>
                    <PaginatedList
                        data={taskRequests}
                        totalPages={totalPagesRequests}
                        pageSize={size}
                        onPageChange={(newPage) => setPage(newPage)}
                        onSizeChange={(newSize) => setSize(newSize)}
                        renderItem={(task) => (
                            <Card
                                key={task.id}
                                item={task}
                                attributesToShow={[
                                    { key: "title", label: "Title" },
                                    { key: "description", label: "Description" },
                                ]}
                                link={`/tasks/requests/${task.id}`}
                            />
                        )}
                    />
                </div>

                <div style={styles.column}>
                    <h2 style={styles.title}>💼 Task Offers</h2>
                    <PaginatedList
                        data={taskOffers}
                        totalPages={totalPagesOffers}
                        pageSize={size}
                        onPageChange={(newPage) => setPage(newPage)}
                        onSizeChange={(newSize) => setSize(newSize)}
                        renderItem={(task) => (
                            <Card
                                key={task.id}
                                item={task}
                                attributesToShow={[
                                    { key: "title", label: "Title" },
                                    { key: "description", label: "Description" },
                                ]}
                                link={`/tasks/offers/${task.id}`}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "50px",
        textAlign: "center",
    },
    header: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "40px",
        color: "#fff",
    },
    content: {
        display: "flex",
        justifyContent: "space-between",
        gap: "40px",
    },
    column: {
        flex: 1,
        padding: "30px",
        backgroundColor: "#333",
        borderRadius: "12px",
        boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
        minHeight: "600px",
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#fff",
    },
};

export default Dashboard;
