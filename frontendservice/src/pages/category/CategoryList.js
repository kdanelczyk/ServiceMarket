import React from "react";
import Card from "../../components/ui/Card";
import PaginatedList from "../../components/ui/PaginatedList";
import { useCategories } from "../../hooks/useCategories";

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
