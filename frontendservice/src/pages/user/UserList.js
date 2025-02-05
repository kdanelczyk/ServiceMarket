import React from "react";
import PaginatedList from "../components/PaginatedList";
import Card from "../components/ui/Card";
import { useUsers } from "../hooks/useUsers";

const UserListPage = () => {
    const { fetchUsers } = useUsers();

    return (
        <PaginatedList
            fetchData={fetchUsers}
            renderItem={(user) => (
                <Card
                    key={user.id}
                    item={user}
                    attributesToShow={[
                        { key: "username", label: "Username" },
                        { key: "email", label: "Email" },
                    ]}
                    link={`/users/${user.id}`}
                />
            )}
        />
    );
};

export default UserListPage;