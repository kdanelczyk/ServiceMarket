import React from "react";
import PaginatedList from "../components/PaginatedList";
import Card from "../components/ui/Card";
import { useCategories } from "../hooks/useCategories";

const CategoryList = () => {
    const { fetchCategories } = useCategories();

    return (
        <PaginatedList
            fetchData={fetchCategories}
            renderItem={(category) => (
                <Card
                    key={category.id}
                    item={category}
                    attributesToShow={[
                        { key: "name", label: "Category" },
                    ]}
                    link={`/categories/${category.id}`}
                />
            )}
        />
    );
};

export default CategoryList;
