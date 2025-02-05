import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import StyledButton from "../ui/StyledButton";

const CategoryBar = () => {
    const { categories, loading, error } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [typeSelectionVisible, setTypeSelectionVisible] = useState(false);
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setTypeSelectionVisible(true);
    };

    const handleTypeSelection = (type) => {
        if (selectedCategory) {
            navigate(`/tasks/${type}/category/${selectedCategory}/page?page=0&size=16`);
        }
        setTypeSelectionVisible(false);
    };

    const handleBackToCategories = () => {
        setTypeSelectionVisible(false);
        setSelectedCategory(null);
    };

    if (loading) {
        return <div>Loading categories...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>Error: {error}</div>;
    }

    return (
        <>
            <div style={styles.categoryBar}>
                <style>{`
                    .categoryWrapper::-webkit-scrollbar {
                        height: 8px;
                    }
                    .categoryWrapper::-webkit-scrollbar-track {
                        background: #444;
                    }
                    .categoryWrapper::-webkit-scrollbar-thumb {
                        background-color: #888;
                        border-radius: 4px;
                    }
                    .categoryWrapper {
                        scrollbar-width: thin;
                        scrollbar-color: #888 #444;
                    }
                `}</style>

                {typeSelectionVisible ? (
                    <div style={styles.typeSelection}>
                        <StyledButton onClick={handleBackToCategories}>Back to Categories</StyledButton>
                        <div style={styles.typeButtonsWrapper}>
                            <StyledButton onClick={() => handleTypeSelection("requests")}>Requests</StyledButton>
                            <StyledButton onClick={() => handleTypeSelection("offers")}>Offers</StyledButton>
                        </div>
                    </div>
                ) : (
                    <div className="categoryWrapper" style={styles.categoryWrapper}>
                        <div style={styles.categoryList}>
                            {categories.map((category) => (
                                <StyledButton key={category.id} onClick={() => handleCategoryClick(category.id)}>
                                    {category.name}
                                </StyledButton>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div style={{ marginTop: "60px" }} />
        </>
    );
};

const styles = {
    categoryBar: {
        position: "fixed",
        top: "60px",
        left: 0,
        width: "100%",
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        padding: "10px 0",
        borderBottom: "2px solid #444",
        display: "flex",
        justifyContent: "center",
        gap: "3px",
        zIndex: 1000,
    },
    categoryWrapper: {
        display: "flex",
        justifyContent: "flex-start",
        overflowX: "auto",
        padding: "5px",
        scrollPaddingLeft: "10px",
        scrollPaddingRight: "10px",
    },
    categoryList: {
        display: "flex",
        gap: "3px",
        flex: 1,
    },
    typeSelection: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "3px",
        width: "auto",
        padding: "5px",
    },
    typeButtonsWrapper: {
        display: "flex",
        gap: "3px",
    },
};

export default CategoryBar;
