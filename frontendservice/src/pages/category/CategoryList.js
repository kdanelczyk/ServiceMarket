import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import PaginatedList from "../../components/ui/PaginatedList";
import { useCategories } from "../../hooks/useCategories";

const CategoryList = () => {
    const navigate = useNavigate();
    const { categories, totalPages, loading, error, page, size } = useCategories();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <PaginatedList
                data={categories}
                totalPages={totalPages}
                pageSize={size}
                onPageChange={(newPage) => navigate(`?page=${newPage}&size=${size}`)}
                onSizeChange={(newSize) => navigate(`?page=0&size=${newSize}`)}
                renderItem={(category) => (
                    <Card
                        key={category.id}
                        item={category}
                        attributesToShow={[{ key: "name", label: "Category" }]}
                        link={`/categories/${category.id}`}
                    />
                )}
            />
        </div>
    );
};

export default CategoryList;
