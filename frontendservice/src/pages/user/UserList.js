import React from "react";
import Card from "../../components/ui/Card";
import PaginatedList from "../../components/ui/PaginatedList";
import { useUsers } from "../../hooks/useUsers";

const UserList = () => {
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

export default UserList;