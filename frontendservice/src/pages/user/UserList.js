import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import PaginatedList from "../../components/ui/PaginatedList";
import { useUsers } from "../../hooks/useUsers";

const UserList = () => {
    const navigate = useNavigate();
    const { users, totalPages, loading, error, size } = useUsers();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <PaginatedList
                data={users}
                totalPages={totalPages}
                pageSize={size}
                onPageChange={(newPage) => navigate(`?page=${newPage}&size=${size}`)}
                onSizeChange={(newSize) => navigate(`?page=0&size=${newSize}`)}
                renderItem={(user) => (
                    <Card
                        key={user.id}
                        item={user}
                        attributesToShow={[
                            { key: "username", label: "Name" },
                            { key: "email", label: "Email" },
                        ]}
                        link={`/users/${user.id}`}
                    />
                )}
            />
        </div>
    );
};

export default UserList;
