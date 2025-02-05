import React from "react";
import Card from "../../components/ui/Card";
import PaginatedList from "../../components/ui/PaginatedList";
import { useTaskOffersByCategory } from "../../hooks/useTaskOffersByCategory";

const TaskList = () => {
    const { fetchTasks } = useTaskOffersByCategory();

    return (
        <PaginatedList
            fetchData={fetchTasks}
            renderItem={(task) => (
                <Card
                    key={task.id}
                    item={task}
                    attributesToShow={[
                        { key: "title", label: "Title" },
                        { key: "description", label: "Description" },
                    ]}
                    link={`/tasks/${task.id}`}
                />
            )}
        />
    );
};

export default TaskList;