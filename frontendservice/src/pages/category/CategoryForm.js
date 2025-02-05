import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StyledButton from "../../components/ui/StyledButton";
import StyledForm from "../../components/ui/StyledForm";
import { useCategory } from "../../hooks/useCategory";
import { createCategory, updateCategory } from "../../services/api";

const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { category: fetchedCategory, loading, error } = useCategory(id);
    const [category, setCategory] = useState({ name: "", description: "" });
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (fetchedCategory) {
            setCategory(fetchedCategory);
        }
    }, [fetchedCategory]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateCategory(id, category, token);
                alert("Category updated successfully!");
            } else {
                await createCategory(category, token);
                alert("Category created successfully!");
            }
            navigate("/categories/page");
        } catch (err) {
            console.error("Error saving category:", err);
            alert("Failed to save category");
        }
    };

    if (loading) return <p>Loading category...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <StyledForm
            title={id ? "Edit Category" : "Create Category"}
            onSubmit={handleSubmit}
            fields={[
                {
                    key: "name",
                    label: "Category Name",
                    type: "text",
                    value: category.name,
                    onChange: handleChange,
                    required: true,
                    minLength: 3,
                    maxLength: 50,
                },
            ]}
        >
            <StyledButton type="submit">{id ? "Save Changes" : "Create Category"}</StyledButton>
        </StyledForm>
    );
};

export default CategoryForm;
