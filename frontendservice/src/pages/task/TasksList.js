import React from "react";
import PaginatedList from "../components/PaginatedList";
import Card from "../components/ui/Card";
import { useTasks } from "../hooks/useTasks";

const TaskList = () => {
    const { fetchTasks } = useTasks();

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